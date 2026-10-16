import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { i18n } from '@lib/i18n';
import { installMatchMedia } from '@test/utils/match-media';

beforeEach(async () => {
  localStorage.clear();
  installMatchMedia();
  delete document.documentElement.dataset.theme;
  await i18n.changeLanguage('pt-BR');
});

afterEach(() => {
  cleanup();
});
