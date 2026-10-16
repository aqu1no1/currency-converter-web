import axios, { type InternalAxiosRequestConfig, isAxiosError, isCancel } from 'axios';

import { TIME_IN_MS } from '@constants/time.constants';
import { ApiError } from '@interfaces/api-error.interface';
import { i18n } from '@lib/i18n';

const REQUEST_TIMEOUT = 10 * TIME_IN_MS.SECOND;

const TIMEOUT_CODES = new Set(['ECONNABORTED', 'ETIMEDOUT']);

type NestErrorBody = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
};

function readMessage(body: NestErrorBody | undefined): string {
  if (Array.isArray(body?.message) && body.message.length > 0) return body.message.join('\n');
  if (typeof body?.message === 'string' && body.message.length > 0) return body.message;
  return i18n.t('errors.unexpected');
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (!isAxiosError(error)) {
    return new ApiError({ status: 0, message: i18n.t('errors.unexpected') });
  }

  if (error.response) {
    const body = error.response.data as NestErrorBody | undefined;

    return new ApiError({
      status: error.response.status,
      message: readMessage(body),
      code: body?.error ?? error.code,
    });
  }

  const timedOut = TIMEOUT_CODES.has(error.code ?? '');

  return new ApiError({
    status: 0,
    message: i18n.t(timedOut ? 'errors.timeout' : 'errors.network'),
    code: error.code,
    isNetwork: true,
  });
}

export function withLanguage(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  config.headers.set('Accept-Language', i18n.language);
  return config;
}

export function rejectAsApiError(error: unknown): Promise<never> {
  return Promise.reject(isCancel(error) ? error : toApiError(error));
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: REQUEST_TIMEOUT,
});

apiClient.interceptors.request.use(withLanguage);
apiClient.interceptors.response.use((response) => response, rejectAsApiError);
