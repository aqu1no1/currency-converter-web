import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@components/layout/Container';
import {
  DISPLAY_CURRENCY_ORDER,
  HOME_BASE_CURRENCY,
  HOME_TICKER_CURRENCIES,
  HOME_TODAY_CURRENCIES,
} from '@constants/currencies.constants';
import { useApi } from '@contexts/ApiProvider';
import { useCurrencies } from '@hooks/useCurrencies';
import { useLatestRates } from '@hooks/useLatestRates';
import { usePageMeta } from '@hooks/usePageMeta';
import { HomeFeatures } from '@pages/home/components/HomeFeatures';
import { HomeHero } from '@pages/home/components/HomeHero';
import { HomeSteps } from '@pages/home/components/HomeSteps';
import { RatesTicker } from '@pages/home/components/RatesTicker';
import { SupportedCurrencies } from '@pages/home/components/SupportedCurrencies';
import { TodayInReaisCard } from '@pages/home/components/TodayInReaisCard';
import { CurrencyService } from '@services/currency.service';
import { ExchangeRateService } from '@services/exchange-rate.service';
import { toSupportedCurrencies } from '@utils/currency.util';
import { valuesInBase } from '@utils/rate.util';

export default function HomePage() {
  const { t } = useTranslation();
  usePageMeta(t('home.title'), t('home.description'));

  const api = useApi();
  const exchangeRateService = useMemo(() => new ExchangeRateService(api), [api]);
  const currencyService = useMemo(() => new CurrencyService(api), [api]);

  const latest = useLatestRates(exchangeRateService, HOME_BASE_CURRENCY);
  const currencies = useCurrencies(currencyService);

  const rates = latest.data?.rates ?? {};
  const currencyCodes = currencies.data
    ? toSupportedCurrencies(currencies.data.map((currency) => currency.code))
    : DISPLAY_CURRENCY_ORDER;

  return (
    <>
      <HomeHero
        card={
          <TodayInReaisCard
            values={valuesInBase(rates, HOME_TODAY_CURRENCIES)}
            date={latest.data?.date}
            isPending={latest.isPending}
            isError={latest.isError}
            onRetry={() => void latest.refetch()}
          />
        }
        ticker={<RatesTicker values={valuesInBase(rates, HOME_TICKER_CURRENCIES)} />}
      />
      <Container>
        <HomeFeatures />
        <HomeSteps />
        <SupportedCurrencies codes={currencyCodes} />
      </Container>
    </>
  );
}
