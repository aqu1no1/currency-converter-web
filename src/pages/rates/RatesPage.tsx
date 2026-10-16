import { useTranslation } from 'react-i18next';

import { Container } from '@components/layout/Container';
import { PageHeader } from '@components/layout/PageHeader';
import { HOME_BASE_CURRENCY } from '@constants/currencies.constants';
import { usePageMeta } from '@hooks/usePageMeta';

export default function RatesPage() {
  const { t } = useTranslation();
  usePageMeta(t('rates.title'), t('rates.description', { base: HOME_BASE_CURRENCY }));

  return (
    <Container className="py-14">
      <PageHeader
        title={t('rates.title')}
        description={t('rates.description', { base: HOME_BASE_CURRENCY })}
      />
    </Container>
  );
}
