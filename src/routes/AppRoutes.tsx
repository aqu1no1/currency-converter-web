import { lazy } from 'react';
import { Route, Routes } from 'react-router';

import { Layout } from '@components/layout/Layout';
import { ROUTES } from '@constants/routes.constants';

const HomePage = lazy(() => import('@pages/home/HomePage'));
const ConverterPage = lazy(() => import('@pages/converter/ConverterPage'));
const RatesPage = lazy(() => import('@pages/rates/RatesPage'));
const HistoryPage = lazy(() => import('@pages/history/HistoryPage'));
const StatusPage = lazy(() => import('@pages/status/StatusPage'));
const NotFoundPage = lazy(() => import('@pages/not-found/NotFoundPage'));

/**
 * Rotas do site, todas dentro do `Layout` e com as páginas carregadas sob demanda.
 *
 * @example
 * ```tsx
 * <BrowserRouter>
 *   <AppRoutes />
 * </BrowserRouter>
 * ```
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.converter} element={<ConverterPage />} />
        <Route path={ROUTES.rates} element={<RatesPage />} />
        <Route path={ROUTES.history} element={<HistoryPage />} />
        <Route path={ROUTES.status} element={<StatusPage />} />
        <Route path={ROUTES.notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
