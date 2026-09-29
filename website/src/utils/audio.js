// Web Audio API Synthesizer for Gavel Strike & UI Chimes

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play an authentic gavel knock sound (Ketukan Palu Sidang)
 */
export function playGavelStrike() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Knock 1 (Wood impact)
  createKnock(ctx, now, 180, 0.25);
  // Knock 2 (Double tap of courtroom gavel)
  createKnock(ctx, now + 0.16, 160, 0.35);
}

function createKnock(ctx, startTime, baseFreq, gainLevel) {
  // Low punch oscillator
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(baseFreq, startTime);
  osc.frequency.exponentialRampToValueAtTime(30, startTime + 0.12);

  gain.gain.setValueAtTime(gainLevel, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

  // Noise burst for the crisp wooden impact
  const bufferSize = ctx.sampleRate * 0.05;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 800;
  filter.Q.value = 3;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(gainLevel * 0.7, startTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

  whiteNoise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  osc.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start(startTime);
  osc.start(startTime);
  osc.stop(startTime + 0.15);
}

/**
 * Play a subtle high-tech success chime
 */
export function playCopyChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(523.25, now); // C5
  osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
  osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
  osc.frequency.setValueAtTime(1046.50, now + 0.18); // C6

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.35);
}
