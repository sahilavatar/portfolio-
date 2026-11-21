import React, { useState, useEffect } from 'react';
import { X, Mail, MapPin } from 'lucide-react';
import { BentoCard } from '../BentoCard';

export const AboutCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <BentoCard
        className="about-card"
        tooltip="Expand to learn more about Sahil Banerjee"
        actionIcon="expand"
        onActionClick={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
      >
        <div className="about-bio">
          <h2>Hello 👋</h2>
          <p>
            I'm <strong>Sahil Banerjee</strong>, an AI systems architect &amp; design
            engineer based in the New York metropolitan area.
          </p>
        </div>
      </BentoCard>

      {/* Expanded Modal Overlay */}
      {isOpen && (
        <div className="about-backdrop" onClick={() => setIsOpen(false)}>
          <div
            className="about-expanded-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="about-shrink-btn"
              onClick={() => setIsOpen(false)}
              data-tooltip="Press Esc to exit"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="about-expanded-inner">
              <div className="text-center max-w-lg">
                <h1 className="text-3xl font-bold mb-2">
                  Sahil Banerjee
                </h1>
                <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold tracking-wide">
                  AI Systems Architect &amp; Design Engineer
                </p>
                <p className="mt-1.5 inline-flex items-center justify-center gap-1.5 text-xs text-[var(--color-text-subtle)] font-medium">
                  <MapPin size={13} />
                  New York Metropolitan Area
                </p>
              </div>

              <div className="about-expanded-bio">
                <p>
                  Hello 👋 I'm <strong>Sahil Banerjee</strong>, an AI systems architect
                  &amp; design engineer based in the New York metropolitan area.
                </p>

                <p>
                  My work lives at the intersection of <strong>Agentic AI</strong>,{' '}
                  <strong>Design Systems</strong>, and <strong>Interactive Prototypes</strong>.
                  I build software and hardware-inspired experiences that feel immediate,
                  cohesive, and grounded in real engineering constraints.
                </p>

                <div className="text-sm text-[var(--color-text-subtle)] pt-4 border-t border-[var(--color-border-card)] flex flex-wrap items-center justify-between gap-3">
                  <a
                    href="mailto:sahilbanerjee16@gmail.com"
                    className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-text-primary)] hover:underline"
                  >
                    <Mail size={14} />
                    sahilbanerjee16@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sahilbanerjee1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--color-text-primary)] hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
