import type { TableColumn } from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { CurrencyBadge } from '@components/currency/CurrencyBadge';
import { DataTable } from '@components/data/DataTable';
import type { CurrencyCode } from '@enums/currency-code.enum';
import { formatRate } from '@utils/format.util';
import type { RateRow } from '@utils/rate.util';

type RatesTableProps = {
  base: CurrencyCode;

  rows: RateRow[];

  isPending: boolean;

  /** Endereço do histórico do par base → moeda da linha. */
  historyHref: (code: CurrencyCode) => string;

  /** Abre o histórico ao clicar em qualquer parte da linha. */
  onRowClicked: (row: RateRow) => void;
};

/**
 * Tabela "Cotações do dia": quanto 1 unidade da base vale em cada moeda e o inverso.
 *
 * O código da moeda é um link para o histórico do par, para dar para usar pelo teclado.
 *
 * @example
 * ```tsx
 * <RatesTable base="USD" rows={rows} isPending={latest.isPending} historyHref={href} onRowClicked={open} />
 * ```
 */
export function RatesTable({ base, rows, isPending, historyHref, onRowClicked }: RatesTableProps) {
  const { t } = useTranslation();

  const columns: TableColumn<RateRow>[] = [
    {
      name: t('rates.columns.code'),
      width: '120px',
      cell: ({ code }) => (
        <Link
          to={historyHref(code)}
          aria-label={`${base} → ${code}`}
          className="rounded-lg focus-visible:ring-4 focus-visible:ring-focus focus-visible:outline-none"
        >
          <CurrencyBadge code={code} />
        </Link>
      ),
    },
    {
      name: t('rates.columns.name'),
      minWidth: '180px',
      cell: ({ code }) => t(`currencies.${code}`),
    },
    {
      name: t('rates.columns.rate', { base }),
      right: true,
      minWidth: '160px',
      cell: ({ code, rate }) => (
        <span className="font-medium">{`${formatRate(rate)} ${code}`}</span>
      ),
    },
    {
      name: t('rates.columns.inverse', { base }),
      right: true,
      minWidth: '200px',
      cell: ({ inverse }) => <span className="text-muted">{`${formatRate(inverse)} ${base}`}</span>,
    },
  ];

  return (
    <DataTable
      label={t('rates.table')}
      columns={columns}
      rows={rows}
      keyField="code"
      isPending={isPending}
      onRowClicked={onRowClicked}
    />
  );
}
