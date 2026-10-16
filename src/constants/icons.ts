import { mdiThemeLightDark, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';

/** Ícones do site, com as mesmas chaves e nomes do MaterialCommunityIcons do app. */
export const ICONS = {
  appearance: mdiThemeLightDark,
  themeLight: mdiWeatherSunny,
  themeDark: mdiWeatherNight,
} as const;

export type IconName = keyof typeof ICONS;
