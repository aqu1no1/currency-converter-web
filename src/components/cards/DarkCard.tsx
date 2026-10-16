import type { HTMLAttributes } from 'react';

import { cn } from '@utils/cn.util';

/**
 * Card de destaque no verde da marca, igual nos dois temas.
 *
 * @example
 * ```tsx
 * <DarkCard>...</DarkCard>
 * ```
 */
export function DarkCard({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      data-on-brand
      className={cn('rounded-card bg-brand p-6 text-on-brand', className)}
      {...props}
    />
  );
}
