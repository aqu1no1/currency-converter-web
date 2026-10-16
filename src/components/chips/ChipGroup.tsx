import { Chip } from '@components/chips/Chip';

export type ChipOption<Value extends string> = {
  value: Value;
  label: string;
};

type ChipGroupProps<Value extends string> = {
  /** Opções na ordem em que aparecem. */
  options: readonly ChipOption<Value>[];

  /** Opção selecionada. */
  value: Value;

  onChange: (value: Value) => void;

  /** Nome do grupo para o leitor de tela, como "Moeda base". */
  label: string;

  shape?: 'square' | 'pill';
};

/**
 * Grupo de `Chip` com uma opção selecionada por vez.
 *
 * @example
 * ```tsx
 * <ChipGroup label={t('rates.base')} options={baseOptions} value={base} onChange={setBase} />
 * ```
 */
export function ChipGroup<Value extends string>({
  options,
  value,
  onChange,
  label,
  shape,
}: ChipGroupProps<Value>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip
          key={option.value}
          shape={shape}
          selected={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
}
