export const converter = {
  title: 'Convert currencies',
  description: 'Reference rates for the 10 supported currencies, updated once a day.',
  label: 'Converter',
  amount: 'Amount',
  from: 'From',
  to: 'To',
  equals: '{{amount}} equals',
  dateBadge: 'Rate from {{date}}',
  invalidAmount: 'Enter a number greater than or equal to zero.',
  frequent: 'Frequent conversions',
  notes: {
    midMarket: {
      title: 'Mid-market rate',
      description:
        'The value is the midpoint between buy and sell, with no spread or bank or exchange office fees.',
    },
    source: {
      title: 'Where the data comes from',
      description:
        'Daily rates from central banks, synced from Frankfurter. Pairs without the dollar are calculated by cross rate.',
    },
  },
};
