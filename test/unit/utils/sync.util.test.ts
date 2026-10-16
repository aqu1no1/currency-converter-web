import { describe, expect, it } from 'vitest';

import { formatDuration, getRunDurationSeconds } from '@utils/sync.util';

describe('sync.util', () => {
  it('measures the run duration in seconds', () => {
    expect(
      getRunDurationSeconds({
        startedAt: '2026-09-29T09:00:00.000Z',
        finishedAt: '2026-09-29T09:00:02.400Z',
      }),
    ).toBe(2);
  });

  it('has no duration while the run is still going', () => {
    expect(
      getRunDurationSeconds({ startedAt: '2026-09-29T09:00:00.000Z', finishedAt: null }),
    ).toBeNull();
  });

  it('formats short runs in seconds and long runs in minutes', () => {
    expect(formatDuration(2)).toBe('2 s');
    expect(formatDuration(150)).toBe('3 min');
  });
});
