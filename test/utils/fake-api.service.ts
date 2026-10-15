import { type Mock, vi } from 'vitest';

import type { HttpClient } from '@interfaces/http-client.interface';

export type FakeApiService = {
  [Method in keyof HttpClient]: Mock<HttpClient[Method]>;
};

export function createFakeApiService(): FakeApiService {
  return {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };
}
