import { useTranslation } from 'react-i18next';

import { Container } from '@components/layout/Container';
import { PageHeader } from '@components/layout/PageHeader';
import { usePageMeta } from '@hooks/usePageMeta';

export default function HistoryPage() {
  const { t } = useTranslation();
  usePageMeta(t('history.title'), t('history.description'));

  return (
    <Container className="py-14">
      <PageHeader title={t('history.title')} description={t('history.description')} />
    </Container>
  );
}
