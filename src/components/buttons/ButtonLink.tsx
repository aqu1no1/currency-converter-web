import { Link, type LinkProps } from 'react-router';

import {
  BUTTON_BASE,
  BUTTON_VARIANTS,
  type ButtonVariant,
} from '@components/buttons/button-variants';
import { cn } from '@utils/cn.util';

type ButtonLinkProps = LinkProps & {
  /** Aparência do link, igual às variantes do `Button`. */
  variant?: ButtonVariant;
};

/**
 * Link de navegação interna com a aparência do `Button`.
 *
 * @example
 * ```tsx
 * <ButtonLink to={ROUTES.converter}>{t('home.hero.convertNow')}</ButtonLink>
 * ```
 */
export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <Link className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], className)} {...props} />;
}
