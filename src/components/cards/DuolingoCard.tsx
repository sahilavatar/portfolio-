import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X, RotateCcw, Gamepad2, Volume2, Sparkles } from 'lucide-react';
import { BentoCard } from '../BentoCard';

export const DuolingoCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const expandedIframeRef = useRef<HTMLIFrameElement>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (iframeRef.current) {
      iframeRef.current.src = './pigeon-city/index.html';
    }
  };

  const handleRestartExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (expandedIframeRef.current) {
      expandedIframeRef.current.src = './pigeon-city/index.html';
    }
  };

  return (
    <>
      <BentoCard
        className="pigeon-game-card relative w-full h-full p-0 overflow-hidden bg-slate-950 border border-sky-500/20 shadow-lg"
        tooltip="Pigeon City 🕊️ (Click or press Space to fly!)"
        actionIcon="expand"
        onActionClick={(e) => {
          e.stopPropagation();
          setIsExpanded(true);
        }}
      >
        {/* Playable Game Frame (No redirect) */}
        <div className="relative w-full h-full flex flex-col select-none">
          {/* Top Floating Badge Bar */}
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[9px] sm:text-[11px] font-extrabold text-sky-400 border border-sky-400/30 flex items-center gap-1 sm:gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
              PIGEON CITY
            </span>
          </div>

          {/* Quick Actions (Restart & Expand are available) */}
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-11 z-10 flex items-center gap-1">
            <button
              type="button"
              onClick={handleRestart}
              className="p-1.5 rounded-full bg-slate-950/85 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10 transition-colors shadow-md"
              title="Restart Game"
              aria-label="Restart Game"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {/* Playable Iframe Embedded directly on the website */}
          <iframe
            ref={iframeRef}
            src="./pigeon-city/index.html"
            title="Pigeon City Arcade Game"
            className="w-full h-full border-0 block rounded-[30px]"
            allow="autoplay"
          />

          {/* Bottom helper pill */}
          <div className="absolute bottom-2 left-0 right-0 px-2 sm:px-3 flex items-center justify-between gap-1 pointer-events-none text-[9px] sm:text-[10px] font-semibold text-slate-300/90 z-10">
            <span className="bg-slate-950/80 px-2 py-0.5 rounded-full backdrop-blur-xs border border-white/5 truncate">
              Tap / Fly
            </span>
            <span className="bg-slate-950/80 px-2 py-0.5 rounded-full backdrop-blur-xs text-amber-300 border border-white/5 shrink-0">
              🍞 Treats
            </span>
          </div>
        </div>
      </BentoCard>

      {/* Expanded Fullscreen-Style Arcade Cabinet */}
      {isExpanded && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
              onClick={() => setIsExpanded(false)}
            >
              <div
                className="relative w-full max-w-2xl h-[85vh] max-h-[700px] bg-slate-950 border border-sky-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Gamepad2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white flex items-center gap-2">
                        Pigeon City
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          Arcade Cabinet
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Fly Percy the pigeon, dodge skyscrapers & feast on breadcrumbs!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRestartExpanded}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-white/10 cursor-pointer"
                      title="Restart Game"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-white/10 cursor-pointer"
                      title="Close (Esc)"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Playable Frame in Modal */}
                <div className="flex-1 relative w-full h-full bg-slate-950">
                  <iframe
                    ref={expandedIframeRef}
                    src="./pigeon-city/index.html"
                    title="Pigeon City Fullscreen Arcade"
                    className="w-full h-full border-0 block"
                    allow="autoplay"
                  />
                </div>

                {/* Modal Footer Controls Guide */}
                <div className="px-5 py-2.5 bg-slate-900/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span><strong>Controls:</strong> Click / Tap / [Space] or [W]</span>
                    <span><strong>Mute:</strong> [M] or Top-Right Icon</span>
                  </div>
                  <span className="text-sky-400 font-medium">NYC Rooftop Flight</span>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export const PigeonGameCard = DuolingoCard;
export const PigeonCityCard = DuolingoCard;
