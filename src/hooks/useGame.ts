import { useState, useCallback, useRef } from 'react';
import type { Resources, GameState, GameOverCause, Card, ResourceKey } from '../types';
import { GAME_CONFIG } from '../config/game-config';
import { CARDS } from '../data/cards';
import { getDailyDeck, markDailyPlayed, saveDailyScore } from '../lib/daily';

export type GameMode = 'endless' | 'daily';

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function checkGameOver(resources: Resources): GameOverCause | null {
  const keys: ResourceKey[] = ['budget', 'zufriedenheit', 'personal', 'effizienz'];
  for (const key of keys) {
    if (resources[key] <= GAME_CONFIG.MIN_RESOURCE) return `${key}_0` as GameOverCause;
    if (resources[key] >= GAME_CONFIG.MAX_RESOURCE) return `${key}_100` as GameOverCause;
  }
  return null;
}

function getEscalationMultiplier(score: number): number {
  const level = Math.floor(score / GAME_CONFIG.ESCALATION_INTERVAL);
  return GAME_CONFIG.ESCALATION_MULTIPLIER_BASE + level * GAME_CONFIG.ESCALATION_MULTIPLIER_STEP;
}

function applyEffect(
  resources: Resources,
  effects: { budget: number; zufriedenheit: number; personal: number; effizienz: number },
  multiplier: number
): Resources {
  return {
    budget: clamp(Math.round(resources.budget + effects.budget * multiplier), 0, 100),
    zufriedenheit: clamp(
      Math.round(resources.zufriedenheit + effects.zufriedenheit * multiplier),
      0,
      100
    ),
    personal: clamp(Math.round(resources.personal + effects.personal * multiplier), 0, 100),
    // Drift wird direkt auf Effizienz-Effekt aufaddiert
    effizienz: clamp(
      Math.round(
        resources.effizienz + effects.effizienz * multiplier - GAME_CONFIG.DRIFT_PER_CARD
      ),
      0,
      100
    ),
  };
}

function buildEndlessDeck(): Card[] {
  const tutorial = CARDS.filter((c) => c.isTutorial);
  const rest = CARDS.filter((c) => !c.isTutorial && !c.isChainCard);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [...tutorial, ...rest];
}

export function useGame() {
  const [resources, setResources] = useState<Resources>({ ...GAME_CONFIG.INITIAL_RESOURCES });
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [cause, setCause] = useState<GameOverCause | null>(null);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [mode, setMode] = useState<GameMode>('endless');

  const deckRef = useRef<Card[]>([]);
  const recentIdsRef = useRef<string[]>([]);
  const unlockedCardIdsRef = useRef<string[]>([]);
  const startTimeRef = useRef<number>(Date.now());
  const scoreRef = useRef(0);
  const resourcesRef = useRef<Resources>({ ...GAME_CONFIG.INITIAL_RESOURCES });
  const modeRef = useRef<GameMode>('endless');

  const drawCard = useCallback(() => {
    const deck = deckRef.current;
    const recent = recentIdsRef.current;
    const unlocked = unlockedCardIdsRef.current;

    // Freigeschaltete Ketten-Karten ins Deck einfügen
    for (const id of unlocked) {
      const chainCard = CARDS.find((c) => c.id === id);
      if (chainCard && !deck.some((c) => c.id === id)) {
        const insertAt = Math.max(1, Math.floor(Math.random() * Math.min(5, deck.length)));
        deck.splice(insertAt, 0, chainCard);
      }
    }
    unlockedCardIdsRef.current = [];

    const available = deck.filter(
      (c) => !recent.includes(c.id) || deck.length <= GAME_CONFIG.NO_REPEAT_WINDOW
    );

    let card: Card | undefined;
    if (available.length > 0) {
      card = available[0];
      deckRef.current = deck.filter((c) => c.id !== card!.id);
    } else if (deck.length > 0) {
      card = deck[0];
      deckRef.current = deck.slice(1);
    }

    if (!card) {
      // Deck neu bauen (ohne Tutorial & Ketten)
      const newDeck = CARDS.filter((c) => !c.isTutorial && !c.isChainCard);
      for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
      }
      deckRef.current = newDeck;
      card = newDeck[0];
      deckRef.current = newDeck.slice(1);
    }

    if (card) {
      recentIdsRef.current = [...recent, card.id].slice(-GAME_CONFIG.NO_REPEAT_WINDOW);
      setCurrentCard(card);
    }
  }, []);

  const startGame = useCallback((selectedMode: GameMode = 'endless') => {
    const deck =
      selectedMode === 'daily' ? getDailyDeck() : buildEndlessDeck();

    deckRef.current = deck;
    recentIdsRef.current = [];
    unlockedCardIdsRef.current = [];
    startTimeRef.current = Date.now();
    scoreRef.current = 0;

    const initial = { ...GAME_CONFIG.INITIAL_RESOURCES };
    resourcesRef.current = initial;
    setResources(initial);
    setScore(0);
    setCause(null);
    setIsSwiping(false);
    setMode(selectedMode);
    modeRef.current = selectedMode;
    setGameState('playing');

    const first = deck[0];
    deckRef.current = deck.slice(1);
    recentIdsRef.current = [first.id];
    setCurrentCard(first);
  }, []);

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      if (!currentCard || isSwiping) return;
      setIsSwiping(true);

      const option = direction === 'left' ? currentCard.leftOption : currentCard.rightOption;

      if (option.unlocksCard) {
        unlockedCardIdsRef.current = [...unlockedCardIdsRef.current, option.unlocksCard];
      }

      const newScore = scoreRef.current + 1;
      scoreRef.current = newScore;
      const multiplier = getEscalationMultiplier(newScore);
      const newResources = applyEffect(resourcesRef.current, option.effects, multiplier);
      resourcesRef.current = newResources;

      setScore(newScore);
      setResources(newResources);

      const gameOverCause = checkGameOver(newResources);
      if (gameOverCause) {
        setCause(gameOverCause);
        setCurrentCard(null);
        setGameState('game_over');
        setIsSwiping(false);

        // Daily-Modus: Score speichern & als gespielt markieren
        if (modeRef.current === 'daily') {
          saveDailyScore(newScore);
          markDailyPlayed();
        }
        return;
      }

      setTimeout(() => {
        setIsSwiping(false);
        drawCard();
      }, 400);
    },
    [currentCard, isSwiping, drawCard]
  );

  const resetGame = useCallback(() => {
    setGameState('start');
    setCurrentCard(null);
    setCause(null);
  }, []);

  const getDurationSeconds = useCallback(
    () => Math.round((Date.now() - startTimeRef.current) / 1000),
    []
  );

  return {
    resources,
    gameState,
    score,
    cause,
    currentCard,
    isSwiping,
    mode,
    startGame,
    handleSwipe,
    resetGame,
    getDurationSeconds,
  };
}
