import { motion } from 'framer-motion';
import type { GameMode } from '../hooks/useGame';
import { getDailyState } from '../lib/seeded-rng';
import { hasDailyBeenPlayed, getDailyHighScore } from '../lib/daily';

interface Props {
  onStart: (mode: GameMode) => void;
}

const floatingItems = ['📋', '📂', '🖊️', '📎', '🗂️', '📬'];

export default function StartScreen({ onStart }: Props) {
  const { day, dateStr } = getDailyState();
  const alreadyPlayed = hasDailyBeenPlayed();
  const dailyHighScore = getDailyHighScore();

  return (
    <div className="relative w-full h-dvh bg-petrol flex flex-col items-center justify-center overflow-hidden">
      {/* Schwebende Dokument-Icons */}
      {floatingItems.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 40,
            rotate: Math.random() * 40 - 20,
            opacity: 0.12,
          }}
          animate={{ y: -60, rotate: Math.random() * 60 - 30 }}
          transition={{
            duration: 7 + Math.random() * 6,
            delay: i * 0.9,
            repeat: Infinity,
            repeatDelay: Math.random() * 4,
            ease: 'linear',
          }}
        >
          {icon}
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 text-center px-6 max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Siegel */}
        <motion.div
          className="mx-auto mb-5 w-20 h-20 rounded-full border-4 border-coral flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <span className="text-3xl">🏛️</span>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <p className="text-coral text-xs font-bold tracking-[0.3em] uppercase mb-1">
            AmtlichGut. präsentiert
          </p>
          <h1 className="text-white font-serif text-4xl font-black leading-tight">
            Amt Musterhausen
          </h1>
          <p className="text-white/50 text-sm mt-1 mb-6">Das Behörden-Planspiel</p>
        </motion.div>

        {/* Modus-Auswahl */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          {/* Akte des Tages */}
          <button
            onClick={() => onStart('daily')}
            className="w-full bg-coral hover:bg-coral-light text-white rounded-2xl p-4 text-left transition-colors shadow-lg group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold tracking-widest uppercase opacity-80">
                📅 Akte des Tages
              </span>
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                #{day}
              </span>
            </div>
            <div className="font-serif font-bold text-lg leading-tight">
              {dateStr} · Gleiche Karten für alle
            </div>
            {alreadyPlayed && dailyHighScore !== null && (
              <div className="mt-2 text-xs opacity-80 font-medium">
                ✅ Heute gespielt · Bestes Ergebnis: {dailyHighScore} Akten
              </div>
            )}
            {!alreadyPlayed && (
              <div className="mt-2 text-xs opacity-70">Vergleich mit allen anderen möglich →</div>
            )}
          </button>

          {/* Freies Spiel */}
          <button
            onClick={() => onStart('endless')}
            className="w-full bg-white/10 hover:bg-white/20 text-white rounded-2xl p-4 text-left transition-colors border border-white/20"
          >
            <div className="text-xs font-bold tracking-widest uppercase opacity-60 mb-1">
              🎲 Freies Spiel
            </div>
            <div className="font-semibold text-base leading-tight">
              Zufällige Karten · Endlos
            </div>
            <div className="text-xs opacity-50 mt-1">Kein Score-Vergleich</div>
          </button>
        </motion.div>

        {/* Kurzanleitung */}
        <motion.div
          className="mt-5 bg-white/5 rounded-xl px-4 py-3 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ul className="space-y-1.5 text-white/60 text-xs">
            <li className="flex gap-2">
              <span className="text-red-400 font-bold shrink-0">←</span>
              <span>Ablehnen — Karte nach links wischen</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold shrink-0">→</span>
              <span>Genehmigen — Karte nach rechts wischen</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0">⚠️</span>
              <span>Zu viel ist genauso schlimm wie zu wenig</span>
            </li>
          </ul>
        </motion.div>

        <p className="text-white/20 text-xs mt-4">Kein Login · Sofort spielbar</p>
      </motion.div>
    </div>
  );
}
