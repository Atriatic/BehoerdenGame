import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LS_KEY = 'amt_tutorial_seen';

export default function SwipeTutorial() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(LS_KEY)) {
        setVisible(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(LS_KEY, '1');
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 z-25 flex flex-col items-center justify-center pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          {/* Halbtransparenter Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

          <div className="relative z-10 text-center px-8 max-w-xs">
            {/* Animierte Hand */}
            <motion.div
              className="text-5xl mb-4"
              animate={{ x: [-40, 40, -40] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              👆
            </motion.div>

            {/* Swipe-Illustration */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-16 bg-red-500/80 rounded-xl flex items-center justify-center text-white font-black text-xl">
                  ←
                </div>
                <span className="text-white/80 text-xs font-semibold">Ablehnen</span>
              </div>

              <div className="w-10 h-[2px] bg-white/20 rounded" />

              <div className="w-16 h-20 bg-cream/90 rounded-2xl border-2 border-white/30 flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>

              <div className="w-10 h-[2px] bg-white/20 rounded" />

              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-16 bg-emerald-500/80 rounded-xl flex items-center justify-center text-white font-black text-xl">
                  →
                </div>
                <span className="text-white/80 text-xs font-semibold">Genehmigen</span>
              </div>
            </div>

            <p className="text-white font-semibold text-base mb-2">
              Karte nach links oder rechts wischen
            </p>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Halte alle Ressourcen zwischen 0 und 100.
              Zu viel ist genauso gefährlich wie zu wenig.
            </p>

            <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white/80 text-sm font-medium">
              Tippe irgendwo zum Starten
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
