export const home = {
  title: 'Home',
  description: 'Convert currencies with central bank rates, updated every day.',
  hero: {
    label: 'Introduction',
    title: 'Convert currencies with central bank rates',
    description:
      'Reference values updated every day for 10 currencies, with history back to the year 2000.',
    convertNow: 'Convert now',
    seeRates: "See today's rates",
  },
  today: {
    title: 'Today in reais',
    seeAll: 'See all 10 currencies',
    error: "We couldn't load the rates right now.",
  },
  features: {
    title: 'What you can do',
    convert: {
      title: 'Convert amounts',
      description:
        'Between any two of the 10 currencies, with the date of the rate always visible.',
    },
    rates: {
      title: "See today's rates",
      description: 'Pick any currency as the base and see how much it is worth in all the others.',
    },
    history: {
      title: 'Follow the history',
      description:
        'Chart of any currency pair over 7 days, 30 days or 1 year, with the low and high of the period.',
    },
  },
  steps: {
    title: 'How the rates get here',
    sync: {
      title: 'Daily sync',
      description:
        'Every day at 06:00, the rates of the last 5 days are fetched from Frankfurter, which gathers central bank data.',
    },
    history: {
      title: 'Stored history',
      description:
        'Each rate is saved with its reference date. The history goes from 2000 to the latest published day.',
    },
    crossRate: {
      title: 'Any pair, via the dollar',
      description:
        'Pairs without the dollar, like euro to real, are calculated with a cross rate, always using rates from the same day.',
    },
  },
  currencies: {
    title: 'Supported currencies',
  },
};
