import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@components/buttons/ButtonLink';
import { ErrorState } from '@components/feedback/ErrorState';
import { ROUTES } from '@constants/routes.constants';
import { getErrorKind } from '@utils/error-state.util';

type QueryErrorStateProps = {
  /** Erro da consulta que falhou. */
  error: unknown;

  /** Refaz só a consulta que falhou. */
  onRetry: () => void;
};

/**
 * Estado de erro de uma consulta de cotações, no lugar do conteúdo quando não há nada para mostrar.
 *
 * 503 vira "As cotações estão a caminho" com "Atualizar"; rede, timeout e 5xx viram
 * "Não foi possível carregar as cotações" com "Tentar de novo" e "Ver status".
 *
 * @example
 * ```tsx
 * <QueryErrorState error={latest.error} onRetry={() => void latest.refetch()} />
 * ```
 */
export function QueryErrorState({ error, onRetry }: QueryErrorStateProps) {
  const { t } = useTranslation();

  if (getErrorKind(error) === 'notReady') {
    return (
      <ErrorState
        icon="pending"
        title={t('errors.states.notReady.title')}
        description={t('errors.states.notReady.description')}
        onRetry={onRetry}
        retryLabel={t('errors.states.refresh')}
      />
    );
  }

  return (
    <ErrorState
      title={t('errors.states.unavailable.title')}
      description={t('errors.states.unavailable.description')}
      onRetry={onRetry}
      secondaryAction={
        <ButtonLink to={ROUTES.status} variant="secondary">
          {t('errors.states.seeStatus')}
        </ButtonLink>
      }
    />
  );
}
