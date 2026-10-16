import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SwapButton } from '@components/buttons/SwapButton';

describe('SwapButton', () => {
  it('swaps when clicked or activated with the keyboard', async () => {
    const onSwap = vi.fn();
    render(<SwapButton onSwap={onSwap} />);

    const button = screen.getByRole('button', { name: 'Inverter moedas' });
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard('{Enter}');

    expect(onSwap).toHaveBeenCalledTimes(2);
  });
});
