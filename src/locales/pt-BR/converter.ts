export const converter = {
  title: 'Converter moedas',
  description: 'Cotações de referência das 10 moedas suportadas, atualizadas uma vez por dia.',
  label: 'Conversor',
  amount: 'Valor',
  from: 'De',
  to: 'Para',
  equals: '{{amount}} equivalem a',
  dateBadge: 'Cotação de {{date}}',
  invalidAmount: 'Digite um valor numérico maior ou igual a zero.',
  frequent: 'Conversões frequentes',
  notes: {
    midMarket: {
      title: 'Taxa média de mercado',
      description:
        'O valor é o ponto médio entre compra e venda, sem spread nem tarifas de banco ou casa de câmbio.',
    },
    source: {
      title: 'De onde vêm os dados',
      description:
        'Cotações diárias de bancos centrais, sincronizadas da Frankfurter. Moedas fora do dólar são calculadas por taxa cruzada.',
    },
  },
};
