import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Mail,
  Copy,
  Check,
  Send,
  X,
  ExternalLink,
  Sparkles,
  Paperclip,
  Type,
  CornerDownLeft,
  ChevronDown
} from 'lucide-react';
import { BentoCard } from '../BentoCard';

const EMAIL_ADDRESS = 'sahilbanerjee16@gmail.com';
const RECIPIENT_NAME = 'Sahil Banerjee';

interface StarterTemplate {
  label: string;
  subject: string;
  body: string;
}

const TEMPLATES: StarterTemplate[] = [
  {
    label: '💼 Project Collaboration',
    subject: 'Project Collaboration & Product Inquiry',
    body: `Hi Sahil,\n\nI came across your portfolio and was blown away by the craft and execution. We have an upcoming product initiative and would love to explore collaborating with you.\n\nLet's schedule a brief time to chat!\n\nBest regards,\nTom Bryant`,
  },
  {
    label: '👋 Quick Hello & Networking',
    subject: 'Connecting from portfolio showcase',
    body: `Hi Sahil,\n\nJust wanted to reach out and say congratulations on such a distinctive interactive portfolio. Love the attention to detail and design rigor.\n\nWould love to stay connected on future projects.\n\nCheers,\nTom`,
  },
  {
    label: '☕ Coffee Chat / Catch-up',
    subject: 'Virtual coffee chat / design sync',
    body: `Hi Sahil,\n\nI really enjoyed reviewing your case studies and interactive work. I'd love to grab a virtual coffee and chat about design engineering, tooling, and what you're building next.\n\nBest,\nTom Bryant`,
  },
];

