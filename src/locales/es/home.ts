export const home = {
  title: 'Inicio',
  description:
    'Convierte monedas con cotizaciones de bancos centrales, actualizadas todos los días.',
  hero: {
    label: 'Presentación',
    title: 'Convierte monedas con cotizaciones de bancos centrales',
    description:
      'Valores de referencia actualizados todos los días para 10 monedas, con historial desde el año 2000.',
    convertNow: 'Convertir ahora',
    seeRates: 'Ver cotizaciones del día',
  },
  today: {
    title: 'Hoy en reales',
    seeAll: 'Ver las 10 monedas',
    error: 'No fue posible cargar las cotizaciones ahora.',
  },
  features: {
    title: 'Lo que puedes hacer',
    convert: {
      title: 'Convertir valores',
      description:
        'Entre cualquier par de las 10 monedas, con la fecha de la cotización siempre visible.',
    },
    rates: {
      title: 'Ver las cotizaciones del día',
      description: 'Elige cualquier moneda como base y mira cuánto vale en todas las demás.',
    },
    history: {
      title: 'Seguir el historial',
      description:
        'Gráfico de cualquier par de monedas en 7 días, 30 días o 1 año, con el mínimo y el máximo del período.',
    },
  },
  steps: {
    title: 'Cómo llegan las cotizaciones hasta aquí',
    sync: {
      title: 'Sincronización diaria',
      description:
        'Todos los días a las 06:00 se buscan las cotizaciones de los últimos 5 días en Frankfurter, que reúne datos de bancos centrales.',
    },
    history: {
      title: 'Historial guardado',
      description:
        'Cada cotización se guarda con su fecha de referencia. El historial va de 2000 hasta el día más reciente publicado.',
    },
    crossRate: {
      title: 'Cualquier par, vía dólar',
      description:
        'Los pares sin el dólar, como euro a real, se calculan por tasa cruzada, siempre con cotizaciones del mismo día.',
    },
  },
  currencies: {
    title: 'Monedas soportadas',
  },
};
