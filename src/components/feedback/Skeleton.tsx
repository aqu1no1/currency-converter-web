import { cn } from '@utils/cn.util';

type SkeletonProps = {
  /** Tamanho e forma do bloco, em classes do Tailwind. */
  className?: string;
};

/**
 * Bloco pulsando no lugar do conteúdo enquanto ele carrega.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-6 w-24" />
 * ```
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('block animate-pulse rounded-lg bg-mint-soft', className)}
    />
  );
}
