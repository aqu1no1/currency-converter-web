import type { HTMLAttributes } from 'react';

import { cn } from '@utils/cn.util';

/**
 * Superfície branca (escura no tema escuro) com borda e cantos de card.
 *
 * @example
 * ```tsx
 * <Card aria-label={t('rates.table')}>...</Card>
 * ```
 */
export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn('rounded-list border border-line bg-surface text-ink', className)}
      {...props}
    />
  );
}
