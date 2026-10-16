import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { StatusBanner } from '@components/feedback/StatusBanner';
import { Skeleton } from '@components/feedback/Skeleton';
import { HOME_BASE_CURRENCY, HOME_TODAY_CURRENCIES } from '@constants/currencies.constants';
import { ROUTES } from '@constants/routes.constants';
import type { ValueInBase } from '@utils/rate.util';
import { formatDate, formatUnitPrice } from '@utils/format.util';

type TodayInReaisCardProps = {
  /** Quanto 1 unidade de cada moeda vale em reais. */
  values: readonly ValueInBase[];

  /** Data das cotações. */
  date?: string;

  isPending: boolean;

  isError: boolean;

  onRetry: () => void;
};

/**
 * Card "Hoje em reais" do hero: 1 USD, EUR, GBP e ARS em BRL com a data.
 *
 * Mostra `Skeleton` enquanto carrega e um aviso curto com "Tentar de novo" se a API falhar.
 *
 * @example
 * ```tsx
 * <TodayInReaisCard values={values} date={latest.data?.date} isPending={latest.isPending} isError={latest.isError} onRetry={latest.refetch} />
 * ```
 */
export function TodayInReaisCard({
  values,
  date,
  isPending,
  isError,
  onRetry,
}: TodayInReaisCardProps) {
  const { t } = useTranslation();

  const renderRows = () => {
    if (isPending) {
      return HOME_TODAY_CURRENCIES.map((code) => (
        <div key={code} className="flex items-center justify-between border-t border-divider py-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-6 w-20" />
        </div>
      ));
    }

    if (isError) {
      return (
        <StatusBanner
          message={t('home.today.error')}
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

    return values.map(({ code, value }) => (
      <div key={code} className="flex items-center justify-between border-t border-divider py-3">
        <span className="flex flex-col gap-0.5">
          <span className="font-semibold text-title">{`1 ${code}`}</span>
          <span className="text-sm text-muted">{t(`currencies.${code}`)}</span>
        </span>
        <span className="text-xl font-semibold tabular-nums">
          {formatUnitPrice(value, HOME_BASE_CURRENCY)}
        </span>
      </div>
    ));
  };

  return (
    <section
      aria-label={t('home.today.title')}
      className="relative flex w-full max-w-100 flex-col gap-1.5 rounded-list bg-surface px-7 py-6.5 text-ink"
    >
      <div className="flex items-baseline justify-between gap-3 pb-2.5">
        <h2 className="font-display text-2xl font-semibold text-title">{t('home.today.title')}</h2>
        {date ? <span className="text-sm text-muted">{formatDate(date)}</span> : null}
      </div>
      {renderRows()}
      <Link
        to={ROUTES.rates}
        className="mt-2 flex min-h-11 items-center self-start text-body-sm font-semibold text-accent-text underline underline-offset-2 hover:text-title"
      >
        {t('home.today.seeAll')}
      </Link>
    </section>
  );
}
