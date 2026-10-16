import { cn } from '@utils/cn.util';

export type SegmentedOption<Value extends string> = {
  value: Value;
  label: string;
};

type SegmentedControlProps<Value extends string> = {
  /** Opções na ordem em que aparecem. */
  options: readonly SegmentedOption<Value>[];

  /** Opção selecionada. */
  value: Value;

  onChange: (value: Value) => void;

  /** Nome do grupo para o leitor de tela, como "Período". */
  label: string;
};

/**
 * Grupo de opções exclusivas lado a lado, como 7 dias / 30 dias / 1 ano.
 *
 * A opção ativa fica com `aria-pressed`.
 *
 * @example
 * ```tsx
 * <SegmentedControl label={t('history.period')} options={PERIODS} value={period} onChange={setPeriod} />
 * ```
 */
export function SegmentedControl<Value extends string>({
  options,
  value,
  onChange,
  label,
}: SegmentedControlProps<Value>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex gap-1.5 rounded-list border border-line bg-surface p-1"
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'min-h-11 rounded-control px-4 text-body-sm font-semibold transition-colors',
              isActive
                ? 'bg-accent text-white dark:bg-mint dark:text-brand'
                : 'text-title hover:bg-mint-soft',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
