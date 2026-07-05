/**
 * Portrait variant of the bridge for mobile: the deck runs vertically down
 * the center, with two pylons extending to alternating sides. Proportions are
 * relative (preserveAspectRatio="none") so the drawing stretches with the
 * mobile scene container.
 */
const W = 400;
const H = 1400;
const DECK_X = 200;

// [tower y, tip x] — first pylon points left, second points right
const TOWERS: Array<{ y: number; tipX: number }> = [
  { y: 420, tipX: 42 },
  { y: 980, tipX: 358 },
];

// deck anchor y-positions for each tower's cable fan
const FANS: number[][] = [
  [150, 240, 330, 520, 600, 670],
  [730, 800, 880, 1070, 1160, 1250],
];

export default function BridgeSvgVertical({ className }: { className?: string }) {
  const cables = TOWERS.flatMap((tower, ti) =>
    FANS[ti].map((ay) => ({
      d: `M ${tower.tipX + (ti === 0 ? 4 : -4)} ${tower.y} L ${DECK_X} ${ay}`,
      key: `${ti}-${ay}`,
    }))
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="deckGradV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a5b8ff" />
          <stop offset="0.5" stopColor="#8b8cf8" />
          <stop offset="1" stopColor="#4cc9f0" />
        </linearGradient>
        <linearGradient id="towerGradL" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#232a4d" />
          <stop offset="1" stopColor="#8f9cf5" />
        </linearGradient>
        <linearGradient id="towerGradR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#232a4d" />
          <stop offset="1" stopColor="#8f9cf5" />
        </linearGradient>
      </defs>

      {/* static cables */}
      <g stroke="#8a97e8" strokeOpacity="0.3" strokeWidth="1.5">
        {cables.map((c) => (
          <path key={c.key} d={c.d} />
        ))}
      </g>

      {/* light trails */}
      <g strokeWidth="1.8" strokeLinecap="round">
        {cables.map((c, i) => (
          <path
            key={`light-${c.key}`}
            d={c.d}
            pathLength={100}
            className="cable-light"
            stroke={i % 2 === 0 ? "#93c5fd" : "#c4b5fd"}
            strokeOpacity="0.8"
            style={{ animationDelay: `${(i * 0.83) % 6.5}s` }}
          />
        ))}
      </g>

      {/* pylons */}
      {TOWERS.map((tower, ti) => {
        const left = ti === 0;
        const baseX = DECK_X + (left ? 10 : -10);
        return (
          <g key={ti}>
            <path
              d={`M ${tower.tipX} ${tower.y - 4} L ${tower.tipX} ${tower.y + 4} L ${baseX} ${tower.y + 10} L ${baseX} ${tower.y - 10} Z`}
              fill={left ? "url(#towerGradL)" : "url(#towerGradR)"}
            />
            {/* crossbeam on the far side of the deck */}
            <rect
              x={DECK_X + (left ? -15 : 10)}
              y={tower.y - 16}
              width="5"
              height="32"
              rx="2.5"
              fill="#39406e"
            />
            {/* beacon at the tip */}
            <circle
              cx={tower.tipX + (left ? -5 : 5)}
              cy={tower.y}
              r="3.5"
              fill="#c4b5fd"
              className="animate-beacon"
            />
          </g>
        );
      })}

      {/* deck — luminous edge alongside a dark roadway, running vertically */}
      <rect x={DECK_X - 8} y="0" width="3.5" height={H} fill="url(#deckGradV)" />
      <rect x={DECK_X - 4.5} y="0" width="9" height={H} fill="#0d1330" />
      <rect x={DECK_X + 4.5} y="0" width="2" height={H} fill="#1b2350" />
      {/* lane dashes */}
      <line
        x1={DECK_X}
        y1="0"
        x2={DECK_X}
        y2={H}
        stroke="#ffffff"
        strokeOpacity="0.14"
        strokeWidth="1.4"
        strokeDasharray="20 26"
      />
    </svg>
  );
}
