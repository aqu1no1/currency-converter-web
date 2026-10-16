export const rates = {
  title: "Today's rates",
  description: 'How much 1 {{base}} is worth in each of the other currencies.',
  base: 'Base currency',
  dateBadge: 'Rates from {{date}}',
  table: 'Rates table',
  columns: {
    code: 'Currency',
    name: 'Name',
    rate: '1 {{base}} is worth',
    inverse: '1 unit is worth in {{base}}',
  },
  missingNote: "Currencies without a rate on the latest date aren't shown in the table.",
};
