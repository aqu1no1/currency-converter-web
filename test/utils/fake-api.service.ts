import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { type Mock, vi } from 'vitest';

type FakeResponse = Promise<{ data: unknown }>;

type FakeGet = Mock<(url: string, config?: AxiosRequestConfig) => FakeResponse>;

type FakeBodyMethod = Mock<
  (url: string, body?: unknown, config?: AxiosRequestConfig) => FakeResponse
>;

export type FakeApiService = AxiosInstance & {
  get: FakeGet;
  delete: FakeGet;
  post: FakeBodyMethod;
  patch: FakeBodyMethod;
  put: FakeBodyMethod;
};

export function createFakeApiService(): FakeApiService {
  return {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  } as unknown as FakeApiService;
}

export function respondByUrl(api: FakeApiService, responses: Record<string, unknown>) {
  api.get.mockImplementation((url) => {
    if (!(url in responses)) return Promise.reject(new Error(`Unexpected GET ${url}`));
    const response = responses[url];
    return response instanceof Error
      ? Promise.reject(response)
      : Promise.resolve({ data: response });
  });
}
