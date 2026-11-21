import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BentoCard } from '../BentoCard';
import {
  Sparkles,
  Bot,
  Maximize2,
  Minimize2,
  ExternalLink,
  BookOpen,
  Watch,
  Globe,
  GraduationCap,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { CaseStudyData, normalizeEmbedUrl } from '../CaseStudyOverlay';

interface CaseStudyCardProps {
  data: CaseStudyData;
  onOpen: (data: CaseStudyData) => void;
  dark?: boolean;
  compact?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  data,
  onOpen,
  dark = false,
  compact = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const getIcon = () => {
    const iconSize = compact ? 16 : 18;
    switch (data.id) {
      case 'designlab':
        return <Watch size={iconSize} className="text-amber-500" />;
      case 'avatarnetwork':
        return <Globe size={iconSize} className="text-blue-600 dark:text-blue-400" />;
      case 'ds':
        return <ShieldCheck size={iconSize} className="text-blue-600 dark:text-blue-400" />;
      case 'plugin':
        return <GraduationCap size={iconSize} className="text-blue-600 dark:text-blue-400" />;
      case 'alexa':
        return <Flame size={iconSize} className="text-blue-600 dark:text-blue-400" />;
      case 'schedule':
        return <Bot size={iconSize} className="text-blue-600 dark:text-blue-400" />;
      default:
        return <Sparkles size={iconSize} className="text-teal-600 dark:text-teal-400" />;
    }
  };

  const isVoiceConcierge = data.id === 'schedule';
  const isLuxuryWatch = data.id === 'designlab';
  const isAvatarNetwork = data.id === 'avatarnetwork';
  const isLearnOS = data.id === 'plugin';
  const isTemple = data.id === 'alexa';
  const isAgentPay = data.id === 'ds';
  const hasCustomEmbed = Boolean(data.embedUrl);
  const hasInteractiveDemo = isVoiceConcierge || isLuxuryWatch || hasCustomEmbed;

  const demoConfig = isLuxuryWatch
    ? {
        url: './luxury-watch/index.html',
        externalUrl: './luxury-watch/index.html',
        pill: 'Interactive Timepiece Display',
        title: 'Chronomètre Atelier — Luxury Watch Display',
        sub: '(4Hz Escapement · Lunar Phase · Flyback Chrono · Lume)',
        tagColor: 'text-amber-400 border-amber-400/30',
        btnColor: 'bg-amber-600 hover:bg-amber-500 border-amber-400/30',
      }
    : isVoiceConcierge
      ? {
          url: './voice-concierge/index.html',
          externalUrl: './voice-concierge/index.html',
          pill: 'Interactive Call Demo',
          title: 'Voice Concierge — Interactive Call Demo',
          sub: '(PII Redaction · SOP Grounding · Warm Handoff)',
          tagColor: 'text-blue-400 border-blue-400/30',
          btnColor: 'bg-blue-600 hover:bg-blue-500 border-blue-400/30',
        }
      : isAvatarNetwork
        ? {
            url: data.embedUrl ? normalizeEmbedUrl(data.embedUrl) : 'https://avatarnetwork.org',
            externalUrl: data.externalUrl || 'https://avatarnetwork.org',
            pill: data.embedLabel || 'Interactive Live App',
            title: 'Avatar Network — Private In-Browser AI',
            sub: '(On-Device WASM · Cited Sources · Zero Cloud Uploads)',
            tagColor: 'text-blue-400 border-blue-400/30',
            btnColor: 'bg-blue-600 hover:bg-blue-500 border-blue-400/30',
          }
        : isLearnOS
          ? {
              url: data.embedUrl ? normalizeEmbedUrl(data.embedUrl) : 'https://sahilavatar.github.io/learn-os/',
              externalUrl: data.externalUrl || 'https://sahilavatar.github.io/learn-os/',
              pill: data.embedLabel || 'Interactive Live App',
              title: 'learnOS — Free CS Courses',
              sub: '(MIT OCW · UC Berkeley · IIT · Instant Search)',
              tagColor: 'text-blue-400 border-blue-400/30',
              btnColor: 'bg-blue-600 hover:bg-blue-500 border-blue-400/30',
            }
          : isTemple
            ? {
                url: data.embedUrl ? normalizeEmbedUrl(data.embedUrl) : 'https://sahilavatar.github.io/temple/',
                externalUrl: data.externalUrl || 'https://sahilavatar.github.io/temple/',
                pill: data.embedLabel || 'Interactive Live App',
                title: 'Virtual Hanuman Temple 3D',
                sub: '(POV 3D Exploration · Diya Lamps · Bell & Chalisa)',
                tagColor: 'text-blue-400 border-blue-400/30',
                btnColor: 'bg-blue-600 hover:bg-blue-500 border-blue-400/30',
              }
            : isAgentPay
              ? {
                  url: data.embedUrl ? normalizeEmbedUrl(data.embedUrl) : './assets/aistudio/AgentPay_Live_Demo_9f2d1a96.html',
                  externalUrl: data.externalUrl || './assets/aistudio/AgentPay_Live_Demo_9f2d1a96.html',
                  pill: data.embedLabel || 'Interactive Live App',
                  title: 'AgentPay — Bounded AI RLUSD Payments',
                  sub: '(EIP-712 Vouchers · KYA Checks · XRPL EVM)',
                  tagColor: 'text-blue-400 border-blue-400/30',
                  btnColor: 'bg-blue-600 hover:bg-blue-500 border-blue-400/30',
                }
              : {
                  url: data.embedUrl ? normalizeEmbedUrl(data.embedUrl) : '',
                  externalUrl: data.externalUrl || data.embedUrl || '',
                  pill: data.embedLabel || 'Live Embedded Link',
                  title: data.title,
                  sub: data.tag,
                  tagColor: 'text-teal-300 border-teal-400/30',
                  btnColor: 'bg-teal-600 hover:bg-teal-500 border-teal-400/30',
                };

  return (
    <>
      <BentoCard
        className={`case-card ${compact ? '!p-4' : ''} ${
          isVoiceConcierge ? 'case-card--voice-concierge' : ''
        } ${isLuxuryWatch ? 'case-card--luxury-watch' : ''}`}
        dark={dark}
        tooltip={`Explore Case Study: ${data.title}\nby Sahil Banerjee`}
        actionIcon="expand"
        onActionClick={() => onOpen(data)}
        onClick={() => onOpen(data)}
      >
        <div className={`case-card-top ${compact ? '!gap-1.5' : ''}`}>
          <div className="flex items-center justify-between">
            <span className={`case-card-tag ${compact ? '!text-[10px] !px-2.5 !py-0.5' : ''}`}>
              {data.tag}
            </span>
            {getIcon()}
          </div>

          <h3
            className={`case-card-title ${
              compact ? '!text-[15px] !leading-tight truncate' : ''
            }`}
          >
            {data.title}
          </h3>
          <p
            className={`case-card-desc ${
              compact ? '!text-[11px] !leading-[1.35] line-clamp-2' : ''
            }`}
          >
            {data.summary}
          </p>
        </div>

        {hasInteractiveDemo ? (
          <div
            className={`${compact ? 'mt-2' : 'mt-3'} w-full flex-1 min-h-0 flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative w-full flex-1 ${
                compact
                  ? 'min-h-[104px] rounded-xl'
                  : 'min-h-[230px] md:min-h-[260px] h-[250px] md:h-[300px] rounded-2xl'
              } overflow-hidden border border-[var(--color-border-card)] bg-[#090B0E] shadow-md group`}
            >
              {/* Top pill bar */}
              <div
                className={`absolute ${
                  compact ? 'top-1.5 left-1.5' : 'top-2 left-2'
                } z-10 flex items-center gap-1.5 pointer-events-none`}
              >
                <span
                  className={`${
                    compact ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]'
                  } rounded-full bg-black/85 backdrop-blur-md font-bold ${
                    demoConfig.tagColor
                  } border flex items-center gap-1 shadow-sm`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {compact ? 'Live App' : demoConfig.pill}
                </span>
              </div>

              {/* Fullscreen button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(true);
                }}
                className={`absolute ${
                  compact ? 'top-1.5 right-1.5 px-2 py-0.5 text-[9px]' : 'top-2 right-2 px-2.5 py-0.5 text-[10px]'
                } z-10 rounded-full ${
                  demoConfig.btnColor
                } font-bold text-white border transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1`}
                title="View demo in Fullscreen"
              >
                <Maximize2 size={compact ? 9 : 10} />
                <span>Fullscreen</span>
              </button>

              {/* Embedded Live Prototype / Link */}
              <iframe
                src={demoConfig.url}
                title={demoConfig.title}
                className={`w-full h-full border-0 block ${isAvatarNetwork ? 'bg-white' : ''}`}
                loading={isAvatarNetwork ? 'lazy' : undefined}
                allow="autoplay; fullscreen; clipboard-read; clipboard-write"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="case-card-media-preview">
            <div className="flex items-center gap-1.5 text-xs">
              <span>Link Media</span>
            </div>
          </div>
        )}
      </BentoCard>

      {/* Fullscreen Interactive Demo Modal */}
      {isFullscreen &&
        createPortal(
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
                <span className="text-sm font-bold text-white tracking-wide">
                  {demoConfig.title}
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
                  {demoConfig.sub}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsFullscreen(false);
                    onOpen(data);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Read comprehensive case study"
                >
                  <BookOpen size={13} />
                  <span>Case Study</span>
                </button>

                <a
                  href={demoConfig.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Open demo in new tab"
                >
                  <span>New Tab</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className={`px-3 py-1.5 rounded-xl ${demoConfig.btnColor} text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95`}
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

            {/* Fullscreen interactive prototype */}
            <div
              className="w-full flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-[#090B0E] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={demoConfig.url}
                title={demoConfig.title}
                className="w-full h-full border-0 block"
                allow="autoplay; fullscreen; clipboard-read; clipboard-write"
                allowFullScreen
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
