type DateBadgeProps = {
  /** Texto pronto, como "Cotações de 28/09/2026". */
  children: string;
};

/**
 * Selo verde com a data dos dados, usado à direita do `PageHeader`.
 *
 * @example
 * ```tsx
 * <DateBadge>{t('rates.dateBadge', { date: formatDate(latest.date) })}</DateBadge>
 * ```
 */
export function DateBadge({ children }: DateBadgeProps) {
  return (
    <span className="rounded-full bg-success px-3 py-1.5 text-sm font-medium text-success-text">
      {children}
    </span>
  );
}
