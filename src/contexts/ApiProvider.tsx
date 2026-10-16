import type { AxiosInstance } from 'axios';
import { createContext, type ReactNode, useContext } from 'react';

import { apiClient } from '@services/api.service';

const ApiContext = createContext<AxiosInstance | null>(null);

type ApiProviderProps = {
  /** Axios usado pelos services; nos testes entra um Axios falso. */
  api?: AxiosInstance;

  children: ReactNode;
};

/**
 * Entrega o Axios do site (`apiClient`, criado uma vez só) para as páginas
 * criarem os seus services.
 *
 * @example
 * ```tsx
 * <ApiProvider>
 *   <App />
 * </ApiProvider>
 * ```
 */
export function ApiProvider({ api = apiClient, children }: ApiProviderProps) {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

/**
 * Devolve o Axios do `ApiProvider`. A página cria o service com ele:
 *
 * @example
 * ```tsx
 * const api = useApi();
 * const syncService = useMemo(() => new SyncService(api), [api]);
 * ```
 */
export function useApi(): AxiosInstance {
  const api = useContext(ApiContext);

  if (!api) {
    throw new Error('useApi precisa estar dentro do ApiProvider');
  }

  return api;
}
