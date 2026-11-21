import React, { useState } from 'react';
import { Play, ExternalLink, Globe, ShieldCheck, Cpu, BookOpenCheck } from 'lucide-react';

interface AvatarNetworkOverlayContentProps {
  onClose?: () => void;
  initialMode?: 'study' | 'prototype';
}

const AVATAR_NETWORK_URL = 'https://avatarnetwork.org';

export const AvatarNetworkOverlayContent: React.FC<AvatarNetworkOverlayContentProps> = ({
  initialMode = 'study',
}) => {
  const [viewMode, setViewMode] = useState<'study' | 'prototype'>(initialMode);

  return (
    <div className="w-full max-w-4xl mx-auto text-[var(--color-text-primary)]">
      {/* Mode Switcher Banner */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-8 p-3 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <Globe size={18} />
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
              <h2 className="text-xl font-bold">Avatar Network — Live In-Browser App</h2>
              <p className="text-xs text-[var(--color-text-subtle)]">
                Private AI study assistant running locally in your browser with cited sources
              </p>
            </div>
            <a
              href={AVATAR_NETWORK_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink size={12} />
            </a>
          </div>

          <div className="w-full h-[650px] rounded-3xl overflow-hidden border border-[var(--color-border-card)] bg-[#090B0E] shadow-2xl">
            <iframe
              src={AVATAR_NETWORK_URL}
              title="Avatar Network Live Application"
              className="w-full h-full border-0 block bg-white"
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
              Case Study · Local AI & Privacy-First Product Design
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Avatar Network: Private In-Browser AI Study Assistant
            </h1>
            <p className="text-xl text-[var(--color-text-subtle)] font-serif italic">
              Zero-Server Retrieval-Augmented Generation Running 100% Client-Side
            </p>
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 text-xs text-[var(--color-text-subtle)]">
              <span>Sahil · Live at avatarnetwork.org</span>
              <a
                href={AVATAR_NETWORK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Visit avatarnetwork.org <ExternalLink size={12} />
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
                        href={AVATAR_NETWORK_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        avatarnetwork.org <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Category</th>
                    <td className="p-3.5">Local AI Study Assistant & Document Q&A</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Privacy Model</th>
                    <td className="p-3.5">Zero accounts, zero telemetry, nothing leaves the user's device</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Runtime Stack</th>
                    <td className="p-3.5">Client-side ONNX / WASM inference with COOP/COEP SharedArrayBuffer</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Core Trust Loop</th>
                    <td className="p-3.5">Inline cited source passages directly from user-uploaded notes & PDFs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Executive Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Executive Summary</h2>
            <p className="text-[var(--color-text-body)]">
              Students and researchers increasingly want AI help synthesizing dense lecture notes and PDFs, but mainstream AI tools require creating accounts, paying monthly subscriptions, and uploading private study material to external servers.
            </p>
            <p className="text-[var(--color-text-body)]">
              <strong>Avatar Network</strong> moves the entire RAG pipeline into the browser tab. Users drop in their notes or PDFs and ask questions immediately—receiving grounded answers with clickable source citations while every token and embedding stays strictly on-device.
            </p>
          </section>

          {/* Key Principles */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Core Product & Architecture Decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <ShieldCheck size={16} />
                  <span>100% On-Device Privacy</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  No login wall, no backend database, and zero network egress for user documents. Notes stay inside local browser memory.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Cpu size={16} />
                  <span>WASM / ONNX Engine</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Uses multi-threaded WebAssembly (enabled via COOP/COEP isolation headers) for responsive client-side embeddings and inference.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <BookOpenCheck size={16} />
                  <span>Verifiable Citations</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Every answer links directly back to the source excerpts from the user's own uploaded material to prevent silent hallucinations.
                </p>
              </div>
            </div>
          </section>
        </article>
      )}
    </div>
  );
};
