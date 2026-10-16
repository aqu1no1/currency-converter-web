import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import type { CurrencyCode } from '@enums/currency-code.enum';
import { cn } from '@utils/cn.util';

type CurrencySelectProps = {
  /** Rótulo visível acima do campo, como "De" ou "Para". */
  label: string;

  /** Moedas na ordem em que aparecem na lista. */
  currencies: readonly CurrencyCode[];

  value: CurrencyCode;

  onChange: (code: CurrencyCode) => void;

  className?: string;
};

/**
 * Select nativo de moeda, com o nome traduzido e o código: "Euro (EUR)".
 *
 * @example
 * ```tsx
 * <CurrencySelect label={t('converter.to')} currencies={DISPLAY_CURRENCY_ORDER} value={to} onChange={setTo} />
 * ```
 */
export function CurrencySelect({
  label,
  currencies,
  value,
  onChange,
  className,
}: CurrencySelectProps) {
  const { t } = useTranslation();
  const id = useId();

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as CurrencyCode)}
        className="h-14 rounded-control border border-line-strong bg-surface px-3.5 text-body-lg text-ink focus:border-accent focus:ring-4 focus:ring-focus focus:outline-none"
      >
        {currencies.map((code) => (
          <option key={code} value={code}>
            {`${t(`currencies.${code}`)} (${code})`}
          </option>
        ))}
      </select>
    </div>
  );
}
