import { z } from 'zod';

import { dateTimeSchema, paginatedSchema } from '@dtos/common.dto';
import { syncRunStateSchema, syncTypeSchema } from '@dtos/sync-status.dto';

export const syncRunSchema = z.object({
  id: z.uuid(),
  type: syncTypeSchema,
  status: syncRunStateSchema,
  startedAt: dateTimeSchema,
  finishedAt: dateTimeSchema.nullish(),
  rowsInserted: z.number().int().nonnegative(),
  errorMessage: z.string().nullish(),
});

export const syncRunsPageSchema = paginatedSchema(syncRunSchema);

export type SyncRunDto = z.infer<typeof syncRunSchema>;

export type SyncRunsPageDto = z.infer<typeof syncRunsPageSchema>;
