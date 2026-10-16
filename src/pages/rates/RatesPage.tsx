import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';

import { ChipGroup } from '@components/chips/ChipGroup';
import { QueryErrorState } from '@components/feedback/QueryErrorState';
import { Container } from '@components/layout/Container';
import { DateBadge } from '@components/layout/DateBadge';
import { PageHeader } from '@components/layout/PageHeader';
import { DISPLAY_CURRENCY_ORDER, RATES_DEFAULT_BASE } from '@constants/currencies.constants';
import { ROUTES } from '@constants/routes.constants';
import { useApi } from '@contexts/ApiProvider';
import type { CurrencyCode } from '@enums/currency-code.enum';
import { useLatestRates } from '@hooks/useLatestRates';
import { usePageMeta } from '@hooks/usePageMeta';
import { useSyncStatus } from '@hooks/useSyncStatus';
import { RatesTable } from '@pages/rates/components/RatesTable';
import { SyncFailedBanner } from '@pages/rates/components/SyncFailedBanner';
import { ExchangeRateService } from '@services/exchange-rate.service';
import { SyncService } from '@services/sync.service';
import { toCurrencyCode } from '@utils/currency.util';
import { formatDate } from '@utils/format.util';
import { ratesTable } from '@utils/rate.util';
import { withParams } from '@utils/url.util';

const BASE_OPTIONS = DISPLAY_CURRENCY_ORDER.map((code) => ({ value: code, label: code }));

export default function RatesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const base = toCurrencyCode(searchParams.get('base'), RATES_DEFAULT_BASE);
  usePageMeta(t('rates.title'), t('rates.description', { base }));

  const api = useApi();
  const exchangeRateService = useMemo(() => new ExchangeRateService(api), [api]);
  const syncService = useMemo(() => new SyncService(api), [api]);
  const latest = useLatestRates(exchangeRateService, base);
  const syncStatus = useSyncStatus(syncService);
  const syncFailed = syncStatus.data?.lastRun?.status === 'FAILED';

  const historyHref = (code: CurrencyCode) =>
    `${ROUTES.history}?${new URLSearchParams({ from: base, to: code })}`;

  const setBase = (code: CurrencyCode) =>
    setSearchParams((current) => withParams(current, { base: code }), { replace: true });

  return (
    <Container className="flex flex-col gap-7 py-14">
      <PageHeader
        title={t('rates.title')}
        description={t('rates.description', { base })}
        aside={
          latest.data ? (
            <DateBadge>{t('rates.dateBadge', { date: formatDate(latest.data.date) })}</DateBadge>
          ) : null
        }
      />
      {syncFailed && latest.data ? <SyncFailedBanner date={latest.data.date} /> : null}
      <ChipGroup label={t('rates.base')} options={BASE_OPTIONS} value={base} onChange={setBase} />
      {latest.isError && !latest.data ? (
        <QueryErrorState error={latest.error} onRetry={() => void latest.refetch()} />
      ) : (
        <>
          <RatesTable
            base={base}
            rows={ratesTable(latest.data?.rates ?? {}, base, DISPLAY_CURRENCY_ORDER)}
            isPending={latest.isPending}
            historyHref={historyHref}
            onRowClicked={({ code }) => void navigate(historyHref(code))}
          />
          <p className="text-sm text-muted">{t('rates.missingNote')}</p>
        </>
      )}
    </Container>
  );
}
