
import type { Resources, ResourceKey } from '../types';
import { GAME_CONFIG, RESOURCE_ICONS, RESOURCE_LABELS } from '../config/game-config';

interface Props {
  resources: Resources;
}

function getBarColor(value: number): string {
  if (value <= 10 || value >= 90) return 'bg-red-500';
  if (value <= 20 || value >= 80) return 'bg-orange-400';
  if (value <= 35 || value >= 65) return 'bg-yellow-400';
  return 'bg-emerald-400';
}

function isDanger(value: number): boolean {
  return value <= GAME_CONFIG.WARNING_THRESHOLD_LOW || value >= GAME_CONFIG.WARNING_THRESHOLD_HIGH;
}

const KEYS: ResourceKey[] = ['budget', 'zufriedenheit', 'personal', 'effizienz'];

export default function ResourceBar({ resources }: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 bg-petrol/90 backdrop-blur-sm px-3 pt-2 pb-2 safe-area-top">
      <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto">
        {KEYS.map((key) => {
          const value = resources[key];
          const danger = isDanger(value);
          return (
            <div key={key} className="flex flex-col items-center gap-0.5">
              <div className={`flex items-center gap-1 ${danger ? 'pulse-danger' : ''}`}>
                <span className="text-sm leading-none">{RESOURCE_ICONS[key]}</span>
                {danger && (
                  <span className="text-red-400 text-xs font-bold leading-none">!</span>
                )}
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getBarColor(value)}`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-white/60 text-[9px] leading-none font-medium">
                {RESOURCE_LABELS[key].slice(0, 4).toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
