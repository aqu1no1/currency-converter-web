import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useLatestRates } from '@hooks/useLatestRates';
import { latestRatesFixture } from '@test/fixtures/api.fixtures';
import { createFakeApiService } from '@test/utils/fake-api.service';
import { renderHookWithProviders } from '@test/utils/render-with-providers';

describe('useLatestRates', () => {
  it('returns the latest rates of the base currency', async () => {
    const api = createFakeApiService();
    api.get.mockResolvedValueOnce(latestRatesFixture);

    const { result } = renderHookWithProviders(() => useLatestRates('BRL'), { api });

    await waitFor(() => expect(result.current.data).toEqual(latestRatesFixture));
    expect(api.get).toHaveBeenCalledWith('/exchange-rates/latest/BRL', {
      signal: expect.any(AbortSignal),
    });
  });

  it('cancels the previous request when the base changes before the response', async () => {
    const api = createFakeApiService();
    const signals: AbortSignal[] = [];
    api.get.mockImplementation(
      (url, options) =>
        new Promise((resolve) => {
          signals.push(options!.signal!);
          if (url.endsWith('/USD')) resolve({ ...latestRatesFixture, base: 'USD' });
        }),
    );

    const { result, rerender } = renderHookWithProviders(
      ({ base }: { base: string }) => useLatestRates(base),
      { api, initialProps: { base: 'BRL' } },
    );
    await waitFor(() => expect(signals).toHaveLength(1));

    rerender({ base: 'USD' });

    await waitFor(() => expect(result.current.data?.base).toBe('USD'));
    expect(signals[0]!.aborted).toBe(true);
    expect(signals[1]!.aborted).toBe(false);
  });
});
