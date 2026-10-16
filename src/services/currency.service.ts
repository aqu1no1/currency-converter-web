import type { AxiosInstance } from 'axios';

import { type CurrencyDto, currenciesSchema } from '@dtos/currency.dto';
import { parseResponse } from '@utils/parse-response.util';

export class CurrencyService {
  public readonly baseUrl = '/currencies';

  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async list(signal?: AbortSignal): Promise<CurrencyDto[]> {
    const response = await this.api.get<unknown>(this.baseUrl, { signal });
    return parseResponse(currenciesSchema, response.data);
  }
}
