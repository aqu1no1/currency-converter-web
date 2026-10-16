import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

import { SegmentedControl } from '@components/buttons/SegmentedControl';
import { Skeleton } from '@components/feedback/Skeleton';
import { QueryErrorState } from '@components/feedback/QueryErrorState';
import { Container } from '@components/layout/Container';
import { PageHeader } from '@components/layout/PageHeader';
import {
  HISTORY_DEFAULTS,
  HISTORY_PERIODS,
  type HistoryPeriod,
} from '@constants/history.constants';
import { useApi } from '@contexts/ApiProvider';
import type { CurrencyCode } from '@enums/currency-code.enum';
import { useHistory } from '@hooks/useHistory';
import { usePageMeta } from '@hooks/usePageMeta';
import { EmptyHistory } from '@pages/history/components/EmptyHistory';
import { HistoryChartCard } from '@pages/history/components/HistoryChartCard';
import { HistoryFilters } from '@pages/history/components/HistoryFilters';
import { HistoryStats } from '@pages/history/components/HistoryStats';
import { ExchangeRateService } from '@services/exchange-rate.service';
import { toCurrencyCode } from '@utils/currency.util';
import { historyRange, summarizeHistory, toHistoryPeriod } from '@utils/history.util';
import { withParams } from '@utils/url.util';

export default function HistoryPage() {
  const { t } = useTranslation();
  usePageMeta(t('history.title'), t('history.description'));

  const api = useApi();
  const exchangeRateService = useMemo(() => new ExchangeRateService(api), [api]);

  const [searchParams, setSearchParams] = useSearchParams();
  const from = toCurrencyCode(searchParams.get('from'), HISTORY_DEFAULTS.from);
  const to = toCurrencyCode(searchParams.get('to'), HISTORY_DEFAULTS.to);
  const period = toHistoryPeriod(searchParams.get('period'), HISTORY_DEFAULTS.period);
  const range = useMemo(() => historyRange(period), [period]);

  const history = useHistory(exchangeRateService, { from, to, ...range });
  const points = history.data?.history ?? [];
  const summary = summarizeHistory(points);

  const updateParams = (changes: Record<string, string>) =>
    setSearchParams((current) => withParams(current, changes), { replace: true });

  const setPair = (nextFrom: CurrencyCode, nextTo: CurrencyCode) =>
    updateParams({ from: nextFrom, to: nextTo });

  const periodSelector = (
    <SegmentedControl
      label={t('history.period')}
      options={HISTORY_PERIODS.map((value) => ({ value, label: t(`history.periods.${value}`) }))}
      value={period}
      onChange={(next: HistoryPeriod) => updateParams({ period: next })}
    />
  );

  const renderContent = () => {
    if (history.isError && !history.data) {
      return <QueryErrorState error={history.error} onRetry={() => void history.refetch()} />;
    }

    if (history.isPending) {
      return (
        <>
          <Skeleton className="h-96 w-full rounded-list" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HISTORY_PERIODS.concat(HISTORY_PERIODS[0]).map((key, index) => (
              <Skeleton key={`${key}-${index}`} className="h-32 w-full rounded-list" />
            ))}
          </div>
        </>
      );
    }

    if (!summary) return <EmptyHistory periodSelector={periodSelector} />;

    return (
      <>
        <HistoryChartCard from={from} to={to} period={period} history={points} summary={summary} />
        <HistoryStats summary={summary} />
      </>
    );
  };

  return (
    <Container className="flex flex-col gap-7 py-14">
      <PageHeader title={t('history.title')} description={t('history.description')} />
      <HistoryFilters
        from={from}
        to={to}
        onFromChange={(code) => setPair(code, to)}
        onToChange={(code) => setPair(from, code)}
        onSwap={() => setPair(to, from)}
        periodSelector={periodSelector}
      />
      {renderContent()}
    </Container>
  );
}
