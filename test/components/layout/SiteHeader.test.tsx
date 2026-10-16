import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SiteHeader } from '@components/layout/SiteHeader';
import { renderWithProviders } from '@test/utils/render-with-providers';

describe('SiteHeader', () => {
  it('marks the current page in the main navigation', () => {
    renderWithProviders(<SiteHeader />, { route: '/rates' });
    const nav = screen.getByRole('navigation', { name: 'Principal' });

    expect(within(nav).getByRole('link', { name: 'Cotações do dia' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(within(nav).getByRole('link', { name: 'Conversor' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('switches the language of the navigation', async () => {
    renderWithProviders(<SiteHeader />);

    await userEvent.click(screen.getByRole('button', { name: /^Idioma:/ }));

    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: "Today's rates" })).toBeInTheDocument();
  });

  it('switches the theme', async () => {
    renderWithProviders(<SiteHeader />);

    await userEvent.click(screen.getByRole('button', { name: /^Tema:/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Tema:/ }));

    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
