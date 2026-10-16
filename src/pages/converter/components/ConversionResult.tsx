import { useTranslation } from 'react-i18next';

import { DateBadge } from '@components/layout/DateBadge';
import type { ConvertDto } from '@dtos/convert.dto';
import type { CurrencyCode } from '@enums/currency-code.enum';
import { formatDate, formatMoney, formatRate } from '@utils/format.util';
import { invertRate } from '@utils/rate.util';

type ConversionResultProps = {
  /** Resposta do `GET /exchange-rates/convert`. */
  conversion: ConvertDto;
};

/**
 * Resultado da conversão: valor convertido em destaque, taxas direta e inversa e a data da cotação.
 *
 * @example
 * ```tsx
 * <ConversionResult conversion={conversion.data} />
 * ```
 */
export function ConversionResult({ conversion }: ConversionResultProps) {
  const { t } = useTranslation();
  const from = conversion.from as CurrencyCode;
  const to = conversion.to as CurrencyCode;

  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-t border-divider pt-6">
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-base text-muted">
          {t('converter.equals', { amount: formatMoney(conversion.amount, from) })}
        </span>
        <output
          aria-live="polite"
          className="font-display text-4xl leading-tight font-semibold break-all text-title tabular-nums sm:text-6xl"
        >
          {formatMoney(conversion.result, to)}
        </output>
      </div>
      <div className="flex flex-col items-start gap-2 tabular-nums">
        <span className="text-base text-ink">{`1 ${from} = ${formatRate(conversion.rate)} ${to}`}</span>
        <span className="text-base text-muted">
          {`1 ${to} = ${formatRate(invertRate(conversion.rate))} ${from}`}
        </span>
        <span className="mt-1">
          <DateBadge>{t('converter.dateBadge', { date: formatDate(conversion.date) })}</DateBadge>
        </span>
      </div>
    </div>
  );
}
