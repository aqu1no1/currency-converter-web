export const errors = {
  network: 'Sem conexão com o servidor. Confira sua internet e tente de novo.',
  timeout: 'O servidor demorou para responder. Tente de novo.',
  invalidResponse: 'Recebemos uma resposta inesperada do servidor.',
  unexpected: 'Algo deu errado. Tente de novo.',
  states: {
    unavailable: {
      title: 'Não foi possível carregar as cotações',
      description:
        'O servidor não respondeu. Pode ser algo rápido: tente de novo em instantes ou confira o status da sincronização.',
    },
    notReady: {
      title: 'As cotações estão a caminho',
      description:
        'A primeira atualização ainda não terminou, então ainda não há cotações para converter. Volte em alguns minutos.',
    },
    refresh: 'Atualizar',
    seeStatus: 'Ver status',
    syncFailed:
      '<strong>A última atualização falhou.</strong> As cotações abaixo são de {{date}} e serão atualizadas na próxima sincronização.',
  },
  unexpectedError: {
    label: 'Erro inesperado',
    title: 'Algo deu errado',
    description:
      'Tivemos um problema ao abrir esta página. Tente de novo; se continuar, confira o status da sincronização.',
    goHome: 'Ir para o início',
  },
  notFound: {
    label: 'Erro 404',
    title: 'Página não encontrada',
    description:
      'O endereço pode ter mudado ou estar digitado errado. Que tal voltar para o início ou ir direto ao conversor?',
    goHome: 'Ir para o início',
    openConverter: 'Abrir o conversor',
  },
};
