import { useTranslation } from 'react-i18next';

const NOTES = ['midMarket', 'source'] as const;

/**
 * Notas do rodapé do conversor: "Taxa média de mercado" e "De onde vêm os dados".
 *
 * @example
 * ```tsx
 * <ConverterNotes />
 * ```
 */
export function ConverterNotes() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6 pt-2 sm:grid-cols-2">
      {NOTES.map((note) => (
        <div key={note} className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-ink">{t(`converter.notes.${note}.title`)}</h3>
          <p className="text-body-sm leading-relaxed text-muted">
            {t(`converter.notes.${note}.description`)}
          </p>
        </div>
      ))}
    </div>
  );
}
