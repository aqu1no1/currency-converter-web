export type PaginationOptions = {
  page?: number;
  perPage?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export interface IApiService<T> {
  readonly baseUrl: string;
  get(options?: PaginationOptions, signal?: AbortSignal): Promise<PaginatedResponse<T>>;
}
