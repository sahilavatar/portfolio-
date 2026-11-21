import React, { useState, useEffect } from 'react';

// 1. Messages App Icon
export const IconMessages: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#63db44] to-[#3dbd1d] flex items-center justify-center p-2">
    <svg viewBox="0 0 40 34" className="w-8 h-7 drop-shadow-md" fill="#ffffff">
      <path d="M20 0C8.95 0 0 7.39 0 16.5c0 4.88 2.58 9.28 6.72 12.33-.28 2.37-1.46 4.79-2.94 5.92 3.19.06 6.77-1.4 8.92-3.15 2.27.61 4.71.9 7.3.9 11.05 0 20-7.39 20-16.5S31.05 0 20 0z" />
    </svg>
  </div>
);

// 2. Calendar App Icon (Live Day & Date)
export const IconCalendar: React.FC = () => {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayNum = date.getDate();

  return (
    <div className="w-full h-full bg-linear-to-b from-[#f8f8f8] to-[#dcdcdc] flex flex-col items-center justify-between">
      <div className="w-full bg-linear-to-b from-[#e53935] to-[#c62828] text-white text-[9px] font-bold text-center py-0.5 tracking-wider uppercase border-b border-[#b71c1c]">
        {dayName}
      </div>
      <div className="text-[28px] font-extrabold text-[#222222] font-sans leading-none pb-2">
        {dayNum}
      </div>
    </div>
  );
};

// 3. Photos App Icon (Sunflower)
export const IconPhotos: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#3a7bd5] to-[#00d2ff] flex items-center justify-center relative overflow-hidden">
    <div className="relative w-10 h-10 flex items-center justify-center">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <div
          key={deg}
          className="absolute w-2.5 h-5 bg-linear-to-t from-[#f59e0b] to-[#fbbf24] rounded-full"
          style={{
            transform: `rotate(${deg}deg) translateY(-8px)`,
            transformOrigin: 'bottom center',
          }}
        />
      ))}
      <div className="relative z-1 w-4 h-4 rounded-full bg-linear-to-b from-[#78350f] to-[#451a03] border border-[#fef3c7]/30 shadow-inner" />
      <div className="absolute -bottom-1 -left-1 w-3 h-5 bg-[#22c55e] rounded-full rotate-45" />
    </div>
  </div>
);

// 4. Camera App Icon
export const IconCamera: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#d1d5db] via-[#9ca3af] to-[#6b7280] flex items-center justify-center p-2">
    <div className="w-10 h-10 rounded-full bg-linear-to-b from-[#374151] to-[#111827] border-2 border-[#e5e7eb] flex items-center justify-center shadow-lg">
      <div className="w-7 h-7 rounded-full bg-radial from-[#1e3a8a] via-[#0f172a] to-[#000000] border border-[#60a5fa]/40 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#93c5fd]/50 blur-[0.5px]" />
      </div>
    </div>
  </div>
);

// 5. Videos App Icon (Clapperboard)
export const IconVideos: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#2563eb] to-[#1e40af] flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute top-0 inset-x-0 h-4 bg-black flex overflow-hidden border-b border-black">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-6 bg-white -skew-x-30 -mt-1 mx-0.5"
        />
      ))}
    </div>
    <div className="mt-3 text-white/90">
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white drop-shadow">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  </div>
);

// 6. YouTube App Icon (Retro CRT TV)
export const IconYouTube: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#854d0e] to-[#451a03] p-1.5 flex items-center justify-center border border-[#78350f]">
    <div className="w-full h-full bg-linear-to-b from-[#334155] to-[#0f172a] rounded-[10px] border-2 border-[#ca8a04] flex items-center justify-between p-1.5 shadow-inner relative overflow-hidden">
      <div className="w-8 h-8 rounded-lg bg-linear-to-b from-[#e2e8f0] to-[#64748b] border border-white/20 shadow-inner flex items-center justify-center">
        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#dc2626] ml-0.5" />
      </div>
      <div className="flex flex-col gap-1 pr-0.5">
        <div className="w-2 h-2 rounded-full bg-[#d1d5db] border border-black/40" />
        <div className="w-2 h-2 rounded-full bg-[#d1d5db] border border-black/40" />
      </div>
    </div>
  </div>
);

