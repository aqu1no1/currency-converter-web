import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { TableColumn } from 'react-data-table-component';
import { describe, expect, it, vi } from 'vitest';

import { CustomTable } from '@components/data/CustomTable';
import type {
  IApiService,
  PaginatedResponse,
  PaginationOptions,
} from '@interfaces/api-service.interface';
import { renderWithProviders } from '@test/utils/render-with-providers';

type Run = { id: string; type: string };

const COLUMNS: TableColumn<Run>[] = [{ name: 'Tipo', selector: (row) => row.type }];

function pageOf(page: number, total = 25): PaginatedResponse<Run> {
  return {
    data: [{ id: `run-${page}`, type: `DAILY ${page}` }],
    total,
    page,
    perPage: 10,
    totalPages: Math.ceil(total / 10),
  };
}

function createService() {
  const get = vi.fn((options: PaginationOptions = {}) =>
    Promise.resolve(pageOf(options.page ?? 1)),
  );
  const service: IApiService<Run> = { baseUrl: '/sync', get };
  return { service, get };
}

describe('CustomTable', () => {
  it('loads the first page with 10 rows per page', async () => {
    const { service, get } = createService();
    renderWithProviders(<CustomTable label="Execuções" columns={COLUMNS} service={service} />);

    expect(await screen.findByText('DAILY 1')).toBeInTheDocument();
    expect(get).toHaveBeenCalledWith({ page: 1, perPage: 10 }, expect.any(AbortSignal));
  });

  it('asks the service for the next page', async () => {
    const { service, get } = createService();
    renderWithProviders(<CustomTable label="Execuções" columns={COLUMNS} service={service} />);
    await screen.findByText('DAILY 1');

    await userEvent.click(screen.getByRole('button', { name: 'Next Page' }));

    expect(await screen.findByText('DAILY 2')).toBeInTheDocument();
    expect(get).toHaveBeenLastCalledWith({ page: 2, perPage: 10 }, expect.any(AbortSignal));
  });

  it('goes back to the first page when the filter changes', async () => {
    const { service, get } = createService();
    const { rerender } = renderWithProviders(
      <CustomTable
        label="Execuções"
        columns={COLUMNS}
        service={service}
        filter={{ type: 'DAILY' }}
      />,
    );
    await screen.findByText('DAILY 1');
    await userEvent.click(screen.getByRole('button', { name: 'Next Page' }));
    await screen.findByText('DAILY 2');

    rerender(
      <CustomTable
        label="Execuções"
        columns={COLUMNS}
        service={service}
        filter={{ type: 'BACKFILL' }}
      />,
    );

    await waitFor(() =>
      expect(get).toHaveBeenLastCalledWith(
        { page: 1, perPage: 10, type: 'BACKFILL' },
        expect.any(AbortSignal),
      ),
    );
  });

  it('fetches again when triggerRefreshData changes', async () => {
    const { service, get } = createService();
    const { rerender } = renderWithProviders(
      <CustomTable label="Execuções" columns={COLUMNS} service={service} triggerRefreshData={0} />,
    );
    await screen.findByText('DAILY 1');
    const calls = get.mock.calls.length;

    rerender(
      <CustomTable label="Execuções" columns={COLUMNS} service={service} triggerRefreshData={1} />,
    );

    await waitFor(() => expect(get.mock.calls.length).toBe(calls + 1));
  });

  it('shows an error with retry when the service fails', async () => {
    const get = vi
      .fn<IApiService<Run>['get']>()
      .mockRejectedValueOnce(new Error('Sem conexão'))
      .mockResolvedValue(pageOf(1));
    renderWithProviders(
      <CustomTable label="Execuções" columns={COLUMNS} service={{ baseUrl: '/sync', get }} />,
    );

    expect(await screen.findByText('Sem conexão')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await screen.findByText('DAILY 1')).toBeInTheDocument();
  });
});
