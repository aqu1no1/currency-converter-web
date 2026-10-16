import { useTranslation } from 'react-i18next';

import logoOnDark from '@assets/svg/logo/logo-on-dark.svg';
import logoOnLight from '@assets/svg/logo/logo-on-light.svg';
import markOnDark from '@assets/svg/logo/mark-on-dark.svg';
import markOnLight from '@assets/svg/logo/mark-on-light.svg';
import { useTheme } from '@theme/ThemeProvider';

const LOGOS = {
  full: { light: logoOnLight, dark: logoOnDark },
  mark: { light: markOnLight, dark: markOnDark },
} as const;

type LogoProps = {
  variant?: keyof typeof LOGOS;

  /** Força o fundo escuro (ex.: cabeçalho verde), independente do tema. */
  onDark?: boolean;

  className?: string;
};

/**
 * Logo do Converter na versão certa para o fundo: no escuro, o par
 * esquerda/baixo do Trevo fica branco.
 *
 * @example
 * ```tsx
 * <Logo variant="mark" className="size-8" />
 * ```
 */
export function Logo({ variant = 'full', onDark, className }: LogoProps) {
  const { t } = useTranslation();
  const { dark } = useTheme();
  const src = LOGOS[variant][(onDark ?? dark) ? 'dark' : 'light'];

  return <img src={src} alt={t('common.appName')} className={className} />;
}
