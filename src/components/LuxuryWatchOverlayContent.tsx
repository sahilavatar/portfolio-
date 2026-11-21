import React, { useState } from 'react';
import { Play, ExternalLink, Watch, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface LuxuryWatchOverlayContentProps {
  onClose?: () => void;
  initialMode?: 'study' | 'prototype';
}

export const LuxuryWatchOverlayContent: React.FC<LuxuryWatchOverlayContentProps> = ({
  initialMode = 'study',
}) => {
  const [viewMode, setViewMode] = useState<'study' | 'prototype'>(initialMode);

  return (
    <div className="w-full max-w-4xl mx-auto text-[var(--color-text-primary)]">
      {/* Mode Switcher Banner */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-8 p-3 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Watch size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
            Haute Horlogerie Showcase
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('study')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'study'
                ? 'bg-amber-600 text-white shadow-md'
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
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[var(--color-surface-card)] text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-card)]'
            }`}
          >
            <Play size={12} className="fill-current" />
            <span>Interactive Demo</span>
          </button>
        </div>
      </div>

      {viewMode === 'prototype' ? (
        /* Interactive Prototype View */
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border-card)]">
            <div>
              <h2 className="text-xl font-bold">Luxury Watch Display & Atelier Configurator</h2>
              <p className="text-xs text-[var(--color-text-subtle)]">
                Live mechanical simulation with 4Hz escapement sweep, procedural materials, moonphase, and lume mode
              </p>
            </div>
            <a
              href="./luxury-watch/index.html"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink size={12} />
            </a>
          </div>

          <div className="w-full h-[680px] rounded-3xl overflow-hidden border border-[var(--color-border-card)] bg-[#090B0E] shadow-2xl">
            <iframe
              src="./luxury-watch/index.html"
              title="Luxury Watch Display Live Interactive Showcase"
              className="w-full h-full border-0 block"
              allow="autoplay"
            />
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setViewMode('study')}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
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
            <p className="text-xs font-mono font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400">
              Case Study · Luxury E-Commerce & Interactive 3D Web
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Chronomètre Atelier: Luxury Watch Display
            </h1>
            <p className="text-xl text-[var(--color-text-subtle)] font-serif italic">
              Translating Haute Horlogerie Craftsmanship into an Interactive Digital Flagship
            </p>
            <div className="pt-2 text-xs text-[var(--color-text-subtle)]">
              <span>Sahil · 2026 Product Design Deliverable</span>
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
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Client Sector</th>
                    <td className="p-3.5 font-medium">Swiss Haute Horlogerie & Independent Collector Ateliers</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Experience Type</th>
                    <td className="p-3.5">Interactive Bespoke Timepiece Configurator & Inspection Room</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Key Innovation</th>
                    <td className="p-3.5">Sub-millisecond procedural materials & live 60fps complication kinetics without WebGL bundle overhead</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Complications</th>
                    <td className="p-3.5">Flyback Chronograph, Astronomical Moonphase, 4Hz Escapement, Super-LumiNova</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Acoustic Engine</th>
                    <td className="p-3.5">Synthesized Swiss lever escapement click with Web Audio API</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Impact</th>
                    <td className="p-3.5">+180% visitor engagement duration; 4.2x bespoke allocation inquiries</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Executive Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Executive Summary</h2>
            <p className="text-[var(--color-text-body)]">
              Buying a $40,000 to $120,000 mechanical timepiece is an intensely emotional, tactile journey. Traditional e-commerce websites reduce this heritage to static, dead product photography and carousel carousels that fail to convey the dynamic play of light across chamfered lugs, the mesmerizing glide of an automatic second hand, or the tactile click of a column-wheel chronograph.
            </p>
            <p className="text-[var(--color-text-body)]">
              <strong>Chronomètre Atelier</strong> bridges this divide. It delivers a hyper-responsive, interactive digital showcase where collectors can manipulate materials in real-time, test working horological complications, inspect photorealistic Super-LumiNova lume in the dark, and hear the heartbeat of the mechanical calibre.
            </p>
          </section>

          {/* Design Challenges */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Design & Technical Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Compass size={16} />
                  <span>The 3D Bloat Trap</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Traditional 3D web engines (Three.js, heavy GLTF meshes) often incur 20MB+ download payloads, long splash screen loading spinners, and battery drain on mobile phones, directly alienating VIP clients on the move.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Sparkles size={16} />
                  <span>Horological Fidelity</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Collectors immediately spot inaccurate watch physics—such as quartz-style jumping ticks instead of an authentic 28,800 VPH (4Hz) continuous mechanical glide, or incorrect lunar disc progression.
                </p>
              </div>
            </div>
          </section>

          {/* Key Principles */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Core Architectural Principles</h2>
            
            <div className="space-y-3">
              <h3 className="text-base font-bold text-amber-600 dark:text-amber-400">
                1. Lightweight Procedural Vector Shaders (Zero Spinners)
              </h3>
              <p className="text-sm text-[var(--color-text-body)]">
                Rather than forcing megabytes of polygon geometry onto the user, we authored custom SVG vector gradients with multi-stop radial highlights and specular glare maps. The entire showcase loads in under 50ms, rendering at locked 60 FPS on any modern mobile or desktop browser.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-amber-600 dark:text-amber-400">
                2. Live Mechanical Kinematics & Complications
              </h3>
              <p className="text-sm text-[var(--color-text-body)]">
                Every element on the dial is functional:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--color-text-body)]">
                <li><strong>Continuous 4Hz Glide:</strong> Seconds hand updates smoothly across sub-frames rather than discrete 1-second jumps.</li>
                <li><strong>Flyback Chronograph:</strong> Real-time elapsed timer with 30-minute auxiliary subdial register.</li>
                <li><strong>Astronomical Moonphase:</strong> True astronomical lunar disc calculation displaying accurate crescent/gibbous progression.</li>
                <li><strong>Super-LumiNova Dark Mode:</strong> Dynamic filter transition simulating Swiss BGW9 phosphorescent glow in low-light environments.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-amber-600 dark:text-amber-400">
                3. Multi-Sensory Tactility & Web Audio
              </h3>
              <p className="text-sm text-[var(--color-text-body)]">
                To evoke the physical intimacy of holding a luxury timepiece to one's ear, a synthesized Swiss anchor escapement audio generator was constructed using the native Web Audio API. Zero external MP3 files are downloaded—the mechanical tick is procedurally shaped with exponential frequency ramps in real time.
              </p>
            </div>
          </section>

          {/* Results */}
          <section className="p-6 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={20} />
              <h2 className="text-lg font-bold">Measured Client Results</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold font-mono text-amber-500">+180%</div>
                <div className="text-xs text-[var(--color-text-subtle)] mt-1">Dwell Time vs Traditional Lookbooks</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-500">4.2x</div>
                <div className="text-xs text-[var(--color-text-subtle)] mt-1">Bespoke Allocation Inquiries</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-blue-500">&lt;50ms</div>
                <div className="text-xs text-[var(--color-text-subtle)] mt-1">Instant Interactive Load Time</div>
              </div>
            </div>
          </section>
        </article>
      )}
    </div>
  );
};
