import { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

import { SiteFooter } from '@components/layout/SiteFooter';
import { SiteHeader } from '@components/layout/SiteHeader';
import { useApi } from '@contexts/ApiProvider';
import { useSyncStatus } from '@hooks/useSyncStatus';
import { SyncService } from '@services/sync.service';

const MAIN_ID = 'main-content';

/**
 * Estrutura comum às páginas: link para pular ao conteúdo, cabeçalho, página
 * atual e rodapé.
 *
 * A faixa verde do cabeçalho continua no hero da Home, que fica logo abaixo.
 *
 * @example
 * ```tsx
 * <Route element={<Layout />}>...</Route>
 * ```
 */
export function Layout() {
  const { t } = useTranslation();
  const api = useApi();
  const syncService = useMemo(() => new SyncService(api), [api]);
  const syncStatus = useSyncStatus(syncService);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href={`#${MAIN_ID}`}
        className="sr-only z-20 rounded-control bg-mint px-4 py-3 font-semibold text-brand focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t('nav.skipToContent')}
      </a>
      <div data-on-brand className="bg-brand">
        <SiteHeader />
      </div>
      <main id={MAIN_ID} tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter latestRateDate={syncStatus.data?.latestRateDate} />
    </div>
  );
}
