import { useTranslation } from 'react-i18next';

import markAnimatedOnDark from '@assets/svg/logo/animated/mark-animated-on-dark.svg';
import markAnimatedOnLight from '@assets/svg/logo/animated/mark-animated-on-light.svg';
import logoOnDark from '@assets/svg/logo/logo-on-dark.svg';
import logoOnLight from '@assets/svg/logo/logo-on-light.svg';
import markOnDark from '@assets/svg/logo/mark-on-dark.svg';
import markOnLight from '@assets/svg/logo/mark-on-light.svg';
import { useTheme } from '@theme/ThemeProvider';

const LOGOS = {
  full: { light: logoOnLight, dark: logoOnDark },
  mark: { light: markOnLight, dark: markOnDark },
  animatedMark: { light: markAnimatedOnLight, dark: markAnimatedOnDark },
} as const;

type LogoProps = {
  /** `full` com o nome, `mark` só o Trevo e `animatedMark` o Trevo animado (para com reduzir movimento). */
  variant?: keyof typeof LOGOS;

  /** Força o fundo escuro (ex.: cabeçalho verde), independente do tema. */
  onDark?: boolean;

  /** Quando o nome "Converter" já está ao lado, o logo fica sem texto alternativo. */
  decorative?: boolean;

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
export function Logo({ variant = 'full', onDark, decorative = false, className }: LogoProps) {
  const { t } = useTranslation();
  const { dark } = useTheme();
  const src = LOGOS[variant][(onDark ?? dark) ? 'dark' : 'light'];

  return <img src={src} alt={decorative ? '' : t('common.appName')} className={className} />;
}
