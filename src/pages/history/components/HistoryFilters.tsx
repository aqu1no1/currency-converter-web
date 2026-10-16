import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { SwapButton } from '@components/buttons/SwapButton';
import { CurrencySelect } from '@components/currency/CurrencySelect';
import { DISPLAY_CURRENCY_ORDER } from '@constants/currencies.constants';
import type { CurrencyCode } from '@enums/currency-code.enum';

type HistoryFiltersProps = {
  from: CurrencyCode;

  to: CurrencyCode;

  onFromChange: (code: CurrencyCode) => void;

  onToChange: (code: CurrencyCode) => void;

  onSwap: () => void;

  /** Seletor de período, mostrado à direita das moedas. */
  periodSelector: ReactNode;
};

/**
 * Filtros do histórico: moedas De e Para com o botão de inverter e o seletor de período.
 *
 * @example
 * ```tsx
 * <HistoryFilters from={from} to={to} onSwap={swap} periodSelector={<SegmentedControl ... />} ... />
 * ```
 */
export function HistoryFilters({
  from,
  to,
  onFromChange,
  onToChange,
  onSwap,
  periodSelector,
}: HistoryFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-[1_1_480px] flex-wrap items-end gap-3">
        <CurrencySelect
          label={t('history.from')}
          currencies={DISPLAY_CURRENCY_ORDER}
          value={from}
          onChange={onFromChange}
          className="flex-[1_1_180px]"
        />
        <SwapButton onSwap={onSwap} className="size-14" />
        <CurrencySelect
          label={t('history.to')}
          currencies={DISPLAY_CURRENCY_ORDER}
          value={to}
          onChange={onToChange}
          className="flex-[1_1_180px]"
        />
      </div>
      {periodSelector}
    </div>
  );
}
