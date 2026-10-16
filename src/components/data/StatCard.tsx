import type { ReactNode } from 'react';

import { Card } from '@components/cards/Card';
import { cn } from '@utils/cn.util';

type StatCardProps = {
  /** Rótulo pequeno no topo, como "Cotações disponíveis até". */
  label: string;

  /** Valor em destaque, como uma data. */
  value: ReactNode;

  /** Texto de apoio abaixo do valor. */
  description?: ReactNode;

  /** Conteúdo entre o rótulo e o valor, como um `StatusBadge`. */
  children?: ReactNode;

  /** Classes extras do valor, como um tamanho menor para data e hora. */
  valueClassName?: string;
};

/**
 * Card de indicador da página de status: rótulo, valor e explicação.
 *
 * @example
 * ```tsx
 * <StatCard label={t('status.availableUntil')} value={formatDate(date)} description={t('status.delay')} />
 * ```
 */
export function StatCard({ label, value, description, children, valueClassName }: StatCardProps) {
  return (
    <Card aria-label={label} className="flex flex-col gap-2.5 p-6">
      <span className="text-sm text-muted">{label}</span>
      {children}
      <span
        className={cn(
          'font-display text-3xl leading-tight font-semibold text-title',
          valueClassName,
        )}
      >
        {value}
      </span>
      {description ? <span className="text-body-sm text-muted">{description}</span> : null}
    </Card>
  );
}
