import type { ApexOptions } from 'apexcharts';
import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

import type { HistoryItemDto } from '@dtos/history.dto';
import { currentLanguage } from '@lib/i18n';
import { useTheme } from '@theme/ThemeProvider';
import { formatDate, formatRate, formatShortDate } from '@utils/format.util';

const SMALL_SCREEN = 640;

type ChartColors = {
  accent: string;
  divider: string;
  muted: string;
};

function readColors(): ChartColors {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string) => styles.getPropertyValue(name).trim();
  return { accent: read('--accent'), divider: read('--divider'), muted: read('--text-muted') };
}

type HistoryChartProps = {
  history: HistoryItemDto[];

  /** Moeda de destino, mostrada no tooltip ao lado do valor. */
  to: string;
};

/**
 * Gráfico de área do histórico com o ApexCharts, nas cores do tema ativo.
 *
 * Carregado com `lazy()` para o ApexCharts só entrar na página de Histórico. As cores
 * são relidas das variáveis CSS quando o tema muda.
 *
 * @example
 * ```tsx
 * <HistoryChart history={data.history} to="BRL" />
 * ```
 */
export default function HistoryChart({ history, to }: HistoryChartProps) {
  const { dark } = useTheme();
  useTranslation();
  const language = currentLanguage();
  const [colors, setColors] = useState(readColors);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setColors(readColors()));
    return () => cancelAnimationFrame(frame);
  }, [dark]);

  const series = useMemo(
    () => [{ name: to, data: history.map(({ date, rate }) => ({ x: date, y: rate })) }],
    [history, to],
  );

  const options = useMemo<ApexOptions>(() => {
    const labelStyle = { colors: colors.muted, fontSize: '13px' };
    const rates = history.map(({ rate }) => rate);

    return {
      chart: {
        type: 'area',
        fontFamily: 'inherit',
        background: 'transparent',
        toolbar: { show: false },
        zoom: { enabled: false },
        parentHeightOffset: 0,
      },
      colors: [colors.accent],
      stroke: { curve: 'smooth', width: 2.5 },
      fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 0, opacityFrom: 0.3, opacityTo: 0, stops: [0, 100] },
      },
      dataLabels: { enabled: false },
      grid: {
        borderColor: colors.divider,
        xaxis: { lines: { show: false } },
        padding: { left: 8, right: 16 },
      },
      xaxis: {
        type: 'category',
        tickAmount: 2,
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        labels: {
          rotate: 0,
          hideOverlappingLabels: true,
          style: labelStyle,
          formatter: (value: string) => (value ? formatDate(value, language) : ''),
        },
      },
      yaxis: {
        tickAmount: 2,
        forceNiceScale: false,
        min: Math.min(...rates),
        max: Math.max(...rates),
        labels: { style: labelStyle, formatter: (value: number) => formatRate(value, language) },
      },
      tooltip: {
        theme: dark ? 'dark' : 'light',
        x: {
          formatter: (_value, opts) => {
            const point = history[opts?.dataPointIndex ?? -1];
            return point ? formatDate(point.date, language) : '';
          },
        },
        y: { formatter: (value: number) => `${formatRate(value, language)} ${to}` },
      },
      legend: { show: false },
      responsive: [
        {
          breakpoint: SMALL_SCREEN,
          options: {
            xaxis: {
              labels: {
                formatter: (value: string) => (value ? formatShortDate(value, language) : ''),
              },
            },
          },
        },
      ],
    };
  }, [colors, dark, history, to, language]);

  return <Chart type="area" height={280} series={series} options={options} />;
}
