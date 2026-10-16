import { useQuery } from '@tanstack/react-query';

import type { ConvertParams } from '@dtos/convert.dto';
import type { ExchangeRateService } from '@services/exchange-rate.service';

export function convertQueryKey({ from, to, amount }: ConvertParams) {
  return ['exchange-rates', 'convert', from, to, amount] as const;
}

/**
 * Converte um valor entre duas moedas (`GET /exchange-rates/convert`).
 *
 * Trocar os parâmetros cancela a chamada anterior.
 *
 * @example
 * ```tsx
 * const conversion = useConvert(exchangeRateService, { from: 'EUR', to: 'BRL', amount: 100 });
 * ```
 */
export function useConvert(exchangeRateService: ExchangeRateService, params: ConvertParams) {
  return useQuery({
    queryKey: convertQueryKey(params),
    queryFn: ({ signal }) => exchangeRateService.convert(params, signal),
  });
}
