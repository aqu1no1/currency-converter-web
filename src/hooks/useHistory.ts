import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { HistoryParams } from '@dtos/history.dto';
import type { ExchangeRateService } from '@services/exchange-rate.service';

export function historyQueryKey({ from, to, start, end }: HistoryParams) {
  return ['exchange-rates', 'history', from, to, start, end] as const;
}

/**
 * Busca a série histórica de um par de moedas (`GET /exchange-rates/history`).
 *
 * Trocar o par ou o período cancela a chamada anterior e mantém a série antiga até chegar a nova.
 *
 * @example
 * ```tsx
 * const history = useHistory(exchangeRateService, { from: 'USD', to: 'BRL', start, end });
 * ```
 */
export function useHistory(exchangeRateService: ExchangeRateService, params: HistoryParams) {
  return useQuery({
    queryKey: historyQueryKey(params),
    queryFn: ({ signal }) => exchangeRateService.history(params, signal),
    placeholderData: keepPreviousData,
  });
}
