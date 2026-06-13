import { motion } from 'framer-motion';
import type { GameOverCause } from '../types';
import type { GameMode } from '../hooks/useGame';
import { GAME_OVER_MESSAGES, RESOURCE_ICONS } from '../config/game-config';
import { getDailyState } from '../lib/seeded-rng';

interface Props {
  score: number;
  cause: GameOverCause;
  mode: GameMode;
  durationSeconds: number;
  onReset: () => void;
  onShare: () => void;
  onLeaderboard: () => void;
  percentile?: number;
}

function getResourceFromCause(cause: GameOverCause): string {
  if (cause.startsWith('budget')) return RESOURCE_ICONS.budget;
  if (cause.startsWith('zufriedenheit')) return RESOURCE_ICONS.zufriedenheit;
  if (cause.startsWith('personal')) return RESOURCE_ICONS.personal;
  return RESOURCE_ICONS.effizienz;
}

function getCauseLabel(cause: GameOverCause): string {
  const isZero = cause.endsWith('_0');
  if (cause.startsWith('budget')) return isZero ? 'Bankrott' : 'Rechnungshof-Prüfung';
  if (cause.startsWith('zufriedenheit')) return isZero ? 'Volksaufstand' : 'Gefälligkeitsverdacht';
  if (cause.startsWith('personal')) return isZero ? 'Keine Mitarbeiter' : 'Stellenplan gesprengt';
  return isZero ? 'Aktenkollaps' : 'Übertriebene Effizienz';
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, '0')} min` : `${s} Sek.`;
}

export default function GameOver({
  score,
  cause,
  mode,
  durationSeconds,
  onReset,
  onShare,
  onLeaderboard,
  percentile = 50,
}: Props) {
  const msg = GAME_OVER_MESSAGES[cause];
  const icon = getResourceFromCause(cause);
  const label = getCauseLabel(cause);
  const { day, dateStr } = getDailyState();
  const isDaily = mode === 'daily';

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 bg-petrol/85 backdrop-blur-sm" />

      <motion.div
        className="relative w-full max-w-sm bg-cream rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Header */}
        <div className="bg-petrol px-6 py-5 text-center relative">
          {isDaily && (
            <div className="absolute top-3 right-4 bg-coral text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Akte des Tages #{day}
            </div>
          )}
          <p className="text-coral text-xs font-bold tracking-widest uppercase mb-1">
            {isDaily ? `${dateStr} · Behördlicher Bescheid` : 'Behördlicher Bescheid'}
          </p>
          <h1 className="text-white font-serif text-2xl font-black leading-tight">
            AMT MUSTERHAUSEN
          </h1>
          <p className="text-white/50 text-xs mt-1">Az.: MH-{String(score).padStart(4, '0')}</p>
        </div>

        {/* Inhalt */}
        <div className="px-6 pt-5 pb-4 text-center relative">
          <p className="text-petrol/50 text-xs font-bold tracking-widest uppercase mb-3">
            HIERMIT WIRD AMTLICH BESTÄTIGT:
          </p>

          <div className="mb-4">
            <div className="text-6xl font-serif font-black text-coral leading-none">{score}</div>
            <div className="text-petrol font-semibold text-lg">Akten überlebt</div>
          </div>

          <div className="border-t border-dashed border-petrol/20 my-4" />

          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">{icon}</span>
              <span className="text-red-500 font-bold text-sm uppercase tracking-wide">{label}</span>
            </div>
            <h2 className="text-petrol font-serif font-bold text-lg leading-snug mb-2">
              {msg.title}
            </h2>
            <p className="text-petrol/70 text-sm leading-relaxed">{msg.text}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-petrol/5 rounded-lg py-2 px-3 text-center">
              <div className="text-petrol/50 text-xs mb-0.5">Dienstzeit</div>
              <div className="text-petrol font-bold text-sm">{formatDuration(durationSeconds)}</div>
            </div>
            <div className="bg-petrol/5 rounded-lg py-2 px-3 text-center">
              <div className="text-petrol/50 text-xs mb-0.5">Besser als</div>
              <div className="text-petrol font-bold text-sm">{percentile}% aller</div>
            </div>
          </div>

          {/* Stempel-Wasserzeichen */}
          <div className="absolute top-28 right-5 rotate-[-15deg] opacity-[0.08] pointer-events-none select-none">
            <div className="border-4 border-red-600 rounded-lg px-3 py-1 text-red-600 font-serif font-black text-2xl tracking-widest">
              GAME OVER
            </div>
          </div>
        </div>

        {/* Unterschriftslinie */}
        <div className="px-6 pb-2 flex justify-between items-end text-xs text-petrol/40">
          <div>
            <div className="border-t border-petrol/30 w-28 mb-1" />
            <span>Amtsleitung Musterhausen</span>
          </div>
          <span>{new Date().toLocaleDateString('de-DE')}</span>
        </div>

        {/* Aktionen */}
        <div className="px-4 pb-4 grid grid-cols-3 gap-2 mt-1">
          <button
            onClick={onLeaderboard}
            className="bg-petrol/10 hover:bg-petrol/20 text-petrol rounded-xl py-3 text-xs font-semibold transition-colors"
          >
            🏆 Rangliste
          </button>
          <button
            onClick={onShare}
            className="bg-coral hover:bg-coral-light text-white rounded-xl py-3 text-xs font-semibold transition-colors shadow-md"
          >
            📤 Teilen
          </button>
          <button
            onClick={onReset}
            className="bg-petrol hover:bg-petrol-light text-white rounded-xl py-3 text-xs font-semibold transition-colors"
          >
            🔄 Nochmal
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
