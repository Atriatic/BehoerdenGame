type SoundType = 'approve' | 'reject';

class SoundManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = true;

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
  }

  isMuted(): boolean {
    return this.muted;
  }

  private playStamp(type: SoundType): void {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'approve') {
        // Satisfying deep thud - like an approval stamp
        const bufferSize = ctx.sampleRate * 0.3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          const t = i / ctx.sampleRate;
          // Deep thump with quick decay
          const envelope = Math.exp(-t * 18) * (t < 0.005 ? t / 0.005 : 1);
          // Mix of low frequency and noise for thud
          const tone = Math.sin(2 * Math.PI * 80 * t) * 0.6;
          const tone2 = Math.sin(2 * Math.PI * 120 * t) * 0.3;
          const noise = (Math.random() * 2 - 1) * 0.1;
          data[i] = (tone + tone2 + noise) * envelope;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.7, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;

        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(now);

        // Add a click transient at the start
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'square';
        clickOsc.frequency.value = 200;
        clickGain.gain.setValueAtTime(0.3, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start(now);
        clickOsc.stop(now + 0.05);

      } else {
        // Reject: higher pitched, slightly hollow clunk
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          const t = i / ctx.sampleRate;
          const envelope = Math.exp(-t * 22) * (t < 0.003 ? t / 0.003 : 1);
          const tone = Math.sin(2 * Math.PI * 150 * t) * 0.5;
          const tone2 = Math.sin(2 * Math.PI * 220 * t) * 0.3;
          const tone3 = Math.sin(2 * Math.PI * 300 * t) * 0.2;
          const noise = (Math.random() * 2 - 1) * 0.15;
          data[i] = (tone + tone2 + tone3 + noise) * envelope;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.6, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 600;
        filter.Q.value = 2;

        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(now);

        // Dry scratch sound
        const scratchOsc = ctx.createOscillator();
        const scratchGain = ctx.createGain();
        scratchOsc.type = 'sawtooth';
        scratchOsc.frequency.setValueAtTime(400, now);
        scratchOsc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        scratchGain.gain.setValueAtTime(0.15, now);
        scratchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        scratchOsc.connect(scratchGain);
        scratchGain.connect(ctx.destination);
        scratchOsc.start(now);
        scratchOsc.stop(now + 0.08);
      }
    } catch (e) {
      // Silently fail if audio not supported
      console.warn('Audio playback failed:', e);
    }
  }

  playApprove(): void {
    this.playStamp('approve');
  }

  playReject(): void {
    this.playStamp('reject');
  }
}

export const soundManager = new SoundManager();
