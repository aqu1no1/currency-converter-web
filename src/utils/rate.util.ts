import Decimal from 'decimal.js';

import type { CurrencyCode } from '@enums/currency-code.enum';

export type ValueInBase = {
  code: CurrencyCode;
  value: number;
};

export function invertRate(rate: number) {
  return new Decimal(1).div(rate).toNumber();
}

export function valuesInBase(
  rates: Partial<Record<string, number>>,
  codes: readonly CurrencyCode[],
): ValueInBase[] {
  return codes.flatMap((code) => {
    const rate = rates[code];
    return rate ? [{ code, value: invertRate(rate) }] : [];
  });
}
