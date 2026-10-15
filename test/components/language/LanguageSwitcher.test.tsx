import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { LanguageSwitcher } from '@components/language/LanguageSwitcher';
import { STORAGE_KEYS } from '@constants/storage';

describe('LanguageSwitcher', () => {
  it('marks the active language with aria-pressed', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByRole('button', { name: 'PT' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches the language, the texts and saves the choice', async () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('group', { name: 'Idioma' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('group', { name: 'Language' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem(STORAGE_KEYS.language)).toBe('en');
  });
});
