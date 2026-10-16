export const history = {
  title: 'History',
  description: 'How the rate of a currency pair changed over time.',
  from: 'From',
  to: 'To',
  period: 'Period',
  periods: {
    '7d': '7 days',
    '30d': '30 days',
    '1y': '1 year',
  },
  periodsLong: {
    '7d': 'in the last 7 days',
    '30d': 'in the last 30 days',
    '1y': 'in the last 12 months',
  },
  pair: '1 {{from}} in {{to}}',
  up: 'Up {{value}}% {{period}}',
  down: 'Down {{value}}% {{period}}',
  chartLabel: 'Rate from {{from}} to {{to}} {{period}}: {{change}}',
  stats: {
    first: 'Start of period',
    min: 'Low',
    max: 'High',
    last: 'Latest',
  },
  empty: {
    title: 'No rates in this period',
    description:
      "There isn't always a rate every day, especially on weekends and holidays. Try a longer period.",
  },
};
