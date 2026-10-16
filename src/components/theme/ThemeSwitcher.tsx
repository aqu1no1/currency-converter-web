import { useTranslation } from 'react-i18next';

import { Icon } from '@components/icon/Icon';
import type { IconName } from '@constants/icons';
import { THEME_SCHEMES, type ThemeScheme, useTheme } from '@theme/ThemeProvider';

const SCHEME_ICONS: Record<ThemeScheme, IconName> = {
  light: 'themeLight',
  dark: 'themeDark',
  system: 'appearance',
};

function nextScheme(scheme: ThemeScheme): ThemeScheme {
  return THEME_SCHEMES[(THEME_SCHEMES.indexOf(scheme) + 1) % THEME_SCHEMES.length]!;
}

/**
 * Botão único de tema no cabeçalho: mostra o ícone do tema atual (claro, escuro
 * ou automático) e, a cada clique, passa para o próximo.
 *
 * "Automático" segue o tema do sistema.
 *
 * @example
 * ```tsx
 * <ThemeSwitcher />
 * ```
 */
export function ThemeSwitcher() {
  const { t } = useTranslation();
  const { scheme, setScheme } = useTheme();
  const next = nextScheme(scheme);
  const label = t('nav.themeButton', {
    current: t(`nav.themes.${scheme}`),
    next: t(`nav.themes.${next}`),
  });

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setScheme(next)}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-chip border border-white/35 text-white transition-colors hover:bg-white/12"
    >
      <Icon name={SCHEME_ICONS[scheme]} size={20} />
    </button>
  );
}
