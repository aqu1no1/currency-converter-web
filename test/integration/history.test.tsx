import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { AxiosRequestConfig } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import type { HistoryParams } from '@dtos/history.dto';
import { ApiError } from '@interfaces/api-error.interface';
import HistoryPage from '@pages/history/HistoryPage';
import { historyBrlUsdFixture, historyUsdBrlFixture } from '@test/fixtures/api.fixtures';
import { createFakeApiService } from '@test/utils/fake-api.service';
import { LocationProbe } from '@test/utils/location-probe';
import { renderWithProviders } from '@test/utils/render-with-providers';
import { historyRange } from '@utils/history.util';

vi.mock('@pages/history/components/HistoryChart', () => ({
  default: () => <div data-testid="history-chart" />,
}));

function renderHistory(route = '/history', response?: (params: HistoryParams) => unknown) {
  const api = createFakeApiService();
  api.get.mockImplementation((_url, config?: AxiosRequestConfig) => {
    const params = (config?.params ?? {}) as HistoryParams;
    const data = response
      ? response(params)
      : params.from === 'BRL'
        ? historyBrlUsdFixture
        : historyUsdBrlFixture;
    return data instanceof Error ? Promise.reject(data) : Promise.resolve({ data });
  });

  return renderWithProviders(
    <>
      <HistoryPage />
      <LocationProbe />
    </>,
    { api, route },
  );
}

function lastParams(api: ReturnType<typeof createFakeApiService>) {
  return api.get.mock.lastCall?.[1]?.params as HistoryParams;
}

describe('HistoryPage', () => {
  it('shows USD to BRL in the last 30 days with the change and the 4 stats', async () => {
    const { api } = renderHistory();

    const card = await screen.findByRole('region', { name: '1 USD em BRL' });
    expect(within(card).getByText('5,5000 BRL')).toBeInTheDocument();
    expect(within(card).getByText('Alta de 10,00% nos últimos 30 dias')).toBeInTheDocument();
    expect(
      within(card).getByRole('img', {
        name: 'Cotação de USD para BRL nos últimos 30 dias: alta de 10,00% nos últimos 30 dias',
      }),
    ).toBeInTheDocument();
    expect(await screen.findByTestId('history-chart')).toBeInTheDocument();

    expect(screen.getByRole('region', { name: 'Início do período' })).toHaveTextContent(
      '5,000001/09/2026',
    );
    expect(screen.getByRole('region', { name: 'Mínima' })).toHaveTextContent('4,800010/09/2026');
    expect(screen.getByRole('region', { name: 'Máxima' })).toHaveTextContent('5,600020/09/2026');
    expect(screen.getByRole('region', { name: 'Mais recente' })).toHaveTextContent(
      '5,500028/09/2026',
    );
    expect(lastParams(api)).toEqual({ from: 'USD', to: 'BRL', ...historyRange('30d') });
  });

  it('changes the period, fetches the new range and saves it in the url', async () => {
    const { api } = renderHistory();
    await screen.findByRole('region', { name: '1 USD em BRL' });

    await userEvent.click(screen.getByRole('button', { name: '7 dias' }));

    await waitFor(() =>
      expect(lastParams(api)).toEqual({ from: 'USD', to: 'BRL', ...historyRange('7d') }),
    );
    expect(screen.getByRole('button', { name: '7 dias' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('location')).toHaveTextContent('period=7d');
  });

  it('swaps the pair and shows the inverse history', async () => {
    renderHistory();
    await screen.findByRole('region', { name: '1 USD em BRL' });

    await userEvent.click(screen.getByRole('button', { name: 'Inverter moedas' }));

    const card = await screen.findByRole('region', { name: '1 BRL em USD' });
    expect(within(card).getByText('Queda de 10,00% nos últimos 30 dias')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('from=BRL&to=USD');
  });

  it('opens a shared link with the pair and the period', async () => {
    const { api } = renderHistory('/history?from=BRL&to=USD&period=1y');

    expect(await screen.findByRole('region', { name: '1 BRL em USD' })).toBeInTheDocument();
    expect(lastParams(api)).toEqual({ from: 'BRL', to: 'USD', ...historyRange('1y') });
  });

  it('shows the empty state with the period selector when there are no rates', async () => {
    renderHistory('/history?from=USD&to=ARS&period=7d', () => ({
      from: 'USD',
      to: 'ARS',
      history: [],
    }));

    const empty = await screen.findByRole('status');
    expect(empty).toHaveTextContent('Sem cotações nesse período');
    expect(within(empty).getByRole('button', { name: '7 dias' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('shows the unavailable state when the api is down', async () => {
    renderHistory('/history', () => new ApiError({ status: 0, message: 'rede', isNetwork: true }));

    expect(
      await screen.findByRole('heading', { name: 'Não foi possível carregar as cotações' }),
    ).toBeInTheDocument();
  });
});
