import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { STORAGE_KEYS } from '@constants/storage';
import { setSystemDark } from '@test/utils/match-media';
import { ThemeProvider, useTheme } from '@theme/ThemeProvider';

function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

const html = document.documentElement;

describe('ThemeProvider', () => {
  it('follows the system theme by default', () => {
    setSystemDark(true);
    const { result } = renderHook(useTheme, { wrapper });

    expect(result.current.scheme).toBe('system');
    expect(result.current.dark).toBe(true);
    expect(html.dataset.theme).toBe('dark');
    expect(html.style.colorScheme).toBe('dark');
  });

  it('switches when the system theme changes and the scheme is system', async () => {
    const { result } = renderHook(useTheme, { wrapper });
    expect(html.dataset.theme).toBe('light');

    await act(() => setSystemDark(true));

    expect(result.current.dark).toBe(true);
    expect(html.dataset.theme).toBe('dark');
  });

  it('keeps light or dark regardless of the system theme', async () => {
    const { result } = renderHook(useTheme, { wrapper });

    await act(() => result.current.setScheme('dark'));
    await act(() => setSystemDark(false));
    expect(html.dataset.theme).toBe('dark');

    await act(() => result.current.setScheme('light'));
    await act(() => setSystemDark(true));
    expect(result.current.dark).toBe(false);
    expect(html.dataset.theme).toBe('light');
  });

  it('saves the choice and restores it on the next visit', async () => {
    const { result, unmount } = renderHook(useTheme, { wrapper });
    await act(() => result.current.setScheme('dark'));
    unmount();

    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('dark');
    expect(renderHook(useTheme, { wrapper }).result.current.scheme).toBe('dark');
  });

  it('ignores an invalid saved value', () => {
    localStorage.setItem(STORAGE_KEYS.theme, 'sepia');

    expect(renderHook(useTheme, { wrapper }).result.current.scheme).toBe('system');
  });

  it('throws when used outside the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => renderHook(useTheme)).toThrow('useTheme precisa estar dentro do ThemeProvider');
  });
});
