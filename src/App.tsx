import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@components/language/LanguageSwitcher';

export function App() {
  const { t } = useTranslation();

  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-2xl font-semibold">{t('common.appName')}</h1>
      <LanguageSwitcher />
    </main>
  );
}
