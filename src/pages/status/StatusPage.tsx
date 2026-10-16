import { useTranslation } from 'react-i18next';

import { Container } from '@components/layout/Container';
import { PageHeader } from '@components/layout/PageHeader';
import { usePageMeta } from '@hooks/usePageMeta';

export default function StatusPage() {
  const { t } = useTranslation();
  usePageMeta(t('status.title'), t('status.description'));

  return (
    <Container className="py-14">
      <PageHeader title={t('status.title')} description={t('status.description')} />
    </Container>
  );
}
