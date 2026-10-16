import { describe, expect, it } from 'vitest';

import { withParams } from '@utils/url.util';

describe('url.util', () => {
  it('sets the changed params and keeps the others', () => {
    const current = new URLSearchParams('amount=100&from=EUR');

    expect(withParams(current, { from: 'USD', to: 'BRL' }).toString()).toBe(
      'amount=100&from=USD&to=BRL',
    );
    expect(current.toString()).toBe('amount=100&from=EUR');
  });
});
