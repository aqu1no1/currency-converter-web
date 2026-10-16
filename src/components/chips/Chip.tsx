import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@utils/cn.util';

type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> & {
  /** Se o chip está selecionado; vira `aria-pressed`. */
  selected?: boolean;

  /** `square` para moedas-base, `pill` para atalhos como as conversões frequentes. */
  shape?: 'square' | 'pill';
};

const SHAPES = {
  square: 'min-w-16 rounded-chip px-3.5',
  pill: 'rounded-full px-4.5',
} as const;

/**
 * Botão pequeno de seleção, como as moedas-base da página de cotações.
 *
 * Selecionado fica verde (menta no tema escuro).
 *
 * @example
 * ```tsx
 * <Chip selected={base === 'BRL'} onClick={() => setBase('BRL')}>BRL</Chip>
 * ```
 */
export function Chip({ selected = false, shape = 'square', className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'min-h-11 border text-body-sm font-semibold transition-colors',
        SHAPES[shape],
        selected
          ? 'border-accent bg-accent text-white dark:border-mint dark:bg-mint dark:text-brand'
          : 'border-line-strong bg-surface text-title hover:bg-mint-soft',
        className,
      )}
      {...props}
    />
  );
}
