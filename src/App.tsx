import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@components/language/LanguageSwitcher';
import { Logo } from '@components/logo/Logo';
import { ThemeSwitcher } from '@components/theme/ThemeSwitcher';

export function App() {
  const { t } = useTranslation();

  return (
    <main className="min-h-dvh p-6">
      <Logo variant="mark" className="size-10" />
      <h1 className="font-display text-2xl font-semibold text-title">{t('common.appName')}</h1>
      <div className="mt-4 flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </main>
  );
}
