import { useQuery } from '@tanstack/react-query';

import type { ExchangeRateService } from '@services/exchange-rate.service';

export function latestRatesQueryKey(base: string) {
  return ['exchange-rates', 'latest', base] as const;
}

/**
 * Busca as cotações mais recentes a partir de uma moeda-base (`GET /exchange-rates/latest/:base`).
 *
 * Trocar a base cancela a chamada anterior.
 *
 * @example
 * ```tsx
 * const latest = useLatestRates(exchangeRateService, 'BRL');
 * const euroRate = latest.data?.rates.EUR;
 * ```
 */
export function useLatestRates(exchangeRateService: ExchangeRateService, base: string) {
  return useQuery({
    queryKey: latestRatesQueryKey(base),
    queryFn: ({ signal }) => exchangeRateService.latest(base, signal),
  });
}
