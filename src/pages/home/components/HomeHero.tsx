import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@components/buttons/ButtonLink';
import { ROUTES } from '@constants/routes.constants';
import { HeroSymbols } from '@pages/home/components/HeroSymbols';

type HomeHeroProps = {
  /** Card ao lado do texto ("Hoje em reais"). */
  card: ReactNode;

  /** Faixa de cotações na base do hero. */
  ticker: ReactNode;
};

/**
 * Hero verde da Home, continuação do cabeçalho: título, texto, botões e o card ao lado.
 *
 * @example
 * ```tsx
 * <HomeHero card={<TodayInReaisCard ... />} ticker={<RatesTicker ... />} />
 * ```
 */
export function HomeHero({ card, ticker }: HomeHeroProps) {
  const { t } = useTranslation();

  return (
    <div data-on-brand className="relative bg-brand">
      <HeroSymbols />
      <section
        aria-label={t('home.hero.label')}
        className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-14 px-8 pt-18 pb-24 tablet:grid-cols-2"
      >
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-5xl leading-none font-semibold tracking-tight text-white tablet:text-hero">
            {t('home.hero.title')}
          </h1>
          <p className="max-w-130 text-lg leading-relaxed text-on-brand">
            {t('home.hero.description')}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink to={ROUTES.converter} variant="onBrand">
              {t('home.hero.convertNow')}
            </ButtonLink>
            <ButtonLink to={ROUTES.rates} variant="onBrandGhost">
              {t('home.hero.seeRates')}
            </ButtonLink>
          </div>
        </div>
        <div className="relative flex justify-center">
          <svg
            aria-hidden="true"
            width="460"
            height="400"
            viewBox="0 0 460 400"
            fill="none"
            className="pointer-events-none absolute -top-12 left-1/2 hidden -translate-x-1/2 tablet:block"
          >
            <circle
              cx="185"
              cy="200"
              r="170"
              className="stroke-mint"
              strokeOpacity={0.22}
              strokeWidth={2}
            />
            <circle
              cx="275"
              cy="200"
              r="170"
              className="stroke-white"
              strokeOpacity={0.16}
              strokeWidth={2}
            />
          </svg>
          {card}
        </div>
      </section>
      {ticker}
    </div>
  );
}
