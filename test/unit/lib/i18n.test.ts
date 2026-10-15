import { afterEach, describe, expect, it, vi } from 'vitest';

import { STORAGE_KEYS } from '@constants/storage';
import { detectLanguage, i18n, resolveLanguage, setLanguage } from '@lib/i18n';

describe('i18n', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    ['en', 'en'],
    ['en-US', 'en'],
    ['es-AR', 'es'],
    ['pt', 'pt-BR'],
    ['fr', 'pt-BR'],
    [undefined, 'pt-BR'],
  ] as const)('resolves %s to %s', (languageTag, expected) => {
    expect(resolveLanguage(languageTag)).toBe(expected);
  });

  it('prefers the saved language over the browser language', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-US']);
    localStorage.setItem(STORAGE_KEYS.language, 'es');

    expect(detectLanguage()).toBe('es');
  });

  it('uses the browser language when nothing is saved', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-US']);

    expect(detectLanguage()).toBe('en');
  });

  it('falls back to pt-BR for unsupported browser languages', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['fr-FR']);

    expect(detectLanguage()).toBe('pt-BR');
  });

  it('changes, saves the language and updates <html lang>', async () => {
    await setLanguage('en');

    expect(i18n.resolvedLanguage).toBe('en');
    expect(localStorage.getItem(STORAGE_KEYS.language)).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
