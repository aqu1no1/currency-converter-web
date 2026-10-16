import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@components/buttons/ButtonLink';
import { Icon } from '@components/icon/Icon';
import { Container } from '@components/layout/Container';
import { Logo } from '@components/logo/Logo';
import { ROUTES } from '@constants/routes.constants';

/**
 * Página "Erro inesperado · Algo deu errado", mostrada quando uma página quebra ao renderizar.
 *
 * Fica no lugar do conteúdo, com cabeçalho e rodapé visíveis.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<UnexpectedError />}>...</ErrorBoundary>
 * ```
 */
export function UnexpectedError() {
  const { t } = useTranslation();

  return (
    <Container className="flex flex-1 flex-col items-center justify-center py-24">
      <section role="alert" className="flex max-w-xl flex-col items-center gap-7 text-center">
        <Logo variant="mark" decorative className="size-16" />
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold tracking-widest text-accent-text uppercase">
            {t('errors.unexpectedError.label')}
          </span>
          <h1 className="font-display text-page-title leading-tight font-semibold text-title">
            {t('errors.unexpectedError.title')}
          </h1>
          <p className="text-body-lg text-muted">{t('errors.unexpectedError.description')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink to={ROUTES.home}>
            <Icon name="home" size={20} />
            {t('errors.unexpectedError.goHome')}
          </ButtonLink>
          <ButtonLink to={ROUTES.status} variant="secondary">
            {t('errors.states.seeStatus')}
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
