import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@components/buttons/Button';

describe('Button', () => {
  it('is a 48px non-submit button that calls onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Atualizar</Button>);

    const button = screen.getByRole('button', { name: 'Atualizar' });
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledOnce();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('h-12');
  });

  it('applies the variant and keeps extra classes', () => {
    render(
      <Button variant="secondary" className="w-full">
        Ver status
      </Button>,
    );

    expect(screen.getByRole('button')).toHaveClass('border-line-strong', 'w-full');
  });
});
