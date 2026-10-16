import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { STORAGE_KEYS } from '@constants/storage';

export type ThemeScheme = 'system' | 'light' | 'dark';

export const THEME_SCHEMES: readonly ThemeScheme[] = ['light', 'dark', 'system'];

const DARK_QUERY = '(prefers-color-scheme: dark)';

type ThemeContextValue = {
  dark: boolean;

  scheme: ThemeScheme;

  setScheme: (scheme: ThemeScheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeScheme(value: unknown): value is ThemeScheme {
  return THEME_SCHEMES.includes(value as ThemeScheme);
}

function readSavedScheme(): ThemeScheme {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    return isThemeScheme(saved) ? saved : 'system';
  } catch {
    return 'system';
  }
}

function saveScheme(scheme: ThemeScheme) {
  try {
    localStorage.setItem(STORAGE_KEYS.theme, scheme);
  } catch {
    return;
  }
}

function useSystemDark() {
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(DARK_QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return systemDark;
}

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * Tema claro/escuro do site.
 *
 * Aplica `data-theme` e `color-scheme` no `<html>`; as cores vêm das variáveis
 * CSS em `styles/index.css`. A escolha fica salva no `localStorage` e o script
 * do `index.html` aplica o tema antes do React carregar.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemDark = useSystemDark();
  const [scheme, setSchemeState] = useState<ThemeScheme>(readSavedScheme);

  const dark = scheme === 'system' ? systemDark : scheme === 'dark';

  useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    const root = document.documentElement;

    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    const browserBar = getComputedStyle(root).getPropertyValue('--browser-bar').trim();
    if (browserBar) {
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', browserBar);
    }
  }, [dark]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      dark,
      scheme,
      setScheme: (next) => {
        setSchemeState(next);
        saveScheme(next);
      },
    }),
    [dark, scheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme precisa estar dentro do ThemeProvider');
  }

  return context;
}
