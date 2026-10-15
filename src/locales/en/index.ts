import type { Translations } from '@locales/pt-BR';

import { common } from './common';
import { converter } from './converter';
import { currencies } from './currencies';
import { errors } from './errors';
import { history } from './history';
import { home } from './home';
import { nav } from './nav';
import { rates } from './rates';
import { status } from './status';

export const en: Translations = {
  common,
  nav,
  home,
  converter,
  rates,
  history,
  status,
  currencies,
  errors,
};
