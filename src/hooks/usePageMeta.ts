import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Atualiza o `<title>` e a `meta description` da página no idioma ativo.
 *
 * @example
 * ```tsx
 * usePageMeta(t('rates.title'), t('rates.description'));
 * ```
 */
export function usePageMeta(title: string, description: string) {
  const { t } = useTranslation();
  const appName = t('common.appName');

  useEffect(() => {
    document.title = `${title} · ${appName}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [appName, description, title]);
}
