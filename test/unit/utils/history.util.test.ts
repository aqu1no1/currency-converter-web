import { describe, expect, it } from 'vitest';

import { historyRange, summarizeHistory, toHistoryPeriod } from '@utils/history.util';

describe('history.util', () => {
  it('builds the range of each period up to the reference day', () => {
    const reference = new Date('2026-09-28T12:00:00.000Z');

    expect(historyRange('7d', reference)).toEqual({ start: '2026-09-21', end: '2026-09-28' });
    expect(historyRange('30d', reference)).toEqual({ start: '2026-08-29', end: '2026-09-28' });
    expect(historyRange('1y', reference)).toEqual({ start: '2025-09-28', end: '2026-09-28' });
  });

  it('reads the period from the url with a fallback', () => {
    expect(toHistoryPeriod('7d', '30d')).toBe('7d');
    expect(toHistoryPeriod('2y', '30d')).toBe('30d');
    expect(toHistoryPeriod(null, '30d')).toBe('30d');
  });

  it('summarizes the first, last, lowest and highest rates and the change', () => {
    const summary = summarizeHistory([
      { date: '2026-09-01', rate: 5 },
      { date: '2026-09-02', rate: 4.8 },
      { date: '2026-09-03', rate: 5.6 },
      { date: '2026-09-04', rate: 5.5 },
    ]);

    expect(summary).toMatchObject({
      first: { date: '2026-09-01', rate: 5 },
      last: { date: '2026-09-04', rate: 5.5 },
      min: { date: '2026-09-02', rate: 4.8 },
      max: { date: '2026-09-03', rate: 5.6 },
    });
    expect(summary?.change).toBeCloseTo(10);
  });

  it('returns nothing for an empty history', () => {
    expect(summarizeHistory([])).toBeUndefined();
  });
});
