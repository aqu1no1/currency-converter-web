export const history = {
  title: 'Histórico',
  description: 'Como a cotação de um par de moedas variou ao longo do tempo.',
  from: 'De',
  to: 'Para',
  period: 'Período',
  periods: {
    '7d': '7 dias',
    '30d': '30 dias',
    '1y': '1 ano',
  },
  periodsLong: {
    '7d': 'nos últimos 7 dias',
    '30d': 'nos últimos 30 dias',
    '1y': 'nos últimos 12 meses',
  },
  pair: '1 {{from}} em {{to}}',
  up: 'Alta de {{value}}% {{period}}',
  down: 'Queda de {{value}}% {{period}}',
  chartLabel: 'Cotação de {{from}} para {{to}} {{period}}: {{change}}',
  stats: {
    first: 'Início do período',
    min: 'Mínima',
    max: 'Máxima',
    last: 'Mais recente',
  },
  empty: {
    title: 'Sem cotações nesse período',
    description:
      'Nem sempre há cotação todos os dias, principalmente em fins de semana e feriados. Tente um período maior.',
  },
};
