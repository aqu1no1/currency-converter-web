import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { AxiosRequestConfig } from 'axios';
import { describe, expect, it } from 'vitest';

import type { ConvertParams } from '@dtos/convert.dto';
import { ApiError } from '@interfaces/api-error.interface';
import ConverterPage from '@pages/converter/ConverterPage';
import { createFakeApiService } from '@test/utils/fake-api.service';
import { LocationProbe } from '@test/utils/location-probe';
import { renderWithProviders } from '@test/utils/render-with-providers';

const USD_RATES: Record<string, number> = { USD: 1, EUR: 0.8, BRL: 5, GBP: 0.75, ARS: 1450 };

function renderConverter(route = '/converter') {
  const api = createFakeApiService();
  api.get.mockImplementation((_url, config?: AxiosRequestConfig) => {
    const { from, to, amount } = (config?.params ?? {}) as ConvertParams;
    const rate = USD_RATES[to]! / USD_RATES[from]!;
    return Promise.resolve({
      data: {
        from,
        to,
        amount: Number(amount),
        rate,
        result: Number(amount) * rate,
        date: '2026-09-28',
      },
    });
  });

  return renderWithProviders(
    <>
      <ConverterPage />
      <LocationProbe />
    </>,
    { api, route },
  );
}

function lastParams(api: ReturnType<typeof createFakeApiService>) {
  return api.get.mock.lastCall?.[1]?.params as ConvertParams;
}

describe('ConverterPage', () => {
  it('converts 100 EUR to BRL by default with both rates and the date', async () => {
    renderConverter();

    expect(await screen.findByText(/€\s100,00 equivalem a/)).toBeInTheDocument();
    expect(screen.getByText(/R\$\s625,00/)).toBeInTheDocument();
    expect(screen.getByText('1 EUR = 6,2500 BRL')).toBeInTheDocument();
    expect(screen.getByText('1 BRL = 0,1600 EUR')).toBeInTheDocument();
    expect(screen.getByText('Cotação de 28/09/2026')).toBeInTheDocument();
  });

  it('recalculates after typing, keeps the focus and saves the amount in the url', async () => {
    const { api } = renderConverter();
    const input = screen.getByLabelText('Valor');

    await userEvent.clear(input);
    await userEvent.type(input, '250,5');

    expect(await screen.findByText(/R\$\s1\.565,63/)).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(lastParams(api)).toEqual({ from: 'EUR', to: 'BRL', amount: '250.5' });
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('amount=250%2C5'));
  });

  it('swaps the currencies and converts again', async () => {
    const { api } = renderConverter();
    await screen.findByText(/R\$\s625,00/);

    await userEvent.click(screen.getByRole('button', { name: 'Inverter moedas' }));

    expect(await screen.findByText(/R\$\s100,00 equivalem a/)).toBeInTheDocument();
    expect(screen.getByText(/€\s16,00/)).toBeInTheDocument();
    expect(screen.getByLabelText('De')).toHaveValue('BRL');
    expect(screen.getByLabelText('Para')).toHaveValue('EUR');
    expect(lastParams(api)).toEqual({ from: 'BRL', to: 'EUR', amount: '100' });
  });

  it('shows the validation message and does not call the api for an invalid amount', async () => {
    const { api } = renderConverter();
    await screen.findByText(/R\$\s625,00/);
    const calls = api.get.mock.calls.length;

    await userEvent.clear(screen.getByLabelText('Valor'));
    await userEvent.type(screen.getByLabelText('Valor'), 'abc');

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Digite um valor numérico maior ou igual a zero.',
    );
    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(api.get).toHaveBeenCalledTimes(calls);
  });

  it('fills the pair with a frequent conversion', async () => {
    const { api } = renderConverter();

    await userEvent.click(screen.getByRole('button', { name: 'GBP → EUR' }));

    await waitFor(() => expect(lastParams(api)).toEqual({ from: 'GBP', to: 'EUR', amount: '100' }));
    expect(screen.getByLabelText('De')).toHaveValue('GBP');
    expect(screen.getByLabelText('Para')).toHaveValue('EUR');
    expect(screen.getByTestId('location')).toHaveTextContent('from=GBP&to=EUR');
  });

  it('opens a shared link with the same conversion', async () => {
    renderConverter('/converter?amount=50&from=USD&to=BRL');

    expect(await screen.findByText(/US\$\s50,00 equivalem a/)).toBeInTheDocument();
    expect(screen.getByText(/R\$\s250,00/)).toBeInTheDocument();
    expect(screen.getByLabelText('Valor')).toHaveValue('50');
  });

  it('shows that the rates are on their way instead of the card before the first sync', async () => {
    const api = createFakeApiService();
    api.get.mockRejectedValue(new ApiError({ status: 503, message: 'sem cotações' }));
    renderWithProviders(<ConverterPage />, { api });

    expect(
      await screen.findByRole('heading', { name: 'As cotações estão a caminho' }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText('Valor')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Atualizar' })).toBeInTheDocument();
  });

  it('keeps the card and shows the api message for a rejected conversion', async () => {
    const api = createFakeApiService();
    api.get.mockRejectedValue(new ApiError({ status: 400, message: 'Moeda não suportada' }));
    renderWithProviders(<ConverterPage />, { api });

    expect(await screen.findByText('Moeda não suportada')).toBeInTheDocument();
    expect(screen.getByLabelText('Valor')).toBeInTheDocument();
  });
});
