import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { LanguageSwitcher } from '@components/language/LanguageSwitcher';
import { STORAGE_KEYS } from '@constants/storage';

describe('LanguageSwitcher', () => {
  it('shows the current language and the next one in the label', () => {
    render(<LanguageSwitcher />);

    const button = screen.getByRole('button', { name: 'Idioma: Português. Mudar para Inglês' });
    expect(button).toHaveTextContent('PT');
  });

  it('cycles PT → EN → ES → PT and saves the choice', async () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button');

    await userEvent.click(button);
    expect(button).toHaveTextContent('EN');
    expect(button).toHaveAccessibleName('Language: English. Switch to Spanish');
    expect(localStorage.getItem(STORAGE_KEYS.language)).toBe('en');

    await userEvent.click(button);
    expect(button).toHaveTextContent('ES');

    await userEvent.click(button);
    expect(button).toHaveTextContent('PT');
  });
});
