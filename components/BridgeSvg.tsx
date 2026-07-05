const TOWERS = [470, 1130];
const DECK_Y = 392;
const TOWER_TOP = 160;
const WATER_Y = 480;

// deck anchor x-positions for the cable fans, per tower
const FANS: Record<number, number[]> = {
  470: [60, 165, 270, 370, 560, 640, 720, 795],
  1130: [805, 880, 960, 1040, 1230, 1335, 1440, 1540],
};

function cablePath(towerX: number, anchorX: number) {
  return `M ${towerX} ${TOWER_TOP + 4} L ${anchorX} ${DECK_Y}`;
}

export default function BridgeSvg({ className }: { className?: string }) {
  const cables = TOWERS.flatMap((tx) =>
    FANS[tx].map((ax) => ({ d: cablePath(tx, ax), key: `${tx}-${ax}` }))
  );

  return (
    <svg
      viewBox="0 0 1600 620"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="deckGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a5b8ff" />
          <stop offset="0.5" stopColor="#8b8cf8" />
          <stop offset="1" stopColor="#4cc9f0" />
        </linearGradient>
        <linearGradient id="towerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f9cf5" />
          <stop offset="1" stopColor="#232a4d" />
        </linearGradient>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="transparent" />
          <stop offset="0.2" stopColor="#4a5aa8" stopOpacity="0.5" />
          <stop offset="0.8" stopColor="#2fa8c9" stopOpacity="0.5" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="reflectionFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.25" stopColor="white" stopOpacity="0.14" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="reflectionMask">
          <rect x="0" y={WATER_Y} width="1600" height={620 - WATER_Y} fill="url(#reflectionFade)" />
        </mask>
        <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ---- main bridge ---- */}
      <g id="bridge-main">
        {/* static cables */}
        <g stroke="#8a97e8" strokeOpacity="0.3" strokeWidth="1.5">
          {cables.map((c) => (
            <path key={c.key} d={c.d} />
          ))}
        </g>

        {/* light trails running along the cables */}
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

        {/* towers */}
        {TOWERS.map((tx) => (
          <g key={tx}>
            <path
              d={`M ${tx - 4} ${TOWER_TOP} L ${tx + 4} ${TOWER_TOP} L ${tx + 10} ${WATER_Y} L ${tx - 10} ${WATER_Y} Z`}
              fill="url(#towerGrad)"
            />
            {/* crossbeam just under the deck */}
            <rect x={tx - 16} y={DECK_Y + 10} width="32" height="5" rx="2.5" fill="#39406e" />
            {/* beacon at the tip */}
            <circle
              cx={tx}
              cy={TOWER_TOP - 5}
              r="3.5"
              fill="#c4b5fd"
              filter="url(#softGlow)"
              className="animate-beacon"
            />
          </g>
        ))}

        {/* deck — a luminous edge over a dark roadway */}
        <rect x="0" y={DECK_Y} width="1600" height="3.5" fill="url(#deckGrad)" />
        <rect x="0" y={DECK_Y + 3.5} width="1600" height="9" fill="#0d1330" />
        <rect x="0" y={DECK_Y + 12.5} width="1600" height="2" fill="#1b2350" />
        {/* faint lane dashes */}
        <line
          x1="0"
          y1={DECK_Y + 8}
          x2="1600"
          y2={DECK_Y + 8}
          stroke="#ffffff"
          strokeOpacity="0.14"
          strokeWidth="1.4"
          strokeDasharray="20 26"
        />
      </g>

      {/* ---- water ---- */}
      <rect x="0" y={WATER_Y - 1} width="1600" height="2" fill="url(#waterGrad)" />

      {/* reflection, mirrored about the waterline */}
      <g transform={`translate(0 ${WATER_Y * 2}) scale(1 -1)`} mask="url(#reflectionMask)">
        <g stroke="#8a97e8" strokeOpacity="0.35" strokeWidth="1.5">
          {cables.map((c) => (
            <path key={`r-${c.key}`} d={c.d} />
          ))}
        </g>
        {TOWERS.map((tx) => (
          <path
            key={`rt-${tx}`}
            d={`M ${tx - 4} ${TOWER_TOP} L ${tx + 4} ${TOWER_TOP} L ${tx + 10} ${WATER_Y} L ${tx - 10} ${WATER_Y} Z`}
            fill="url(#towerGrad)"
          />
        ))}
        <rect x="0" y={DECK_Y} width="1600" height="4" fill="url(#deckGrad)" />
      </g>
    </svg>
  );
}
