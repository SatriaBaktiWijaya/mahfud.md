// Web Audio API Synthesizer for Authentic Court Gavel Strike
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playGavelStrike() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Initial High-Impact Strike (Wood crack / slap)
    const oscStrike = ctx.createOscillator();
    const gainStrike = ctx.createGain();
    oscStrike.type = 'triangle';
    oscStrike.frequency.setValueAtTime(320, now);
    oscStrike.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gainStrike.gain.setValueAtTime(0.9, now);
    gainStrike.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    oscStrike.connect(gainStrike);
    gainStrike.connect(ctx.destination);

    oscStrike.start(now);
    oscStrike.stop(now + 0.13);

    // 2. Deep Wooden Table Resonance (Low thud)
    const oscThud = ctx.createOscillator();
    const gainThud = ctx.createGain();
    oscThud.type = 'sine';
    oscThud.frequency.setValueAtTime(140, now);
    oscThud.frequency.exponentialRampToValueAtTime(45, now + 0.25);

    gainThud.gain.setValueAtTime(1.0, now);
    gainThud.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    oscThud.connect(gainThud);
    gainThud.connect(ctx.destination);

    oscThud.start(now);
    oscThud.stop(now + 0.36);

    // 3. Acoustic Room Reverb Noise Burst
    const bufferSize = ctx.sampleRate * 0.08;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.1);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.16);
  } catch (e) {
    console.warn('Audio synthesis not supported or blocked:', e);
  }
}
