import type { CurrencyCode } from '@enums/currency-code.enum';
import { cn } from '@utils/cn.util';

type CurrencyBadgeProps = {
  code: CurrencyCode;

  className?: string;
};

/**
 * Código da moeda em pílula, como nas tabelas e na grade de moedas.
 *
 * @example
 * ```tsx
 * <CurrencyBadge code="USD" />
 * ```
 */
export function CurrencyBadge({ code, className }: CurrencyBadgeProps) {
  return (
    <span
      className={cn(
        'rounded-lg bg-surface-alt px-2 py-1 font-semibold text-title dark:bg-mint-soft',
        className,
      )}
    >
      {code}
    </span>
  );
}
