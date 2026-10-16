import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/buttons/Button';
import { Icon } from '@components/icon/Icon';
import type { IconName } from '@constants/icons';

type ErrorStateProps = {
  title: string;

  description: string;

  icon?: IconName;

  /** Mostra o botão "Tentar de novo". */
  onRetry?: () => void;

  /** Texto do botão no lugar de "Tentar de novo", como "Atualizar". */
  retryLabel?: string;

  /** Ação secundária ao lado, como o link "Ver status". */
  secondaryAction?: ReactNode;
};

/**
 * Card de erro no lugar do conteúdo quando não há nada para mostrar.
 *
 * @example
 * ```tsx
 * <ErrorState title={t('errors.ratesTitle')} description={t('errors.ratesDescription')} onRetry={refetch} />
 * ```
 */
export function ErrorState({
  title,
  description,
  icon = 'offline',
  onRetry,
  retryLabel,
  secondaryAction,
}: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <section
      role="status"
      className="flex flex-col items-center gap-6 rounded-list border border-line bg-surface px-8 py-18 text-center"
    >
      <span className="flex size-20 items-center justify-center rounded-3xl bg-mint-soft text-title">
        <Icon name={icon} size={36} />
      </span>
      <div className="flex max-w-lg flex-col gap-2.5">
        <h2 className="font-display text-3xl font-semibold text-title">{title}</h2>
        <p className="text-body-lg text-muted">{description}</p>
      </div>
      {onRetry || secondaryAction ? (
        <div className="flex flex-wrap justify-center gap-3">
          {onRetry ? (
            <Button onClick={onRetry}>
              <Icon name="refresh" size={20} />
              {retryLabel ?? t('common.retry')}
            </Button>
          ) : null}
          {secondaryAction}
        </div>
      ) : null}
    </section>
  );
}
