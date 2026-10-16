import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;

  description?: string;

  /** Conteúdo à direita, como o selo "Cotações de 28/09/2026" ou um botão. */
  aside?: ReactNode;
};

/**
 * Título da página com o subtítulo e um espaço à direita.
 *
 * @example
 * ```tsx
 * <PageHeader title={t('rates.title')} description={t('rates.description', { base })} aside={<DateBadge />} />
 * ```
 */
export function PageHeader({ title, description, aside }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-2.5">
        <h1 className="font-display text-page-title leading-tight font-semibold text-title">
          {title}
        </h1>
        {description ? <p className="text-body-lg text-muted">{description}</p> : null}
      </div>
      {aside}
    </div>
  );
}
