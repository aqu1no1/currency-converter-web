import type { ReactNode } from 'react';

import { Icon } from '@components/icon/Icon';
import type { IconName } from '@constants/icons';
import { cn } from '@utils/cn.util';

type StatusBannerProps = {
  /** Texto do aviso. */
  message: ReactNode;

  icon?: IconName;

  /** Ação curta à direita, como "Tentar de novo" ou um link "Ver status". */
  action?: ReactNode;

  className?: string;
};

/**
 * Aviso laranja para quando a página ainda tem o que mostrar, mas algo falhou.
 *
 * É anunciado como status pelo leitor de tela, sem tirar o foco.
 *
 * @example
 * ```tsx
 * <StatusBanner
 *   message={t('home.today.error')}
 *   action={<button onClick={onRetry}>{t('common.retry')}</button>}
 * />
 * ```
 */
export function StatusBanner({ message, icon = 'alert', action, className }: StatusBannerProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-warning-line bg-warning px-4 py-3 text-warning-text',
        className,
      )}
    >
      <Icon name={icon} size={20} className="shrink-0" />
      <span className="flex-1 text-body-sm leading-snug">{message}</span>
      {action}
    </div>
  );
}
