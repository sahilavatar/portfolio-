import React from 'react';
import { IOSAppModal } from './IOSAppModal';
import { User, Mail, Linkedin, MapPin, Briefcase, MessageSquare, ExternalLink } from 'lucide-react';

interface IOSContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMail: () => void;
}

export const IOSContactsModal: React.FC<IOSContactsModalProps> = ({
  isOpen,
  onClose,
  onOpenMail,
}) => {
  const linkedinUrl = 'https://www.linkedin.com/in/sahilbanerjee1';

  return (
    <IOSAppModal title="Contact Card" isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto space-y-4 pt-1">
        {/* Contact Header */}
        <div className="flex flex-col items-center justify-center p-3">
          <div className="w-20 h-20 rounded-full bg-linear-to-tr from-teal-400 to-indigo-600 border-4 border-white/20 shadow-2xl flex items-center justify-center mb-3 overflow-hidden">
            <User size={40} className="text-white drop-shadow" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight ios-text-title">Sahil Banerjee</h2>
          <p className="text-xs text-teal-500 font-semibold tracking-wide mt-0.5 text-center">
            AI Systems Architect &amp; Design Engineer
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenMail();
            }}
            className="flex flex-col items-center justify-center py-2.5 px-2 ios-card hover:scale-102 active:scale-95 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mb-1">
              <MessageSquare size={18} />
            </div>
            <span className="text-[11px] font-bold ios-text-title">Message</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenMail();
            }}
            className="flex flex-col items-center justify-center py-2.5 px-2 ios-card hover:scale-102 active:scale-95 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-teal-500/20 text-teal-500 flex items-center justify-center mb-1">
              <Mail size={18} />
            </div>
            <span className="text-[11px] font-bold ios-text-title">Mail</span>
          </button>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2.5 px-2 ios-card hover:scale-102 active:scale-95 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-[#0a66c2]/20 text-[#0a66c2] flex items-center justify-center mb-1">
              <Linkedin size={18} />
            </div>
            <span className="text-[11px] font-bold ios-text-title">LinkedIn</span>
          </a>
        </div>

        {/* Info Rows */}
        <div className="ios-card divide-y divide-[var(--ios-card-divide)] overflow-hidden">
          {/* Role */}
          <div className="p-3.5 flex items-start gap-3">
            <Briefcase size={16} className="text-teal-500 mt-0.5" />
            <div className="flex-1">
              <div className="text-[10px] uppercase font-bold ios-text-subtle tracking-wider">Role</div>
              <div className="text-sm font-semibold ios-text-title">AI Systems Architect &amp; Design Engineer</div>
            </div>
          </div>

          {/* Email */}
          <div className="p-3.5 flex items-start gap-3">
            <Mail size={16} className="text-teal-500 mt-0.5" />
            <div className="flex-1">
              <div className="text-[10px] uppercase font-bold ios-text-subtle tracking-wider">Email</div>
              <div className="text-sm font-semibold ios-text-title">sahilbanerjee16@gmail.com</div>
            </div>
          </div>

          {/* Location */}
          <div className="p-3.5 flex items-start gap-3">
            <MapPin size={16} className="text-teal-500 mt-0.5" />
            <div className="flex-1">
              <div className="text-[10px] uppercase font-bold ios-text-subtle tracking-wider">Location</div>
              <div className="text-sm font-semibold ios-text-title">New York Metropolitan Area</div>
            </div>
          </div>

          {/* LinkedIn Profile */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Linkedin size={16} className="text-[#0a66c2]" />
              <div>
                <div className="text-[10px] uppercase font-bold ios-text-subtle tracking-wider">LinkedIn Profile</div>
                <div className="text-sm font-semibold ios-text-title">sahilbanerjee1</div>
              </div>
            </div>
            <ExternalLink size={14} className="ios-text-subtle" />
          </a>
        </div>

        {/* Notes & Bio Section */}
        <div className="ios-card p-4 space-y-1.5">
          <div className="text-[10px] uppercase font-bold ios-text-subtle tracking-wider">Bio</div>
          <p className="text-xs ios-text-subtle leading-relaxed">
            Hello 👋 I'm Sahil Banerjee, an AI systems architect &amp; design engineer based in the New York metropolitan area.
          </p>
        </div>
      </div>
    </IOSAppModal>
  );
};
