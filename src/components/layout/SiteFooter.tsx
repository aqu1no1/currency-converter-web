import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Logo } from '@components/logo/Logo';
import {
  EXTERNAL_LINKS,
  FOOTER_LINKS,
  FOOTER_SYSTEM_LINKS,
  type NavLinkItem,
  ROUTES,
} from '@constants/routes.constants';
import { formatDate } from '@utils/format.util';

const LINK_CLASS =
  'flex min-h-11 items-center text-body-sm text-on-brand hover:text-white hover:underline hover:underline-offset-4';

type SiteFooterProps = {
  /** Data das cotações mais recentes (`GET /sync/status`); sem ela, a linha da data some. */
  latestRateDate?: string | null;
};

/**
 * Rodapé verde: aviso de taxas de referência, links de navegação e do sistema
 * e a data dos dados mais recentes.
 *
 * @example
 * ```tsx
 * <SiteFooter latestRateDate={syncStatus.data?.latestRateDate} />
 * ```
 */
export function SiteFooter({ latestRateDate }: SiteFooterProps) {
  const { t } = useTranslation();

  const renderLinks = (links: readonly NavLinkItem[]) =>
    links.map((link) => (
      <Link key={link.route} to={ROUTES[link.route]} className={LINK_CLASS}>
        {t(`nav.links.${link.labelKey}`)}
      </Link>
    ));

  return (
    <footer data-on-brand className="bg-brand text-on-brand">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-8 pt-14 pb-7">
        <div className="flex flex-wrap gap-x-14 gap-y-10">
          <div className="flex flex-[2_1_320px] flex-col gap-3">
            <Link
              to={ROUTES.home}
              className="flex items-center gap-2.5 self-start font-display text-xl font-semibold text-white"
            >
              <Logo variant="mark" onDark decorative className="size-8" />
              {t('common.appName')}
            </Link>
            <p className="max-w-md text-sm leading-relaxed">{t('nav.disclaimer')}</p>
          </div>
          <nav aria-label={t('nav.footer')} className="flex flex-[1_1_160px] flex-col">
            <h2 className="mb-1.5 text-sm font-semibold text-white">{t('nav.footerNavigation')}</h2>
            {renderLinks(FOOTER_LINKS)}
          </nav>
          <nav aria-label={t('nav.footerSystem')} className="flex flex-[1_1_160px] flex-col">
            <h2 className="mb-1.5 text-sm font-semibold text-white">{t('nav.footerSystem')}</h2>
            {renderLinks(FOOTER_SYSTEM_LINKS)}
            <a
              href={EXTERNAL_LINKS.dataSource}
              target="_blank"
              rel="noreferrer"
              className={LINK_CLASS}
            >
              {t('nav.dataSource')}
            </a>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/16 pt-5 text-sm">
          <span>{t('nav.dataSourceSchedule')}</span>
          {latestRateDate ? (
            <span>{t('nav.latestData', { date: formatDate(latestRateDate) })}</span>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
