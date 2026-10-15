import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { STORAGE_KEYS } from '@constants/storage';
import { en } from '@locales/en';
import { es } from '@locales/es';
import { ptBR } from '@locales/pt-BR';

export const LANGUAGES = ['pt-BR', 'en', 'es'] as const;

export type Language = (typeof LANGUAGES)[number];

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}

export function resolveLanguage(languageTag?: string | null): Language {
  const languageCode = languageTag?.toLowerCase().split('-')[0];
  if (languageCode === 'en') return 'en';
  if (languageCode === 'es') return 'es';
  return 'pt-BR';
}

function readSavedLanguage(): Language | undefined {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.language);
    return isLanguage(saved) ? saved : undefined;
  } catch {
    return undefined;
  }
}

function saveLanguage(language: Language) {
  try {
    localStorage.setItem(STORAGE_KEYS.language, language);
  } catch {
    // Sem localStorage (modo privado ou bloqueado): a escolha vale só nesta visita.
  }
}

export function detectLanguage(): Language {
  return readSavedLanguage() ?? resolveLanguage(navigator.languages[0] ?? navigator.language);
}

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
});

void i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBR },
    en: { translation: en },
    es: { translation: es },
  },
  lng: detectLanguage(),
  fallbackLng: 'pt-BR',
  supportedLngs: LANGUAGES,
  initAsync: false,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export async function setLanguage(language: Language) {
  await i18n.changeLanguage(language);
  saveLanguage(language);
}

export function currentLanguage(): Language {
  return resolveLanguage(i18n.resolvedLanguage);
}

export { i18n };
