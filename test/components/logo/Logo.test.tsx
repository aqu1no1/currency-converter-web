import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import logoOnDark from '@assets/svg/logo/logo-on-dark.svg';
import logoOnLight from '@assets/svg/logo/logo-on-light.svg';
import markOnDark from '@assets/svg/logo/mark-on-dark.svg';
import { Logo } from '@components/logo/Logo';
import { STORAGE_KEYS } from '@constants/storage';
import { ThemeProvider } from '@theme/ThemeProvider';

function renderLogo(props: Parameters<typeof Logo>[0] = {}) {
  return render(
    <ThemeProvider>
      <Logo {...props} />
    </ThemeProvider>,
  );
}

describe('Logo', () => {
  it('uses the light version in the light theme', () => {
    renderLogo();

    expect(screen.getByRole('img', { name: 'Converter' })).toHaveAttribute('src', logoOnLight);
  });

  it('uses the on-dark version in the dark theme', () => {
    localStorage.setItem(STORAGE_KEYS.theme, 'dark');
    renderLogo({ variant: 'mark' });

    expect(screen.getByRole('img')).toHaveAttribute('src', markOnDark);
  });

  it('uses the on-dark version on a dark background in the light theme', () => {
    renderLogo({ onDark: true });

    expect(screen.getByRole('img')).toHaveAttribute('src', logoOnDark);
  });
});
