import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@components/buttons/ButtonLink';
import { Container } from '@components/layout/Container';
import { Logo } from '@components/logo/Logo';
import { ROUTES } from '@constants/routes.constants';
import { usePageMeta } from '@hooks/usePageMeta';

export default function NotFoundPage() {
  const { t } = useTranslation();
  usePageMeta(t('errors.notFound.title'), t('errors.notFound.description'));

  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-7 py-24 text-center">
      <Logo variant="mark" decorative className="size-16" />
      <div className="flex max-w-xl flex-col gap-3">
        <span className="text-sm font-semibold tracking-widest text-accent-text uppercase">
          {t('errors.notFound.label')}
        </span>
        <h1 className="font-display text-page-title leading-tight font-semibold text-title">
          {t('errors.notFound.title')}
        </h1>
        <p className="text-body-lg text-muted">{t('errors.notFound.description')}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink to={ROUTES.home}>{t('errors.notFound.goHome')}</ButtonLink>
        <ButtonLink to={ROUTES.converter} variant="secondary">
          {t('errors.notFound.openConverter')}
        </ButtonLink>
      </div>
    </Container>
  );
}