export const GmailCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields with requested default Tom Bryant
  const [senderName, setSenderName] = useState('Tom Bryant');
  const [senderEmail, setSenderEmail] = useState('tom@company.com');
  const [subject, setSubject] = useState('Project Collaboration & Inquiries');
  const [message, setMessage] = useState(
    `Hi Sahil,\n\nI was reviewing your portfolio and loved the design engineering and interactive polish. Would love to discuss a potential collaboration or chat about your latest work!\n\nBest,\nTom Bryant`
  );
  const [sent, setSent] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [showCc, setShowCc] = useState(false);
  const [ccValue, setCcValue] = useState('');

  // Keyboard listeners: Escape to close, Cmd+Enter / Ctrl+Enter to send
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        triggerSend();
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, senderName, senderEmail, subject, message]);

  const handleCopy = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(EMAIL_ADDRESS).catch(() => {});
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  const handleCopyDraft = () => {
    const draftText = `To: ${EMAIL_ADDRESS}\nFrom: ${senderName} <${senderEmail}>\nSubject: ${subject}\n\n${message}`;
    navigator.clipboard.writeText(draftText).catch(() => {});
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2200);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleMouseEnter = () => {
    setReplayKey((k) => k + 1);
  };

  const getMailtoUrl = () => {
    const formattedBody = `From: ${senderName.trim()} <${senderEmail.trim()}>\nReply-To: ${senderEmail.trim()}${
      ccValue.trim() ? `\nCc: ${ccValue.trim()}` : ''
    }\n\n${message.trim()}`;

    let url = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      subject.trim() || 'Project Inquiry'
    )}&body=${encodeURIComponent(formattedBody)}`;

    if (ccValue.trim()) {
      url += `&cc=${encodeURIComponent(ccValue.trim())}`;
    }

    return url;
  };

  const triggerSend = () => {
    if (!message.trim() || !senderName.trim() || !senderEmail.trim()) return;

    const mailtoUrl = getMailtoUrl();
    window.location.href = mailtoUrl;

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setIsModalOpen(false);
    }, 2000);
  };

  const handleSendForm = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSend();
  };

  const openMailClient = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      subject || 'Project Collaboration'
    )}`;
  };

  const applyTemplate = (tpl: StarterTemplate) => {
    setSubject(tpl.subject);
    setMessage(tpl.body);
  };

  const modalContent = isModalOpen && typeof document !== 'undefined' ? (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xl overflow-y-auto animate-fade-in"
      onClick={() => setIsModalOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl my-auto bg-[#18191d] text-slate-100 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden ring-1 ring-white/5 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* macOS / Apple Mail Native Window Bar */}
        <div className="px-5 py-3.5 bg-[#121316]/90 border-b border-white/[0.08] flex items-center justify-between select-none">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer group"
              title="Close window (Esc)"
              aria-label="Close"
            >
              <X
                size={8}
                className="opacity-0 group-hover:opacity-100 text-[#4c0002] stroke-[3]"
              />
            </button>
            <div
              className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 opacity-80"
              title="Minimize"
            />
            <div
              className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 opacity-80"
              title="Zoom"
            />
          </div>

          {/* Window Title & Indicator */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300 tracking-tight">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm" />
            <span>New Message</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 font-mono text-[11px] truncate max-w-[190px]">
              {EMAIL_ADDRESS}
            </span>
          </div>

          {/* Window action / Close shortcut indicator */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded border border-white/10 bg-white/5">
              esc
            </span>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Compose Form */}
        <form onSubmit={handleSendForm} className="flex flex-col">
          {/* TO ROW */}
          <div className="px-5 py-2.5 border-b border-white/[0.07] flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 w-14 shrink-0 tracking-wide uppercase">
              To:
            </span>

            {/* Recipient chip */}
            <div className="flex-1 flex items-center flex-wrap gap-2 min-w-0">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-200 text-xs font-medium shadow-xs">
                <div className="w-5 h-5 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  SB
                </div>
                <span className="font-semibold text-white">{RECIPIENT_NAME}</span>
                <span className="font-mono text-[11px] text-blue-300 opacity-80 truncate max-w-[170px]">
                  &lt;{EMAIL_ADDRESS}&gt;
                </span>
              </div>
            </div>

            {/* Quick Actions for To: */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={(e) => handleCopy(e)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  copied
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 active:scale-95'
                }`}
                title="Copy Sahil's email address"
              >
                {copied ? (
                  <>
                    <Check size={12} className="stroke-[3]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowCc(!showCc)}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  showCc
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                title="Toggle Cc field"
              >
                Cc
              </button>
            </div>
          </div>

          {/* CC ROW (Optional expandable) */}
          {showCc && (
            <div className="px-5 py-2 border-b border-white/[0.07] flex items-center gap-3 animate-fade-in bg-white/[0.02]">
              <span className="text-xs font-semibold text-slate-400 w-14 shrink-0 tracking-wide uppercase">
                Cc:
              </span>
              <input
                type="email"
                value={ccValue}
                onChange={(e) => setCcValue(e.target.value)}
                placeholder="optional-colleague@company.com"
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          )}

          {/* FROM ROW (Pre-filled Tom Bryant & tom@company.com) */}
          <div className="px-5 py-2.5 border-b border-white/[0.07] flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 w-14 shrink-0 tracking-wide uppercase">
              From:
            </span>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-white/5 hover:bg-white/[0.08] focus-within:bg-white/[0.08] focus-within:ring-1 focus-within:ring-blue-500/50 px-2.5 py-1.5 rounded-xl border border-white/10 transition-all">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">
                  Name
                </span>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Tom Bryant"
                  className="w-full bg-transparent text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 bg-white/5 hover:bg-white/[0.08] focus-within:bg-white/[0.08] focus-within:ring-1 focus-within:ring-blue-500/50 px-2.5 py-1.5 rounded-xl border border-white/10 transition-all">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="tom@company.com"
                  className="w-full bg-transparent text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SUBJECT ROW */}
          <div className="px-5 py-2.5 border-b border-white/[0.07] flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 w-14 shrink-0 tracking-wide uppercase">
              Subject:
            </span>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Project Collaboration & Inquiries"
              className="flex-1 bg-transparent text-sm font-semibold text-slate-100 placeholder:text-slate-500 focus:outline-none tracking-tight"
            />
          </div>

          {/* Quick Smart Starters (Apple & Google Intelligence aesthetic) */}
          <div className="px-5 py-2 border-b border-white/[0.05] bg-white/[0.015] flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 shrink-0">
              <Sparkles size={12} className="text-blue-400" />
              Templates:
            </span>
            <div className="flex items-center gap-1.5">
              {TEMPLATES.map((tpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyTemplate(tpl)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 hover:bg-blue-500/20 hover:text-blue-200 hover:border-blue-500/30 text-slate-300 border border-white/10 transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* MESSAGE CANVAS */}
          <div className="relative px-5 py-4">
            <textarea
              rows={7}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${RECIPIENT_NAME}, I loved your work on...`}
              className="w-full bg-transparent text-sm leading-relaxed text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none font-normal"
            />

            {/* Character & word counter */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/[0.05]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Replies deliver to <strong className="text-slate-300 font-mono">{senderEmail || 'your email'}</strong>
              </span>
              <span className="font-mono tabular-nums">
                {message.trim() ? message.trim().split(/\s+/).length : 0} words · {message.length} chars
              </span>
            </div>
          </div>

          {/* APPLE / GOOGLE STYLE TOOLBAR & ACTION STRIP */}
          <div className="px-5 py-3.5 bg-[#121316]/90 border-t border-white/[0.08] flex items-center justify-between gap-3 flex-wrap">
            {/* Formatting utility icons */}
            <div className="flex items-center gap-1 text-slate-400">
              <div
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
                title="Rich text formatting enabled"
              >
                <Type size={15} />
              </div>
              <div
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
                title="Attachments supported in mail app"
              >
                <Paperclip size={15} />
              </div>
              <button
                type="button"
                onClick={openMailClient}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title="Open directly in mail application"
              >
                <ExternalLink size={15} />
              </button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Copy Draft button */}
              <button
                type="button"
                onClick={handleCopyDraft}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                title="Copy entire draft with sender info to paste in Webmail (Gmail/Outlook)"
              >
                {copiedDraft ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-300">Draft Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Draft</span>
                  </>
                )}
              </button>

              {/* Primary Send Button */}
              <button
                type="submit"
                disabled={sent || !message.trim() || !senderName.trim() || !senderEmail.trim()}
                className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                  sent
                    ? 'bg-emerald-600 text-white shadow-emerald-900/30'
                    : 'bg-[#007AFF] hover:bg-[#0068DC] text-white shadow-blue-900/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
                title="Send message via mail client (⌘ + Enter)"
              >
                {sent ? (
                  <>
                    <Check size={14} className="stroke-[3]" />
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Send</span>
                    <span className="hidden sm:inline-block text-[10px] opacity-75 font-mono ml-0.5">
                      ⌘↵
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <BentoCard
        className="gmail-card group cursor-pointer transition-all hover:shadow-xl"
        tooltip="Email Me"
        actionIcon="expand"
        onActionClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        onClick={handleCardClick}
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 gap-2 sm:gap-3 select-none relative"
          onMouseEnter={handleMouseEnter}
        >
          {/* Animated Gmail icon */}
          <div className="relative flex items-center justify-center">
            <svg
              key={replayKey}
              className="w-16 h-16 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
              viewBox="52 42 88 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Top red folded corner */}
              <path
                fill="#c5221f"
                d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
              />
              {/* Center red M chevron */}
              <path
                fill="#ea4335"
                d="M72 74V48l24 18 24-18v26L96 92"
              />
              {/* Top yellow folded corner */}
              <path
                fill="#fbbc04"
                d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
              />
              {/* Left blue pillar */}
              <path
                fill="#4285f4"
                d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"
              />
              {/* Right green pillar */}
              <path
                fill="#34a853"
                d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"
              />
            </svg>
          </div>

          {/* Email Address Label & Copy / Open indicator */}
          <div className="mt-1 flex flex-col items-center gap-1">
            {copied ? (
              <div className="gm-copied-badge animate-scale-up">
                <Check size={14} className="stroke-[3]" />
                <span>Copied!</span>
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(e);
                }}
                className="flex items-center gap-1.5 text-xs text-[var(--color-text-subtle)] font-medium hover:text-[var(--color-primary)] transition-colors px-2 py-0.5 rounded-full hover:bg-[var(--color-surface-hover)]"
                title="Click to copy email address"
              >
                <Copy size={12} />
                <span className="truncate max-w-[112px] sm:max-w-[170px] font-mono text-[11px]">
                  {EMAIL_ADDRESS}
                </span>
              </div>
            )}
            <span className="text-[10px] text-[var(--color-text-subtle)] opacity-70 group-hover:opacity-100 transition-opacity font-semibold text-center">
              Click to compose message
            </span>
          </div>
        </div>
      </BentoCard>

      {/* Render modal directly in document.body via Portal to escape all ancestor stacking contexts */}
      {modalContent ? createPortal(modalContent, document.body) : null}
    </>
  );
};
