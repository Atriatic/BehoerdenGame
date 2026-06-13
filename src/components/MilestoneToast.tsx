import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Toast {
  id: number;
  message: string;
  emoji: string;
}

interface Props {
  score: number;
}

const MILESTONES: Record<number, { emoji: string; message: string }> = {
  10: { emoji: '📋', message: '10 Akten! Der Stapel wächst.' },
  25: { emoji: '💪', message: '25 Akten! Musterhausen vertraut dir.' },
  50: { emoji: '🏆', message: '50 Akten! Du bist eine Legende.' },
  75: { emoji: '🌟', message: '75 Akten! Hat das Amt Sie vereinnahmt?' },
  100: { emoji: '🎖️', message: '100 Akten! Tatort Verwaltung.' },
  150: { emoji: '👴', message: '150 Akten! Ihr Dienstjubiläum naht.' },
  200: { emoji: '🏛️', message: '200 Akten! Sie SIND das Amt.' },
};

let toastId = 0;

export default function MilestoneToast({ score }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const milestone = MILESTONES[score];
    if (milestone) {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, ...milestone }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    }
  }, [score]);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="bg-petrol text-white rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2 max-w-xs"
          >
            <span className="text-xl">{toast.emoji}</span>
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
