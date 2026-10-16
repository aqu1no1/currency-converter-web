import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router';

import { LanguageSwitcher } from '@components/language/LanguageSwitcher';
import { Logo } from '@components/logo/Logo';
import { ThemeSwitcher } from '@components/theme/ThemeSwitcher';
import { HEADER_LINKS, ROUTES } from '@constants/routes.constants';
import { cn } from '@utils/cn.util';

/**
 * Cabeçalho verde do site: logo, navegação principal e seletores de idioma e tema.
 *
 * O item da página atual recebe `aria-current="page"` pelo `NavLink`.
 *
 * @example
 * ```tsx
 * <SiteHeader />
 * ```
 */
export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className="relative z-10">
      <div className="mx-auto flex min-h-18 max-w-content flex-wrap items-center justify-between gap-4 px-8 py-3.5">
        <Link
          to={ROUTES.home}
          className="group flex items-center gap-2.5 font-display text-2xl font-semibold text-white"
        >
          <Logo
            variant="animatedMark"
            onDark
            decorative
            className="size-9 transition-transform group-hover:-rotate-12"
          />
          {t('common.appName')}
        </Link>
        <nav aria-label={t('nav.main')} className="flex flex-wrap gap-1">
          {HEADER_LINKS.map((link) => (
            <NavLink
              key={link.route}
              to={ROUTES[link.route]}
              className={({ isActive }) =>
                cn(
                  'rounded-chip px-4 py-3 text-body-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/14 text-white'
                    : 'text-on-brand hover:bg-white/10 hover:text-white',
                )
              }
            >
              {t(`nav.links.${link.labelKey}`)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
