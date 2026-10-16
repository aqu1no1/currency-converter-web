import { useTranslation } from 'react-i18next';

import { Container } from '@components/layout/Container';
import { PageHeader } from '@components/layout/PageHeader';
import { usePageMeta } from '@hooks/usePageMeta';

export default function ConverterPage() {
  const { t } = useTranslation();
  usePageMeta(t('converter.title'), t('converter.description'));

  return (
    <Container className="py-14">
      <PageHeader title={t('converter.title')} description={t('converter.description')} />
    </Container>
  );
}
