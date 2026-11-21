import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music as MusicIcon, Radio } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  duration: number; // in seconds
  color: string;
  tagline: string;
}

const PLAYLIST: Track[] = [
  {
    id: 'study',
    title: 'Lofi Study Chillhop',
    genre: 'Study & Work',
    bpm: 74,
    duration: 180,
    color: 'from-amber-500 via-rose-500 to-indigo-600',
    tagline: 'Warm electric Rhodes chords & vinyl warmth',
  },
  {
    id: 'meditate',
    title: 'Deep Meditation 432Hz',
    genre: 'Zen & Mindfulness',
    bpm: 52,
    duration: 240,
    color: 'from-teal-400 via-emerald-500 to-indigo-700',
    tagline: 'Harmonic 432Hz sine drones & ocean resonance',
  },
  {
    id: 'beats',
    title: 'Focus Beats & Pulse',
    genre: 'Deep Focus & Code',
    bpm: 96,
    duration: 195,
    color: 'from-purple-500 via-pink-500 to-cyan-500',
    tagline: 'Melodic synth arpeggios & rhythmic pulse',
  },
  {
    id: 'rain',
    title: 'Zen Ambient Rainscape',
    genre: 'Sleep & Relaxation',
    bpm: 60,
    duration: 210,
    color: 'from-blue-600 via-cyan-600 to-slate-800',
    tagline: 'Filtered rainfall textures & celestial tones',
  },
  {
    id: 'chill',
    title: 'Midnight Jazz Lounge',
    genre: 'Late Night Chill',
    bpm: 80,
    duration: 200,
    color: 'from-orange-500 via-amber-600 to-slate-900',
    tagline: 'Mellow major-seventh harmonic progression',
  },
];

