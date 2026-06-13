import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LeaderboardEntry, GameOverCause } from '../types';
import { getTodayLeaderboard, getAllTimeLeaderboard, submitScore } from '../lib/supabase';
import { RESOURCE_ICONS } from '../config/game-config';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentScore?: number;
  cause?: GameOverCause;
  durationSeconds?: number;
}

function getCauseIcon(cause: string): string {
  if (cause.startsWith('budget')) return RESOURCE_ICONS.budget;
  if (cause.startsWith('zufriedenheit')) return RESOURCE_ICONS.zufriedenheit;
  if (cause.startsWith('personal')) return RESOURCE_ICONS.personal;
  return RESOURCE_ICONS.effizienz;
}

export default function Leaderboard({ isOpen, onClose, currentScore, cause, durationSeconds }: Props) {
  const [tab, setTab] = useState<'today' | 'alltime'>('today');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    const fetch = tab === 'today' ? getTodayLeaderboard : getAllTimeLeaderboard;
    fetch()
      .then(setEntries)
      .finally(() => setLoading(false));
  }, [isOpen, tab]);

  const handleSubmit = async () => {
    if (!currentScore || !cause || submitted) return;
    await submitScore({
      nickname: nickname.trim() || null,
      score: currentScore,
      cause_of_death: cause,
      duration_seconds: durationSeconds ?? currentScore * 3,
    });
    setSubmitted(true);
    // Refresh leaderboard
    const fetch = tab === 'today' ? getTodayLeaderboard : getAllTimeLeaderboard;
    fetch().then(setEntries);
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
            {/* Header */}
            <div className="bg-petrol px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-white font-serif font-bold text-xl">🏆 Rangliste</h2>
                <p className="text-white/50 text-xs">Amt Musterhausen</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white bg-white/10 rounded-full text-sm"
              >
                ✕
              </button>
            </div>

            {/* Score submission */}
            {currentScore !== undefined && cause && !submitted && (
              <div className="px-5 pt-4 pb-3 border-b border-cream-dark">
                <p className="text-petrol text-sm font-semibold mb-2">
                  Dein Score: <span className="text-coral font-bold">{currentScore}</span> Akten
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="Nickname (optional)"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="flex-1 bg-white border border-petrol/20 rounded-lg px-3 py-2 text-sm text-petrol outline-none focus:border-coral"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-coral text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-coral-light transition-colors"
                  >
                    Eintragen
                  </button>
                </div>
              </div>
            )}
            {submitted && (
              <div className="px-5 pt-3 pb-2 border-b border-cream-dark text-center text-sm text-emerald-600 font-medium">
                ✅ Score eingetragen!
              </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-cream-dark">
              {(['today', 'alltime'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                    tab === t
                      ? 'text-coral border-b-2 border-coral bg-coral/5'
                      : 'text-petrol/50 hover:text-petrol'
                  }`}
                >
                  {t === 'today' ? '📅 Heute' : '🌟 Alle Zeit'}
                </button>
              ))}
            </div>

            {/* Entries */}
            <div className="overflow-y-auto max-h-64 px-4 py-3">
              {loading ? (
                <div className="text-center py-8 text-petrol/40 text-sm">Wird geladen…</div>
              ) : entries.length === 0 ? (
                <div className="text-center py-8 text-petrol/40 text-sm">
                  Noch keine Einträge. Sei der Erste!
                </div>
              ) : (
                <div className="space-y-2">
                  {entries.map((entry, i) => (
                    <div
                      key={entry.id ?? i}
                      className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
                        i === 0 ? 'bg-coral/10' : 'bg-petrol/5'
                      }`}
                    >
                      <span
                        className={`text-sm font-bold w-6 text-center ${
                          i === 0 ? 'text-coral' : 'text-petrol/40'
                        }`}
                      >
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                      </span>
                      <span className="flex-1 text-petrol text-sm font-medium truncate">
                        {entry.nickname ?? 'Anonym'}
                      </span>
                      <span className="text-petrol/50 text-sm">
                        {getCauseIcon(entry.cause_of_death)}
                      </span>
                      <span className="text-petrol font-bold text-sm">{entry.score}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-cream-dark text-center">
              <p className="text-petrol/40 text-xs">
                Täglich zurückgesetzt · Kein Betrug, aber es wird probiert
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
