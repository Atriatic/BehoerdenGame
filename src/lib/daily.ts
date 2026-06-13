import type { Card } from '../types';
import { CARDS } from '../data/cards';
import { mulberry32, getDailyState } from './seeded-rng';

export function getDailyDeck(): Card[] {
  const { seed } = getDailyState();
  const rng = mulberry32(seed);

  const tutorial = CARDS.filter((c) => c.isTutorial);
  const rest = [...CARDS.filter((c) => !c.isTutorial && !c.isChainCard)];

  // Deterministischer Fisher-Yates Shuffle
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }

  return [...tutorial, ...rest];
}

const LS_PLAYED = 'amt_daily_played';
const LS_SCORE = 'amt_daily_score';

function todayKey(): string {
  return getDailyState().dateStr;
}

export function hasDailyBeenPlayed(): boolean {
  try {
    return localStorage.getItem(LS_PLAYED) === todayKey();
  } catch {
    return false;
  }
}

export function markDailyPlayed(): void {
  try {
    localStorage.setItem(LS_PLAYED, todayKey());
  } catch {
    // ignore
  }
}

export function getDailyHighScore(): number | null {
  try {
    const key = `${LS_SCORE}_${todayKey()}`;
    const v = localStorage.getItem(key);
    return v !== null ? parseInt(v, 10) : null;
  } catch {
    return null;
  }
}

export function saveDailyScore(score: number): void {
  try {
    const key = `${LS_SCORE}_${todayKey()}`;
    const existing = getDailyHighScore();
    if (existing === null || score > existing) {
      localStorage.setItem(key, String(score));
    }
  } catch {
    // ignore
  }
}
