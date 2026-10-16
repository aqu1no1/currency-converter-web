import { ApiError } from '@interfaces/api-error.interface';

export type ErrorKind = 'notReady' | 'unavailable' | 'unknown';

const NOT_READY_STATUS = 503;

export function getErrorKind(error: unknown): ErrorKind {
  if (!(error instanceof ApiError)) return 'unknown';
  if (error.status === NOT_READY_STATUS) return 'notReady';
  if (error.isNetwork || error.isServerError) return 'unavailable';
  return 'unknown';
}
