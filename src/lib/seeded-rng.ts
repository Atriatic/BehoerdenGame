// Mulberry32 – schneller, gleichmäßiger PRNG mit 32-bit Seed
export function mulberry32(seed: number): () => number {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LAUNCH_DATE = new Date('2026-06-13T00:00:00Z');

export function getDailyState(): { day: number; seed: number; dateStr: string } {
  const now = new Date();
  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const day = Math.max(1, Math.floor((utcMidnight - LAUNCH_DATE.getTime()) / 86_400_000) + 1);
  // Seed = YYYYMMDD als Zahl
  const seed =
    now.getUTCFullYear() * 10000 + (now.getUTCMonth() + 1) * 100 + now.getUTCDate();
  const dateStr = now.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return { day, seed, dateStr };
}
