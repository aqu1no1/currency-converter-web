import type { ButtonHTMLAttributes } from 'react';

import {
  BUTTON_BASE,
  BUTTON_VARIANTS,
  type ButtonVariant,
} from '@components/buttons/button-variants';
import { cn } from '@utils/cn.util';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Aparência do botão. `primary` é a ação principal da página. */
  variant?: ButtonVariant;
};

/**
 * Botão de 48px de altura nas variantes do design.
 *
 * No tema escuro o `primary` vira menta com texto verde da marca.
 *
 * @example
 * ```tsx
 * <Button onClick={refetch}>{t('common.retry')}</Button>
 * ```
 */
export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], className)}
      {...props}
    />
  );
}
