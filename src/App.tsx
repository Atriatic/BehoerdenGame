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
import { GAME_CONFIG } from './config/game-config';

function getEscalationLevel(score: number): number {
  return Math.floor(score / GAME_CONFIG.ESCALATION_INTERVAL);
}

function getEscalationMultiplier(score: number): number {
  return (
    GAME_CONFIG.ESCALATION_MULTIPLIER_BASE +
    getEscalationLevel(score) * GAME_CONFIG.ESCALATION_MULTIPLIER_STEP
  );
}

export default function App() {
  const game = useGame();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [percentile, setPercentile] = useState(50);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const handleStart = (mode: GameMode) => {
    game.startGame(mode);
  };

  const handleShowShare = async () => {
    const pct = await getPercentile(game.score);
    setPercentile(pct);
    setShowShare(true);
  };

  const { day } = getDailyState();
  const escalationLevel = getEscalationLevel(game.score);
  const escalationMultiplier = getEscalationMultiplier(game.score);
  const showEscalationBadge = escalationLevel > 0;

  if (game.gameState === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-petrol">
      <CityView resources={game.resources} />

      <ResourceBar resources={game.resources} />

      {/* HUD-Leiste */}
      {game.gameState === 'playing' && (
        <div className="absolute top-[52px] left-0 right-0 z-20 flex items-center justify-between px-3">
          {/* Quit-Button */}
          <button
            onClick={() => setShowQuitConfirm(true)}
            className="bg-black/25 hover:bg-black/40 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-white/60 hover:text-white text-sm transition-colors"
            title="Spiel beenden"
          >
            ✕
          </button>

          {/* Akte-Zähler + Modus */}
          <div className="flex items-center gap-2">
            <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white/80 text-xs font-medium">
              Akte #{game.score + 1}
            </div>
            {game.mode === 'daily' && (
              <div className="bg-coral/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-bold">
                📅 #{day}
              </div>
            )}
          </div>

          {/* Eskalations-Badge */}
          {showEscalationBadge ? (
            <div className="bg-orange-500/80 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs font-bold">
              ×{escalationMultiplier.toFixed(1)}
            </div>
          ) : (
            <div className="w-8" /> /* Platzhalter für Symmetrie */
          )}
        </div>
      )}

      {/* Keyboard-Hint (Desktop only) */}
      {game.gameState === 'playing' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/40 text-xs">
          <span>← / A = Ablehnen</span>
          <span className="text-white/20">·</span>
          <span>→ / D = Genehmigen</span>
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

      {/* Quit-Bestätigung */}
      {showQuitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-cream rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl">
            <p className="text-petrol font-serif font-bold text-xl mb-2">Dienst quittieren?</p>
            <p className="text-petrol/60 text-sm mb-6">
              Akte #{game.score + 1} bleibt unbearbeitet. Musterhausen wartet.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="flex-1 bg-petrol/10 hover:bg-petrol/20 text-petrol font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Weitermachen
              </button>
              <button
                onClick={() => {
                  setShowQuitConfirm(false);
                  game.resetGame();
                }}
                className="flex-1 bg-coral hover:bg-coral-light text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Aufgeben
              </button>
            </div>
          </div>
        </div>
      )}

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
