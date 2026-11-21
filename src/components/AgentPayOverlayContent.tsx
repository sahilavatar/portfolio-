import React, { useState } from 'react';
import { Play, ExternalLink, ShieldCheck, KeyRound, Lock, Activity } from 'lucide-react';

interface AgentPayOverlayContentProps {
  onClose?: () => void;
  initialMode?: 'study' | 'prototype';
}

const AGENTPAY_DEMO_URL = './assets/aistudio/AgentPay_Live_Demo_9f2d1a96.html';

export const AgentPayOverlayContent: React.FC<AgentPayOverlayContentProps> = ({
  initialMode = 'study',
}) => {
  const [viewMode, setViewMode] = useState<'study' | 'prototype'>(initialMode);

  return (
    <div className="w-full max-w-4xl mx-auto text-[var(--color-text-primary)]">
      {/* Mode Switcher Banner */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-8 p-3 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <ShieldCheck size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
            Interactive Cryptographic Sandbox
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
        /* Interactive Live Demo View */
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border-card)]">
            <div>
              <h2 className="text-xl font-bold">AgentPay — Bounded AI RLUSD Payments</h2>
              <p className="text-xs text-[var(--color-text-subtle)]">
                Real EIP-712 voucher signing in-browser with 8-step AgentPay.redeem() verification across 7 test scenes
              </p>
            </div>
            <a
              href={AGENTPAY_DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink size={12} />
            </a>
          </div>

          <div className="w-full h-[680px] rounded-3xl overflow-hidden border border-[var(--color-border-card)] bg-[#0f1519] shadow-2xl">
            <iframe
              src={AGENTPAY_DEMO_URL}
              title="AgentPay Live Demo"
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
              Case Study · Agentic Payments &amp; On-Chain Guardrails
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              AgentPay: Bounded AI Agent Payments in RLUSD
            </h1>
            <p className="text-xl text-[var(--color-text-subtle)] font-serif italic">
              Cryptographic Spend Limits, KYA Verification, and Deterministic Contract Enforcement on XRPL EVM
            </p>
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 text-xs text-[var(--color-text-subtle)]">
              <span>Sahil · XRPL EVM (Chain 1449000) · Real EIP-712 (ethers v6)</span>
              <button
                type="button"
                onClick={() => setViewMode('prototype')}
                className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Launch Interactive Sandbox →
              </button>
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
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Settlement Network</th>
                    <td className="p-3.5 font-medium">XRPL EVM (Chain ID 1449000) · RLUSD Stablecoin</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Authorization Standard</th>
                    <td className="p-3.5">Real in-browser EIP-712 typed-data vouchers signed via ethers v6</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Principal Controls</th>
                    <td className="p-3.5">Funded spend limit, max-per-payment cap, instant pause kill switch</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Enforcement Pipeline</th>
                    <td className="p-3.5">8 sequential contract checks: TTL, KYA, merchant registry, sig, nonce, pause, cap, limit</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Verification Scenes</th>
                    <td className="p-3.5">7 live scenarios including rogue agent, tampered voucher, replay attack, and unverified key</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Executive Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Executive Summary</h2>
            <p className="text-[var(--color-text-body)]">
              Giving an autonomous AI agent raw wallet custody or API keys exposes principals to prompt injection, runaway loops, and uncapped spend.
            </p>
            <p className="text-[var(--color-text-body)]">
              <strong>AgentPay</strong> separates custody from signing authority: the agent holds only a signing key with zero funds or gas, issuing EIP-712 payment vouchers to verified merchants. Even if an agent turns rogue or a voucher is tampered with mid-flight, deterministic contract-ordered checks reject unauthorized redemptions before any RLUSD moves.
            </p>
          </section>

          {/* Core Architectural Decisions */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Core Architecture &amp; Security Decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <KeyRound size={16} />
                  <span>Zero-Custody Signing</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  The agent holds no RLUSD balance and no gas tokens—only an ephemeral key used to sign scoped EIP-712 payment vouchers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Lock size={16} />
                  <span>8-Step Contract Gate</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  Every voucher passes TTL, KYA registry, merchant registry, signer recovery, single-use nonce, pause state, per-tx cap, and budget checks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)] space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <Activity size={16} />
                  <span>Control-Room Telemetry</span>
                </div>
                <p className="text-xs text-[var(--color-text-subtle)] leading-relaxed">
                  A live spend-limit meter, cryptographic voucher inspector, step-by-step verifier, and settlement ledger expose every state transition.
                </p>
              </div>
            </div>
          </section>
        </article>
      )}
    </div>
  );
};
