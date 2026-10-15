import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { i18n } from '@lib/i18n';

beforeEach(async () => {
  localStorage.clear();
  await i18n.changeLanguage('pt-BR');
});

afterEach(() => {
  cleanup();
});
