import { useTranslation } from 'react-i18next';

import { currentLanguage, type Language, LANGUAGES, setLanguage } from '@lib/i18n';
import { cn } from '@utils/cn.util';

const SHORT_LABELS: Record<Language, string> = {
  'pt-BR': 'PT',
  en: 'EN',
  es: 'ES',
};

/**
 * Botões para trocar o idioma do site (PT / EN / ES).
 *
 * O idioma ativo fica com `aria-pressed`. A troca vale na hora para todos os
 * textos, números e datas e fica salva para a próxima visita.
 *
 * @example
 * ```tsx
 * <LanguageSwitcher />
 * ```
 */
export function LanguageSwitcher() {
  const { t } = useTranslation();
  const activeLanguage = currentLanguage();

  return (
    <div role="group" aria-label={t('nav.language')} className="flex gap-1">
      {LANGUAGES.map((language) => {
        const isActive = language === activeLanguage;

        return (
          <button
            key={language}
            type="button"
            lang={language}
            title={t(`nav.languages.${language}`)}
            aria-pressed={isActive}
            onClick={() => void setLanguage(language)}
            className={cn(
              'rounded-md px-2 py-1 text-sm font-semibold',
              isActive ? 'bg-black text-white' : 'opacity-70 hover:opacity-100',
            )}
          >
            {SHORT_LABELS[language]}
          </button>
        );
      })}
    </div>
  );
}
