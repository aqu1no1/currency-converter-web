import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CurrencySelect } from '@components/currency/CurrencySelect';

describe('CurrencySelect', () => {
  it('lists the currencies with the translated name and code', () => {
    render(
      <CurrencySelect label="De" currencies={['USD', 'EUR']} value="EUR" onChange={vi.fn()} />,
    );

    const select = screen.getByRole('combobox', { name: 'De' });
    expect(select).toHaveValue('EUR');
    expect(screen.getByRole('option', { name: 'Dólar americano (USD)' })).toBeInTheDocument();
  });

  it('reports the chosen currency', async () => {
    const onChange = vi.fn();
    render(
      <CurrencySelect label="Para" currencies={['USD', 'EUR']} value="EUR" onChange={onChange} />,
    );

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Para' }), 'USD');

    expect(onChange).toHaveBeenCalledWith('USD');
  });
});
