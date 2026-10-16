import type { TableColumn } from 'react-data-table-component';
import { useTranslation } from 'react-i18next';

import { CustomTable } from '@components/data/CustomTable';
import { StatusBadge } from '@components/data/StatusBadge';
import type { SyncRunDto } from '@dtos/sync-runs.dto';
import type { IApiService } from '@interfaces/api-service.interface';
import { formatDateTime, formatInteger } from '@utils/format.util';
import { formatDuration, getRunDurationSeconds } from '@utils/sync.util';

const RUNS_PER_PAGE = 10;

type SyncRunsTableProps = {
  /** Service das execuções (`GET /sync`), criado pela página com `useMemo`. */
  service: IApiService<SyncRunDto>;

  /** Incrementar busca a página atual de novo. */
  refreshKey: number;
};

/**
 * Tabela "Execuções" com paginação no servidor: tipo, status, início, duração, linhas e detalhe.
 *
 * Execuções com falha mostram a mensagem de erro no detalhe.
 *
 * @example
 * ```tsx
 * <SyncRunsTable service={syncService} refreshKey={refreshKey} />
 * ```
 */
export function SyncRunsTable({ service, refreshKey }: SyncRunsTableProps) {
  const { t } = useTranslation();

  const detail = (run: SyncRunDto) => {
    if (run.status === 'FAILED') return run.errorMessage ?? '—';
    if (run.type === 'BACKFILL' && run.status === 'SUCCESS') return t('status.runs.backfillDetail');
    return '—';
  };

  const columns: TableColumn<SyncRunDto>[] = [
    {
      name: t('status.runs.columns.type'),
      minWidth: '170px',
      cell: ({ type }) => (
        <span className="font-semibold whitespace-nowrap text-title">{type}</span>
      ),
    },
    {
      name: t('status.runs.columns.status'),
      minWidth: '200px',
      cell: ({ status }) => (
        <span className="flex">
          <StatusBadge status={status} />
        </span>
      ),
    },
    {
      name: t('status.runs.columns.start'),
      minWidth: '220px',
      cell: ({ startedAt }) => formatDateTime(startedAt),
    },
    {
      name: t('status.runs.columns.duration'),
      minWidth: '110px',
      cell: (run) => {
        const seconds = getRunDurationSeconds(run);
        return seconds === null ? '—' : formatDuration(seconds);
      },
    },
    {
      name: t('status.runs.columns.rows'),
      right: true,
      minWidth: '100px',
      cell: ({ rowsInserted }) => formatInteger(rowsInserted),
    },
    {
      name: t('status.runs.columns.detail'),
      minWidth: '240px',
      grow: 2,
      cell: (run) => <span className="text-muted">{detail(run)}</span>,
    },
  ];

  return (
    <section aria-labelledby="sync-runs" className="flex flex-col gap-4">
      <h2 id="sync-runs" className="font-display text-2xl font-semibold text-title">
        {t('status.runs.title')}
      </h2>
      <CustomTable<SyncRunDto>
        label={t('status.runs.title')}
        columns={columns}
        service={service}
        perPage={RUNS_PER_PAGE}
        triggerRefreshData={refreshKey}
      />
    </section>
  );
}
