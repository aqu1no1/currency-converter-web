import { useTranslation } from 'react-i18next';

import { StatCard } from '@components/data/StatCard';
import { formatDate, formatRate } from '@utils/format.util';
import type { HistorySummary } from '@utils/history.util';

const STATS = ['first', 'min', 'max', 'last'] as const;

type HistoryStatsProps = {
  summary: HistorySummary;
};

/**
 * Os 4 indicadores do período (início, mínima, máxima e mais recente), cada um com a data.
 *
 * @example
 * ```tsx
 * <HistoryStats summary={summary} />
 * ```
 */
export function HistoryStats({ summary }: HistoryStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <StatCard
          key={stat}
          label={t(`history.stats.${stat}`)}
          value={<span className="tabular-nums">{formatRate(summary[stat].rate)}</span>}
          description={formatDate(summary[stat].date)}
        />
      ))}
    </div>
  );
}
