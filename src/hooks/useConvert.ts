import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useApi } from '@contexts/ApiProvider';
import type { ConvertParams } from '@dtos/convert.dto';
import { ExchangeRateService } from '@services/exchange-rate.service';

export function convertQueryKey({ from, to, amount }: ConvertParams) {
  return ['exchange-rates', 'convert', from, to, amount] as const;
}

/**
 * Converte um valor entre duas moedas na API (`GET /exchange-rates/convert`).
 *
 * O valor vai como texto (`'100.50'`) para não perder precisão. Mudar as
 * moedas ou o valor cancela a chamada anterior.
 *
 * @example
 * ```tsx
 * const conversion = useConvert({ from: 'EUR', to: 'BRL', amount: '100' });
 * const result = conversion.data?.result;
 * ```
 */
export function useConvert(params: ConvertParams) {
  const api = useApi();
  const exchangeRateService = useMemo(() => new ExchangeRateService(api), [api]);

  return useQuery({
    queryKey: convertQueryKey(params),
    queryFn: ({ signal }) => exchangeRateService.convert(params, signal),
  });
}
