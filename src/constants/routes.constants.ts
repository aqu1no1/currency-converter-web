export const ROUTES = {
  home: '/',
  converter: '/converter',
  rates: '/rates',
  history: '/history',
  status: '/status',
  notFound: '*',
} as const;

export type RouteName = keyof typeof ROUTES;

export type NavLinkItem = {
  route: Exclude<RouteName, 'notFound'>;
  labelKey: 'home' | 'converter' | 'rates' | 'history' | 'status' | 'syncStatus';
};

export const HEADER_LINKS: readonly NavLinkItem[] = [
  { route: 'converter', labelKey: 'converter' },
  { route: 'rates', labelKey: 'rates' },
  { route: 'history', labelKey: 'history' },
  { route: 'status', labelKey: 'status' },
];

export const FOOTER_LINKS: readonly NavLinkItem[] = [
  { route: 'home', labelKey: 'home' },
  { route: 'converter', labelKey: 'converter' },
  { route: 'rates', labelKey: 'rates' },
  { route: 'history', labelKey: 'history' },
];

export const FOOTER_SYSTEM_LINKS: readonly NavLinkItem[] = [
  { route: 'status', labelKey: 'syncStatus' },
];

export const EXTERNAL_LINKS = {
  dataSource: 'https://frankfurter.dev',
} as const;
