export const converter = {
  title: 'Convertir monedas',
  description:
    'Cotizaciones de referencia de las 10 monedas admitidas, actualizadas una vez al día.',
  label: 'Conversor',
  amount: 'Valor',
  from: 'De',
  to: 'A',
  equals: '{{amount}} equivalen a',
  dateBadge: 'Cotización del {{date}}',
  invalidAmount: 'Escribe un valor numérico mayor o igual a cero.',
  frequent: 'Conversiones frecuentes',
  notes: {
    midMarket: {
      title: 'Tasa media de mercado',
      description:
        'El valor es el punto medio entre compra y venta, sin spread ni comisiones de banco o casa de cambio.',
    },
    source: {
      title: 'De dónde vienen los datos',
      description:
        'Cotizaciones diarias de bancos centrales, sincronizadas desde Frankfurter. Los pares sin el dólar se calculan por tasa cruzada.',
    },
  },
};
