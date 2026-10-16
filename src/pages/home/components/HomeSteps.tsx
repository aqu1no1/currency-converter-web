import { useTranslation } from 'react-i18next';

import { HOME_STEPS } from '@constants/home.constants';

/**
 * Seção "Como as cotações chegam até aqui": três passos numerados.
 *
 * @example
 * ```tsx
 * <HomeSteps />
 * ```
 */
export function HomeSteps() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-7 pt-18 pb-6">
      <h2 className="font-display text-section-title leading-tight font-semibold text-title">
        {t('home.steps.title')}
      </h2>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
        {HOME_STEPS.map((step, index) => (
          <li key={step} className="flex flex-col gap-3">
            <span
              aria-hidden="true"
              className="flex size-12 items-center justify-center rounded-full bg-brand font-display text-2xl font-semibold text-mint"
            >
              {index + 1}
            </span>
            <h3 className="text-xl font-semibold text-ink">{t(`home.steps.${step}.title`)}</h3>
            <p className="text-base leading-relaxed text-muted">
              {t(`home.steps.${step}.description`)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
