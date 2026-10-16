export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'onBrand' | 'onBrandGhost';

export const BUTTON_BASE =
  'inline-flex h-12 items-center justify-center gap-2 rounded-control px-5 text-base font-semibold transition-colors disabled:opacity-50';

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand/90 dark:bg-mint dark:text-brand dark:hover:bg-mint/90',
  secondary: 'border border-line-strong bg-surface text-title hover:bg-mint-soft',
  ghost: 'text-title hover:bg-mint-soft',
  onBrand: 'h-13 bg-mint px-6 text-lg text-brand hover:brightness-105',
  onBrandGhost: 'h-13 border border-white/45 px-6 text-lg text-white hover:bg-white/10',
};
