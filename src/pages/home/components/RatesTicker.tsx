import { HOME_BASE_CURRENCY } from '@constants/currencies.constants';
import type { ValueInBase } from '@utils/rate.util';
import { formatUnitPrice } from '@utils/format.util';

type RatesTickerProps = {
  /** Quanto 1 unidade de cada moeda vale em reais. */
  values: readonly ValueInBase[];
};

/**
 * Faixa com as cotações em reais rolando sem parar. Pausa com o mouse em cima
 * e fica parada com "reduzir movimento".
 *
 * A lista vai duplicada para o loop não ter emenda; a cópia fica escondida do leitor de tela.
 *
 * @example
 * ```tsx
 * <RatesTicker values={tickerValues} />
 * ```
 */
export function RatesTicker({ values }: RatesTickerProps) {
  if (values.length === 0) return null;

  const renderItems = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex">
      {values.map(({ code, value }) => (
        <li key={code} className="flex items-baseline gap-2.5 pr-14 text-body-sm whitespace-nowrap">
          <span className="font-semibold text-mint">{`1 ${code}`}</span>
          <span className="text-white tabular-nums">
            {formatUnitPrice(value, HOME_BASE_CURRENCY)}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group relative z-10 overflow-hidden border-t border-white/12 py-4.5">
      <div className="flex w-max animate-ticker group-hover:paused">
        {renderItems(false)}
        {renderItems(true)}
      </div>
    </div>
  );
}
