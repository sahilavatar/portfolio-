import React, { useState, useEffect } from 'react';
import { Wifi, BatteryCharging } from 'lucide-react';

export const IOSStatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState('9:41 AM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minStr = minutes < 10 ? '0' + minutes : minutes;
      setTimeStr(`${hours}:${minStr} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ios-status-bar">
      {/* Left: Carrier + Signal */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-[1.5px] h-2.5 mr-0.5">
          <div className="w-[2.5px] h-1 bg-white rounded-xs" />
          <div className="w-[2.5px] h-1.5 bg-white rounded-xs" />
          <div className="w-[2.5px] h-2 bg-white rounded-xs" />
          <div className="w-[2.5px] h-2.5 bg-white rounded-xs" />
        </div>
        <span className="font-semibold text-[11px]">Carrier</span>
        <Wifi size={12} className="stroke-[2.5]" />
      </div>

      {/* Center: Time */}
      <div className="text-center font-bold tracking-tight">
        {timeStr}
      </div>

      {/* Right: Battery */}
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-semibold">100%</span>
        <div className="relative flex items-center">
          <div className="w-5 h-2.5 border border-white/90 rounded-[3px] p-[1px] flex items-center">
            <div className="w-full h-full bg-linear-to-r from-emerald-400 to-green-500 rounded-[1.5px]" />
          </div>
          <div className="w-[1.5px] h-1 bg-white/90 rounded-r-[1px] ml-[0.5px]" />
        </div>
      </div>
    </div>
  );
};
