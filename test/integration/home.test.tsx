import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import HomePage from '@pages/home/HomePage';
import { currenciesFixture, latestRatesFixture } from '@test/fixtures/api.fixtures';
import { createFakeApiService, respondByUrl } from '@test/utils/fake-api.service';
import { renderWithProviders } from '@test/utils/render-with-providers';

function renderHome(latest: unknown = latestRatesFixture) {
  const api = createFakeApiService();
  respondByUrl(api, {
    '/currencies': currenciesFixture,
    '/exchange-rates/latest/BRL': latest,
  });

  return renderWithProviders(<HomePage />, { api });
}

describe('HomePage', () => {
  it('shows today in reais with the values from the API and the date', async () => {
    renderHome();
    const card = screen.getByRole('region', { name: 'Hoje em reais' });

    expect(await within(card).findByText('28/09/2026')).toBeInTheDocument();
    expect(within(card).getByText('1 USD').closest('div')).toHaveTextContent(/R\$\s5,00/);
    expect(within(card).getByText('1 EUR').closest('div')).toHaveTextContent(/R\$\s6,25/);
    expect(within(card).getByText('1 GBP').closest('div')).toHaveTextContent(/R\$\s8,00/);
    expect(within(card).getByRole('link', { name: 'Ver as 10 moedas' })).toHaveAttribute(
      'href',
      '/rates',
    );
  });

  it('keeps the hero and offers a retry when the rates fail', async () => {
    const { api } = renderHome(new Error('down'));

    expect(
      await screen.findByText('Não foi possível carregar as cotações agora.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Converta moedas com cotações de bancos centrais' }),
    ).toBeInTheDocument();

    respondByUrl(api, {
      '/currencies': currenciesFixture,
      '/exchange-rates/latest/BRL': latestRatesFixture,
    });
    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await screen.findByText('28/09/2026')).toBeInTheDocument();
  });

  it('links the hero buttons to the converter and the rates', () => {
    renderHome();

    expect(screen.getByRole('link', { name: 'Converter agora' })).toHaveAttribute(
      'href',
      '/converter',
    );
    expect(screen.getByRole('link', { name: 'Ver cotações do dia' })).toHaveAttribute(
      'href',
      '/rates',
    );
  });

  it('lists the supported currencies with translated names', async () => {
    renderHome();
    const section = screen.getByRole('heading', { name: 'Moedas suportadas' }).closest('section')!;

    expect(await within(section).findByText('Real brasileiro')).toBeInTheDocument();
    expect(within(section).getByText('Dólar americano')).toBeInTheDocument();
  });

  it('falls back to the fixed currency list when the API fails', async () => {
    const api = createFakeApiService();
    respondByUrl(api, {
      '/currencies': new Error('down'),
      '/exchange-rates/latest/BRL': latestRatesFixture,
    });
    renderWithProviders(<HomePage />, { api });
    const section = screen.getByRole('heading', { name: 'Moedas suportadas' }).closest('section')!;

    expect(await within(section).findByText('Peso argentino')).toBeInTheDocument();
  });
});
