import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';

import RatesPage from '@pages/rates/RatesPage';
import { ApiError } from '@interfaces/api-error.interface';
import {
  latestRatesEurFixture,
  latestRatesUsdFixture,
  syncStatusFailedFixture,
  syncStatusFixture,
} from '@test/fixtures/api.fixtures';
import { createFakeApiService, respondByUrl } from '@test/utils/fake-api.service';
import { LocationProbe } from '@test/utils/location-probe';
import { renderWithProviders } from '@test/utils/render-with-providers';

function renderRates(
  route = '/rates',
  usd: unknown = latestRatesUsdFixture,
  syncStatus: unknown = syncStatusFixture,
) {
  const api = createFakeApiService();
  respondByUrl(api, {
    '/exchange-rates/latest/USD': usd,
    '/exchange-rates/latest/EUR': latestRatesEurFixture,
    '/sync/status': syncStatus,
  });

  return renderWithProviders(
    <Routes>
      <Route
        path="/rates"
        element={
          <>
            <RatesPage />
            <LocationProbe />
          </>
        }
      />
      <Route path="/history" element={<LocationProbe />} />
    </Routes>,
    { api, route },
  );
}

function table() {
  return screen.getByRole('table', { name: 'Tabela de cotações' });
}

describe('RatesPage', () => {
  it('shows the USD rates by default without the base row', async () => {
    renderRates();

    expect(await screen.findByText('Cotações de 28/09/2026')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'USD' })).toHaveAttribute('aria-pressed', 'true');
    expect(within(table()).getByText('5,0000 BRL')).toBeInTheDocument();
    expect(within(table()).getByText('0,2000 USD')).toBeInTheDocument();
    expect(within(table()).getByText('Peso argentino')).toBeInTheDocument();
    expect(within(table()).queryByText('Dólar americano')).not.toBeInTheDocument();
  });

  it('changes the base, fetches its rates and saves it in the url', async () => {
    const { api } = renderRates();
    await screen.findByText('Cotações de 28/09/2026');

    await userEvent.click(screen.getByRole('button', { name: 'EUR' }));

    expect(await within(table()).findByText('6,2500 BRL')).toBeInTheDocument();
    expect(within(table()).getByText('1,2500 USD')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'EUR' })).toHaveAttribute('aria-pressed', 'true');
    expect(api.get).toHaveBeenCalledWith('/exchange-rates/latest/EUR', expect.anything());
    expect(screen.getByTestId('location')).toHaveTextContent('/rates?base=EUR');
  });

  it('opens the history of the pair when a row is clicked', async () => {
    renderRates();
    const name = await within(await screen.findByRole('table')).findByText('Real brasileiro');

    await userEvent.click(name);

    await waitFor(() =>
      expect(screen.getByTestId('location')).toHaveTextContent('/history?from=USD&to=BRL'),
    );
  });

  it('links the currency code to the history for keyboard users', async () => {
    renderRates('/rates?base=EUR');

    expect(await screen.findByRole('link', { name: 'EUR → BRL' })).toHaveAttribute(
      'href',
      '/history?from=EUR&to=BRL',
    );
  });

  it('shows the unavailable state with retry and the status link when the api is down', async () => {
    const { api } = renderRates(
      '/rates',
      new ApiError({ status: 0, message: 'rede', isNetwork: true }),
    );

    expect(
      await screen.findByRole('heading', { name: 'Não foi possível carregar as cotações' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver status' })).toHaveAttribute('href', '/status');

    respondByUrl(api, {
      '/exchange-rates/latest/USD': latestRatesUsdFixture,
      '/sync/status': syncStatusFixture,
    });
    api.get.mockClear();
    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await within(table()).findByText('5,0000 BRL')).toBeInTheDocument();
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/exchange-rates/latest/USD', expect.anything());
  });

  it('shows that the rates are on their way before the first sync', async () => {
    renderRates('/rates', new ApiError({ status: 503, message: 'sem cotações' }));

    expect(
      await screen.findByRole('heading', { name: 'As cotações estão a caminho' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Atualizar' })).toBeInTheDocument();
  });

  it('warns that the last sync failed and keeps the table', async () => {
    renderRates('/rates', latestRatesUsdFixture, syncStatusFailedFixture);

    const banner = await screen.findByText(/A última atualização falhou\./);
    expect(banner.closest('[role="status"]')).toHaveTextContent(
      'As cotações abaixo são de 28/09/2026 e serão atualizadas na próxima sincronização.',
    );
    expect(within(table()).getByText('5,0000 BRL')).toBeInTheDocument();
  });

  it('does not warn when the sync status fails', async () => {
    renderRates('/rates', latestRatesUsdFixture, new Error('down'));

    expect(await within(await screen.findByRole('table')).findByText('Euro')).toBeInTheDocument();
    expect(screen.queryByText(/A última atualização falhou/)).not.toBeInTheDocument();
  });
});
