import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/buttons/Button';
import { QueryErrorState } from '@components/feedback/QueryErrorState';
import { Skeleton } from '@components/feedback/Skeleton';
import { Icon } from '@components/icon/Icon';
import { Container } from '@components/layout/Container';
import { PageHeader } from '@components/layout/PageHeader';
import { DISPLAY_CURRENCY_ORDER } from '@constants/currencies.constants';
import { useApi } from '@contexts/ApiProvider';
import { useCurrencies } from '@hooks/useCurrencies';
import { usePageMeta } from '@hooks/usePageMeta';
import { useSyncStatus } from '@hooks/useSyncStatus';
import { SyncRunsTable } from '@pages/status/components/SyncRunsTable';
import { SyncSummaryCards } from '@pages/status/components/SyncSummaryCards';
import { CurrencyService } from '@services/currency.service';
import { SyncService } from '@services/sync.service';

export default function StatusPage() {
  const { t } = useTranslation();
  usePageMeta(t('status.title'), t('status.description'));

  const api = useApi();
  const syncService = useMemo(() => new SyncService(api), [api]);
  const currencyService = useMemo(() => new CurrencyService(api), [api]);

  const syncStatus = useSyncStatus(syncService);
  const currencies = useCurrencies(currencyService);
  const [refreshKey, setRefreshKey] = useState(0);

  const currencyCount = (currencies.data?.length ?? DISPLAY_CURRENCY_ORDER.length) - 1;

  const refresh = () => {
    void syncStatus.refetch();
    void currencies.refetch();
    setRefreshKey((key) => key + 1);
  };

  const renderSummary = () => {
    if (syncStatus.isError && !syncStatus.data) {
      return <QueryErrorState error={syncStatus.error} onRetry={() => void syncStatus.refetch()} />;
    }

    if (!syncStatus.data) {
      return (
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-40 w-full rounded-list" />
          ))}
        </div>
      );
    }

    return <SyncSummaryCards status={syncStatus.data} currencyCount={currencyCount} />;
  };

  return (
    <Container className="flex flex-col gap-8 py-14">
      <PageHeader
        title={t('status.title')}
        description={t('status.description')}
        aside={
          <Button variant="secondary" onClick={refresh} disabled={syncStatus.isFetching}>
            <Icon name="refresh" size={20} />
            {t('status.refresh')}
          </Button>
        }
      />
      {renderSummary()}
      <SyncRunsTable service={syncService} refreshKey={refreshKey} />
    </Container>
  );
}
