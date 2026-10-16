export const status = {
  title: 'Status da sincronização',
  description: 'O cron busca as cotações dos últimos 5 dias todos os dias às 06:00.',
  refresh: 'Atualizar',
  runStatus: {
    SUCCESS: 'Sucesso',
    FAILED: 'Falhou',
    RUNNING: 'Em andamento',
  },
  lastRun: {
    title: 'Última sincronização',
    at: '{{date}} às {{time}}',
    rows_one: '{{value}} linha gravada',
    rows_other: '{{value}} linhas gravadas',
    rowsIn: '{{rows}} em {{duration}}',
    empty: 'Nenhuma sincronização diária ainda',
  },
  availableUntil: {
    title: 'Cotações disponíveis até',
    description: 'Dia anterior à execução, como esperado: o provedor publica com um dia de atraso.',
    empty: 'Ainda não há cotações salvas.',
  },
  storedSince: {
    title: 'Histórico armazenado desde',
    description_one: '{{count}} moeda em relação ao USD, carregada pelo backfill.',
    description_other: '{{count}} moedas em relação ao USD, carregadas pelo backfill.',
  },
  duration: {
    seconds: '{{count}} s',
    minutes: '{{count}} min',
  },
  runs: {
    title: 'Execuções',
    columns: {
      type: 'Tipo',
      status: 'Status',
      start: 'Início',
      duration: 'Duração',
      rows: 'Linhas',
      detail: 'Detalhe',
    },
    backfillDetail: 'Carga inicial desde 2000',
  },
};
