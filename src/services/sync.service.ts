import type { AxiosInstance } from 'axios';

import { type SyncRunDto, syncRunsPageSchema } from '@dtos/sync-runs.dto';
import { type SyncStatusDto, syncStatusSchema } from '@dtos/sync-status.dto';
import type {
  IApiService,
  PaginatedResponse,
  PaginationOptions,
} from '@interfaces/api-service.interface';
import { parseResponse } from '@utils/parse-response.util';

export class SyncService implements IApiService<SyncRunDto> {
  public readonly baseUrl = '/sync';

  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async get(
    options: PaginationOptions = {},
    signal?: AbortSignal,
  ): Promise<PaginatedResponse<SyncRunDto>> {
    const response = await this.api.get<unknown>(this.baseUrl, { params: options, signal });
    return parseResponse(syncRunsPageSchema, response.data);
  }

  async status(signal?: AbortSignal): Promise<SyncStatusDto> {
    const response = await this.api.get<unknown>(`${this.baseUrl}/status`, { signal });
    return parseResponse(syncStatusSchema, response.data);
  }
}
