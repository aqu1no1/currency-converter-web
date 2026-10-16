import { CurrencyCode } from '@enums/currency-code.enum';

export const DISPLAY_CURRENCY_ORDER: readonly CurrencyCode[] = [
  CurrencyCode.USD,
  CurrencyCode.EUR,
  CurrencyCode.BRL,
  CurrencyCode.GBP,
  CurrencyCode.JPY,
  CurrencyCode.CAD,
  CurrencyCode.AUD,
  CurrencyCode.CHF,
  CurrencyCode.CNY,
  CurrencyCode.ARS,
];

export const HOME_BASE_CURRENCY = CurrencyCode.BRL;

export const HOME_TODAY_CURRENCIES: readonly CurrencyCode[] = [
  CurrencyCode.USD,
  CurrencyCode.EUR,
  CurrencyCode.GBP,
  CurrencyCode.ARS,
];

export const HOME_TICKER_CURRENCIES: readonly CurrencyCode[] = DISPLAY_CURRENCY_ORDER.filter(
  (code) => code !== HOME_BASE_CURRENCY,
);
