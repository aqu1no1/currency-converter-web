import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebouncedValue } from '@hooks/useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('updates only after the value stops changing for the delay', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: '1' },
    });

    rerender({ value: '10' });
    await act(async () => {
      vi.advanceTimersByTime(200);
    });
    rerender({ value: '100' });
    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('1');

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe('100');
  });
});
