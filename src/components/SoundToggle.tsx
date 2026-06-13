import { useState } from 'react';
import { soundManager } from '../lib/sound';

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const next = !muted;
    soundManager.setMuted(next);
    setMuted(next);
  };

  return (
    <button
      onClick={toggle}
      className="absolute top-14 right-3 z-30 w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white/80 transition-colors text-base"
      title={muted ? 'Sound einschalten' : 'Sound ausschalten'}
      aria-label={muted ? 'Sound einschalten' : 'Sound ausschalten'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
