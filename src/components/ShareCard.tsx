import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameOverCause } from '../types';
import { shareResult, generateShareCard } from '../lib/share';
import { GAME_OVER_MESSAGES } from '../config/game-config';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  cause: GameOverCause;
  percentile: number;
}

export default function ShareCard({ isOpen, onClose, score, cause, percentile }: Props) {
  const [loading, setLoading] = useState(false);
  const msg = GAME_OVER_MESSAGES[cause];

  const handleShare = async () => {
    setLoading(true);
    try {
      await shareResult(score, cause, percentile);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await generateShareCard(score, cause, percentile);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `amt-musterhausen-${score}-akten.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-sm bg-cream rounded-2xl overflow-hidden shadow-2xl"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          >
            <div className="bg-petrol px-5 py-4 flex items-center justify-between">
              <h2 className="text-white font-serif font-bold text-xl">📤 Ergebnis teilen</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white bg-white/10 rounded-full text-sm"
              >
                ✕
              </button>
            </div>

            {/* Preview card */}
            <div className="mx-5 my-4 bg-white rounded-xl border border-cream-dark p-4 text-center shadow-sm">
              <p className="text-petrol/40 text-xs uppercase tracking-wider mb-1 font-bold">
                Amt Musterhausen · Dienstzeugnis
              </p>
              <div className="text-4xl font-serif font-black text-coral my-2">{score}</div>
              <p className="text-petrol font-semibold text-sm">Akten überlebt</p>
              <div className="border-t border-dashed border-petrol/10 my-3" />
              <p className="text-petrol/70 text-xs leading-relaxed">{msg.title}</p>
              <p className="text-petrol/50 text-xs mt-1">
                Besser als {percentile}% aller Amtsleiter
              </p>
              <p className="text-coral/70 text-xs mt-2 font-medium">amtlichgut.de/amt</p>
            </div>

            <div className="px-5 pb-5 space-y-3">
              <button
                onClick={handleShare}
                disabled={loading}
                className="w-full bg-coral hover:bg-coral-light disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <>📱 Als Story teilen</>
                )}
              </button>
              <button
                onClick={handleDownload}
                disabled={loading}
                className="w-full bg-petrol/10 hover:bg-petrol/20 disabled:opacity-50 text-petrol font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
              >
                ⬇️ Als Bild herunterladen
              </button>
              <p className="text-center text-petrol/40 text-xs">
                1080×1920 · Instagram Story Format
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
