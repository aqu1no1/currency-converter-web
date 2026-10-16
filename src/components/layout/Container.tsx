import type { HTMLAttributes } from 'react';

import { cn } from '@utils/cn.util';

/**
 * Faixa central do site: largura máxima de 1120px e margem lateral de 32px.
 *
 * @example
 * ```tsx
 * <Container className="py-14">...</Container>
 * ```
 */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-content px-8', className)} {...props} />;
}
