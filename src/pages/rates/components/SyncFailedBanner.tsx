import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { StatusBanner } from '@components/feedback/StatusBanner';
import { ROUTES } from '@constants/routes.constants';
import { formatDate } from '@utils/format.util';

type SyncFailedBannerProps = {
  /** Data das cotações que continuam na tabela. */
  date: string;
};

/**
 * Aviso de que a última sincronização falhou, com a data das cotações mostradas e o link "Ver status".
 *
 * @example
 * ```tsx
 * <SyncFailedBanner date={latest.data.date} />
 * ```
 */
export function SyncFailedBanner({ date }: SyncFailedBannerProps) {
  const { t } = useTranslation();

  return (
    <StatusBanner
      message={
        <Trans
          i18nKey="errors.states.syncFailed"
          values={{ date: formatDate(date) }}
          components={{ strong: <strong /> }}
        />
      }
      action={
        <Link
          to={ROUTES.status}
          className="flex min-h-11 items-center font-semibold underline underline-offset-4"
        >
          {t('errors.states.seeStatus')}
        </Link>
      }
    />
  );
}
