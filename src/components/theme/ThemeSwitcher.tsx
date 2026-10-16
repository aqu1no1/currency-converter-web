import { useTranslation } from 'react-i18next';

import { Icon } from '@components/icon/Icon';
import type { IconName } from '@constants/icons';
import { THEME_SCHEMES, type ThemeScheme, useTheme } from '@theme/ThemeProvider';
import { cn } from '@utils/cn.util';

const SCHEME_ICONS: Record<ThemeScheme, IconName> = {
  light: 'themeLight',
  dark: 'themeDark',
  system: 'appearance',
};

/**
 * Botões para escolher o tema do site (claro, escuro ou automático).
 *
 * O tema ativo fica com `aria-pressed`. "Automático" segue o tema do sistema.
 *
 * @example
 * ```tsx
 * <ThemeSwitcher />
 * ```
 */
export function ThemeSwitcher() {
  const { t } = useTranslation();
  const { scheme: activeScheme, setScheme } = useTheme();

  return (
    <div role="group" aria-label={t('nav.theme')} className="flex gap-1">
      {THEME_SCHEMES.map((scheme) => {
        const isActive = scheme === activeScheme;
        const label = t(`nav.themes.${scheme}`);

        return (
          <button
            key={scheme}
            type="button"
            aria-label={label}
            title={label}
            aria-pressed={isActive}
            onClick={() => setScheme(scheme)}
            className={cn(
              'rounded-control p-1.5',
              isActive
                ? 'bg-brand text-white dark:bg-mint dark:text-brand'
                : 'text-muted hover:text-ink',
            )}
          >
            <Icon name={SCHEME_ICONS[scheme]} size={18} />
          </button>
        );
      })}
    </div>
  );
}
