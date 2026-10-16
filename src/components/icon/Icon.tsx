import { ICONS, type IconName } from '@constants/icons';

type IconProps = {
  name: IconName;

  size?: number;

  className?: string;
};

/**
 * Ícone SVG do `@mdi/js` na cor do texto (`currentColor`).
 *
 * É decorativo (`aria-hidden`): o rótulo fica no botão ou link que o envolve.
 *
 * @example
 * ```tsx
 * <Icon name="themeDark" size={20} />
 * ```
 */
export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}
