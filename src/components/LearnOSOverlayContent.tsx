import React, { useState } from 'react';
import { Play, ExternalLink, GraduationCap, Search, Layers, Compass } from 'lucide-react';

interface LearnOSOverlayContentProps {
  onClose?: () => void;
  initialMode?: 'study' | 'prototype';
}

const LEARN_OS_URL = 'https://sahilavatar.github.io/learn-os/';

export const LearnOSOverlayContent: React.FC<LearnOSOverlayContentProps> = ({
  initialMode = 'study',
}) => {
  const [viewMode, setViewMode] = useState<'study' | 'prototype'>(initialMode);

  return (
    <div className="w-full max-w-4xl mx-auto text-[var(--color-text-primary)]">
      {/* Mode Switcher Banner */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-8 p-3 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <GraduationCap size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
            Live Web Product
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
        /* Interactive Live Site View */
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border-card)]">
            <div>
              <h2 className="text-xl font-bold">learnOS — Free CS Courses</h2>
              <p className="text-xs text-[var(--color-text-subtle)]">
                Curated MIT OCW, UC Berkeley, and IIT computer science lectures organized in an OS-style shell
              </p>
            </div>
            <a
              href={LEARN_OS_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink size={12} />
            </a>
          </div>

          <div className="w-full h-[650px] rounded-3xl overflow-hidden border border-[var(--color-border-card)] bg-[#09090E] shadow-2xl">
            <iframe
              src={LEARN_OS_URL}
              title="learnOS Live Application"
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
              Case Study · EdTech & Information Architecture
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              learnOS: World-Class CS Courses, Organized
            </h1>
            <p className="text-xl text-[var(--color-text-subtle)] font-serif italic">
              Transforming a Dense Open-Source Syllabus Repo into a Zero-Friction Learning Workspace
            </p>
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 text-xs text-[var(--color-text-subtle)]">
              <span>Sahil · Live at sahilavatar.github.io/learn-os</span>
              <a
                href={LEARN_OS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Visit learnOS <ExternalLink size={12} />
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
                        href={LEARN_OS_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        sahilavatar.github.io/learn-os <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Category</th>
                    <td className="p-3.5">Open Computer Science Curriculum & Course Explorer</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Data Source</th>
                    <td className="p-3.5">Curated from Developer-Y/cs-video-courses (MIT OCW, UC Berkeley, IIT NPTEL)</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Interface Model</th>
                    <td className="p-3.5">Dark-mode OS shell with persistent topic sidebar & instant keyword filter</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Friction</th>
                    <td className="p-3.5">100% free, zero logins, single-file static bundle</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Executive Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Executive Summary</h2>
            <p className="text-[var(--color-text-body)]">
              Incredible university computer science lectures from MIT, UC Berkeley, Stanford, and IITs are freely available online—yet learners usually discover them buried inside massive, unsearchable GitHub Markdown READMEs.
            </p>
            <p className="text-[var(--color-text-body)]">
              <strong>learnOS</strong> reimagines that raw syllabus into an intentional, distraction-free learning OS. Learners browse core CS pillars (Algorithms, Operating Systems, Databases, Artificial Intelligence) via an interactive sidebar, filter instantly by topic or institution, and jump straight into lectures with zero clutter.
            </p>
          </section>

          {/* Core Product Decisions */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Core Product & UX Decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Layers size={16} />
                  <span>OS-Inspired Shell</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Persistent 260px navigation sidebar paired with a scrollable main stage replaces endless Markdown scrolling with clear domain tracks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Search size={16} />
                  <span>Instant Client Search</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Real-time filtering across course titles, institutions, and CS disciplines with immediate live counts and zero backend latency.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Compass size={16} />
                  <span>High-Contrast Focus</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Deep obsidian surfaces (`#09090E`) paired with crisp editorial serif headings and acid-lime accents keep focus on study discovery.
                </p>
              </div>
            </div>
          </section>
        </article>
      )}
    </div>
  );
};
