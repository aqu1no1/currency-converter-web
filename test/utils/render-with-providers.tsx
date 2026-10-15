import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, type RenderHookOptions } from '@testing-library/react';
import type { ReactNode } from 'react';

import { ApiProvider } from '@contexts/ApiProvider';
import { createFakeApiService, type FakeApiService } from '@test/utils/fake-api.service';
import { createTestQueryClient } from '@test/utils/query-client';

type ProvidersOptions = {
  api?: FakeApiService;
};

/**
 * Renderiza um hook dentro do `QueryClientProvider` e do `ApiProvider`, com
 * uma API falsa no lugar do `ApiService`.
 */
export function renderHookWithProviders<Result, Props>(
  hook: (props: Props) => Result,
  {
    api = createFakeApiService(),
    ...options
  }: ProvidersOptions & Omit<RenderHookOptions<Props>, 'wrapper'> = {},
) {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ApiProvider api={api}>{children}</ApiProvider>
      </QueryClientProvider>
    );
  }

  return { api, queryClient, ...renderHook(hook, { wrapper: Wrapper, ...options }) };
}
