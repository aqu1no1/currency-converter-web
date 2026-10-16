import { z } from 'zod';

export const currencyCodeSchema = z.string().regex(/^[A-Z]{3}$/);

export const dateOnlySchema = z.iso.date();

export const dateTimeSchema = z.iso.datetime({ offset: true });

export function paginatedSchema<TItem extends z.ZodType>(item: TItem) {
  return z.object({
    data: z.array(item),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    perPage: z.number().int().positive(),
    totalPages: z.number().int().nonnegative(),
  });
}
