import { useState } from 'react';
import { useGame } from './hooks/useGame';
import type { GameMode } from './hooks/useGame';
import StartScreen from './components/StartScreen';
import CityView from './components/CityView';
import ResourceBar from './components/ResourceBar';
import CardStack from './components/CardStack';
import GameOver from './components/GameOver';
import SoundToggle from './components/SoundToggle';
import Leaderboard from './components/Leaderboard';
import ShareCard from './components/ShareCard';
import { getPercentile } from './lib/supabase';
import { getDailyState } from './lib/seeded-rng';

export default function App() {
  const game = useGame();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [percentile, setPercentile] = useState(50);

  const handleStart = (mode: GameMode) => {
    game.startGame(mode);
  };

  const handleShowShare = async () => {
    const pct = await getPercentile(game.score);
    setPercentile(pct);
    setShowShare(true);
  };

  const { day } = getDailyState();

  if (game.gameState === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-petrol">
      <CityView resources={game.resources} />

      <ResourceBar resources={game.resources} />

      {/* Score-Anzeige */}
      {game.gameState === 'playing' && (
        <div className="absolute top-[52px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white/80 text-xs font-medium">
            Akte #{game.score + 1}
          </div>
          {game.mode === 'daily' && (
            <div className="bg-coral/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-bold">
              📅 Tag #{day}
            </div>
          )}
        </div>
      )}

      {/* Karten-Stapel */}
      {game.gameState === 'playing' && game.currentCard && (
        <CardStack
          card={game.currentCard}
          onSwipe={game.handleSwipe}
          isAnimating={game.isSwiping}
        />
      )}

      {/* Game-Over-Screen */}
      {game.gameState === 'game_over' && game.cause && (
        <GameOver
          score={game.score}
          cause={game.cause}
          mode={game.mode}
          onReset={game.resetGame}
          onShare={handleShowShare}
          onLeaderboard={() => setShowLeaderboard(true)}
          percentile={percentile}
        />
      )}

      <SoundToggle />

      <Leaderboard
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        currentScore={game.gameState === 'game_over' ? game.score : undefined}
        cause={game.cause ?? undefined}
        durationSeconds={game.getDurationSeconds()}
      />

      {game.cause && (
        <ShareCard
          isOpen={showShare}
          onClose={() => setShowShare(false)}
          score={game.score}
          cause={game.cause}
          mode={game.mode}
          percentile={percentile}
        />
      )}
    </div>
  );
}
