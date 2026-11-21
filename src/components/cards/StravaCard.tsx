import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, Minimize2, ExternalLink, RotateCcw, Globe } from 'lucide-react';
import { BentoCard } from '../BentoCard';

const AVATAR_NETWORK_URL = 'https://avatarnetwork.org';

export const StravaCard: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const expandedIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const handleReloadCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIframeKey((k) => k + 1);
  };

  const handleReloadExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (expandedIframeRef.current) {
      expandedIframeRef.current.src = AVATAR_NETWORK_URL;
    }
  };

  return (
    <>
      <BentoCard
        className="relative w-full h-full p-0 overflow-hidden bg-slate-950 border border-emerald-500/20 shadow-lg"
        tooltip="Avatar Network — Live Website (avatarnetwork.org)"
        actionIcon="expand"
        onActionClick={(e) => {
          e.stopPropagation();
          setIsFullscreen(true);
        }}
      >
        <div className="relative w-full h-full flex flex-col select-none">
          {/* Top Floating Badge Bar */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[10px] font-extrabold text-emerald-400 border border-emerald-400/30 flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              avatarnetwork.org
            </span>
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2.5 right-12 z-10 flex items-center gap-1">
            <button
              type="button"
              onClick={handleReloadCard}
              className="p-1.5 rounded-full bg-slate-950/85 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10 transition-colors shadow-md cursor-pointer"
              title="Reload site"
              aria-label="Reload avatarnetwork.org"
            >
              <RotateCcw size={11} />
            </button>
            <a
              href={AVATAR_NETWORK_URL}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-full bg-slate-950/85 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10 transition-colors shadow-md"
              title="Open avatarnetwork.org in new tab"
              aria-label="Open avatarnetwork.org in new tab"
            >
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Live Website Embed */}
          <iframe
            key={iframeKey}
            src={AVATAR_NETWORK_URL}
            title="Avatar Network Live Embed"
            className="w-full h-full border-0 block rounded-[30px] bg-white"
            loading="lazy"
            allow="autoplay; fullscreen; clipboard-read; clipboard-write"
          />

          {/* Bottom Fullscreen Pill */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(true);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-950/85 hover:bg-slate-900 backdrop-blur-md text-[10px] font-bold text-white border border-white/15 transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1"
              title="Expand Avatar Network in Fullscreen"
            >
              <Maximize2 size={10} />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      </BentoCard>

      {/* Fullscreen Website Viewer */}
      {isFullscreen && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="fixed inset-0 z-[10000] bg-[#090D11]/95 backdrop-blur-xl flex flex-col p-3 sm:p-6 animate-fade-in"
              onClick={() => setIsFullscreen(false)}
            >
              {/* Fullscreen header */}
              <div
                className="flex items-center justify-between gap-3 mb-3 px-2 py-1 flex-wrap"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <Globe size={16} className="text-emerald-400" />
                  <span className="text-sm font-bold text-white tracking-wide">
                    Avatar Network
                  </span>
                  <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
                    https://avatarnetwork.org
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReloadExpanded}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Reload page"
                  >
                    <RotateCcw size={13} />
                    <span>Reload</span>
                  </button>

                  <a
                    href={AVATAR_NETWORK_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Open avatarnetwork.org in new tab"
                  >
                    <span>New Tab</span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(false)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                    title="Exit Fullscreen (Esc)"
                  >
                    <Minimize2 size={13} />
                    <span>Exit Fullscreen</span>
                    <kbd className="hidden md:inline-block text-[10px] bg-black/30 px-1 rounded ml-1 font-mono">
                      Esc
                    </kbd>
                  </button>
                </div>
              </div>

              {/* Fullscreen live embed */}
              <div
                className="w-full flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-white shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  ref={expandedIframeRef}
                  src={AVATAR_NETWORK_URL}
                  title="Avatar Network Fullscreen View"
                  className="w-full h-full border-0 block"
                  allow="autoplay; fullscreen; clipboard-read; clipboard-write"
                  allowFullScreen
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};
