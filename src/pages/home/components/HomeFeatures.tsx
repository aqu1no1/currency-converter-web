import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Icon } from '@components/icon/Icon';
import { HOME_FEATURES } from '@constants/home.constants';

/**
 * Seção "O que dá para fazer": uma linha-link para cada página principal.
 *
 * @example
 * ```tsx
 * <HomeFeatures />
 * ```
 */
export function HomeFeatures() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-7 pt-20 pb-6">
      <h2 className="font-display text-section-title leading-tight font-semibold text-title">
        {t('home.features.title')}
      </h2>
      <div className="flex flex-col border-t border-line-strong">
        {HOME_FEATURES.map((feature) => (
          <Link
            key={feature.key}
            to={feature.route}
            className="group -mx-4 grid grid-cols-1 items-center gap-2 border-b border-line-strong px-4 py-6.5 transition-colors hover:bg-surface/65 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto] tablet:gap-6"
          >
            <span className="font-display text-2xl font-semibold text-title">
              {t(`home.features.${feature.key}.title`)}
            </span>
            <span className="text-base leading-normal text-muted">
              {t(`home.features.${feature.key}.description`)}
            </span>
            <Icon
              name="arrowRight"
              size={28}
              className="hidden text-accent transition-transform group-hover:translate-x-1.5 tablet:block"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
