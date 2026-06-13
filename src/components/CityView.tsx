
import type { Resources } from '../types';

interface Props {
  resources: Resources;
}

export default function CityView({ resources }: Props) {
  const budgetLow = resources.budget < 30;
  const budgetCritical = resources.budget < 15;
  const unhappy = resources.zufriedenheit < 30;
  const veryUnhappy = resources.zufriedenheit < 15;
  const understaffed = resources.personal < 30;
  const chaotic = resources.effizienz < 30;

  const skyColor = budgetCritical ? '#6B7280' : budgetLow ? '#94A3B8' : '#87CEEB';
  const buildingTone = budgetCritical ? '#9CA3AF' : budgetLow ? '#B0B8C4' : '#E8D5B7';
  const rathausColor = budgetLow ? '#8B9DB0' : '#C4956A';
  const roofColor = budgetCritical ? '#6B7280' : '#B85C38';

  return (
    <div className="absolute inset-0 z-0">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full city-svg"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyColor} />
            <stop offset="100%" stopColor={budgetLow ? '#CBD5E1' : '#E0F0FF'} />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chaotic ? '#78350F' : '#4A7C59'} />
            <stop offset="100%" stopColor={chaotic ? '#92400E' : '#2D5A3D'} />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="400" height="220" fill="url(#skyGrad)" />

        {/* Clouds */}
        {!budgetCritical && (
          <>
            <ellipse cx="60" cy="40" rx="30" ry="14" fill="white" opacity="0.7" />
            <ellipse cx="80" cy="34" rx="22" ry="12" fill="white" opacity="0.7" />
            <ellipse cx="300" cy="55" rx="25" ry="11" fill="white" opacity="0.6" />
            <ellipse cx="320" cy="50" rx="18" ry="10" fill="white" opacity="0.6" />
          </>
        )}

        {/* Ground */}
        <rect x="0" y="220" width="400" height="80" fill="url(#groundGrad)" />

        {/* Street */}
        <rect x="0" y="230" width="400" height="20" fill="#4B5563" />
        {/* Lane marking */}
        <rect x="60" y="238" width="30" height="4" fill="#FCD34D" opacity="0.6" rx="2" />
        <rect x="130" y="238" width="30" height="4" fill="#FCD34D" opacity="0.6" rx="2" />
        <rect x="200" y="238" width="30" height="4" fill="#FCD34D" opacity="0.6" rx="2" />
        <rect x="270" y="238" width="30" height="4" fill="#FCD34D" opacity="0.6" rx="2" />
        <rect x="340" y="238" width="30" height="4" fill="#FCD34D" opacity="0.6" rx="2" />

        {/* ─── Left house ─── */}
        <rect x="18" y="160" width="60" height="65" fill={buildingTone} />
        <polygon points="18,160 78,160 48,130" fill={roofColor} />
        {/* Windows */}
        <rect x="27" y="170" width="14" height="14" fill={understaffed ? '#374151' : '#93C5FD'} rx="1" />
        <rect x="48" y="170" width="14" height="14" fill={understaffed ? '#374151' : '#93C5FD'} rx="1" />
        <rect x="27" y="192" width="14" height="14" fill={understaffed ? '#374151' : '#FDE68A'} rx="1" />
        <rect x="48" y="192" width="14" height="14" fill={understaffed ? '#374151' : '#FDE68A'} rx="1" />
        {/* Door */}
        <rect x="38" y="208" width="20" height="17" fill="#78350F" rx="1" />

        {/* ─── Church / Kirche ─── */}
        <rect x="95" y="155" width="45" height="70" fill={buildingTone} />
        <polygon points="95,155 140,155 117,120" fill={roofColor} />
        {/* Steeple */}
        <rect x="111" y="105" width="12" height="20" fill={roofColor} />
        <polygon points="111,105 123,105 117,88" fill={roofColor} />
        {/* Cross */}
        <rect x="115" y="80" width="4" height="12" fill={budgetLow ? '#9CA3AF' : '#F3F4F6'} />
        <rect x="112" y="84" width="10" height="3" fill={budgetLow ? '#9CA3AF' : '#F3F4F6'} />
        {/* Church window (arch) */}
        <rect x="109" y="163" width="16" height="20" fill={understaffed ? '#374151' : '#C4B5FD'} rx="8 8 0 0" />
        {/* Church door */}
        <rect x="108" y="200" width="16" height="25" fill="#78350F" rx="8 8 0 0" />

        {/* ─── RATHAUS (main building, center) ─── */}
        <rect x="155" y="130" width="90" height="95" fill={rathausColor} />
        {/* Columns */}
        <rect x="162" y="155" width="8" height="70" fill={budgetLow ? '#9CA3AF' : '#D4A574'} />
        <rect x="178" y="155" width="8" height="70" fill={budgetLow ? '#9CA3AF' : '#D4A574'} />
        <rect x="214" y="155" width="8" height="70" fill={budgetLow ? '#9CA3AF' : '#D4A574'} />
        <rect x="230" y="155" width="8" height="70" fill={budgetLow ? '#9CA3AF' : '#D4A574'} />
        {/* Rathaus roof / pediment */}
        <polygon points="155,130 245,130 200,105" fill={roofColor} />
        {/* Rathaus roof top / triangle detail */}
        <rect x="180" y="105" width="40" height="4" fill={budgetLow ? '#6B7280' : '#92400E'} />
        {/* Flag pole */}
        <rect x="199" y="75" width="3" height="32" fill={budgetLow ? '#9CA3AF' : '#78350F'} />
        {/* Flag */}
        <rect x="202" y="75" width="20" height="13" fill={budgetLow ? '#6B7280' : '#1A3A3A'} />
        <rect x="202" y="75" width="20" height="4" fill={budgetLow ? '#6B7280' : '#F26C4F'} />

        {/* Clock on Rathaus */}
        <circle cx="200" cy="145" r="12" fill={budgetLow ? '#6B7280' : '#F3F4F6'} />
        <circle cx="200" cy="145" r="10" fill={budgetLow ? '#4B5563' : 'white'} />
        <line x1="200" y1="145" x2="200" y2="138" stroke="#1A3A3A" strokeWidth="2" strokeLinecap="round" />
        <line x1="200" y1="145" x2="205" y2="145" stroke="#1A3A3A" strokeWidth="1.5" strokeLinecap="round" />

        {/* Rathaus windows */}
        <rect x="166" y="162" width="18" height="16" fill={understaffed ? '#374151' : '#93C5FD'} rx="1" />
        <rect x="192" y="162" width="18" height="16" fill={understaffed ? '#374151' : '#93C5FD'} rx="1" />
        <rect x="218" y="162" width="18" height="16" fill={understaffed ? '#374151' : '#93C5FD'} rx="1" />
        <rect x="166" y="186" width="18" height="16" fill={understaffed ? '#374151' : '#FDE68A'} rx="1" />
        <rect x="218" y="186" width="18" height="16" fill={understaffed ? '#374151' : '#FDE68A'} rx="1" />

        {/* Main Rathaus door */}
        <rect x="188" y="200" width="24" height="25" fill="#78350F" rx="2 2 0 0" />
        <circle cx="209" cy="213" r="2" fill="#FCD34D" />

        {/* Steps */}
        <rect x="176" y="222" width="48" height="5" fill="#D1D5DB" />
        <rect x="182" y="218" width="36" height="5" fill="#E5E7EB" />

        {/* ─── Right building ─── */}
        <rect x="262" y="148" width="55" height="77" fill={buildingTone} />
        <rect x="262" y="140" width="55" height="10" fill={roofColor} />
        {/* Windows */}
        <rect x="270" y="158" width="14" height="14" fill={understaffed ? '#374151' : '#93C5FD'} rx="1" />
        <rect x="292" y="158" width="14" height="14" fill={understaffed ? '#374151' : '#93C5FD'} rx="1" />
        <rect x="270" y="180" width="14" height="14" fill={understaffed ? '#374151' : '#FDE68A'} rx="1" />
        <rect x="292" y="180" width="14" height="14" fill={understaffed ? '#374151' : '#FDE68A'} rx="1" />
        <rect x="270" y="202" width="14" height="14" fill={understaffed ? '#374151' : '#FDE68A'} rx="1" />
        <rect x="292" y="202" width="14" height="14" fill={understaffed ? '#374151' : '#93C5FD'} rx="1" />
        {/* Door */}
        <rect x="278" y="208" width="20" height="17" fill="#78350F" rx="1" />

        {/* ─── Far right small house ─── */}
        <rect x="330" y="170" width="52" height="55" fill={buildingTone} />
        <polygon points="330,170 382,170 356,145" fill={roofColor} />
        <rect x="338" y="180" width="14" height="14" fill={understaffed ? '#374151' : '#FDE68A'} rx="1" />
        <rect x="358" y="180" width="14" height="14" fill={understaffed ? '#374151' : '#93C5FD'} rx="1" />
        <rect x="347" y="200" width="16" height="25" fill="#78350F" rx="1" />

        {/* ─── Trees ─── */}
        <rect x="136" y="205" width="6" height="25" fill="#92400E" />
        <ellipse cx="139" cy="200" rx="14" ry="18" fill={chaotic ? '#6B7280' : '#2D6A4F'} />

        <rect x="310" y="208" width="6" height="22" fill="#92400E" />
        <ellipse cx="313" cy="203" rx="13" ry="16" fill={chaotic ? '#6B7280' : '#2D6A4F'} />

        {/* ─── Paper stacks (chaotic effizienz) ─── */}
        {chaotic && (
          <g>
            <rect x="165" y="118" width="15" height="2" fill="#FEF3C7" opacity="0.9" />
            <rect x="163" y="114" width="15" height="2" fill="#FEF3C7" opacity="0.8" />
            <rect x="166" y="110" width="15" height="2" fill="#FEF3C7" opacity="0.7" />
            <rect x="162" y="106" width="15" height="2" fill="#FEF3C7" opacity="0.6" />
            <rect x="165" y="102" width="15" height="2" fill="#FEF3C7" opacity="0.5" />
          </g>
        )}

        {/* ─── Citizens ─── */}
        {/* Happy/neutral citizen left */}
        {!veryUnhappy && (
          <g>
            <circle cx="50" cy="226" r="5" fill="#FBBF24" />
            <rect x="47" y="231" width="6" height="8" fill="#3B82F6" />
          </g>
        )}

        {/* Unhappy protest citizen */}
        {unhappy && (
          <g>
            <circle cx="170" cy="226" r="5" fill="#FBBF24" />
            <rect x="167" y="231" width="6" height="8" fill="#EF4444" />
            {/* Protest sign */}
            <rect x="173" y="218" width="2" height="14" fill="#78350F" />
            <rect x="175" y="218" width="16" height="8" fill="#FEF2F2" />
            <text x="176" y="225" fontSize="4" fill="#EF4444" fontWeight="bold">NEIN!</text>
          </g>
        )}

        {/* Very unhappy: torches */}
        {veryUnhappy && (
          <g>
            <circle cx="145" cy="225" r="5" fill="#FBBF24" />
            <rect x="142" y="230" width="6" height="8" fill="#EF4444" />
            <rect x="147" y="215" width="2" height="16" fill="#78350F" />
            <ellipse cx="148" cy="213" rx="4" ry="5" fill="#F97316" opacity="0.9" />
            <ellipse cx="148" cy="211" rx="2" ry="3" fill="#FCD34D" opacity="0.8" />
          </g>
        )}

        {/* Normal citizen right */}
        <circle cx="340" cy="226" r="5" fill="#FBBF24" />
        <rect x="337" y="231" width="6" height="8" fill="#6B7280" />

        {/* Crumbling effects when budget critical */}
        {budgetCritical && (
          <g opacity="0.6">
            <rect x="175" y="135" width="4" height="6" fill="#6B7280" transform="rotate(15 175 135)" />
            <rect x="230" y="140" width="3" height="5" fill="#6B7280" transform="rotate(-10 230 140)" />
            <rect x="22" y="170" width="3" height="4" fill="#9CA3AF" transform="rotate(20 22 170)" />
          </g>
        )}

        {/* Overlay tint for very bad states */}
        {budgetCritical && (
          <rect x="0" y="0" width="400" height="300" fill="#1F2937" opacity="0.25" />
        )}
      </svg>

      {/* Dark overlay for game feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-petrol/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