// 7. Maps App Icon (Hwy 280 with Pin)
export const IconMaps: React.FC = () => (
  <div className="w-full h-full bg-[#e5e7eb] relative overflow-hidden p-1">
    <div className="absolute inset-0 bg-[#fef08a]/60">
      <div className="absolute top-1/2 left-0 right-0 h-4 bg-[#facc15] border-y border-[#ca8a04] -rotate-15" />
      <div className="absolute left-1/3 top-0 bottom-0 w-3 bg-[#ffffff] border-x border-[#9ca3af] rotate-20" />
    </div>
    <div className="absolute top-1 right-1 bg-blue-700 border border-white rounded-[3px] px-1 text-[7px] font-bold text-white shadow-xs">
      280
    </div>
    <div className="absolute bottom-2 left-2 flex flex-col items-center">
      <div className="w-3 h-3 rounded-full bg-red-600 border border-white shadow-md" />
      <div className="w-0.5 h-2 bg-gray-700 -mt-0.5" />
    </div>
  </div>
);

// 8. Pigeon City Game App Icon
export const IconPigeonCity: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#0284c7] via-[#0f172a] to-[#ea580c] flex flex-col items-center justify-center relative p-1 overflow-hidden">
    {/* Sun/Moon */}
    <div className="w-4 h-4 rounded-full bg-amber-300 absolute top-1.5 right-1.5 opacity-80 shadow-[0_0_6px_#fde047]" />
    {/* Pigeon silhouette with beak */}
    <span className="text-xl relative z-10 drop-shadow">🕊️</span>
    <span className="text-[8px] font-black text-sky-300 uppercase tracking-tighter mt-0.5">PIGEON</span>
  </div>
);

// 8b. Weather App Icon (Legacy)
export const IconWeather: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#38bdf8] to-[#1d4ed8] flex flex-col items-center justify-center relative p-1">
    <div className="w-6 h-6 rounded-full bg-linear-to-b from-[#fde047] to-[#f59e0b] shadow-[0_0_8px_#facc15]" />
    <span className="text-[10px] font-bold text-white mt-0.5 drop-shadow">72°</span>
  </div>
);

// 9. Notes App Icon
export const IconNotes: React.FC = () => (
  <div className="w-full h-full bg-[#fef9c3] relative flex flex-col overflow-hidden">
    <div className="w-full h-3 bg-linear-to-b from-[#78350f] to-[#451a03] border-b border-[#292524] flex items-center justify-center">
      <div className="w-full h-[0.5px] bg-[#fbbf24]/40" />
    </div>
    <div className="flex-1 flex flex-col justify-around py-1 px-1.5">
      <div className="w-full h-[1px] bg-[#cbd5e1]" />
      <div className="w-full h-[1px] bg-[#cbd5e1]" />
      <div className="w-full h-[1px] bg-[#cbd5e1]" />
      <div className="w-full h-[1px] bg-[#cbd5e1]" />
    </div>
  </div>
);

// 10. Reminders App Icon
export const IconReminders: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#f1f5f9] to-[#cbd5e1] p-1.5 flex flex-col justify-around border border-gray-400">
    <div className="flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-xs bg-[#22c55e] flex items-center justify-center text-[7px] text-white font-bold">✓</div>
      <div className="flex-1 h-1 bg-gray-400 rounded-full" />
    </div>
    <div className="flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-xs bg-[#22c55e] flex items-center justify-center text-[7px] text-white font-bold">✓</div>
      <div className="flex-1 h-1 bg-gray-400 rounded-full" />
    </div>
    <div className="flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-xs border border-gray-400" />
      <div className="flex-1 h-1 bg-gray-300 rounded-full" />
    </div>
  </div>
);

