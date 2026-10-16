export const errors = {
  network: 'Sin conexión con el servidor. Revisa tu internet e inténtalo de nuevo.',
  timeout: 'El servidor tardó en responder. Inténtalo de nuevo.',
  invalidResponse: 'Recibimos una respuesta inesperada del servidor.',
  unexpected: 'Algo salió mal. Inténtalo de nuevo.',
  states: {
    unavailable: {
      title: 'No fue posible cargar las cotizaciones',
      description:
        'El servidor no respondió. Puede ser algo rápido: inténtalo de nuevo en unos instantes o revisa el estado de la sincronización.',
    },
    notReady: {
      title: 'Las cotizaciones están en camino',
      description:
        'La primera actualización aún no terminó, así que todavía no hay cotizaciones para convertir. Vuelve en unos minutos.',
    },
    refresh: 'Actualizar',
    seeStatus: 'Ver estado',
    syncFailed:
      '<strong>La última actualización falló.</strong> Las cotizaciones de abajo son del {{date}} y se actualizarán en la próxima sincronización.',
  },
  notFound: {
    label: 'Error 404',
    title: 'Página no encontrada',
    description:
      'La dirección puede haber cambiado o estar mal escrita. ¿Qué tal volver al inicio o ir directo al conversor?',
    goHome: 'Ir al inicio',
    openConverter: 'Abrir el conversor',
  },
};
