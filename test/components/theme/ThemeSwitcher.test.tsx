import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ThemeSwitcher } from '@components/theme/ThemeSwitcher';
import { STORAGE_KEYS } from '@constants/storage';
import { ThemeProvider } from '@theme/ThemeProvider';

function renderSwitcher() {
  return render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>,
  );
}

describe('ThemeSwitcher', () => {
  it('marks the active scheme with aria-pressed', () => {
    renderSwitcher();

    expect(screen.getByRole('group', { name: 'Tema' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Automático' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Escuro' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches the theme and saves the choice', async () => {
    renderSwitcher();

    await userEvent.click(screen.getByRole('button', { name: 'Escuro' }));

    expect(screen.getByRole('button', { name: 'Escuro' })).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('dark');
  });
});
