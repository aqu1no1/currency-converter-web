import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ErrorState } from '@components/feedback/ErrorState';

describe('ErrorState', () => {
  it('shows the message and retries', async () => {
    const onRetry = vi.fn();
    render(
      <ErrorState title="Sem cotações" description="O servidor não respondeu." onRetry={onRetry} />,
    );

    expect(screen.getByRole('heading', { name: 'Sem cotações' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('has no retry button without onRetry', () => {
    render(<ErrorState title="Sem cotações" description="O servidor não respondeu." />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
