import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SegmentedControl } from '@components/buttons/SegmentedControl';

const PERIODS = [
  { value: '7d', label: '7 dias' },
  { value: '30d', label: '30 dias' },
  { value: '1y', label: '1 ano' },
] as const;

describe('SegmentedControl', () => {
  it('marks the selected option and reports the new one', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl label="Período" options={PERIODS} value="30d" onChange={onChange} />);

    expect(screen.getByRole('group', { name: 'Período' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '30 dias' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: '1 ano' })).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(screen.getByRole('button', { name: '1 ano' }));

    expect(onChange).toHaveBeenCalledWith('1y');
  });
});
