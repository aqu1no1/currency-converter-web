import { ROUTES } from '@constants/routes.constants';

export type HeroGlyph = {
  symbol: string;
  left: string;
  top: string;
  fontSize: number;
  delay: string;
};

export type HeroCoin = HeroGlyph & {
  size: number;
  duration?: string;
};

export const HERO_GLYPHS: readonly HeroGlyph[] = [
  { symbol: '$', left: '4%', top: '22%', fontSize: 150, delay: '0s' },
  { symbol: '€', left: '47%', top: '56%', fontSize: 170, delay: '-4s' },
  { symbol: '£', left: '86%', top: '12%', fontSize: 130, delay: '-8s' },
  { symbol: '¥', left: '26%', top: '70%', fontSize: 120, delay: '-2s' },
];

export const HERO_COINS: readonly HeroCoin[] = [
  { symbol: 'R$', left: '6%', top: '74%', size: 64, fontSize: 18, delay: '0s' },
  { symbol: '€', left: '52%', top: '26%', size: 52, fontSize: 20, delay: '-3s', duration: '10s' },
  { symbol: '$', left: '54%', top: '80%', size: 46, fontSize: 18, delay: '-5s', duration: '7s' },
  { symbol: '£', left: '93%', top: '50%', size: 58, fontSize: 22, delay: '-1s', duration: '9s' },
  { symbol: '¥', left: '78%', top: '84%', size: 40, fontSize: 16, delay: '-6s', duration: '11s' },
];

export const HERO_FLOW_POINTS =
  '0,150 80,138 160,146 240,120 320,128 400,104 480,112 560,86 640,96 720,70 800,82 880,58 960,66 1040,44 1120,52 1200,30';

export const HOME_FEATURES = [
  { key: 'convert', route: ROUTES.converter },
  { key: 'rates', route: ROUTES.rates },
  { key: 'history', route: ROUTES.history },
] as const;

export const HOME_STEPS = ['sync', 'history', 'crossRate'] as const;
