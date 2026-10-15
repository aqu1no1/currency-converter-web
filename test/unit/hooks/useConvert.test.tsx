import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ConvertParams } from '@dtos/convert.dto';
import { useConvert } from '@hooks/useConvert';
import { convertFixture } from '@test/fixtures/api.fixtures';
import { createFakeApiService } from '@test/utils/fake-api.service';
import { renderHookWithProviders } from '@test/utils/render-with-providers';

const params: ConvertParams = { from: 'EUR', to: 'BRL', amount: '100' };

describe('useConvert', () => {
  it('converts the amount with the api', async () => {
    const api = createFakeApiService();
    api.get.mockResolvedValueOnce(convertFixture);

    const { result } = renderHookWithProviders(() => useConvert(params), { api });

    await waitFor(() => expect(result.current.data?.result).toBe(589.13));
    expect(api.get).toHaveBeenCalledWith('/exchange-rates/convert', {
      params,
      signal: expect.any(AbortSignal),
    });
  });

  it('cancels the previous request when the amount changes before the response', async () => {
    const api = createFakeApiService();
    const signals: AbortSignal[] = [];
    api.get.mockImplementation(
      (_url, options) =>
        new Promise((resolve) => {
          signals.push(options!.signal!);
          if (options?.params?.amount === '200') resolve({ ...convertFixture, amount: 200 });
        }),
    );

    const { result, rerender } = renderHookWithProviders(
      (props: ConvertParams) => useConvert(props),
      { api, initialProps: params },
    );
    await waitFor(() => expect(signals).toHaveLength(1));

    rerender({ ...params, amount: '200' });

    await waitFor(() => expect(result.current.data?.amount).toBe(200));
    expect(signals[0]!.aborted).toBe(true);
  });
});
