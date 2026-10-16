import { common } from '@locales/pt-BR/common';
import { converter } from '@locales/pt-BR/converter';
import { currencies } from '@locales/pt-BR/currencies';
import { errors } from '@locales/pt-BR/errors';
import { history } from '@locales/pt-BR/history';
import { home } from '@locales/pt-BR/home';
import { nav } from '@locales/pt-BR/nav';
import { rates } from '@locales/pt-BR/rates';
import { status } from '@locales/pt-BR/status';

export const ptBR = {
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

export type Translations = typeof ptBR;