// 11. Clock App Icon (ACCURATELY DISPLAYS VIEWER'S LOCAL TIME)
export const IconClock: React.FC = () => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const millis = time.getMilliseconds();

  const secondDeg = (seconds + millis / 1000) * 6;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const hourDeg = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;

  return (
    <div className="w-full h-full bg-linear-to-b from-[#2a2c35] to-[#121318] flex items-center justify-center p-1.5">
      <div className="w-full h-full rounded-full bg-white border border-gray-300 flex items-center justify-center relative shadow-inner overflow-hidden">
        {/* Clock Face Numerals */}
        <div className="absolute top-0.5 text-[6.5px] font-extrabold text-black leading-none select-none">12</div>
        <div className="absolute bottom-0.5 text-[6.5px] font-extrabold text-black leading-none select-none">6</div>
        <div className="absolute left-1 text-[6.5px] font-extrabold text-black leading-none select-none">9</div>
        <div className="absolute right-1 text-[6.5px] font-extrabold text-black leading-none select-none">3</div>

        {/* Dial ticks */}
        {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
          <div
            key={deg}
            className="absolute w-[1px] h-1 bg-gray-400"
            style={{
              transform: `rotate(${deg}deg) translateY(-18px)`,
              transformOrigin: 'center center',
            }}
          />
        ))}

        {/* Hour Hand */}
        <div
          className="absolute w-0.5 h-3.5 bg-black rounded-full shadow-xs"
          style={{
            transform: `rotate(${hourDeg}deg) translateY(-50%)`,
            transformOrigin: 'center bottom',
            bottom: '50%',
            left: 'calc(50% - 1px)',
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute w-0.5 h-4.5 bg-black rounded-full shadow-xs"
          style={{
            transform: `rotate(${minuteDeg}deg) translateY(-50%)`,
            transformOrigin: 'center bottom',
            bottom: '50%',
            left: 'calc(50% - 1px)',
          }}
        />

        {/* Sweep Second Hand */}
        <div
          className="absolute w-[1px] h-5 bg-[#e11d48] rounded-full shadow-xs z-10"
          style={{
            transform: `rotate(${secondDeg}deg) translateY(-50%)`,
            transformOrigin: 'center bottom',
            bottom: '50%',
            left: 'calc(50% - 0.5px)',
          }}
        />

        {/* Center Pivot Nut */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#e11d48] z-20 shadow-xs border border-white/50" />
      </div>
    </div>
  );
};

// 12. Calculator App Icon
export const IconCalculator: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#334155] to-[#0f172a] p-1.5 flex flex-col justify-between border border-black">
    <div className="w-full h-3.5 bg-[#64748b] rounded-xs border border-black/40 flex items-center justify-end px-1 shadow-inner">
      <span className="font-mono text-[8px] font-bold text-black">42.0</span>
    </div>
    <div className="grid grid-cols-4 gap-0.5 flex-1 pt-1">
      {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+'].slice(0, 12).map((k, i) => (
        <div
          key={i}
          className={`rounded-[2px] flex items-center justify-center text-[7px] font-bold shadow-xs ${
            (i + 1) % 4 === 0
              ? 'bg-[#f97316] text-white'
              : 'bg-[#cbd5e1] text-gray-900'
          }`}
        >
          {k}
        </div>
      ))}
    </div>
  </div>
);

// 13. Stocks App Icon
export const IconStocks: React.FC = () => (
  <div className="w-full h-full bg-[#090a0f] p-1.5 flex flex-col justify-between relative overflow-hidden">
    <div className="flex items-center justify-between text-[7px] text-gray-400 font-mono">
      <span>AAPL</span>
      <span className="text-[#22c55e] font-bold">+2.4%</span>
    </div>
    <div className="h-6 w-full flex items-end">
      <svg viewBox="0 0 40 20" className="w-full h-full overflow-visible">
        <path
          d="M0 16 L8 14 L16 17 L24 9 L32 11 L40 4"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M0 16 L8 14 L16 17 L24 9 L32 11 L40 4 L40 20 L0 20 Z"
          fill="rgba(34, 197, 94, 0.25)"
        />
      </svg>
    </div>
  </div>
);

