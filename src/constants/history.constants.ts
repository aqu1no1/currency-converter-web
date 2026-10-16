import { CurrencyCode } from '@enums/currency-code.enum';

export const HISTORY_PERIODS = ['7d', '30d', '1y'] as const;

export type HistoryPeriod = (typeof HISTORY_PERIODS)[number];

export const HISTORY_PERIOD_DAYS: Record<HistoryPeriod, number> = {
  '7d': 7,
  '30d': 30,
  '1y': 365,
};

export const HISTORY_DEFAULTS = {
  from: CurrencyCode.USD,
  to: CurrencyCode.BRL,
  period: '30d',
} as const satisfies { from: CurrencyCode; to: CurrencyCode; period: HistoryPeriod };

export const HISTORY_START_DATE = '2000-01-01';
