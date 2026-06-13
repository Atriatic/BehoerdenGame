import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { LeaderboardEntry } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.warn('Failed to initialize Supabase client:', e);
    supabase = null;
  }
}

export async function submitScore(entry: LeaderboardEntry): Promise<void> {
  if (!supabase) return;
  try {
    const { error } = await supabase.functions.invoke('submit-score', {
      body: {
        nickname: entry.nickname,
        score: entry.score,
        cause_of_death: entry.cause_of_death,
        duration_seconds: entry.duration_seconds,
      },
    });
    if (error) throw error;
  } catch (e) {
    console.warn('Failed to submit score:', e);
  }
}

export async function getTodayLeaderboard(): Promise<LeaderboardEntry[]> {
  if (!supabase) return [];
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { data, error } = await supabase
      .from('scores')
      .select('id, nickname, score, cause_of_death, duration_seconds, created_at')
      .gte('created_at', today.toISOString())
      .order('score', { ascending: false })
      .limit(10);
    if (error) throw error;
    return (data ?? []) as LeaderboardEntry[];
  } catch (e) {
    console.warn('Failed to fetch today leaderboard:', e);
    return [];
  }
}

export async function getAllTimeLeaderboard(): Promise<LeaderboardEntry[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('scores')
      .select('id, nickname, score, cause_of_death, duration_seconds, created_at')
      .order('score', { ascending: false })
      .limit(10);
    if (error) throw error;
    return (data ?? []) as LeaderboardEntry[];
  } catch (e) {
    console.warn('Failed to fetch all-time leaderboard:', e);
    return [];
  }
}

export async function getPercentile(score: number): Promise<number> {
  if (!supabase) return 50;
  try {
    const { count: totalCount, error: totalError } = await supabase
      .from('scores')
      .select('*', { count: 'exact', head: true });
    if (totalError) throw totalError;

    const { count: belowCount, error: belowError } = await supabase
      .from('scores')
      .select('*', { count: 'exact', head: true })
      .lt('score', score);
    if (belowError) throw belowError;

    if (!totalCount || totalCount === 0) return 50;
    return Math.round(((belowCount ?? 0) / totalCount) * 100);
  } catch (e) {
    console.warn('Failed to fetch percentile:', e);
    return 50;
  }
}
