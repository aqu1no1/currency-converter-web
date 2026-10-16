import { useTranslation } from 'react-i18next';

import { Icon } from '@components/icon/Icon';
import type { IconName } from '@constants/icons';
import type { SyncRunState } from '@dtos/sync-status.dto';
import { cn } from '@utils/cn.util';

const STATUS_STYLES: Record<SyncRunState, { icon: IconName; className: string }> = {
  SUCCESS: { icon: 'success', className: 'bg-success text-success-text' },
  FAILED: { icon: 'failed', className: 'bg-warning text-warning-text' },
  RUNNING: { icon: 'running', className: 'bg-surface-alt text-muted' },
};

type StatusBadgeProps = {
  status: SyncRunState;
};

/**
 * Situação de uma sincronização em pílula, com ícone e texto (não só cor).
 *
 * @example
 * ```tsx
 * <StatusBadge status={run.status} />
 * ```
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation();
  const { icon, className } = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-sm font-semibold',
        className,
      )}
    >
      <Icon name={icon} size={16} />
      {t(`status.runStatus.${status}`)}
    </span>
  );
}
