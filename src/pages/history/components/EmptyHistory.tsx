import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@components/cards/Card';
import { Icon } from '@components/icon/Icon';

type EmptyHistoryProps = {
  /** Seletor de período, que continua ativo dentro do aviso. */
  periodSelector: ReactNode;
};

/**
 * Aviso "Sem cotações nesse período" no lugar do gráfico, com o seletor de período.
 *
 * @example
 * ```tsx
 * <EmptyHistory periodSelector={<SegmentedControl ... />} />
 * ```
 */
export function EmptyHistory({ periodSelector }: EmptyHistoryProps) {
  const { t } = useTranslation();

  return (
    <Card role="status" className="flex flex-col items-center gap-6 px-8 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-3xl bg-mint-soft text-title">
        <Icon name="calendarSearch" size={32} />
      </span>
      <div className="flex max-w-lg flex-col gap-2">
        <strong className="font-display text-2xl font-semibold text-title">
          {t('history.empty.title')}
        </strong>
        <span className="text-body-lg text-muted">{t('history.empty.description')}</span>
      </div>
      {periodSelector}
    </Card>
  );
}
