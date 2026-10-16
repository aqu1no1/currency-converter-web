import { describe, expect, it } from 'vitest';

import { toCurrencyCode, toSupportedCurrencies } from '@utils/currency.util';

describe('currency.util', () => {
  it('keeps only supported codes, in the display order', () => {
    expect(toSupportedCurrencies(['BRL', 'XYZ', 'USD', 'ARS'])).toEqual(['USD', 'BRL', 'ARS']);
  });

  it.each([
    ['EUR', 'EUR'],
    ['eur', 'EUR'],
    ['XYZ', 'USD'],
    [null, 'USD'],
  ] as const)('reads %s as %s', (value, expected) => {
    expect(toCurrencyCode(value, 'USD')).toBe(expected);
  });
});
