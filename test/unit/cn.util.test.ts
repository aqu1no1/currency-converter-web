import { cn } from '@utils/cn.util';
import { describe, expect, it } from 'vitest';

describe('cn', () => {
  it('joins class names and drops falsy values', () => {
    expect(cn('p-2', false, undefined, 'text-sm')).toBe('p-2 text-sm');
  });

  it('keeps the last conflicting Tailwind class', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});
