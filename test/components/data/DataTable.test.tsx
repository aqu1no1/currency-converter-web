import { render, screen } from '@testing-library/react';
import type { TableColumn } from 'react-data-table-component';
import { describe, expect, it } from 'vitest';

import { DataTable } from '@components/data/DataTable';

type Rate = { code: string; rate: number };

const COLUMNS: TableColumn<Rate>[] = [
  { name: 'Moeda', selector: (row) => row.code },
  { name: '1 BRL vale', selector: (row) => row.rate, right: true },
];

describe('DataTable', () => {
  it('renders the headers and the rows', () => {
    render(
      <DataTable
        label="Tabela de cotações"
        columns={COLUMNS}
        rows={[
          { code: 'USD', rate: 0.2 },
          { code: 'EUR', rate: 0.16 },
        ]}
        keyField="code"
      />,
    );

    expect(screen.getByText('Moeda')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('0.16')).toBeInTheDocument();
  });

  it('shows a message when there are no rows', () => {
    render(<DataTable label="Tabela de cotações" columns={COLUMNS} rows={[]} />);

    expect(screen.getByText('Nada para mostrar por aqui.')).toBeInTheDocument();
  });
});
