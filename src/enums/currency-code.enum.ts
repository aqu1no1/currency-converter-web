export const CurrencyCode = {
  USD: 'USD',
  BRL: 'BRL',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  CAD: 'CAD',
  AUD: 'AUD',
  CHF: 'CHF',
  CNY: 'CNY',
  ARS: 'ARS',
} as const;

export type CurrencyCode = (typeof CurrencyCode)[keyof typeof CurrencyCode];
