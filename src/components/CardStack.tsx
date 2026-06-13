import { useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import type { Card, ResourceKey, CardCategory } from '../types';
import { GAME_CONFIG, RESOURCE_ICONS } from '../config/game-config';
import { soundManager } from '../lib/sound';

interface Props {
  card: Card;
  onSwipe: (direction: 'left' | 'right') => void;
  isAnimating: boolean;
}

const CHARACTER_ICONS: Record<string, string> = {
  Klaus: '🖨️',
  Müller: '🌿',
  Bürgermeister: '🏅',
};

const CATEGORY_CONFIG: Record<CardCategory, { label: string; color: string }> = {
  buerger: { label: 'Bürgerantrag', color: '#3B82F6' },
  personal: { label: 'Personalwesen', color: '#8B5CF6' },
  politik: { label: 'Politisch', color: '#F59E0B' },
  krisen: { label: 'Krise!', color: '#EF4444' },
  absurditaeten: { label: 'Sonderfall', color: '#10B981' },
};

function getHints(card: Card, direction: 'left' | 'right') {
  const effects = direction === 'left' ? card.leftOption.effects : card.rightOption.effects;
  const keys: ResourceKey[] = ['budget', 'zufriedenheit', 'personal', 'effizienz'];
  return keys
    .filter((k) => Math.abs(effects[k]) > 0)
    .map((k) => ({
      resource: k,
      size: Math.abs(effects[k]) > GAME_CONFIG.HINT_WEAK_MAX ? 'large' : 'small',
    }));
}

function triggerHaptic(type: 'approve' | 'reject') {
  try {
    if (navigator.vibrate) {
      navigator.vibrate(type === 'approve' ? [30] : [15, 10, 15]);
    }
  } catch {
    // Ignore
  }
}

export default function CardStack({ card, onSwipe, isAnimating }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const leftOpacity = useTransform(x, [-80, -20, 0], [1, 0.4, 0]);
  const rightOpacity = useTransform(x, [0, 20, 80], [0, 0.4, 1]);
  const [showStamp, setShowStamp] = useState<'approve' | 'reject' | null>(null);
  const [dragX, setDragX] = useState(0);

  // Responsive Kartengröße
  const cardWidth = Math.min(320, window.innerWidth - 40);
  const cardHeight = Math.min(440, window.innerHeight * 0.56);

  const cat = CATEGORY_CONFIG[card.category];

  const triggerSwipe = useCallback(
    async (direction: 'left' | 'right') => {
      if (isAnimating) return;
      const stampType = direction === 'right' ? 'approve' : 'reject';
      setShowStamp(stampType);

      if (direction === 'right') {
        soundManager.playApprove();
        triggerHaptic('approve');
      } else {
        soundManager.playReject();
        triggerHaptic('reject');
      }

      await animate(x, direction === 'right' ? 500 : -500, { duration: 0.35, ease: 'easeIn' });
      setShowStamp(null);
      x.set(0);
      setDragX(0);
      onSwipe(direction);
    },
    [isAnimating, x, onSwipe]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      if (Math.abs(info.offset.x) > GAME_CONFIG.DRAG_DECISION_THRESHOLD) {
        triggerSwipe(info.offset.x > 0 ? 'right' : 'left');
      } else {
        animate(x, 0, { type: 'spring', stiffness: 300, damping: 25 });
        setDragX(0);
      }
    },
    [triggerSwipe, x]
  );

  // Keyboard-Navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') triggerSwipe('left');
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') triggerSwipe('right');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [triggerSwipe]);

  const hintDirection =
    Math.abs(dragX) > GAME_CONFIG.HINT_SHOW_THRESHOLD
      ? dragX < 0 ? 'left' : 'right'
      : null;

  const hints = hintDirection ? getHints(card, hintDirection) : [];

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
         style={{ paddingTop: '72px', paddingBottom: '24px' }}>
      {/* Ghost cards */}
      <div
        className="absolute rounded-2xl bg-white/20 border border-white/20"
        style={{ width: cardWidth, height: cardHeight, transform: 'translateY(14px) scale(0.95)', zIndex: 1 }}
      />
      <div
        className="absolute rounded-2xl bg-white/10 border border-white/10"
        style={{ width: cardWidth, height: cardHeight, transform: 'translateY(26px) scale(0.90)', zIndex: 0 }}
      />

      {/* Hauptkarte */}
      <motion.div
        key={card.id}
        className="absolute no-select pointer-events-auto"
        style={{ x, rotate, zIndex: 10, width: cardWidth, touchAction: 'none' }}
        initial={{ y: 28, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        onDrag={(_, info) => setDragX(info.offset.x)}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* Stempel-Labels */}
        <motion.div
          className="absolute left-3 top-5 z-20 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-lg border-2 border-red-700 rotate-[-15deg] tracking-wider"
          style={{ opacity: leftOpacity }}
        >
          ABGELEHNT
        </motion.div>
        <motion.div
          className="absolute right-3 top-5 z-20 bg-emerald-500 text-white text-sm font-black px-3 py-1.5 rounded-lg border-2 border-emerald-700 rotate-[15deg] tracking-wider"
          style={{ opacity: rightOpacity }}
        >
          GENEHMIGT
        </motion.div>

        {/* Karte */}
        <div
          className="bg-cream rounded-2xl card-shadow overflow-hidden flex flex-col"
          style={{ height: cardHeight }}
        >
          {/* Kategorie-Farbstreifen */}
          <div style={{ height: 4, backgroundColor: cat.color }} />

          {/* Header */}
          <div className="bg-petrol px-5 pt-4 pb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ backgroundColor: cat.color + '30', color: cat.color }}
              >
                {cat.label}
              </span>
              {card.character && (
                <span className="text-lg" title={card.character}>
                  {CHARACTER_ICONS[card.character] ?? '👤'}
                </span>
              )}
            </div>
            <h2 className="text-white font-serif text-lg leading-tight">{card.title}</h2>
          </div>

          {/* Situationstext */}
          <div className="px-5 pt-3 pb-2 flex-1 overflow-hidden">
            <p className="text-petrol text-sm leading-relaxed line-clamp-5">{card.situation}</p>
          </div>

          {/* Icon-Hints */}
          <div className="px-5 pb-2 min-h-[34px] flex items-center justify-center gap-4">
            {hints.map((h) => (
              <div key={h.resource} className="flex flex-col items-center gap-0.5">
                <span className="text-sm">{RESOURCE_ICONS[h.resource]}</span>
                <div
                  className={`rounded-full bg-petrol/60 transition-all ${
                    h.size === 'large' ? 'w-3 h-3' : 'w-1.5 h-1.5'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Optionen */}
          <div className="border-t border-cream-dark" />
          <div className="grid grid-cols-2 divide-x divide-cream-dark flex-shrink-0">
            <button
              className="py-3.5 px-3 text-left text-xs font-medium text-petrol/70 hover:bg-red-50 active:bg-red-100 transition-colors leading-snug"
              onClick={() => triggerSwipe('left')}
            >
              <span className="text-red-500 font-bold mr-1">←</span>
              {card.leftOption.label}
            </button>
            <button
              className="py-3.5 px-3 text-right text-xs font-medium text-petrol/70 hover:bg-emerald-50 active:bg-emerald-100 transition-colors leading-snug"
              onClick={() => triggerSwipe('right')}
            >
              {card.rightOption.label}
              <span className="text-emerald-500 font-bold ml-1">→</span>
            </button>
          </div>
        </div>

        {/* Stempel-Animation */}
        {showStamp && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`stamp-animate text-center border-4 rounded-xl px-5 py-2.5 rotate-[-12deg] backdrop-blur-sm ${
                showStamp === 'approve'
                  ? 'border-emerald-500 text-emerald-500 bg-emerald-50/80'
                  : 'border-red-500 text-red-500 bg-red-50/80'
              }`}
            >
              <div className="font-serif font-black text-2xl tracking-widest">
                {showStamp === 'approve' ? 'GENEHMIGT' : 'ABGELEHNT'}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Swipe-Hinweis unten */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-between px-6 pointer-events-none">
        <p className="text-white/30 text-xs">← Ablehnen</p>
        <p className="text-white/30 text-xs">Genehmigen →</p>
      </div>
    </div>
  );
}
