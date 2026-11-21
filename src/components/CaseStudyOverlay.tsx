import React, { useState, useEffect } from 'react';
import { X, Play, ArrowRight, CheckCircle2, Sliders, Layers, ExternalLink, Globe } from 'lucide-react';
import { VoiceConciergeOverlayContent } from './VoiceConciergeOverlayContent';
import { LuxuryWatchOverlayContent } from './LuxuryWatchOverlayContent';
import { AvatarNetworkOverlayContent } from './AvatarNetworkOverlayContent';
import { LearnOSOverlayContent } from './LearnOSOverlayContent';
import { TempleOverlayContent } from './TempleOverlayContent';
import { AgentPayOverlayContent } from './AgentPayOverlayContent';

export interface CaseStudyData {
  id: string;
  title: string;
  tag: string;
  summary: string;
  stats: { num: string; label: string }[];
  problem: string;
  solution: string;
  decisions: string[];
  outcomes: string[];
  embedUrl?: string;
  externalUrl?: string;
  embedLabel?: string;
}

export function normalizeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('figma.com') && !parsed.pathname.startsWith('/embed')) {
      return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
    }
    if (parsed.hostname.includes('youtube.com') && parsed.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get('v')}`;
    }
    if (parsed.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (parsed.hostname.includes('loom.com') && parsed.pathname.includes('/share/')) {
      return url.replace('/share/', '/embed/');
    }
  } catch {
    // Relative path or non-standard URL — use as-is
  }
  return url;
}

interface CaseStudyOverlayProps {
  data: CaseStudyData | null;
  onClose: () => void;
}

export const CaseStudyOverlay: React.FC<CaseStudyOverlayProps> = ({
  data,
  onClose,
}) => {
  const [tldr, setTldr] = useState(false);
  const [isOldArchitecture, setIsOldArchitecture] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<'Brand A' | 'Brand B' | 'Brand C'>('Brand A');
  const [tokenSearch, setTokenSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (data) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [data, onClose]);

  if (!data) return null;

  const brandStyles = {
    'Brand A': { primary: '#008B8B', bg: '#e8f8ee', font: 'Plus Jakarta Sans, sans-serif', radius: '16px' },
    'Brand B': { primary: '#7c5cfc', bg: '#f1e8f8', font: 'Inter, sans-serif', radius: '24px' },
    'Brand C': { primary: '#fc4c02', bg: '#fdf0e8', font: 'system-ui, sans-serif', radius: '8px' },
  }[selectedBrand];

  const sampleTokens = [
    { name: 'color/brand/primary', value: brandStyles.primary, alias: 'teal-500' },
    { name: 'color/surface/card', value: '#faf9f7', alias: 'neutral-50' },
    { name: 'color/border/subtle', value: 'rgba(0,0,0,0.08)', alias: 'black-8' },
    { name: 'spacing/inset/card', value: '24px', alias: 'space-6' },
    { name: 'radius/container/hero', value: brandStyles.radius, alias: 'radius-lg' },
  ].filter((t) => t.name.toLowerCase().includes(tokenSearch.toLowerCase()));

  return (
    <div className="cs-backdrop" onClick={onClose}>
      <div className="cs-expanded" onClick={(e) => e.stopPropagation()}>
        {/* Sticky Header */}
        <header className="cs-header">
          <div className="flex items-center gap-3">
            <span className="case-card-tag">{data.tag}</span>
            <span className="text-xs text-[var(--color-text-subtle)] font-mono">
              Sahil Banerjee · Portfolio Case Study
            </span>
          </div>

          <button
            type="button"
            className="cs-header-close"
            onClick={onClose}
            data-tooltip="Press Esc to exit"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </header>

        {/* Content body */}
        <div className="cs-expanded-content">
          {data.id === 'schedule' ? (
            <VoiceConciergeOverlayContent onClose={onClose} />
          ) : data.id === 'designlab' ? (
            <LuxuryWatchOverlayContent onClose={onClose} />
          ) : data.id === 'avatarnetwork' ? (
            <AvatarNetworkOverlayContent onClose={onClose} />
          ) : data.id === 'plugin' ? (
            <LearnOSOverlayContent onClose={onClose} />
          ) : data.id === 'alexa' ? (
            <TempleOverlayContent onClose={onClose} />
          ) : data.id === 'ds' ? (
            <AgentPayOverlayContent onClose={onClose} />
          ) : (
            <>
              {/* TL;DR Bar */}
              <div className="tldr-bar">
                <button
                  type="button"
                  className={`tldr-pill ${!tldr ? 'tldr-pill--active' : ''}`}
                  onClick={() => setTldr(false)}
                >
                  Deep Dive
                </button>
                <button
                  type="button"
                  className={`tldr-pill ${tldr ? 'tldr-pill--active' : ''}`}
                  onClick={() => setTldr(true)}
                >
                  TL;DR
                </button>
              </div>

          {/* Title */}
          <h1 className="cs-title">{data.title}</h1>
          <p className="text-center text-lg text-[var(--color-text-body)] max-w-xl mb-6">
            {data.summary}
          </p>

          {/* Stats Row */}
          <div className="cs-stat-row">
            {data.stats.map((s, idx) => (
              <div key={idx} className="cs-stat-item">
                <span className="cs-stat-num">{s.num}</span>
                <span className="cs-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Media / Embedded Link Showcase */}
          {data.embedUrl || data.externalUrl ? (
            <div className="w-full my-6 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 px-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  <Globe size={14} />
                  <span>{data.embedLabel || 'Embedded Interactive Link'}</span>
                </div>
                <a
                  href={data.externalUrl || data.embedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {data.embedUrl ? (
                <div className="w-full h-[520px] rounded-3xl overflow-hidden border border-[var(--color-border-card)] bg-[#090B0E] shadow-xl">
                  <iframe
                    src={normalizeEmbedUrl(data.embedUrl)}
                    title={data.title}
                    className="w-full h-full border-0 block"
                    allow="autoplay; fullscreen; clipboard-read; clipboard-write"
                    allowFullScreen
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="w-full my-6 rounded-3xl border border-[var(--color-border-card)] bg-black/5 dark:bg-white/5 p-8 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg">
                <Play size={24} className="ml-1" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Link Media Preview</h4>
                <p className="text-sm text-[var(--color-text-subtle)]">
                  Interactive video walkthrough and component prototype
                </p>
              </div>
              <div className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/70 dark:bg-black/70 border border-[var(--color-border-card)]">
                Link Media · Case Study Showcase
              </div>
            </div>
          )}

          {/* Interactive Feature: Before / After Toggle Architecture */}
          <div className="w-full my-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Layers size={18} className="text-teal-600 dark:text-teal-400" />
                  Interactive System Architecture Comparison
                </h3>
                <p className="text-xs text-[var(--color-text-subtle)]">
                  Toggle between legacy setup and refactored token graph
                </p>
              </div>

              <div
                className="ba-toggle"
                onClick={() => setIsOldArchitecture(!isOldArchitecture)}
              >
                <span className={`text-xs font-bold ${isOldArchitecture ? 'text-teal-600' : 'opacity-40'}`}>
                  Old
                </span>
                <div className={`ba-track ${!isOldArchitecture ? 'ba-track--on' : ''}`}>
                  <div className="ba-thumb" />
                </div>
                <span className={`text-xs font-bold ${!isOldArchitecture ? 'text-teal-600' : 'opacity-40'}`}>
                  New
                </span>
              </div>
            </div>

            <div className="ba-img-clip p-6 flex flex-col items-center justify-center text-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider bg-teal-600/10 text-teal-600">
                {isOldArchitecture ? 'Legacy Architecture (Before)' : 'Refactored Token System (After)'}
              </span>
              <p className="max-w-md text-sm text-[var(--color-text-body)]">
                {isOldArchitecture
                  ? 'Hardcoded color hexes, divergent brand forks, and untracked component variations across teams.'
                  : '3-tier token hierarchy (Primitive → Semantic → Component) powering instant theme switching and AI agent codegen.'}
              </p>
              <div className="mt-4 text-xs font-mono text-[var(--color-text-subtle)]">
                [Link Media: Architecture Diagram Visualizer]
              </div>
            </div>
          </div>

          {/* Interactive Feature: Brand Switcher (for white-label & design system case studies) */}
          <div className="brand-switcher-box">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-teal-600 dark:text-teal-400" />
                <h4 className="font-bold text-sm">
                  Interactive Brand Switcher Simulation
                </h4>
              </div>
              <div className="flex gap-1.5">
                {(['Brand A', 'Brand B', 'Brand C'] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                      selectedBrand === b
                        ? 'bg-teal-600 text-white'
                        : 'bg-black/5 dark:bg-white/5 hover:bg-black/10'
                    }`}
                    onClick={() => setSelectedBrand(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview card rendered under selected brand tokens */}
            <div
              className="p-5 border transition-all duration-300 flex items-center justify-between"
              style={{
                borderColor: brandStyles.primary,
                background: brandStyles.bg,
                borderRadius: brandStyles.radius,
                fontFamily: brandStyles.font,
              }}
            >
              <div>
                <span className="text-xs uppercase font-extrabold" style={{ color: brandStyles.primary }}>
                  {selectedBrand} Theme Mode
                </span>
                <h5 className="font-bold text-base text-gray-900 mt-1">
                  Insert Component Preview
                </h5>
                <p className="text-xs text-gray-700">
                  Tokens dynamically resolved in &lt;10ms across web and mobile surfaces.
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 text-xs font-bold text-white rounded-lg transition-transform active:scale-95"
                style={{
                  background: brandStyles.primary,
                  borderRadius: brandStyles.radius,
                }}
              >
                Link Media
              </button>
            </div>
          </div>

          {/* Interactive Feature: Color Variables Explorer */}
          <div className="w-full my-6 rounded-2xl border border-[var(--color-border-card)] bg-[var(--color-surface-card)] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-text-subtle)]">
                Figma Variables & Token Registry
              </span>
              <input
                type="text"
                placeholder="Filter tokens..."
                value={tokenSearch}
                onChange={(e) => setTokenSearch(e.target.value)}
                className="px-2.5 py-1 text-xs rounded-md border border-[var(--color-border-card)] bg-transparent text-[var(--color-text-primary)] outline-none"
              />
            </div>
            <div className="space-y-2">
              {sampleTokens.map((token, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-mono text-xs transition-colors"
                >
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {token.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-sm border border-black/10 inline-block"
                      style={{ background: token.value }}
                    />
                    <span className="text-[var(--color-text-subtle)]">{token.alias}</span>
                    <span className="font-bold text-[var(--color-text-primary)]">
                      {token.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Sections (Collapsible with TL;DR) */}
          <div className="w-full space-y-8 mt-6">
            <div>
              <h3 className="cs-section-title">The Challenge</h3>
              <p className="cs-body-text">{data.problem}</p>
            </div>

            <div>
              <h3 className="cs-section-title">The Solution</h3>
              <p className="cs-body-text">{data.solution}</p>
            </div>

            {!tldr && (
              <div>
                <h3 className="cs-section-title">Key Architectural Decisions</h3>
                <div className="space-y-3 mt-4">
                  {data.decisions.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--color-border-card)]"
                    >
                      <ArrowRight size={18} className="text-teal-600 mt-0.5 shrink-0" />
                      <p className="text-sm text-[var(--color-text-body)] m-0">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="cs-section-title">Outcomes & Measurable Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {data.outcomes.map((o, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-teal-500/5 border border-teal-500/20"
                  >
                    <CheckCircle2 size={18} className="text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
                    <p className="text-sm font-medium text-[var(--color-text-body)] m-0">{o}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer inside case study */}
          <div className="mt-16 pt-8 border-t border-[var(--color-border-card)] w-full flex items-center justify-between text-xs text-[var(--color-text-subtle)]">
            <span>Sahil Banerjee · Portfolio Case Study</span>
            <button
              type="button"
              className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
              onClick={onClose}
            >
              Close and return to grid ✕
            </button>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
