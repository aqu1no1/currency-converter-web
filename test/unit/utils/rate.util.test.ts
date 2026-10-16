import { describe, expect, it } from 'vitest';

import { invertRate, ratesTable, valuesInBase } from '@utils/rate.util';

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

  it('builds the rates table without the base and without missing rates', () => {
    expect(ratesTable({ USD: 1, BRL: 5, EUR: 0.8 }, 'USD', ['USD', 'EUR', 'BRL', 'GBP'])).toEqual([
      { code: 'EUR', rate: 0.8, inverse: 1.25 },
      { code: 'BRL', rate: 5, inverse: 0.2 },
    ]);
  });
});
