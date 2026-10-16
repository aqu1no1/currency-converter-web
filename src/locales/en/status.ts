export const status = {
  title: 'Sync status',
  description: 'The cron fetches the rates for the last 5 days every day at 06:00.',
  refresh: 'Refresh',
  runStatus: {
    SUCCESS: 'Success',
    FAILED: 'Failed',
    RUNNING: 'Running',
  },
  lastRun: {
    title: 'Last sync',
    at: '{{date}} at {{time}}',
    rows_one: '{{value}} row saved',
    rows_other: '{{value}} rows saved',
    rowsIn: '{{rows}} in {{duration}}',
    empty: 'No daily sync yet',
  },
  availableUntil: {
    title: 'Rates available until',
    description: 'The day before the run, as expected: the provider publishes one day late.',
    empty: 'There are no saved rates yet.',
  },
  storedSince: {
    title: 'History stored since',
    description_one: '{{count}} currency against USD, loaded by the backfill.',
    description_other: '{{count}} currencies against USD, loaded by the backfill.',
  },
  duration: {
    seconds: '{{count}} s',
    minutes: '{{count}} min',
  },
  runs: {
    title: 'Runs',
    columns: {
      type: 'Type',
      status: 'Status',
      start: 'Start',
      duration: 'Duration',
      rows: 'Rows',
      detail: 'Detail',
    },
    backfillDetail: 'Initial load since 2000',
  },
};
