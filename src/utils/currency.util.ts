import { DISPLAY_CURRENCY_ORDER } from '@constants/currencies.constants';
import type { CurrencyCode } from '@enums/currency-code.enum';

export function toSupportedCurrencies(codes: readonly string[]): CurrencyCode[] {
  return DISPLAY_CURRENCY_ORDER.filter((code) => codes.includes(code));
}

export function toCurrencyCode(value: string | null, fallback: CurrencyCode): CurrencyCode {
  return DISPLAY_CURRENCY_ORDER.find((code) => code === value?.toUpperCase()) ?? fallback;
}
