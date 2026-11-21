import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

interface IOSAppModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const IOSAppModal: React.FC<IOSAppModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="ios-app-sheet-backdrop" onClick={onClose}>
      <div className="ios-app-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Retro iOS Glossy Top Navigation Bar */}
        <div className="ios-nav-bar">
          <button
            type="button"
            className="ios-back-btn"
            onClick={onClose}
            aria-label="Back to Home"
          >
            <ChevronLeft size={16} className="-ml-1" />
            <span>Home</span>
          </button>

          <div className="ios-nav-title">{title}</div>

          {/* Spacer to ensure title stays perfectly centered */}
          <div className="w-16 pointer-events-none" />
        </div>

        {/* Scrollable app content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-8">
          {children}
        </div>

        {/* Bottom Home Indicator Bar (1-Tap Return to Home) */}
        <div
          className="ios-home-indicator-bar"
          onClick={onClose}
          title="Tap to return home"
        >
          <div className="ios-home-pill" />
          <span className="ios-home-indicator-text">Tap to Close</span>
        </div>
      </div>
    </div>
  );
};
