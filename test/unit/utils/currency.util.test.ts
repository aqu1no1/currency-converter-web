import { describe, expect, it } from 'vitest';

import { toSupportedCurrencies } from '@utils/currency.util';

describe('currency.util', () => {
  it('keeps only supported codes, in the display order', () => {
    expect(toSupportedCurrencies(['BRL', 'XYZ', 'USD', 'ARS'])).toEqual(['USD', 'BRL', 'ARS']);
  });
});
