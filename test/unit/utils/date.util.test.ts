import { describe, expect, it } from 'vitest';

import { utcDateAtOffset } from '@utils/date.util';

describe('date.util', () => {
  it('returns the UTC date some days away from the reference', () => {
    const reference = new Date('2026-09-28T12:00:00.000Z');

    expect(utcDateAtOffset(0, reference)).toBe('2026-09-28');
    expect(utcDateAtOffset(-30, reference)).toBe('2026-08-29');
    expect(utcDateAtOffset(5, reference)).toBe('2026-10-03');
  });
});
