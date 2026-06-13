
import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

const floatingItems = ['📋', '📂', '🖊️', '📎', '🗂️', '📬'];

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="relative w-full h-dvh bg-petrol flex flex-col items-center justify-center overflow-hidden">
      {/* Floating document icons */}
      {floatingItems.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 40,
            rotate: Math.random() * 40 - 20,
            opacity: 0.15,
          }}
          animate={{
            y: -60,
            rotate: Math.random() * 60 - 30,
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            delay: i * 0.8,
            repeat: Infinity,
            repeatDelay: Math.random() * 4,
            ease: 'linear',
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-8 max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo / seal */}
        <motion.div
          className="mx-auto mb-6 w-24 h-24 rounded-full border-4 border-coral flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <span className="text-4xl">🏛️</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-coral text-xs font-bold tracking-[0.3em] uppercase mb-2">
            AmtlichGut. präsentiert
          </p>
          <h1 className="text-white font-serif text-4xl font-black leading-tight mb-1">
            Amt
          </h1>
          <h1 className="text-white font-serif text-4xl font-black leading-tight mb-4">
            Musterhausen
          </h1>
          <p className="text-white/60 text-sm mb-8">Das Behörden-Planspiel</p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="bg-white/10 rounded-xl px-5 py-4 mb-8 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-3">
            So geht's:
          </p>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-coral font-bold">←</span>
              <span>Nach links wischen = Ablehnen</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">→</span>
              <span>Nach rechts wischen = Genehmigen</span>
            </li>
            <li className="flex items-start gap-2">
              <span>⚠️</span>
              <span>
                Halte alle 4 Ressourcen zwischen 0 und 100 — zu viel ist genauso schlimm wie
                zu wenig.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={onStart}
          className="w-full bg-coral hover:bg-coral-light text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Dienst antreten →
        </motion.button>

        <p className="text-white/30 text-xs mt-4">Kein Login erforderlich · Sofort spielbar</p>
      </motion.div>
    </div>
  );
}
