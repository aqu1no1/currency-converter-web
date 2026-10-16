import { useTranslation } from 'react-i18next';

import { Icon } from '@components/icon/Icon';
import { cn } from '@utils/cn.util';

type SwapButtonProps = {
  /** Inverte as moedas de origem e destino. */
  onSwap: () => void;

  className?: string;
};

/**
 * Botão redondo para inverter o par de moedas, que gira ao passar o mouse.
 *
 * @example
 * ```tsx
 * <SwapButton onSwap={() => setPair(([from, to]) => [to, from])} />
 * ```
 */
export function SwapButton({ onSwap, className }: SwapButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      aria-label={t('common.swap')}
      title={t('common.swap')}
      onClick={onSwap}
      className={cn(
        'flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-title transition-transform duration-300 hover:rotate-180 hover:bg-mint-soft',
        className,
      )}
    >
      <Icon name="swap" size={22} />
    </button>
  );
}
