import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { usePageMeta } from '@hooks/usePageMeta';

describe('usePageMeta', () => {
  it('sets the title and the meta description', () => {
    const meta = document.createElement('meta');
    meta.name = 'description';
    document.head.append(meta);

    renderHook(() => usePageMeta('Histórico', 'Como a cotação variou.'));

    expect(document.title).toBe('Histórico · Converter');
    expect(meta).toHaveAttribute('content', 'Como a cotação variou.');
    meta.remove();
  });
});
