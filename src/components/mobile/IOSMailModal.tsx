import React, { useState } from 'react';
import { IOSAppModal } from './IOSAppModal';
import { Mail, Copy, Check, Send, Sparkles } from 'lucide-react';

interface IOSMailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSMailModal: React.FC<IOSMailModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [senderName, setSenderName] = useState('Tom Bryant');
  const [senderEmail, setSenderEmail] = useState('tom@company.com');
  const [subject, setSubject] = useState('Project Collaboration & Inquiries');
  const [message, setMessage] = useState(
    `Hi Sahil,\n\nI was exploring your portfolio and wanted to reach out regarding a potential collaboration. Love the design craft and engineering polish!\n\nBest,\nTom Bryant`
  );
  const [sent, setSent] = useState(false);

  const email = 'sahilbanerjee16@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyDraft = () => {
    const draft = `To: ${email}\nFrom: ${senderName} <${senderEmail}>\nSubject: ${subject}\n\n${message}`;
    navigator.clipboard.writeText(draft).catch(() => {});
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !senderName.trim() || !senderEmail.trim()) return;

    const formattedBody = `From: ${senderName.trim()} <${senderEmail.trim()}>\nReply-To: ${senderEmail.trim()}\n\n${message.trim()}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject.trim() || 'Project Collaboration & Inquiries'
    )}&body=${encodeURIComponent(formattedBody)}`;
    window.location.href = mailtoUrl;

    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1800);
  };

  return (
    <IOSAppModal title="New Message" isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto space-y-3.5 pt-1">
        {/* iOS Mail Header Info Card */}
        <div className="ios-card overflow-hidden divide-y divide-[var(--ios-card-divide)]">
          {/* TO ROW */}
          <div className="p-3.5 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-xs font-semibold ios-text-subtle w-12 shrink-0">
                To:
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  SB
                </div>
                <div className="font-semibold text-xs ios-text-title truncate">
                  Sahil Banerjee{' '}
                  <span className="opacity-70 font-mono text-[11px]">&lt;{email}&gt;</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center gap-1 active:scale-95 transition-all cursor-pointer shrink-0"
              onClick={handleCopy}
              title="Copy address"
            >
              {copied ? (
                <>
                  <Check size={11} className="stroke-[3]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* FROM ROW */}
          <div className="p-3.5 flex items-center gap-2.5">
            <span className="text-xs font-semibold ios-text-subtle w-12 shrink-0">
              From:
            </span>
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Tom Bryant"
                className="w-full px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--ios-card-divide)] text-xs font-semibold ios-text-title focus:outline-none"
              />
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="tom@company.com"
                className="w-full px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--ios-card-divide)] text-xs font-mono ios-text-title focus:outline-none"
              />
            </div>
          </div>

          {/* SUBJECT ROW */}
          <div className="p-3.5 flex items-center gap-2.5">
            <span className="text-xs font-semibold ios-text-subtle w-12 shrink-0">
              Subject:
            </span>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Project Collaboration & Inquiries"
              className="flex-1 bg-transparent text-xs font-semibold ios-text-title focus:outline-none"
            />
          </div>
        </div>

        {/* Compose Form */}
        <form onSubmit={handleSend} className="space-y-3">
          <div>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Sahil, I saw your portfolio and would love to chat about..."
              className="w-full p-3.5 ios-input-field text-xs leading-relaxed placeholder:opacity-50 shadow-inner transition-colors resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopyDraft}
              className="flex-1 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--ios-card-divide)] ios-text-title font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer"
            >
              {copiedDraft ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span>Draft Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Draft</span>
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={sent || !message.trim() || !senderName.trim() || !senderEmail.trim()}
              className="flex-[1.5] py-3 rounded-2xl bg-[#007AFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
            >
              {sent ? (
                <>
                  <Check size={15} />
                  <span>Opening Mail...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send via Mail</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[10px] text-center ios-text-subtle flex items-center justify-center gap-1">
            <Sparkles size={11} className="text-blue-500" />
            Direct mailto dispatch · Replies route back to {senderEmail || 'your email'}
          </p>
        </form>
      </div>
    </IOSAppModal>
  );
};
