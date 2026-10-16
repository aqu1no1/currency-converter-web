import { useTranslation } from 'react-i18next';

import { StatCard } from '@components/data/StatCard';
import { StatusBadge } from '@components/data/StatusBadge';
import { HISTORY_START_DATE } from '@constants/history.constants';
import type { SyncStatusDto } from '@dtos/sync-status.dto';
import { formatDate, formatInteger, formatTime } from '@utils/format.util';
import { formatDuration, getRunDurationSeconds } from '@utils/sync.util';

type SyncSummaryCardsProps = {
  status: SyncStatusDto;

  /** Quantas moedas têm cotação em relação ao USD. */
  currencyCount: number;
};

/**
 * Os 3 cards do status: última sincronização, cotações disponíveis até e histórico desde.
 *
 * @example
 * ```tsx
 * <SyncSummaryCards status={syncStatus.data} currencyCount={9} />
 * ```
 */
export function SyncSummaryCards({ status, currencyCount }: SyncSummaryCardsProps) {
  const { t } = useTranslation();
  const { lastRun, latestRateDate } = status;

  const describeLastRun = () => {
    if (!lastRun) return undefined;
    if (lastRun.status === 'FAILED' && lastRun.error) return lastRun.error;

    const rows = t('status.lastRun.rows', {
      count: lastRun.rowsInserted,
      value: formatInteger(lastRun.rowsInserted),
    });
    const duration = getRunDurationSeconds(lastRun);
    return duration === null
      ? rows
      : t('status.lastRun.rowsIn', { rows, duration: formatDuration(duration) });
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        label={t('status.lastRun.title')}
        value={
          lastRun
            ? t('status.lastRun.at', {
                date: formatDate(lastRun.startedAt),
                time: formatTime(lastRun.startedAt),
              })
            : t('status.lastRun.empty')
        }
        description={describeLastRun()}
        valueClassName="font-sans text-[22px] text-ink"
      >
        {lastRun ? <StatusBadge status={lastRun.status} /> : null}
      </StatCard>
      <StatCard
        label={t('status.availableUntil.title')}
        value={latestRateDate ? formatDate(latestRateDate) : '—'}
        description={t(
          latestRateDate ? 'status.availableUntil.description' : 'status.availableUntil.empty',
        )}
      />
      <StatCard
        label={t('status.storedSince.title')}
        value={formatDate(HISTORY_START_DATE)}
        description={t('status.storedSince.description', { count: currencyCount })}
      />
    </div>
  );
}
