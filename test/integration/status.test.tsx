import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { AxiosRequestConfig } from 'axios';
import { describe, expect, it } from 'vitest';

import StatusPage from '@pages/status/StatusPage';
import {
  currenciesFixture,
  syncRunsFixture,
  syncStatusFailedFixture,
  syncStatusFixture,
} from '@test/fixtures/api.fixtures';
import { createFakeApiService } from '@test/utils/fake-api.service';
import { renderWithProviders } from '@test/utils/render-with-providers';
import { formatTime } from '@utils/format.util';

const manyRunsPage = (page: number) => ({
  ...syncRunsFixture,
  data: syncRunsFixture.data.map((run) => ({ ...run, id: run.id.replace(/a\d$/, `b${page}`) })),
  total: 13,
  page,
  perPage: 10,
  totalPages: 2,
});

function renderStatus(
  status: unknown = syncStatusFixture,
  runs = (_page: number): unknown => syncRunsFixture,
) {
  const api = createFakeApiService();
  api.get.mockImplementation((url, config?: AxiosRequestConfig) => {
    const responses: Record<string, unknown> = {
      '/sync/status': status,
      '/currencies': currenciesFixture,
      '/sync': runs((config?.params as { page?: number } | undefined)?.page ?? 1),
    };
    const data = responses[url];
    return data instanceof Error ? Promise.reject(data) : Promise.resolve({ data });
  });

  return renderWithProviders(<StatusPage />, { api, route: '/status' });
}

describe('StatusPage', () => {
  it('shows the last sync, the latest rate date and the stored history', async () => {
    renderStatus();

    const lastRun = await screen.findByRole('region', { name: 'Última sincronização' });
    expect(within(lastRun).getByText('Sucesso')).toBeInTheDocument();
    expect(lastRun).toHaveTextContent(`29/09/2026 às ${formatTime('2026-09-29T09:00:00.000Z')}`);
    expect(lastRun).toHaveTextContent('45 linhas gravadas em 2 s');
    expect(screen.getByRole('region', { name: 'Cotações disponíveis até' })).toHaveTextContent(
      '28/09/2026',
    );
    expect(screen.getByRole('region', { name: 'Histórico armazenado desde' })).toHaveTextContent(
      '01/01/2000',
    );
  });

  it('lists successful and failed runs with the error detail', async () => {
    renderStatus();
    const table = await screen.findByRole('table', { name: 'Execuções' });

    expect(await within(table).findByText('timeout no provedor')).toBeInTheDocument();
    expect(within(table).getAllByText('Sucesso')).toHaveLength(2);
    expect(within(table).getByText('Falhou')).toBeInTheDocument();
    expect(within(table).getByText('Carga inicial desde 2000')).toBeInTheDocument();
    expect(within(table).getByText('88.400')).toBeInTheDocument();
    expect(within(table).getByText('3 min')).toBeInTheDocument();
  });

  it('shows the failure of the last sync with its error', async () => {
    renderStatus(syncStatusFailedFixture);

    const lastRun = await screen.findByRole('region', { name: 'Última sincronização' });
    expect(within(lastRun).getByText('Falhou')).toBeInTheDocument();
    expect(lastRun).toHaveTextContent('timeout no provedor');
  });

  it('fetches everything again with the refresh button', async () => {
    const { api } = renderStatus();
    await screen.findByText('timeout no provedor');
    api.get.mockClear();

    await userEvent.click(screen.getByRole('button', { name: 'Atualizar' }));

    await waitFor(() => {
      const urls = api.get.mock.calls.map(([url]) => url);
      expect(urls).toEqual(expect.arrayContaining(['/sync/status', '/currencies', '/sync']));
    });
  });

  it('goes to the next page of runs', async () => {
    const { api } = renderStatus(syncStatusFixture, manyRunsPage);
    await screen.findByText('timeout no provedor');

    await userEvent.click(screen.getByRole('button', { name: /next page/i }));

    await waitFor(() =>
      expect(api.get).toHaveBeenCalledWith('/sync', {
        params: { page: 2, perPage: 10 },
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it('shows the unavailable state when the status fails', async () => {
    renderStatus(new Error('down'));

    expect(
      await screen.findByRole('heading', { name: 'Não foi possível carregar as cotações' }),
    ).toBeInTheDocument();
  });
});
