import type { AxiosInstance } from 'axios';

import { type ConvertDto, type ConvertParams, convertSchema } from '@dtos/convert.dto';
import { type HistoryDto, type HistoryParams, historySchema } from '@dtos/history.dto';
import { type LatestRatesDto, latestRatesSchema } from '@dtos/latest-rates.dto';
import { parseResponse } from '@utils/parse-response.util';

export class ExchangeRateService {
  public readonly baseUrl = '/exchange-rates';

  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async convert(params: ConvertParams, signal?: AbortSignal): Promise<ConvertDto> {
    const response = await this.api.get<unknown>(`${this.baseUrl}/convert`, { params, signal });
    return parseResponse(convertSchema, response.data);
  }

  async latest(base: string, signal?: AbortSignal): Promise<LatestRatesDto> {
    const response = await this.api.get<unknown>(
      `${this.baseUrl}/latest/${encodeURIComponent(base)}`,
      { signal },
    );
    return parseResponse(latestRatesSchema, response.data);
  }

  async history(params: HistoryParams, signal?: AbortSignal): Promise<HistoryDto> {
    const response = await this.api.get<unknown>(`${this.baseUrl}/history`, { params, signal });
    return parseResponse(historySchema, response.data);
  }
}
