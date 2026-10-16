import { describe, expect, it } from 'vitest';

import { invertRate, valuesInBase } from '@utils/rate.util';

describe('rate.util', () => {
  it('inverts a rate without floating point noise', () => {
    expect(invertRate(0.2)).toBe(5);
    expect(invertRate(0.16)).toBe(6.25);
  });

  it('returns the value of each currency in the base, skipping missing rates', () => {
    expect(valuesInBase({ USD: 0.2, EUR: 0.16 }, ['USD', 'GBP', 'EUR'])).toEqual([
      { code: 'USD', value: 5 },
      { code: 'EUR', value: 6.25 },
    ]);
  });
});
