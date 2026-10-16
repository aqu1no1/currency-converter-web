import { describe, expect, it } from 'vitest';

import { formatDate, formatMoney, formatRate, formatUnitPrice } from '@utils/format.util';

const nbsp = /[  ]/g;

describe('format.util', () => {
  it('formats money in the given language', () => {
    expect(formatMoney(1234.5, 'BRL', 'pt-BR').replace(nbsp, ' ')).toBe('R$ 1.234,50');
    expect(formatMoney(1234.5, 'USD', 'en')).toBe('$1,234.50');
  });

  it('formats unit prices below 0.10 with 4 decimals', () => {
    expect(formatUnitPrice(5.19, 'BRL', 'pt-BR').replace(nbsp, ' ')).toBe('R$ 5,19');
    expect(formatUnitPrice(0.73, 'BRL', 'pt-BR').replace(nbsp, ' ')).toBe('R$ 0,73');
    expect(formatUnitPrice(0.0036, 'BRL', 'pt-BR').replace(nbsp, ' ')).toBe('R$ 0,0036');
  });

  it('formats rates with 4 digits', () => {
    expect(formatRate(5.38, 'pt-BR')).toBe('5,3800');
    expect(formatRate(0.188, 'en')).toBe('0.1880');
  });

  it('formats rates below 0.01 with 6 digits', () => {
    expect(formatRate(0.006543, 'en')).toBe('0.006543');
  });

  it('formats rate dates in UTC, so the day never shifts', () => {
    expect(formatDate('2026-09-28', 'pt-BR')).toBe('28/09/2026');
    expect(formatDate('2026-09-28', 'en')).toBe('09/28/2026');
  });
});
