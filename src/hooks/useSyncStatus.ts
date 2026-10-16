import { useQuery } from '@tanstack/react-query';

import type { SyncService } from '@services/sync.service';

export const syncStatusQueryKey = ['sync', 'status'] as const;

/**
 * Busca a última sincronização e a data das cotações mais recentes (`GET /sync/status`).
 *
 * @example
 * ```tsx
 * const syncStatus = useSyncStatus(syncService);
 * ```
 */
export function useSyncStatus(syncService: SyncService) {
  return useQuery({
    queryKey: syncStatusQueryKey,
    queryFn: ({ signal }) => syncService.status(signal),
  });
}
