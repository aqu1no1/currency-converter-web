import ReactDataTable, { type TableColumn } from 'react-data-table-component';
import { useTranslation } from 'react-i18next';

import { TABLE_STYLES } from '@components/data/table-styles';
import { cn } from '@utils/cn.util';

type DataTableProps<Row> = {
  /** Nome da tabela para o leitor de tela. */
  label: string;

  columns: TableColumn<Row>[];

  /** Linhas já carregadas; para dados paginados no servidor use o `CustomTable`. */
  rows: Row[];

  /** Campo único de cada linha, como `code` ou `id`. */
  keyField?: string;

  className?: string;
};

/**
 * Tabela sem paginação, com o visual do tema, para linhas que a página já tem.
 *
 * @example
 * ```tsx
 * <DataTable label={t('rates.table')} columns={columns} rows={rows} keyField="code" />
 * ```
 */
export function DataTable<Row>({
  label,
  columns,
  rows,
  keyField = 'id',
  className,
}: DataTableProps<Row>) {
  const { t } = useTranslation();

  return (
    <div className={cn('overflow-hidden rounded-list border border-line', className)}>
      <ReactDataTable
        ariaLabel={label}
        columns={columns}
        data={rows}
        keyField={keyField}
        customStyles={TABLE_STYLES}
        noDataComponent={t('common.table.noData')}
        highlightOnHover
        responsive
      />
    </div>
  );
}