export const IOSMusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const loopTimerRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const track = PLAYLIST[currentTrackIndex];

  // Initialize WebAudio context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();

      const analyser = audioCtxRef.current.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const masterGain = audioCtxRef.current.createGain();
      masterGain.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      masterGain.connect(analyser);
      analyser.connect(audioCtxRef.current.destination);
      masterGainRef.current = masterGain;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play synthesized ambient notes based on track genre
  const playMusicalChords = (trackId: string) => {
    const ctx = getAudioContext();
    if (!masterGainRef.current) return;

    const chords: Record<string, number[][]> = {
      study: [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23], // G7
      ],
      meditate: [
        [108.00, 216.00, 432.00, 648.00], // 432Hz Harmonic Base
        [144.00, 288.00, 432.00, 576.00],
        [162.00, 324.00, 432.00, 648.00],
        [128.00, 256.00, 432.00, 512.00],
      ],
      beats: [
        [220.00, 277.18, 329.63, 440.00], // A Major synth
        [196.00, 246.94, 293.66, 392.00], // G Major synth
        [164.81, 207.65, 246.94, 329.63], // E Major synth
        [174.61, 220.00, 261.63, 349.23], // F Major synth
      ],
      rain: [
        [130.81, 196.00, 261.63, 392.00],
        [146.83, 220.00, 293.66, 440.00],
        [164.81, 246.94, 329.63, 493.88],
      ],
      chill: [
        [246.94, 311.13, 369.99, 440.00], // Bm7
        [185.00, 233.08, 277.18, 349.23], // F#m7
        [220.00, 277.18, 329.63, 415.30], // Amaj7
      ],
    };

    const currentChordSet = chords[trackId] || chords.study;
    let step = 0;

    const playNextChord = () => {
      if (!isPlaying || !audioCtxRef.current || !masterGainRef.current) return;
      const chord = currentChordSet[step % currentChordSet.length];
      const now = audioCtxRef.current.currentTime;

      const filter = ctx.createBiquadFilter();
      filter.type = trackId === 'beats' ? 'bandpass' : 'lowpass';
      filter.frequency.setValueAtTime(trackId === 'beats' ? 1400 : 750, now);
      filter.Q.setValueAtTime(2.2, now);
      filter.connect(masterGainRef.current);

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = trackId === 'meditate' ? 'sine' : trackId === 'beats' ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.09 / (idx + 1), now + 0.6);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

        osc.connect(noteGain);
        noteGain.connect(filter);

        osc.start(now);
        osc.stop(now + 3.6);
      });

      step++;
      loopTimerRef.current = window.setTimeout(
        playNextChord,
        trackId === 'meditate' ? 3400 : trackId === 'beats' ? 1800 : 2200
      );
    };

    playNextChord();
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    } else {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playMusicalChords(track.id);
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => (prev + 1) % track.duration);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    };
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Visualizer Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let active = true;

    const render = () => {
      if (!active) return;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (analyserRef.current && isPlaying) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        const barWidth = (width / bufferLength) * 2.2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height * 0.85;
          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#06b6d4');
          gradient.addColorStop(1, '#818cf8');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, height - barHeight, Math.max(2, barWidth - 2), barHeight, [2, 2, 0, 0]);
          ctx.fill();

          x += barWidth;
        }
      } else {
        ctx.fillStyle = 'rgba(128, 128, 128, 0.25)';
        for (let i = 0; i < 20; i++) {
          const h = 4 + Math.sin(Date.now() / 400 + i) * 2;
          ctx.fillRect(i * 14 + 10, height / 2 - h / 2, 6, h);
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      active = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-md mx-auto space-y-4 pt-1">
      {/* Vinyl Cover Art */}
      <div className="flex flex-col items-center justify-center pt-2">
        <div className={`relative w-44 h-44 rounded-3xl bg-linear-to-br ${track.color} p-1.5 shadow-2xl flex items-center justify-center`}>
          <div
            className={`w-36 h-36 rounded-full bg-[#111318] border-4 border-white/20 flex items-center justify-center ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '8s' }}
          >
            <div className="w-16 h-16 rounded-full bg-linear-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-inner">
              <MusicIcon size={24} className="text-white drop-shadow" />
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <h2 className="text-xl font-bold tracking-tight ios-text-title">{track.title}</h2>
          <p className="text-xs text-teal-500 font-semibold tracking-wide uppercase mt-1 flex items-center justify-center gap-1.5">
            <Radio size={12} className={isPlaying ? 'animate-pulse text-teal-500' : 'text-gray-400'} />
            <span>WebAudio Synth · {track.genre}</span>
          </p>
          <p className="text-[11px] ios-text-subtle mt-0.5">{track.tagline}</p>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="w-full h-12 ios-card p-2 flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} width={300} height={44} className="w-full h-full" />
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-1.5 bg-black/15 dark:bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-teal-400 to-indigo-500 transition-all duration-300 rounded-full"
            style={{ width: `${(currentTime / track.duration) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] ios-text-subtle font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Main Playback Controls */}
      <div className="flex items-center justify-center gap-6 pt-1">
        <button
          type="button"
          onClick={handlePrev}
          className="w-11 h-11 rounded-full ios-card flex items-center justify-center active:scale-95 transition-all"
          aria-label="Previous Track"
        >
          <SkipBack size={20} className="ios-text-title" />
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-linear-to-tr from-teal-500 to-indigo-600 text-white flex items-center justify-center shadow-xl active:scale-95 transition-all"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="w-11 h-11 rounded-full ios-card flex items-center justify-center active:scale-95 transition-all"
          aria-label="Next Track"
        >
          <SkipForward size={20} className="ios-text-title" />
        </button>
      </div>

      {/* Volume Slider */}
      <div className="flex items-center gap-3 px-3 py-2 ios-card">
        <button type="button" onClick={() => setVolume(volume === 0 ? 0.7 : 0)}>
          {volume === 0 ? <VolumeX size={16} className="ios-text-subtle" /> : <Volume2 size={16} className="text-teal-500" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-teal-500 h-1 bg-black/15 dark:bg-white/20 rounded-lg cursor-pointer"
        />
      </div>

      {/* Stock Playlist Tracks */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[11px] font-bold ios-text-subtle uppercase tracking-wider px-1">
          Stock Ambient & Lo-Fi Playlist
        </div>
        <div className="ios-card divide-y divide-[var(--ios-card-divide)] overflow-hidden">
          {PLAYLIST.map((t, idx) => (
            <div
              key={t.id}
              onClick={() => {
                if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
                setCurrentTrackIndex(idx);
                setCurrentTime(0);
                setIsPlaying(true);
              }}
              className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                currentTrackIndex === idx
                  ? 'bg-teal-500/15 text-teal-600 dark:text-teal-300 font-bold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 ios-text-title'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono opacity-50 w-4">{idx + 1}</span>
                <div>
                  <div className="font-semibold text-sm">{t.title}</div>
                  <div className="text-[11px] ios-text-subtle">{t.genre}</div>
                </div>
              </div>
              {currentTrackIndex === idx && isPlaying && (
                <span className="text-xs font-bold text-teal-500 animate-pulse">Playing</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
