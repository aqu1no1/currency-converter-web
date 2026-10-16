import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ChipGroup } from '@components/chips/ChipGroup';

const OPTIONS = [
  { value: 'BRL', label: 'BRL' },
  { value: 'USD', label: 'USD' },
] as const;

describe('ChipGroup', () => {
  it('marks only the selected chip with aria-pressed', () => {
    render(<ChipGroup label="Moeda base" options={OPTIONS} value="BRL" onChange={vi.fn()} />);

    expect(screen.getByRole('group', { name: 'Moeda base' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'BRL' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'USD' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('reports the chosen value from the keyboard', async () => {
    const onChange = vi.fn();
    render(<ChipGroup label="Moeda base" options={OPTIONS} value="BRL" onChange={onChange} />);

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard(' ');

    expect(onChange).toHaveBeenCalledWith('USD');
  });
});
