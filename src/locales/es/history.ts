export const history = {
  title: 'Historial',
  description: 'Cómo varió la cotización de un par de monedas a lo largo del tiempo.',
  from: 'De',
  to: 'A',
  period: 'Período',
  periods: {
    '7d': '7 días',
    '30d': '30 días',
    '1y': '1 año',
  },
  periodsLong: {
    '7d': 'en los últimos 7 días',
    '30d': 'en los últimos 30 días',
    '1y': 'en los últimos 12 meses',
  },
  pair: '1 {{from}} en {{to}}',
  up: 'Subida de {{value}}% {{period}}',
  down: 'Bajada de {{value}}% {{period}}',
  chartLabel: 'Cotización de {{from}} a {{to}} {{period}}: {{change}}',
  stats: {
    first: 'Inicio del período',
    min: 'Mínima',
    max: 'Máxima',
    last: 'Más reciente',
  },
  empty: {
    title: 'Sin cotizaciones en este período',
    description:
      'No siempre hay cotización todos los días, sobre todo en fines de semana y feriados. Prueba un período más largo.',
  },
};
