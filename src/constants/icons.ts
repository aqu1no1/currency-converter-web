import {
  mdiAlertCircleOutline,
  mdiArrowBottomRight,
  mdiArrowRight,
  mdiArrowTopRight,
  mdiCalendarSearch,
  mdiCheckCircle,
  mdiClockOutline,
  mdiCloseCircle,
  mdiCloudOffOutline,
  mdiHomeOutline,
  mdiRefresh,
  mdiSwapHorizontal,
  mdiSync,
  mdiThemeLightDark,
  mdiWeatherNight,
  mdiWeatherSunny,
} from '@mdi/js';

export const ICONS = {
  appearance: mdiThemeLightDark,
  themeLight: mdiWeatherSunny,
  themeDark: mdiWeatherNight,
  arrowRight: mdiArrowRight,
  swap: mdiSwapHorizontal,
  refresh: mdiRefresh,
  alert: mdiAlertCircleOutline,
  offline: mdiCloudOffOutline,
  pending: mdiClockOutline,
  calendarSearch: mdiCalendarSearch,
  trendUp: mdiArrowTopRight,
  trendDown: mdiArrowBottomRight,
  home: mdiHomeOutline,
  success: mdiCheckCircle,
  failed: mdiCloseCircle,
  running: mdiSync,
} as const;

export type IconName = keyof typeof ICONS;
