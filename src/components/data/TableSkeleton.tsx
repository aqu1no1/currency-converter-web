import { Skeleton } from '@components/feedback/Skeleton';

type TableSkeletonProps = {
  rows?: number;
};

/**
 * Linhas pulsando no lugar da tabela enquanto os dados carregam.
 *
 * @example
 * ```tsx
 * <DataTable progressComponent={<TableSkeleton />} ... />
 * ```
 */
export function TableSkeleton({ rows = 5 }: TableSkeletonProps) {
  return (
    <div aria-hidden="true" className="flex w-full flex-col gap-3 px-7 py-4">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  );
}
