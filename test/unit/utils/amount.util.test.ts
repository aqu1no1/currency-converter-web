import { describe, expect, it } from 'vitest';

import { parseAmount } from '@utils/amount.util';

describe('amount.util', () => {
  it.each([
    ['100', '100'],
    ['100,5', '100.5'],
    ['100.5', '100.5'],
    [' 0 ', '0'],
  ])('reads %s as %s', (text, expected) => {
    expect(parseAmount(text)).toBe(expected);
  });

  it.each(['', '-1', 'abc', '1.000,50', '1,'])('rejects %s', (text) => {
    expect(parseAmount(text)).toBeNull();
  });
});
