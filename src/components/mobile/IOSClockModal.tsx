import React, { useState, useEffect, useRef } from 'react';
import { IOSAppModal } from './IOSAppModal';
import { Clock, Timer as TimerIcon, Play, Pause, RotateCcw, Globe } from 'lucide-react';

interface IOSClockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSClockModal: React.FC<IOSClockModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'world' | 'stopwatch' | 'timer'>('world');
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const stopwatchIntervalRef = useRef<number | null>(null);

  // Timer state
  const [timerDuration, setTimerDuration] = useState(300);
  const [timerRemaining, setTimerRemaining] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isStopwatchRunning) {
      const startTime = Date.now() - stopwatchTime;
      stopwatchIntervalRef.current = window.setInterval(() => {
        setStopwatchTime(Date.now() - startTime);
      }, 30);
    } else if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current);
    }
    return () => {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    };
  }, [isStopwatchRunning]);

  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const secondDeg = seconds * 6;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const hourDeg = ((hours % 12) + minutes / 60) * 30;

  const formatStopwatch = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <IOSAppModal title="Clock" isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto space-y-5 pt-1">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 p-1 ios-card">
          <button
            type="button"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'world' ? 'bg-indigo-600 text-white shadow-md' : 'ios-text-subtle hover:text-white'
            }`}
            onClick={() => setActiveTab('world')}
          >
            <Globe size={13} />
            <span>Local Time</span>
          </button>
          <button
            type="button"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'stopwatch' ? 'bg-indigo-600 text-white shadow-md' : 'ios-text-subtle hover:text-white'
            }`}
            onClick={() => setActiveTab('stopwatch')}
          >
            <Clock size={13} />
            <span>Stopwatch</span>
          </button>
          <button
            type="button"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'timer' ? 'bg-indigo-600 text-white shadow-md' : 'ios-text-subtle hover:text-white'
            }`}
            onClick={() => setActiveTab('timer')}
          >
            <TimerIcon size={13} />
            <span>Timer</span>
          </button>
        </div>

        {/* Tab 1: World / Local Clock */}
        {activeTab === 'world' && (
          <div className="space-y-6">
            {/* Big Analogue Face */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="relative w-52 h-52 rounded-full bg-linear-to-b from-[#2a2d3d] to-[#12141c] border-4 border-white/20 shadow-2xl flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-white relative flex items-center justify-center shadow-inner overflow-hidden">
                  <span className="absolute top-1 text-sm font-extrabold text-black">12</span>
                  <span className="absolute bottom-1 text-sm font-extrabold text-black">6</span>
                  <span className="absolute left-2 text-sm font-extrabold text-black">9</span>
                  <span className="absolute right-2 text-sm font-extrabold text-black">3</span>

                  {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
                    <div
                      key={deg}
                      className="absolute w-[1.5px] h-2.5 bg-gray-400"
                      style={{
                        transform: `rotate(${deg}deg) translateY(-84px)`,
                        transformOrigin: 'center center',
                      }}
                    />
                  ))}

                  <div
                    className="absolute w-1.5 h-14 bg-black rounded-full shadow-md"
                    style={{
                      transform: `rotate(${hourDeg}deg) translateY(-50%)`,
                      transformOrigin: 'center bottom',
                      bottom: '50%',
                      left: 'calc(50% - 3px)',
                    }}
                  />

                  <div
                    className="absolute w-1 h-20 bg-black rounded-full shadow-md"
                    style={{
                      transform: `rotate(${minuteDeg}deg) translateY(-50%)`,
                      transformOrigin: 'center bottom',
                      bottom: '50%',
                      left: 'calc(50% - 2px)',
                    }}
                  />

                  <div
                    className="absolute w-[1.5px] h-22 bg-[#e11d48] rounded-full shadow-sm z-10"
                    style={{
                      transform: `rotate(${secondDeg}deg) translateY(-50%)`,
                      transformOrigin: 'center bottom',
                      bottom: '50%',
                      left: 'calc(50% - 0.75px)',
                    }}
                  />

                  <div className="w-3 h-3 rounded-full bg-[#e11d48] z-20 border-2 border-white shadow-sm" />
                </div>
              </div>
            </div>

            {/* Digital Clock Card */}
            <div className="ios-card p-4 text-center space-y-1">
              <div className="text-3xl font-extrabold tracking-tight font-mono text-teal-500">
                {timeString}
              </div>
              <div className="text-xs font-semibold ios-text-title">
                {dateString}
              </div>
              <div className="text-[11px] ios-text-subtle pt-1">
                Time Zone: <span className="ios-text-title font-mono">{timeZoneName}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Stopwatch */}
        {activeTab === 'stopwatch' && (
          <div className="space-y-6 pt-4">
            <div className="ios-card p-8 text-center">
              <div className="text-5xl font-mono font-extrabold ios-text-title tracking-tight">
                {formatStopwatch(stopwatchTime)}
              </div>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                className="w-16 h-16 rounded-full ios-card ios-text-title font-bold text-sm flex items-center justify-center active:scale-95 transition-all"
                onClick={() => {
                  setIsStopwatchRunning(false);
                  setStopwatchTime(0);
                }}
              >
                <RotateCcw size={20} />
              </button>

              <button
                type="button"
                className={`w-20 h-20 rounded-full font-bold text-base flex items-center justify-center shadow-2xl active:scale-95 transition-all text-white ${
                  isStopwatchRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
                onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
              >
                {isStopwatchRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Timer */}
        {activeTab === 'timer' && (
          <div className="space-y-6 pt-4">
            <div className="ios-card p-8 text-center">
              <div className="text-5xl font-mono font-extrabold ios-text-title tracking-tight">
                {formatTimer(timerRemaining)}
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[60, 180, 300, 600].map((secs) => (
                <button
                  key={secs}
                  type="button"
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    timerDuration === secs
                      ? 'bg-teal-500 border-teal-400 text-white'
                      : 'ios-card ios-text-subtle hover:text-white'
                  }`}
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerDuration(secs);
                    setTimerRemaining(secs);
                  }}
                >
                  {secs / 60} min
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                className="w-16 h-16 rounded-full ios-card ios-text-title font-bold text-sm flex items-center justify-center active:scale-95 transition-all"
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerRemaining(timerDuration);
                }}
              >
                <RotateCcw size={20} />
              </button>

              <button
                type="button"
                className={`w-20 h-20 rounded-full font-bold text-base flex items-center justify-center shadow-2xl active:scale-95 transition-all text-white ${
                  isTimerRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-teal-600 hover:bg-teal-500'
                }`}
                onClick={() => setIsTimerRunning(!isTimerRunning)}
              >
                {isTimerRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </IOSAppModal>
  );
};
