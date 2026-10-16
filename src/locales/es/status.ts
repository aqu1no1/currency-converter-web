export const status = {
  title: 'Estado de la sincronización',
  description: 'El cron busca las cotizaciones de los últimos 5 días todos los días a las 06:00.',
  refresh: 'Actualizar',
  runStatus: {
    SUCCESS: 'Éxito',
    FAILED: 'Falló',
    RUNNING: 'En curso',
  },
  lastRun: {
    title: 'Última sincronización',
    at: '{{date}} a las {{time}}',
    rows_one: '{{value}} fila guardada',
    rows_other: '{{value}} filas guardadas',
    rowsIn: '{{rows}} en {{duration}}',
    empty: 'Todavía no hay sincronización diaria',
  },
  availableUntil: {
    title: 'Cotizaciones disponibles hasta',
    description:
      'El día anterior a la ejecución, como se espera: el proveedor publica con un día de retraso.',
    empty: 'Todavía no hay cotizaciones guardadas.',
  },
  storedSince: {
    title: 'Historial guardado desde',
    description_one: '{{count}} moneda respecto al USD, cargada por el backfill.',
    description_other: '{{count}} monedas respecto al USD, cargadas por el backfill.',
  },
  duration: {
    seconds: '{{count}} s',
    minutes: '{{count}} min',
  },
  runs: {
    title: 'Ejecuciones',
    columns: {
      type: 'Tipo',
      status: 'Estado',
      start: 'Inicio',
      duration: 'Duración',
      rows: 'Filas',
      detail: 'Detalle',
    },
    backfillDetail: 'Carga inicial desde 2000',
  },
};
