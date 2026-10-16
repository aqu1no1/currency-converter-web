import { useTranslation } from 'react-i18next';

import { CurrencyBadge } from '@components/currency/CurrencyBadge';
import type { CurrencyCode } from '@enums/currency-code.enum';

type SupportedCurrenciesProps = {
  /** Códigos das moedas; enquanto a API não responde, a página passa a lista fixa das 10 moedas. */
  codes: readonly CurrencyCode[];
};

/**
 * Seção "Moedas suportadas": grade com o código e o nome traduzido de cada moeda.
 *
 * @example
 * ```tsx
 * <SupportedCurrencies codes={codes} />
 * ```
 */
export function SupportedCurrencies({ codes }: SupportedCurrenciesProps) {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-7 pt-18 pb-22">
      <h2 className="font-display text-section-title leading-tight font-semibold text-title">
        {t('home.currencies.title')}
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3">
        {codes.map((code) => (
          <li
            key={code}
            className="flex items-center gap-3 rounded-control border border-line bg-surface px-4 py-3.5 transition hover:-translate-y-0.5"
          >
            <CurrencyBadge code={code} className="text-body-sm" />
            <span className="text-body-sm text-ink">{t(`currencies.${code}`)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
