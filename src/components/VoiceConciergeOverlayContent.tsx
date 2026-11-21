import React, { useState } from 'react';
import { Play, Sparkles, ExternalLink, ArrowRight, ShieldCheck, CheckCircle2, Bot } from 'lucide-react';

interface VoiceConciergeOverlayContentProps {
  onClose?: () => void;
}

export const VoiceConciergeOverlayContent: React.FC<VoiceConciergeOverlayContentProps> = () => {
  const [viewMode, setViewMode] = useState<'study' | 'prototype'>('study');

  return (
    <div className="w-full max-w-4xl mx-auto text-[var(--color-text-primary)]">
      {/* Mode Switcher Banner */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-8 p-3 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border-card)]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <Bot size={18} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
            Project Deliverable
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
        /* Interactive Prototype View */
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border-card)]">
            <div>
              <h2 className="text-xl font-bold">Interactive Voice Concierge Demo</h2>
              <p className="text-xs text-[var(--color-text-subtle)]">
                Scripted prototype simulating PII masking, SOP retrieval, and warm human handoffs
              </p>
            </div>
            <a
              href="./voice-concierge/index.html"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Open in new tab <ExternalLink size={12} />
            </a>
          </div>

          <div className="w-full h-[650px] rounded-3xl overflow-hidden border border-[var(--color-border-card)] bg-slate-900 shadow-2xl">
            <iframe
              src="./voice-concierge/index.html"
              title="Agentic Voice Concierge Prototype"
              className="w-full h-full border-0 block"
              allow="autoplay"
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
              Case Study · Voice AI & Enterprise Architecture
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              From Press 1 to Voice Concierge
            </h1>
            <p className="text-xl text-[var(--color-text-subtle)] font-serif italic">
              Migrating a Tier-1 Bank's Support IVR
            </p>
            <div className="pt-2 text-xs text-[var(--color-text-subtle)]">
              <span>Sahil · 4 March 2026</span>
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
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Status</th>
                    <td className="p-3.5 font-medium">Agentic concept; no production results are claimed</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Domain</th>
                    <td className="p-3.5">Internal employee IT support at a bank</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Replaces</th>
                    <td className="p-3.5">Legacy "Press 1" IVR</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">First flows</th>
                    <td className="p-3.5">VPN troubleshooting, MFA resets</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Core pattern</th>
                    <td className="p-3.5">Grounded answers, masked PII, warm human handoff</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-subtle)]">Hands off to</th>
                    <td className="p-3.5">Human agents in ServiceNow or Genesys</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Executive summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Executive summary</h2>
            <p className="text-[var(--color-text-body)]">
              The proposal replaces a legacy "Press 1" IVR for employee IT support with an LLM-powered voice concierge, migrating in phases instead of in one cutover. At a Tier-1 bank like JPMC, the path matters as much as the destination: accuracy, privacy and continuity of service cannot be traded for speed.
            </p>
            <p className="font-semibold text-[var(--color-text-primary)]">Three principles anchor the design:</p>
            <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-body)]">
              <li>
                <strong>Data-driven intent mapping.</strong> Historical support transcripts, not assumptions, decide which flows move first.
              </li>
              <li>
                <strong>Zero-hallucination guardrails.</strong> Every answer is grounded in verified internal SOPs, and PII is masked before it reaches a model.
              </li>
              <li>
                <strong>Frictionless human handoffs.</strong> When AI can't resolve an issue, a human agent receives full context, so the employee never repeats themselves.
              </li>
            </ul>
          </section>

          {/* Context and challenge */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Context and challenge</h2>
            <p className="text-[var(--color-text-body)]">
              A menu-driven IVR forces employees to translate a problem into a keypad path, and it fails the moment a problem doesn't fit the menu. For internal IT support, that means frustrated callers, misrouted tickets and agents spending time on issues that should resolve in seconds, such as VPN failures and MFA resets.
            </p>
            <p className="font-semibold text-[var(--color-text-primary)]">
              Replacing it at enterprise scale is hard for reasons beyond the technology:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-body)]">
              <li><strong>Accuracy is non-negotiable.</strong> A wrong answer about access or security is worse than no answer.</li>
              <li><strong>Sensitive data is in every call.</strong> Employee identifiers and account details can't flow freely into third-party models.</li>
              <li><strong>Support can't go dark.</strong> Agents in ServiceNow and Genesys keep working while the new front door is built beside the old one.</li>
              <li><strong>Trust has to be earned.</strong> A big-bang replacement invites a failure that sets adoption back; a visible quick win builds the case for the next phase.</li>
            </ul>
          </section>

          {/* Principle 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Principle 1: Data-driven intent mapping</h2>
            <p className="text-[var(--color-text-body)]">
              The first flows to migrate are chosen from evidence. Unsupervised LLM clustering runs over historical support transcripts and groups them by what employees actually asked for, rather than by the categories the old menu assumed.
            </p>
            <p className="text-[var(--color-text-body)]">
              The output is a ranked map of intents. High-volume, high-friction, well-understood flows go first, and VPN troubleshooting and MFA resets are the expected candidates. They are frequent, procedural and already documented, so they deliver visible return on investment quickly with the lowest risk.
            </p>
            <p className="text-[var(--color-text-body)]">
              Clustering also surfaces what the menu never captured: intents nobody planned for, and the long tail that should stay with human agents.
            </p>
          </section>

          {/* Principle 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Principle 2: Zero-hallucination guardrails</h2>
            <p className="text-[var(--color-text-body)]">
              The concierge answers only from what the bank has already verified. A Retrieval-Augmented Generation (RAG) framework grounds every response strictly in internal standard operating procedures (SOPs). If no approved source supports an answer, the system doesn't improvise; it hands off.
            </p>
            <p className="text-[var(--color-text-body)]">
              A <strong>Privacy Gate</strong> sits in front of the model. It masks PII in the transcript before any text reaches an LLM, so the model reasons over placeholders and never sees raw identifiers.
            </p>
            <p className="text-[var(--color-text-body)]">
              Together, the two controls separate what the system may say (verified SOPs only) from what it may see (masked data only). Both can be audited independently.
            </p>
          </section>

          {/* Principle 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Principle 3: Frictionless human handoffs</h2>
            <p className="text-[var(--color-text-body)]">
              AI should never trap an employee in a loop. A <strong>Warm Handoff</strong> passes structured intent and sentiment data directly to a human agent in ServiceNow or Genesys, so the agent starts from the problem rather than from "How can I help you?"
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-body)]">
              <li><strong>What the employee wants:</strong> the detected intent and what has already been tried.</li>
              <li><strong>How they feel:</strong> a sentiment signal, so frustrated callers get priority and a calmer tone.</li>
              <li><strong>Where it happened:</strong> the conversation context, so no one repeats themselves.</li>
            </ul>
            <p className="text-[var(--color-text-body)]">
              This also makes escalation a feature rather than a failure. Every handoff is a labelled example that can sharpen intent mapping in the next cycle.
            </p>
          </section>

          {/* System design Diagram */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">System design: how a call flows</h2>
            <div className="p-4 sm:p-6 rounded-2xl border border-[var(--color-border-card)] bg-[var(--color-surface-hover)] overflow-x-auto shadow-inner">
              <svg
                viewBox="0 0 760 410"
                className="w-full min-w-[640px] h-auto font-sans text-xs"
                role="img"
                aria-label="Call Architecture Flow"
              >
                <defs>
                  <marker id="call-arrow-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0 0L10 5L0 10z" fill="currentColor" opacity="0.6" />
                  </marker>
                </defs>
                <text className="font-bold text-sm fill-current" x="24" y="34">
                  Every call is masked first, and anything unsupported goes to a person
                </text>
                <path d="M160 96H192" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#call-arrow-flow)" />
                <path d="M328 96H360" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#call-arrow-flow)" />
                <path d="M496 96H528" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#call-arrow-flow)" />
                <path d="M596 124V180" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#call-arrow-flow)" />
                <path d="M516 216H448" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#call-arrow-flow)" />
                <path d="M596 252V314" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#call-arrow-flow)" />
                <path d="M360 244V350H480" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#call-arrow-flow)" />

                <rect x="24" y="68" width="136" height="56" rx="8" fill="var(--color-surface-card)" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <text className="font-bold fill-current text-center" textAnchor="middle" x="92" y="92">Employee call</text>
                <text className="opacity-60 fill-current" textAnchor="middle" x="92" y="110">Voice transcript</text>

                <rect x="192" y="68" width="136" height="56" rx="8" fill="var(--color-surface-card)" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <text className="font-bold fill-current" textAnchor="middle" x="260" y="92">Privacy Gate</text>
                <text className="opacity-60 fill-current" textAnchor="middle" x="260" y="110">Masks PII first</text>

                <rect x="360" y="68" width="136" height="56" rx="8" fill="var(--color-surface-card)" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <text className="font-bold fill-current" textAnchor="middle" x="428" y="92">Intent match</text>
                <text className="opacity-60 fill-current" textAnchor="middle" x="428" y="110">Ranked intent map</text>

                <rect x="528" y="68" width="136" height="56" rx="8" fill="var(--color-surface-card)" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <text className="font-bold fill-current" textAnchor="middle" x="596" y="92">SOP retrieval</text>
                <text className="opacity-60 fill-current" textAnchor="middle" x="596" y="110">Verified SOPs</text>

                <polygon points="516,216 596,180 676,216 596,252" fill="var(--color-surface-card)" stroke="currentColor" strokeWidth="1.25" opacity="0.8" />
                <text className="fill-current font-medium" textAnchor="middle" x="596" y="212">SOP supports</text>
                <text className="fill-current font-medium" textAnchor="middle" x="596" y="229">an answer?</text>

                <rect x="272" y="188" width="176" height="56" rx="8" fill="var(--color-surface-card)" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <text className="font-bold fill-current" textAnchor="middle" x="360" y="212">Answer from SOP</text>
                <text className="opacity-60 fill-current" textAnchor="middle" x="360" y="230">Then confirm it worked</text>

                <rect x="480" y="314" width="232" height="72" rx="8" fill="rgba(11, 95, 165, 0.15)" stroke="#0B5FA5" strokeWidth="2" />
                <text className="font-bold fill-current" textAnchor="middle" x="596" y="334">Warm Handoff</text>
                <text className="opacity-80 fill-current" textAnchor="middle" x="596" y="352">Intent & sentiment pass to</text>
                <text className="opacity-80 fill-current" textAnchor="middle" x="596" y="368">ServiceNow or Genesys</text>

                <text className="opacity-60 fill-current" x="482" y="208">yes</text>
                <text className="opacity-60 fill-current" x="608" y="290">no</text>
                <text className="opacity-60 fill-current" x="372" y="300">employee still stuck</text>
              </svg>
            </div>
            <p className="text-xs text-[var(--color-text-subtle)]">
              The three principles act at different points in one path. The Privacy Gate runs before any model sees the call, retrieval limits what the model may say, and the handoff catches everything the SOPs can't answer.
            </p>
          </section>

          {/* Key decisions table */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Key decisions and trade-offs</h2>
            <div className="overflow-x-auto rounded-2xl border border-[var(--color-border-card)] bg-[var(--color-surface-hover)]">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-card)] text-xs uppercase tracking-wider text-[var(--color-text-subtle)]">
                    <th className="p-3.5 font-bold">Decision</th>
                    <th className="p-3.5 font-bold text-blue-600 dark:text-blue-400">Chosen</th>
                    <th className="p-3.5 font-bold">Set aside</th>
                    <th className="p-3.5 font-bold">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-card)] text-xs">
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">Migration style</th>
                    <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">Phased, parallel run</td>
                    <td className="p-3.5 text-[var(--color-text-subtle)]">Big-bang cutover</td>
                    <td className="p-3.5">Limits blast radius and builds trust with a visible quick win</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">First flows</th>
                    <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">Ranked from transcript clusters</td>
                    <td className="p-3.5 text-[var(--color-text-subtle)]">Menu categories or stakeholder opinion</td>
                    <td className="p-3.5">Evidence of volume and friction, not assumption</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">Answer source</th>
                    <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">RAG over verified SOPs</td>
                    <td className="p-3.5 text-[var(--color-text-subtle)]">Free generation from model knowledge</td>
                    <td className="p-3.5">Every answer is traceable; no source means no answer</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">Sensitive data</th>
                    <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">Mask PII before the LLM</td>
                    <td className="p-3.5 text-[var(--color-text-subtle)]">Send raw transcripts and redact later</td>
                    <td className="p-3.5">The model never sees raw identifiers</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">Failure mode</th>
                    <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">Warm Handoff with context</td>
                    <td className="p-3.5 text-[var(--color-text-subtle)]">Retry loop or blind transfer</td>
                    <td className="p-3.5">Employees never repeat themselves</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Phased migration roadmap Diagram */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Phased migration roadmap</h2>
            <div className="p-4 sm:p-6 rounded-2xl border border-[var(--color-border-card)] bg-[var(--color-surface-hover)] overflow-x-auto shadow-inner">
              <svg
                viewBox="0 0 760 314"
                className="w-full min-w-[640px] h-auto font-sans text-xs"
                role="img"
                aria-label="Phased Roadmap Diagram"
              >
                <defs>
                  <marker id="road-arrow-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0 0L10 5L0 10z" fill="currentColor" opacity="0.6" />
                  </marker>
                </defs>
                <text className="font-bold text-sm fill-current" x="24" y="34">
                  Each phase unlocks only when its gate is met
                </text>
                <path d="M172 124H182" stroke="currentColor" strokeWidth="1.25" opacity="0.4" />
                <path d="M202 124H212" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#road-arrow-flow)" />
                <path d="M360 124H370" stroke="currentColor" strokeWidth="1.25" opacity="0.4" />
                <path d="M390 124H400" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#road-arrow-flow)" />
                <path d="M548 124H558" stroke="currentColor" strokeWidth="1.25" opacity="0.4" />
                <path d="M578 124H588" stroke="currentColor" strokeWidth="1.25" opacity="0.4" markerEnd="url(#road-arrow-flow)" />

                <rect x="24" y="64" width="148" height="120" rx="8" fill="var(--color-surface-card)" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <text className="font-bold fill-current" x="40" y="92">1. Map intents</text>
                <text className="opacity-75 fill-current" x="40" y="118">Cluster historical</text>
                <text className="opacity-75 fill-current" x="40" y="134">transcripts, rank</text>
                <text className="opacity-75 fill-current" x="40" y="150">intents by friction</text>

                <rect x="212" y="64" width="148" height="120" rx="8" fill="rgba(11, 95, 165, 0.15)" stroke="#0B5FA5" strokeWidth="2" />
                <text className="font-bold fill-current" x="228" y="92">2. Pilot</text>
                <text className="opacity-90 fill-current" x="228" y="118">VPN and MFA flows</text>
                <text className="opacity-90 fill-current" x="228" y="134">behind guardrails,</text>
                <text className="opacity-90 fill-current" x="228" y="150">run beside the IVR</text>

                <rect x="400" y="64" width="148" height="120" rx="8" fill="var(--color-surface-card)" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <text className="font-bold fill-current" x="416" y="92">3. Expand</text>
                <text className="opacity-75 fill-current" x="416" y="118">Migrate next ranked</text>
                <text className="opacity-75 fill-current" x="416" y="134">intents; long tail</text>
                <text className="opacity-75 fill-current" x="416" y="150">stays with agents</text>

                <rect x="588" y="64" width="148" height="120" rx="8" fill="var(--color-surface-card)" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <text className="font-bold fill-current" x="604" y="92">4. Retire IVR</text>
                <text className="opacity-75 fill-current" x="604" y="118">Cut over covered</text>
                <text className="opacity-75 fill-current" x="604" y="134">flows; retire the</text>
                <text className="opacity-75 fill-current" x="604" y="150">legacy menu</text>

                {/* Gate diamonds */}
                <path d="M192 114l10 10l-10 10l-10 -10z" stroke="currentColor" fill="var(--color-surface-card)" strokeWidth="1.25" />
                <path d="M192 134V198" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <text className="opacity-70 fill-current" textAnchor="middle" x="192" y="216">Intent map ranked</text>
                <text className="opacity-70 fill-current" textAnchor="middle" x="192" y="232">by volume & friction</text>

                <path d="M380 114l10 10l-10 10l-10 -10z" stroke="currentColor" fill="var(--color-surface-card)" strokeWidth="1.25" />
                <path d="M380 134V198" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <text className="opacity-70 fill-current" textAnchor="middle" x="380" y="216">Answers trace to SOPs</text>
                <text className="opacity-70 fill-current" textAnchor="middle" x="380" y="232">PII audits clean</text>

                <path d="M568 114l10 10l-10 10l-10 -10z" stroke="currentColor" fill="var(--color-surface-card)" strokeWidth="1.25" />
                <path d="M568 134V198" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <text className="opacity-70 fill-current" textAnchor="middle" x="568" y="216">Handoff & resolution</text>
                <text className="opacity-70 fill-current" textAnchor="middle" x="568" y="232">signals hold</text>

                <rect x="24" y="254" width="712" height="40" rx="8" fill="var(--color-surface-hover)" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                <text className="font-bold fill-current" textAnchor="middle" x="380" y="278">
                  Warm Handoff to ServiceNow or Genesys stays live in every phase
                </text>
              </svg>
            </div>
            <p className="text-xs text-[var(--color-text-subtle)]">
              The new concierge runs beside the legacy IVR, proves itself on a few high-volume flows, and takes over more only after each gate is met.
            </p>
          </section>

          {/* Risks and success measures */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Risks and success measures</h2>
            <div className="overflow-x-auto rounded-2xl border border-[var(--color-border-card)] bg-[var(--color-surface-hover)]">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-card)] text-xs uppercase tracking-wider text-[var(--color-text-subtle)]">
                    <th className="p-3.5 font-bold">Risk</th>
                    <th className="p-3.5 font-bold">Mitigation</th>
                    <th className="p-3.5 font-bold">Signal to watch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-card)] text-xs">
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">Wrong or invented answers</th>
                    <td className="p-3.5">RAG grounded only in verified SOPs; hand off when no source matches</td>
                    <td className="p-3.5 font-medium text-blue-600 dark:text-blue-400">Share of answers traceable to an SOP</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">PII exposure to a model</th>
                    <td className="p-3.5">Privacy Gate masks PII before any LLM call</td>
                    <td className="p-3.5 font-medium text-blue-600 dark:text-blue-400">Unmasked PII found in audits</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">Employees stuck in AI loops</th>
                    <td className="p-3.5">Warm Handoff with intent and sentiment</td>
                    <td className="p-3.5 font-medium text-blue-600 dark:text-blue-400">Repeat-explanation rate at handoff</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">Building the wrong flows first</th>
                    <td className="p-3.5">Transcript clustering ranks intents by volume and friction</td>
                    <td className="p-3.5 font-medium text-blue-600 dark:text-blue-400">Share of call volume covered by migrated flows</td>
                  </tr>
                  <tr>
                    <th className="p-3.5 font-semibold text-[var(--color-text-primary)]">Disruption to live support</th>
                    <td className="p-3.5">Parallel run beside the legacy IVR; phased cutover</td>
                    <td className="p-3.5 font-medium text-blue-600 dark:text-blue-400">Resolution time against the IVR baseline</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Takeaways */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight">Takeaways for legacy migration at scale</h2>
            <ol className="list-decimal pl-5 space-y-2 text-[var(--color-text-body)]">
              <li><strong>Let the data choose the starting point.</strong> Usage evidence beats assumptions about what users need.</li>
              <li><strong>Design the constraints in, not on.</strong> Grounding and privacy controls are part of the architecture from day one, not a review at the end.</li>
              <li><strong>Keep humans in the loop by design.</strong> A graceful exit to a person protects users when automation falls short and feeds the next improvement.</li>
            </ol>
          </section>

          {/* What I would validate next */}
          <section className="space-y-3 pb-8">
            <h2 className="text-xl font-bold tracking-tight">What I would validate next</h2>
            <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-body)]">
              <li><strong>Cluster quality:</strong> Do the transcript clusters match how experienced agents would group the same calls?</li>
              <li><strong>Grounding coverage:</strong> What share of VPN and MFA calls can the verified SOPs answer without a handoff?</li>
              <li><strong>Handoff value:</strong> Does passing intent and sentiment measurably shorten agent handle time compared with a cold transfer?</li>
            </ul>

            <div className="pt-6 border-t border-[var(--color-border-card)] flex items-center justify-between">
              <span className="text-xs text-[var(--color-text-subtle)]">
                Scripted prototype and architectural study by Sahil Banerjee
              </span>
              <button
                type="button"
                onClick={() => setViewMode('prototype')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Play size={12} className="fill-current" />
                <span>Launch Interactive Prototype Demo</span>
              </button>
            </div>
          </section>
        </article>
      )}
    </div>
  );
};
