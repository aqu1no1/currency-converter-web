import { describe, expect, it } from 'vitest';

import { ApiError } from '@interfaces/api-error.interface';
import { getErrorKind } from '@utils/error-state.util';

describe('error-state.util', () => {
  it.each([
    [new ApiError({ status: 503, message: 'sem cotações' }), 'notReady'],
    [new ApiError({ status: 0, message: 'rede', isNetwork: true }), 'unavailable'],
    [
      new ApiError({ status: 0, message: 'timeout', code: 'ECONNABORTED', isNetwork: true }),
      'unavailable',
    ],
    [new ApiError({ status: 500, message: 'erro' }), 'unavailable'],
    [new ApiError({ status: 400, message: 'moeda inválida' }), 'unknown'],
    [new Error('down'), 'unknown'],
  ] as const)('maps %o to %s', (error, expected) => {
    expect(getErrorKind(error)).toBe(expected);
  });
});
