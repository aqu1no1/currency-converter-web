import { useTranslation } from 'react-i18next';

import { Chip } from '@components/chips/Chip';
import { FREQUENT_CONVERSIONS } from '@constants/currencies.constants';
import type { CurrencyCode } from '@enums/currency-code.enum';

type FrequentConversionsProps = {
  /** Preenche o par escolhido no conversor. */
  onPick: (from: CurrencyCode, to: CurrencyCode) => void;
};

/**
 * Atalhos "Conversões frequentes", como USD → BRL, que preenchem o par do conversor.
 *
 * @example
 * ```tsx
 * <FrequentConversions onPick={(from, to) => setPair(from, to)} />
 * ```
 */
export function FrequentConversions({ onPick }: FrequentConversionsProps) {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="frequent-conversions" className="flex flex-col gap-3.5">
      <h2 id="frequent-conversions" className="font-display text-2xl font-semibold text-title">
        {t('converter.frequent')}
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {FREQUENT_CONVERSIONS.map(([from, to]) => (
          <Chip key={`${from}-${to}`} shape="pill" onClick={() => onPick(from, to)}>
            {`${from} → ${to}`}
          </Chip>
        ))}
      </div>
    </section>
  );
}
