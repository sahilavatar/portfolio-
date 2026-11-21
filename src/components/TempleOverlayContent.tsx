import React, { useState } from 'react';
import { Play, ExternalLink, Flame, Compass, Sparkles, Volume2 } from 'lucide-react';

interface TempleOverlayContentProps {
  onClose?: () => void;
  initialMode?: 'study' | 'prototype';
}

const TEMPLE_URL = 'https://sahilavatar.github.io/temple/';

export const TempleOverlayContent: React.FC<TempleOverlayContentProps> = ({
  initialMode = 'study',
}) => {
  const [viewMode, setViewMode] = useState<'study' | 'prototype'>(initialMode);

  return (
    <div className="w-full max-w-4xl mx-auto text-[var(--color-text-primary)]">
      {/* Mode Switcher Banner */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-8 p-3 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <Flame size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
            Live 3D Web Experience
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('study')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'study'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-[var(--color-surface-card)] text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-card)]'
            }`}
          >
            📖 Full Case Study
          </button>
          <button
            type="button"
            onClick={() => setViewMode('prototype')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'prototype'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-[var(--color-surface-card)] text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-card)]'
            }`}
          >
            <Play size={12} className="fill-current" />
            <span>Interactive Demo</span>
          </button>
        </div>
      </div>

      {viewMode === 'prototype' ? (
        /* Interactive Live 3D View */
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border-card)]">
            <div>
              <h2 className="text-xl font-bold">Virtual Hanuman Temple 3D</h2>
              <p className="text-xs text-[var(--color-text-subtle)]">
                POV 3D exploration with interactive diya lamps, temple bell, flower offerings, and Hanuman Chalisa player
              </p>
            </div>
            <a
              href={TEMPLE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink size={12} />
            </a>
          </div>

          <div className="w-full h-[650px] rounded-3xl overflow-hidden border border-[var(--color-border-card)] bg-[#0c0a09] shadow-2xl">
            <iframe
              src={TEMPLE_URL}
              title="Virtual Hanuman Temple 3D Live Experience"
              className="w-full h-full border-0 block"
              allow="autoplay; fullscreen; clipboard-read; clipboard-write"
              allowFullScreen
            />
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setViewMode('study')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              ← Back to comprehensive case study document
            </button>
          </div>
        </div>
      ) : (
        /* Full Case Study Document View */
        <article className="space-y-12 animate-fade-in font-sans leading-relaxed">
          {/* Header */}
          <header className="space-y-3 pb-6 border-b border-[var(--color-border-card)]">
            <p className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
              Case Study · 3D Spatial Web & Interactive Experience
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Virtual Hanuman Temple 3D
            </h1>
            <p className="text-xl text-[var(--color-text-subtle)] font-serif italic">
              Bringing Ancient Sacred Architecture, Tactile Rituals, and Devotional Soundscapes to the Browser
            </p>
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 text-xs text-[var(--color-text-subtle)]">
              <span>Sahil · Live at sahilavatar.github.io/temple</span>
              <a
                href={TEMPLE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Visit Virtual Temple <ExternalLink size={12} />
              </a>
            </div>
          </header>

          {/* At a glance table */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">At a glance</h2>
            <div className="overflow-x-auto rounded-2xl border border-[var(--color-border-card)] bg-[var(--color-surface-hover)]">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-card)] text-xs uppercase tracking-wider text-[var(--color-text-subtle)]">
                    <th className="p-3.5 font-bold w-1/3">Dimension</th>
                    <th className="p-3.5 font-bold">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-card)]">
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Live URL</th>
                    <td className="p-3.5 font-medium">
                      <a
                        href={TEMPLE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        sahilavatar.github.io/temple <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Category</th>
                    <td className="p-3.5">Interactive 3D Spatial Sanctuary & Devotional Web App</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Interactive Rituals</th>
                    <td className="p-3.5">Virtual diya lighting, sacred bell ringing, flower offerings, and Chalisa player</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Visual & Type Direction</th>
                    <td className="p-3.5">Stone dark canvas (#0c0a09) paired with Cinzel &amp; Yatra One display typography</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Access</th>
                    <td className="p-3.5">Instant mobile &amp; desktop browser playback with zero app install</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Executive Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Executive Summary</h2>
            <p className="text-[var(--color-text-body)]">
              Traditional spiritual portals rely on flat 2D galleries or passive livestreams that lose the architectural scale, warm candlelight atmosphere, and participatory rhythm of visiting a temple in person.
            </p>
            <p className="text-[var(--color-text-body)]">
              <strong>Virtual Hanuman Temple 3D</strong> creates an immersive spatial sanctuary right inside the browser. Visitors walk through carved ancient stone corridors in first-person POV, light flickering diya lamps, ring the suspended temple bell, offer fresh flowers at the sanctum, and listen to the Hanuman Chalisa devotional player.
            </p>
          </section>

          {/* Core Spatial & Sensory Decisions */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Core Spatial &amp; Sensory Decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Compass size={16} />
                  <span>First-Person POV</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Smooth touch and desktop POV camera controls guide visitors through the pillared mandapa into the inner garbhagriha sanctum.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Sparkles size={16} />
                  <span>Tactile Temple Rituals</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Direct interaction points trigger virtual diya lamp illumination, marigold flower offerings, and animated sanctum glow effects.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Volume2 size={16} />
                  <span>Acoustic Devotion</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Pairs spatial temple bell chimes with a dedicated Hanuman Chalisa devotional player designed for calm ambient focus.
                </p>
              </div>
            </div>
          </section>
        </article>
      )}
    </div>
  );
};
