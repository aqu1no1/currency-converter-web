import { QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, type RenderHookOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { ApiProvider } from '@contexts/ApiProvider';
import { createFakeApiService, type FakeApiService } from '@test/utils/fake-api.service';
import { createTestQueryClient } from '@test/utils/query-client';
import { ThemeProvider } from '@theme/ThemeProvider';

type ProvidersOptions = {
  api?: FakeApiService;
};

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

type RenderOptions = ProvidersOptions & {
  route?: string;
};

export function renderWithProviders(
  ui: ReactElement,
  { api = createFakeApiService(), route = '/' }: RenderOptions = {},
) {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ApiProvider api={api}>
          <ThemeProvider>
            <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
          </ThemeProvider>
        </ApiProvider>
      </QueryClientProvider>
    );
  }

  return { api, queryClient, ...render(ui, { wrapper: Wrapper }) };
}
