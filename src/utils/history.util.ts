import {
  HISTORY_PERIOD_DAYS,
  HISTORY_PERIODS,
  type HistoryPeriod,
} from '@constants/history.constants';
import type { HistoryItemDto } from '@dtos/history.dto';
import { utcDateAtOffset } from '@utils/date.util';

export type HistorySummary = {
  first: HistoryItemDto;
  last: HistoryItemDto;
  min: HistoryItemDto;
  max: HistoryItemDto;
  change: number;
};

export function toHistoryPeriod(value: string | null, fallback: HistoryPeriod): HistoryPeriod {
  return HISTORY_PERIODS.find((period) => period === value) ?? fallback;
}

export function historyRange(period: HistoryPeriod, referenceDate = new Date()) {
  return {
    start: utcDateAtOffset(-HISTORY_PERIOD_DAYS[period], referenceDate),
    end: utcDateAtOffset(0, referenceDate),
  };
}

export function summarizeHistory(history: readonly HistoryItemDto[]): HistorySummary | undefined {
  const first = history[0];
  const last = history.at(-1);
  if (!first || !last) return undefined;

  const min = history.reduce((lowest, point) => (point.rate < lowest.rate ? point : lowest));
  const max = history.reduce((highest, point) => (point.rate > highest.rate ? point : highest));

  return { first, last, min, max, change: (last.rate / first.rate - 1) * 100 };
}
