import { useEffect, useRef, useState } from "react";

type AudioContextConstructor = typeof AudioContext;

declare global {
  interface Window {
    webkitAudioContext?: AudioContextConstructor;
  }
}

// Web Audio ambient lo-fi pad + simple melody loop.
export function useAmbientPlayer() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const nodesRef = useRef<{
    oscs: OscillatorNode[];
    intervals: number[];
    convolver?: ConvolverNode;
  }>({ oscs: [], intervals: [] });

  const stop = () => {
    const n = nodesRef.current;
    n.oscs.forEach((o) => {
      try {
        o.stop();
        o.disconnect();
      } catch (error) {
        // Oscillators can already be stopped/disconnected during cleanup.
        void error;
      }
    });
    n.intervals.forEach((i) => clearInterval(i));
    nodesRef.current = { oscs: [], intervals: [] };
    analyserRef.current = null;
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.linearRampToValueAtTime(
        0,
        ctxRef.current.currentTime + 0.3,
      );
    }
    setPlaying(false);
  };

  const start = async () => {
    if (playing) return;
    const Ctx = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctx) return;
    const ctx: AudioContext = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.6);
    masterRef.current = master;

    // Set up Analyser Node for sound reactivity
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 32;
    master.connect(analyser);
    analyserRef.current = analyser;

    // Reverb impulse
    const conv = ctx.createConvolver();
    const ir = ctx.createBuffer(2, ctx.sampleRate * 2, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = ir.getChannelData(c);
      for (let i = 0; i < ch.length; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / ch.length, 2.5);
      }
    }
    conv.buffer = ir;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    conv.connect(wet);
    wet.connect(master);

    // Pad: two detuned sines (low A)
    const padFreqs = [110, 110 * 1.005, 165];
    const padOscs = padFreqs.map((f) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.18;
      o.connect(g);
      g.connect(master);
      g.connect(conv);
      o.start();
      return o;
    });
    nodesRef.current.oscs.push(...padOscs);

    // Melody: cycle through notes
    const notes = [523.25, 659.25, 783.99, 880.0]; // C5 E5 G5 A5
    let i = 0;
    const playNote = () => {
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = notes[i % notes.length];
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.12, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
      o.connect(g);
      g.connect(conv);
      g.connect(master);
      o.start(t);
      o.stop(t + 1.6);
      i++;
    };
    playNote();
    const id = window.setInterval(playNote, 900);
    nodesRef.current.intervals.push(id);
    nodesRef.current.convolver = conv;

    setPlaying(true);
  };

  const getAmplitude = () => {
    const analyser = analyserRef.current;
    if (!analyser || !playing) return 0;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    return sum / dataArray.length / 255;
  };

  useEffect(() => () => stop(), []);

  return { playing, toggle: () => (playing ? stop() : start()), getAmplitude };
}
