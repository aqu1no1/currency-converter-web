import { keepPreviousData, skipToken, useQuery } from '@tanstack/react-query';

import type { ConvertParams } from '@dtos/convert.dto';
import type { ExchangeRateService } from '@services/exchange-rate.service';

export function convertQueryKey(params: ConvertParams | null) {
  return ['exchange-rates', 'convert', params?.from, params?.to, params?.amount] as const;
}

/**
 * Converte um valor entre duas moedas (`GET /exchange-rates/convert`).
 *
 * Com `params` nulo (valor inválido) não chama a API. Trocar os parâmetros cancela
 * a chamada anterior e mantém o resultado antigo na tela até chegar o novo.
 *
 * @example
 * ```tsx
 * const conversion = useConvert(exchangeRateService, { from: 'EUR', to: 'BRL', amount: '100' });
 * ```
 */
export function useConvert(exchangeRateService: ExchangeRateService, params: ConvertParams | null) {
  return useQuery({
    queryKey: convertQueryKey(params),
    queryFn: params ? ({ signal }) => exchangeRateService.convert(params, signal) : skipToken,
    placeholderData: keepPreviousData,
  });
}
