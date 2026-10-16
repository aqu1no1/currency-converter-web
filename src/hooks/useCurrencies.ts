import { useQuery } from '@tanstack/react-query';

import type { CurrencyService } from '@services/currency.service';

export const currenciesQueryKey = ['currencies'] as const;

/**
 * Busca as moedas aceitas pela API (`GET /currencies`) com o service criado pela página.
 *
 * @example
 * ```tsx
 * const api = useApi();
 * const currencyService = useMemo(() => new CurrencyService(api), [api]);
 * const { data: currencies } = useCurrencies(currencyService);
 * ```
 */
export function useCurrencies(currencyService: CurrencyService) {
  return useQuery({
    queryKey: currenciesQueryKey,
    queryFn: ({ signal }) => currencyService.list(signal),
  });
}
