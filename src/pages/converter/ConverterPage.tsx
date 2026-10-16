import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

import { QueryErrorState } from '@components/feedback/QueryErrorState';
import { Container } from '@components/layout/Container';
import { PageHeader } from '@components/layout/PageHeader';
import { CONVERTER_DEFAULTS } from '@constants/currencies.constants';
import { INPUT_DEBOUNCE_MS } from '@constants/time.constants';
import { useApi } from '@contexts/ApiProvider';
import type { CurrencyCode } from '@enums/currency-code.enum';
import { useConvert } from '@hooks/useConvert';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { usePageMeta } from '@hooks/usePageMeta';
import { ConverterCard } from '@pages/converter/components/ConverterCard';
import { ConverterNotes } from '@pages/converter/components/ConverterNotes';
import { FrequentConversions } from '@pages/converter/components/FrequentConversions';
import { ExchangeRateService } from '@services/exchange-rate.service';
import { parseAmount } from '@utils/amount.util';
import { toCurrencyCode } from '@utils/currency.util';
import { getErrorKind } from '@utils/error-state.util';
import { withParams } from '@utils/url.util';

export default function ConverterPage() {
  const { t } = useTranslation();
  usePageMeta(t('converter.title'), t('converter.description'));

  const api = useApi();
  const exchangeRateService = useMemo(() => new ExchangeRateService(api), [api]);

  const [searchParams, setSearchParams] = useSearchParams();
  const from = toCurrencyCode(searchParams.get('from'), CONVERTER_DEFAULTS.from);
  const to = toCurrencyCode(searchParams.get('to'), CONVERTER_DEFAULTS.to);
  const [amount, setAmount] = useState(
    () => searchParams.get('amount') ?? CONVERTER_DEFAULTS.amount,
  );

  const debouncedAmount = useDebouncedValue(amount, INPUT_DEBOUNCE_MS);
  const parsedAmount = parseAmount(debouncedAmount);
  const isInvalid = parseAmount(amount) === null;

  const conversion = useConvert(
    exchangeRateService,
    parsedAmount === null ? null : { from, to, amount: parsedAmount },
  );

  const updateParams = (changes: Record<string, string>) =>
    setSearchParams((current) => withParams(current, changes), { replace: true });

  const urlAmount = searchParams.get('amount');

  useEffect(() => {
    if (urlAmount === debouncedAmount) return;
    setSearchParams((current) => withParams(current, { amount: debouncedAmount }), {
      replace: true,
    });
  }, [debouncedAmount, urlAmount, setSearchParams]);

  const setPair = (nextFrom: CurrencyCode, nextTo: CurrencyCode) =>
    updateParams({ from: nextFrom, to: nextTo });

  const retry = () => void conversion.refetch();
  const failedWithoutData = conversion.isError && !conversion.data;
  const showErrorState = failedWithoutData && getErrorKind(conversion.error) !== 'unknown';

  return (
    <Container className="flex flex-col gap-8 py-14">
      <PageHeader title={t('converter.title')} description={t('converter.description')} />
      {showErrorState ? (
        <QueryErrorState error={conversion.error} onRetry={retry} />
      ) : (
        <>
          <ConverterCard
            amount={amount}
            from={from}
            to={to}
            onAmountChange={setAmount}
            onFromChange={(code) => setPair(code, to)}
            onToChange={(code) => setPair(from, code)}
            onSwap={() => setPair(to, from)}
            isInvalid={isInvalid}
            conversion={conversion.data}
            isPending={conversion.isPending}
            errorMessage={failedWithoutData ? conversion.error.message : undefined}
            onRetry={retry}
          />
          <FrequentConversions onPick={setPair} />
          <ConverterNotes />
        </>
      )}
    </Container>
  );
}
