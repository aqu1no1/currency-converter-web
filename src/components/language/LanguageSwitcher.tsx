import { useTranslation } from 'react-i18next';

import { currentLanguage, type Language, LANGUAGES, setLanguage } from '@lib/i18n';

const SHORT_LABELS: Record<Language, string> = {
  'pt-BR': 'PT',
  en: 'EN',
  es: 'ES',
};

function nextLanguage(language: Language): Language {
  return LANGUAGES[(LANGUAGES.indexOf(language) + 1) % LANGUAGES.length]!;
}

/**
 * Botão único de idioma no cabeçalho: mostra a sigla do idioma atual (PT, EN, ES)
 * e, a cada clique, passa para o próximo.
 *
 * A troca vale na hora para textos, números e datas e fica salva para a próxima visita.
 *
 * @example
 * ```tsx
 * <LanguageSwitcher />
 * ```
 */
export function LanguageSwitcher() {
  const { t } = useTranslation();
  const language = currentLanguage();
  const next = nextLanguage(language);
  const label = t('nav.languageButton', {
    current: t(`nav.languages.${language}`),
    next: t(`nav.languages.${next}`),
  });

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => void setLanguage(next)}
      className="min-h-11 min-w-11 rounded-chip border border-white/35 text-sm font-semibold text-white transition-colors hover:bg-white/12"
    >
      {SHORT_LABELS[language]}
    </button>
  );
}
