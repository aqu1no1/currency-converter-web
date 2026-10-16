import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@components/cards/Card';
import { Skeleton } from '@components/feedback/Skeleton';
import { Icon } from '@components/icon/Icon';
import type { HistoryPeriod } from '@constants/history.constants';
import type { HistoryItemDto } from '@dtos/history.dto';
import { cn } from '@utils/cn.util';
import { formatPercent, formatRate } from '@utils/format.util';
import type { HistorySummary } from '@utils/history.util';

const HistoryChart = lazy(() => import('@pages/history/components/HistoryChart'));

type HistoryChartCardProps = {
  from: string;

  to: string;

  period: HistoryPeriod;

  history: HistoryItemDto[];

  summary: HistorySummary;
};

/**
 * Card do gráfico: par, valor mais recente, selo de variação no período e o gráfico de área.
 *
 * O gráfico tem um `aria-label` com par, período e variação para o leitor de tela.
 *
 * @example
 * ```tsx
 * <HistoryChartCard from="USD" to="BRL" period="30d" history={history} summary={summary} />
 * ```
 */
export function HistoryChartCard({ from, to, period, history, summary }: HistoryChartCardProps) {
  const { t } = useTranslation();
  const isUp = summary.change >= 0;
  const change = t(isUp ? 'history.up' : 'history.down', {
    value: formatPercent(Math.abs(summary.change)),
    period: t(`history.periodsLong.${period}`),
  });

  return (
    <Card
      aria-label={t('history.pair', { from, to })}
      className="flex flex-col gap-5 p-6 sm:px-8 sm:py-7"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-body-sm text-muted">{t('history.pair', { from, to })}</span>
          <span className="font-display text-4xl leading-tight font-semibold text-title tabular-nums sm:text-[42px]">
            {`${formatRate(summary.last.rate)} ${to}`}
          </span>
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-sm font-semibold tabular-nums',
            isUp ? 'bg-success text-success-text' : 'bg-warning text-warning-text',
          )}
        >
          <Icon name={isUp ? 'trendUp' : 'trendDown'} size={18} />
          {change}
        </span>
      </div>
      <div
        role="img"
        aria-label={t('history.chartLabel', {
          from,
          to,
          period: t(`history.periodsLong.${period}`),
          change: change.toLowerCase(),
        })}
        className="min-h-70"
      >
        <div aria-hidden="true">
          <Suspense fallback={<Skeleton className="h-70 w-full" />}>
            <HistoryChart history={history} to={to} />
          </Suspense>
        </div>
      </div>
    </Card>
  );
}