// 14. Game Center App Icon (Retro 4-Quadrant)
export const IconGameCenter: React.FC = () => (
  <div className="w-full h-full bg-white p-1 flex items-center justify-center">
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5 rounded-lg overflow-hidden border border-gray-300 shadow-inner">
      <div className="bg-linear-to-b from-[#ff8533] to-[#e65c00] flex items-center justify-center text-white text-[11px] font-bold drop-shadow-xs">♞</div>
      <div className="bg-linear-to-b from-[#84cc16] to-[#4d7c0f] flex items-center justify-center text-white text-[11px] font-bold drop-shadow-xs">⚾</div>
      <div className="bg-linear-to-b from-[#06b6d4] to-[#0e7490] flex items-center justify-center text-white text-[11px] font-bold drop-shadow-xs">🚀</div>
      <div className="bg-linear-to-b from-[#f43f5e] to-[#be123c] flex items-center justify-center text-white text-[11px] font-bold drop-shadow-xs">🎯</div>
    </div>
  </div>
);

// 15. App Store App Icon
export const IconAppStore: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1] flex items-center justify-center p-2">
    <div className="w-9 h-9 rounded-full border-2 border-white/80 flex items-center justify-center shadow-md">
      <span className="text-white text-xl font-bold font-sans">A</span>
    </div>
  </div>
);

// 16. Settings App Icon
export const IconSettings: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#94a3b8] via-[#64748b] to-[#334155] flex items-center justify-center p-2">
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#e2e8f0] drop-shadow-md">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>
  </div>
);

// 17. Dock: Contacts App Icon (Address Book)
export const IconContacts: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#8d5b36] via-[#633b1e] to-[#422512] flex items-center justify-between p-1 border border-[#3b1f0f] relative overflow-hidden">
    <div className="flex flex-col justify-between h-full w-2 border-r border-[#3b1f0f]/60 pr-0.5">
      <span className="text-[5px] text-[#e5d5c5] font-bold leading-none">A</span>
      <span className="text-[5px] text-[#e5d5c5] font-bold leading-none">M</span>
      <span className="text-[5px] text-[#e5d5c5] font-bold leading-none">Z</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center pl-0.5">
      <div className="w-4 h-4 rounded-full bg-linear-to-b from-[#f8fafc] to-[#cbd5e1] border border-black/20 shadow-xs" />
      <div className="w-6 h-3 rounded-t-full bg-linear-to-b from-[#f8fafc] to-[#94a3b8] -mt-0.5 border border-black/20 shadow-xs" />
    </div>
  </div>
);

// 18. Dock: Mail App Icon
export const IconMail: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1] flex items-center justify-center p-2">
    <div className="w-8 h-5.5 bg-white rounded-xs border border-gray-400 flex items-center justify-center shadow-md relative overflow-hidden">
      <svg viewBox="0 0 32 22" className="w-full h-full" fill="none">
        <path d="M0 0 L16 12 L32 0" stroke="#0284c7" strokeWidth="2.5" fill="#f8fafc" />
        <path d="M0 22 L12 10" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M32 22 L20 10" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
    </div>
  </div>
);

// 19. Dock: LinkedIn App Icon (Replaces Safari)
export const IconLinkedIn: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#0a66c2] to-[#004182] flex items-center justify-center p-1.5 relative overflow-hidden">
    <div className="w-full h-full rounded-md flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white drop-shadow-md">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    </div>
  </div>
);

// 20. Dock: Music App Icon
export const IconMusic: React.FC = () => (
  <div className="w-full h-full bg-linear-to-b from-[#f97316] via-[#ea580c] to-[#c2410c] flex items-center justify-center p-2">
    <span className="text-white text-2xl font-bold drop-shadow">♫</span>
  </div>
);
