export type ResourceKey = 'budget' | 'zufriedenheit' | 'personal' | 'effizienz';

export interface Resources {
  budget: number;
  zufriedenheit: number;
  personal: number;
  effizienz: number;
}

export interface CardEffect {
  budget: number;
  zufriedenheit: number;
  personal: number;
  effizienz: number;
}

export type CardCategory = 'buerger' | 'personal' | 'politik' | 'krisen' | 'absurditaeten';
export type CharacterName = 'Klaus' | 'Müller' | 'Bürgermeister';

export interface CardOption {
  label: string;
  effects: CardEffect;
  unlocksCard?: string;
}

export interface Card {
  id: string;
  title: string;
  situation: string;
  leftOption: CardOption;
  rightOption: CardOption;
  category: CardCategory;
  character?: CharacterName;
  isChainCard?: boolean;
  isTutorial?: boolean;
}

export type GameOverCause =
  | 'budget_0' | 'budget_100'
  | 'zufriedenheit_0' | 'zufriedenheit_100'
  | 'personal_0' | 'personal_100'
  | 'effizienz_0' | 'effizienz_100';

export type GameState = 'start' | 'playing' | 'game_over';

export interface LeaderboardEntry {
  id?: string;
  nickname: string | null;
  score: number;
  cause_of_death: GameOverCause;
  duration_seconds: number;
  created_at?: string;
}

export interface HintDot {
  resource: ResourceKey;
  size: 'small' | 'large';
}
