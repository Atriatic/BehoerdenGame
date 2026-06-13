import { useState } from 'react';
import { useGame } from './hooks/useGame';
import StartScreen from './components/StartScreen';
import CityView from './components/CityView';
import ResourceBar from './components/ResourceBar';
import CardStack from './components/CardStack';
import GameOver from './components/GameOver';
import SoundToggle from './components/SoundToggle';
import Leaderboard from './components/Leaderboard';
import ShareCard from './components/ShareCard';
import { getPercentile } from './lib/supabase';

export default function App() {
  const game = useGame();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [percentile, setPercentile] = useState(50);

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleShowShare = async () => {
    const pct = await getPercentile(game.score);
    setPercentile(pct);
    setShowShare(true);
  };

  if (game.gameState === 'start') {
    return <StartScreen onStart={game.startGame} />;
  }

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-petrol">
      {/* City background */}
      <CityView resources={game.resources} />

      {/* Resource bars */}
      <ResourceBar resources={game.resources} />

      {/* Score display */}
      {game.gameState === 'playing' && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-black/30 backdrop-blur-sm rounded-full px-4 py-1 text-white/80 text-xs font-medium">
          Akte #{game.score + 1}
        </div>
      )}

      {/* Card stack */}
      {game.gameState === 'playing' && game.currentCard && (
        <CardStack
          card={game.currentCard}
          onSwipe={game.handleSwipe}
          isAnimating={game.isSwiping}
        />
      )}

      {/* Game over screen */}
      {game.gameState === 'game_over' && game.cause && (
        <GameOver
          score={game.score}
          cause={game.cause}
          onReset={game.resetGame}
          onShare={handleShowShare}
          onLeaderboard={handleShowLeaderboard}
          percentile={percentile}
        />
      )}

      {/* Sound toggle */}
      <SoundToggle />

      {/* Leaderboard modal */}
      <Leaderboard
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        currentScore={game.gameState === 'game_over' ? game.score : undefined}
        cause={game.cause ?? undefined}
        durationSeconds={game.getDurationSeconds()}
      />

      {/* Share card modal */}
      {game.cause && (
        <ShareCard
          isOpen={showShare}
          onClose={() => setShowShare(false)}
          score={game.score}
          cause={game.cause}
          percentile={percentile}
        />
      )}
    </div>
  );
}
