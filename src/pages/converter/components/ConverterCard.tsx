import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { SwapButton } from '@components/buttons/SwapButton';
import { Card } from '@components/cards/Card';
import { CurrencySelect } from '@components/currency/CurrencySelect';
import { Skeleton } from '@components/feedback/Skeleton';
import { StatusBanner } from '@components/feedback/StatusBanner';
import { DISPLAY_CURRENCY_ORDER } from '@constants/currencies.constants';
import type { ConvertDto } from '@dtos/convert.dto';
import type { CurrencyCode } from '@enums/currency-code.enum';
import { ConversionResult } from '@pages/converter/components/ConversionResult';

type ConverterCardProps = {
  /** Texto do campo "Valor", do jeito que a pessoa digitou. */
  amount: string;

  from: CurrencyCode;

  to: CurrencyCode;

  onAmountChange: (amount: string) => void;

  onFromChange: (code: CurrencyCode) => void;

  onToChange: (code: CurrencyCode) => void;

  onSwap: () => void;

  /** Se o valor digitado não é um número maior ou igual a zero. */
  isInvalid: boolean;

  conversion?: ConvertDto;

  isPending: boolean;

  /** Mensagem da API quando a conversão falhou, como uma moeda não suportada. */
  errorMessage?: string;

  onRetry: () => void;
};

/**
 * Card do conversor: campo de valor, moedas "De" e "Para" com o botão de inverter e o resultado.
 *
 * Abaixo dos campos mostra o erro de validação, o aviso com a mensagem da API ou o resultado.
 *
 * @example
 * ```tsx
 * <ConverterCard amount={amount} from={from} to={to} conversion={conversion.data} ... />
 * ```
 */
export function ConverterCard({
  amount,
  from,
  to,
  onAmountChange,
  onFromChange,
  onToChange,
  onSwap,
  isInvalid,
  conversion,
  isPending,
  errorMessage,
  onRetry,
}: ConverterCardProps) {
  const { t } = useTranslation();
  const amountId = useId();
  const errorId = useId();

  const renderResult = () => {
    if (isInvalid) {
      return (
        <p id={errorId} role="alert" className="border-t border-divider pt-6 text-warning-text">
          {t('converter.invalidAmount')}
        </p>
      );
    }

    if (errorMessage && !conversion) {
      return (
        <StatusBanner
          message={errorMessage}
          action={
            <button
              type="button"
              onClick={onRetry}
              className="min-h-11 font-semibold underline underline-offset-4"
            >
              {t('common.retry')}
            </button>
          }
        />
      );
    }

    if (isPending || !conversion) {
      return (
        <div className="flex flex-col gap-3 border-t border-divider pt-6">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-14 w-64" />
        </div>
      );
    }

    return <ConversionResult conversion={conversion} />;
  };

  return (
    <Card aria-label={t('converter.label')} className="flex flex-col gap-7 p-6 sm:p-8">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-[1_1_200px] flex-col gap-2">
          <label htmlFor={amountId} className="text-sm font-medium text-muted">
            {t('converter.amount')}
          </label>
          <input
            id={amountId}
            inputMode="decimal"
            autoComplete="off"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? errorId : undefined}
            className="h-14 w-full min-w-0 rounded-control border border-line-strong bg-surface px-4 text-xl text-ink tabular-nums focus:border-accent focus:ring-4 focus:ring-focus focus:outline-none"
          />
        </div>
        <CurrencySelect
          label={t('converter.from')}
          currencies={DISPLAY_CURRENCY_ORDER}
          value={from}
          onChange={onFromChange}
          className="flex-[1_1_220px]"
        />
        <SwapButton onSwap={onSwap} className="size-14" />
        <CurrencySelect
          label={t('converter.to')}
          currencies={DISPLAY_CURRENCY_ORDER}
          value={to}
          onChange={onToChange}
          className="flex-[1_1_220px]"
        />
      </div>
      {renderResult()}
    </Card>
  );
}
