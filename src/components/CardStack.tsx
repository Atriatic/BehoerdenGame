import { useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import type { Card, ResourceKey } from '../types';
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

export default function CardStack({ card, onSwipe, isAnimating }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const leftOpacity = useTransform(x, [-80, -20, 0], [1, 0.4, 0]);
  const rightOpacity = useTransform(x, [0, 20, 80], [0, 0.4, 1]);
  const [showStamp, setShowStamp] = useState<'approve' | 'reject' | null>(null);
  const [dragX, setDragX] = useState(0);

  const triggerSwipe = useCallback(
    async (direction: 'left' | 'right') => {
      if (isAnimating) return;
      const stampType = direction === 'right' ? 'approve' : 'reject';
      setShowStamp(stampType);

      if (direction === 'right') {
        soundManager.playApprove();
      } else {
        soundManager.playReject();
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

  // Keyboard navigation (←/→ Pfeile oder A/D)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        triggerSwipe('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        triggerSwipe('right');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [triggerSwipe]);

  const hintDirection =
    Math.abs(dragX) > GAME_CONFIG.HINT_SHOW_THRESHOLD
      ? dragX < 0
        ? 'left'
        : 'right'
      : null;

  const hints = hintDirection ? getHints(card, hintDirection) : [];

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      {/* Ghost cards behind */}
      <div
        className="absolute rounded-2xl bg-white/20 border border-white/20"
        style={{ width: 320, height: 440, transform: 'translateY(16px) scale(0.95)', zIndex: 1 }}
      />
      <div
        className="absolute rounded-2xl bg-white/10 border border-white/10"
        style={{ width: 320, height: 440, transform: 'translateY(30px) scale(0.90)', zIndex: 0 }}
      />

      {/* Main card */}
      <motion.div
        className="absolute no-select pointer-events-auto"
        style={{ x, rotate, zIndex: 10, width: 320, touchAction: 'none' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        onDrag={(_, info) => setDragX(info.offset.x)}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* ABLEHNEN label */}
        <motion.div
          className="absolute left-4 top-6 z-20 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg border-2 border-red-700 rotate-[-15deg]"
          style={{ opacity: leftOpacity }}
        >
          ABGELEHNT
        </motion.div>

        {/* GENEHMIGEN label */}
        <motion.div
          className="absolute right-4 top-6 z-20 bg-emerald-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg border-2 border-emerald-700 rotate-[15deg]"
          style={{ opacity: rightOpacity }}
        >
          GENEHMIGT
        </motion.div>

        {/* Card itself */}
        <div className="bg-cream rounded-2xl card-shadow overflow-hidden" style={{ height: 440 }}>
          {/* Card header */}
          <div className="bg-petrol px-5 pt-5 pb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-coral text-xs font-semibold uppercase tracking-wider">
                {card.category === 'buerger' && 'Bürgerantrag'}
                {card.category === 'personal' && 'Personalwesen'}
                {card.category === 'politik' && 'Politisch'}
                {card.category === 'krisen' && 'Krise!'}
                {card.category === 'absurditaeten' && 'Sonderfall'}
              </span>
              {card.character && (
                <span className="text-lg" title={card.character}>
                  {CHARACTER_ICONS[card.character] ?? '👤'}
                </span>
              )}
            </div>
            <h2 className="text-white font-serif text-xl leading-tight">{card.title}</h2>
          </div>

          {/* Situation text */}
          <div className="px-5 pt-4 pb-3 flex-1">
            <p className="text-petrol text-sm leading-relaxed">{card.situation}</p>
          </div>

          {/* Icon hints */}
          <div className="px-5 pb-2 min-h-[36px] flex items-center justify-center gap-3">
            {hints.map((h) => (
              <div key={h.resource} className="flex flex-col items-center gap-0.5">
                <span className="text-base">{RESOURCE_ICONS[h.resource]}</span>
                <div
                  className={`rounded-full bg-petrol/70 ${
                    h.size === 'large' ? 'w-3 h-3' : 'w-1.5 h-1.5'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="border-t border-cream-dark mx-4" />
          <div className="grid grid-cols-2 divide-x divide-cream-dark">
            <button
              className="py-4 px-4 text-left text-xs font-medium text-petrol/70 hover:bg-red-50 active:bg-red-100 transition-colors leading-snug"
              onClick={() => triggerSwipe('left')}
            >
              <span className="text-red-500 font-bold mr-1">←</span>
              {card.leftOption.label}
            </button>
            <button
              className="py-4 px-4 text-right text-xs font-medium text-petrol/70 hover:bg-emerald-50 active:bg-emerald-100 transition-colors leading-snug"
              onClick={() => triggerSwipe('right')}
            >
              {card.rightOption.label}
              <span className="text-emerald-500 font-bold ml-1">→</span>
            </button>
          </div>
        </div>

        {/* Stamp overlay */}
        {showStamp && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`stamp-animate text-center border-4 rounded-lg px-6 py-3 rotate-[-12deg] ${
                showStamp === 'approve'
                  ? 'border-emerald-500 text-emerald-500'
                  : 'border-red-500 text-red-500'
              }`}
            >
              <div className="font-serif font-black text-2xl tracking-widest">
                {showStamp === 'approve' ? 'GENEHMIGT' : 'ABGELEHNT'}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Swipe hint text at bottom */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-between px-8 pointer-events-none">
        <p className="text-white/40 text-xs">← Ablehnen</p>
        <p className="text-white/40 text-xs">Genehmigen →</p>
      </div>
    </div>
  );
}
