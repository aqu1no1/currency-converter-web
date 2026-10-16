import { HERO_COINS, HERO_FLOW_POINTS, HERO_GLYPHS } from '@constants/home.constants';

/**
 * Linha de cotação e símbolos de moeda flutuando atrás do hero. São decorativos e param com
 * "reduzir movimento".
 *
 * @example
 * ```tsx
 * <HeroSymbols />
 * ```
 */
export function HeroSymbols() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute bottom-27 left-0 h-45 w-full text-mint"
      >
        <polyline
          points={HERO_FLOW_POINTS}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.22}
          strokeWidth={2}
          strokeDasharray="6 10"
          vectorEffect="non-scaling-stroke"
          className="animate-flow"
        />
      </svg>
      {HERO_GLYPHS.map((glyph) => (
        <span
          key={glyph.symbol}
          className="absolute animate-drift font-display leading-none font-semibold text-white/6"
          style={{
            left: glyph.left,
            top: glyph.top,
            fontSize: glyph.fontSize,
            animationDelay: glyph.delay,
          }}
        >
          {glyph.symbol}
        </span>
      ))}
      {HERO_COINS.map((coin) => (
        <span
          key={coin.symbol}
          className="absolute flex animate-float items-center justify-center rounded-full border-2 border-mint/35 font-display font-semibold text-mint/60"
          style={{
            left: coin.left,
            top: coin.top,
            width: coin.size,
            height: coin.size,
            fontSize: coin.fontSize,
            animationDelay: coin.delay,
            animationDuration: coin.duration,
          }}
        >
          {coin.symbol}
        </span>
      ))}
    </div>
  );
}
