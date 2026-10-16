import { TIME_IN_MS, TIME_IN_SECONDS } from '@constants/time.constants';
import { i18n } from '@lib/i18n';

type TimedRun = {
  startedAt: string;
  finishedAt?: string | null;
};

export function getRunDurationSeconds({ startedAt, finishedAt }: TimedRun): number | null {
  if (!finishedAt) return null;
  const elapsed = new Date(finishedAt).getTime() - new Date(startedAt).getTime();
  return Math.max(0, Math.round(elapsed / TIME_IN_MS.SECOND));
}

export function formatDuration(seconds: number) {
  if (seconds < TIME_IN_SECONDS.MINUTE)
    return i18n.t('status.duration.seconds', { count: seconds });
  return i18n.t('status.duration.minutes', {
    count: Math.round(seconds / TIME_IN_SECONDS.MINUTE),
  });
}
