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
  it('starts on automatic and offers light next', () => {
    renderSwitcher();

    expect(
      screen.getByRole('button', { name: 'Tema: Automático. Mudar para Claro' }),
    ).toBeInTheDocument();
  });

  it('cycles light → dark → automatic and saves the choice', async () => {
    renderSwitcher();
    const button = screen.getByRole('button');

    await userEvent.click(button);
    expect(button).toHaveAccessibleName('Tema: Claro. Mudar para Escuro');
    expect(document.documentElement.dataset.theme).toBe('light');

    await userEvent.click(button);
    expect(button).toHaveAccessibleName('Tema: Escuro. Mudar para Automático');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('dark');

    await userEvent.click(button);
    expect(button).toHaveAccessibleName('Tema: Automático. Mudar para Claro');
  });
});
