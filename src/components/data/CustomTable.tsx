import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ReactDataTable, {
  type ConditionalStyles,
  type TableColumn,
} from 'react-data-table-component';
import { useTranslation } from 'react-i18next';

import { TABLE_STYLES } from '@components/data/table-styles';
import { TableSkeleton } from '@components/data/TableSkeleton';
import { ErrorState } from '@components/feedback/ErrorState';
import type { IApiService } from '@interfaces/api-service.interface';
import { cn } from '@utils/cn.util';

const DEFAULT_PER_PAGE = 10;

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

type CustomTableProps<Row> = {
  /** Nome da tabela para o leitor de tela. */
  label: string;

  columns: TableColumn<Row>[];

  /** Service da página, criado com `useMemo` para a referência ficar estável. */
  service: IApiService<Row>;

  /** Filtros enviados junto com a página; quando mudam, a tabela volta para a página 1. */
  filter?: Record<string, string | number | undefined>;

  /** Incrementar este número busca a página atual de novo. */
  triggerRefreshData?: number;

  perPage?: number;

  /** Campo único de cada linha. */
  keyField?: string;

  conditionalRowStyles?: ConditionalStyles<Row>[];

  className?: string;
};

/**
 * Tabela com paginação no servidor: a cada página, tamanho ou filtro, chama
 * `service.get({ page, perPage, ...filter })` pelo TanStack Query.
 *
 * Mostra linhas pulsando enquanto carrega e um erro com "Tentar de novo" se a busca falhar.
 *
 * @example
 * ```tsx
 * const api = useApi();
 * const syncService = useMemo(() => new SyncService(api), [api]);
 *
 * <CustomTable<SyncRunDto> label={t('status.runs')} columns={columns} service={syncService} />
 * ```
 */
export function CustomTable<Row>({
  label,
  columns,
  service,
  filter,
  triggerRefreshData = 0,
  perPage: initialPerPage = DEFAULT_PER_PAGE,
  keyField = 'id',
  conditionalRowStyles,
  className,
}: CustomTableProps<Row>) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [lastFilter, setLastFilter] = useState(filter);

  if (JSON.stringify(lastFilter) !== JSON.stringify(filter)) {
    setLastFilter(filter);
    setCurrentPage(1);
  }

  const query = useQuery({
    queryKey: [service.baseUrl, 'table', { page: currentPage, perPage, filter }],
    queryFn: ({ signal }) => service.get({ page: currentPage, perPage, ...filter }, signal),
    placeholderData: keepPreviousData,
  });

  const { refetch } = query;

  useEffect(() => {
    if (triggerRefreshData > 0) void refetch();
  }, [refetch, triggerRefreshData]);

  if (query.isError && !query.data) {
    return (
      <ErrorState
        title={t('common.table.errorTitle')}
        description={query.error.message}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-list border border-line', className)}>
      <ReactDataTable
        ariaLabel={label}
        columns={columns}
        data={query.data?.data ?? []}
        keyField={keyField}
        customStyles={TABLE_STYLES}
        conditionalRowStyles={conditionalRowStyles}
        progressPending={query.isPending}
        progressComponent={<TableSkeleton rows={Math.min(perPage, 5)} />}
        noDataComponent={t('common.table.noData')}
        pagination
        paginationServer
        paginationTotalRows={query.data?.total ?? 0}
        paginationDefaultPage={currentPage}
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        paginationComponentOptions={{
          rowsPerPageText: t('common.table.rowsPerPage'),
          rangeSeparatorText: t('common.table.of'),
        }}
        onChangePage={setCurrentPage}
        onChangeRowsPerPage={(nextPerPage, page) => {
          setPerPage(nextPerPage);
          setCurrentPage(page);
        }}
        highlightOnHover
        responsive
      />
    </div>
  );
}
