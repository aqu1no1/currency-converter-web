import type { CurrencyCode } from '@enums/currency-code.enum';
import { currentLanguage } from '@lib/i18n';

const SMALL_RATE = 0.01;

const SMALL_PRICE = 0.1;

function toDate(value: Date | string | number) {
  return value instanceof Date ? value : new Date(value);
}

export function formatMoney(amount: number, currency: CurrencyCode, language = currentLanguage()) {
  return new Intl.NumberFormat(language, { style: 'currency', currency }).format(amount);
}

export function formatUnitPrice(
  value: number,
  currency: CurrencyCode,
  language = currentLanguage(),
) {
  const digits = Math.abs(value) < SMALL_PRICE ? 4 : 2;
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatRate(value: number, language = currentLanguage()) {
  const digits = Math.abs(value) < SMALL_RATE ? 6 : 4;
  return new Intl.NumberFormat(language, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatDate(value: Date | string | number, language = currentLanguage()) {
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(toDate(value));
}

export function formatShortDate(value: Date | string | number, language = currentLanguage()) {
  return new Intl.DateTimeFormat(language, {
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(toDate(value));
}

export function formatDateTime(value: Date | string | number, language = currentLanguage()) {
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(toDate(value));
}

export function formatTime(value: Date | string | number, language = currentLanguage()) {
  return new Intl.DateTimeFormat(language, { hour: '2-digit', minute: '2-digit' }).format(
    toDate(value),
  );
}

export function formatInteger(value: number, language = currentLanguage()) {
  return new Intl.NumberFormat(language, { maximumFractionDigits: 0 }).format(value);
}

export function formatPercent(value: number, language = currentLanguage()) {
  return new Intl.NumberFormat(language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
