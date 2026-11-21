import React, { useRef, useState } from 'react';
import { BentoCard } from '../BentoCard';

const LINKEDIN_URL = 'https://www.linkedin.com/in/sahilbanerjee1';

export const LinkedInCard: React.FC = () => {
  const [animKey, setAnimKey] = useState(0);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const replay = () => {
    setAnimKey((k) => k + 1);
  };

  const openLinkedIn = () => {
    linkRef.current?.click();
  };

  return (
    <BentoCard
      className="linkedin-card"
      tooltip="Connect with Sahil on LinkedIn 💼"
      actionIcon="link"
      onActionClick={openLinkedIn}
      onClick={openLinkedIn}
    >
      <a
        ref={linkRef}
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with Sahil on LinkedIn"
        className="w-full h-full flex flex-col items-center justify-center p-6 gap-2 no-underline text-inherit"
        onMouseEnter={replay}
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          key={animKey}
          className="w-20 h-20 transition-transform duration-300 hover:scale-105"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dot above i */}
          <circle className="li-dot" cx="11" cy="10" r="2.2" />
          {/* Vertical bar of i */}
          <path className="li-path" d="M11 15.5 L11 26" />
          {/* Left stem of n */}
          <path className="li-path" d="M17 15.5 L17 26" />
          {/* Arch + right leg of n */}
          <path
            className="li-path"
            d="M17 19.5 C17 17 19 15.5 21 15.5 C23 15.5 25 17 25 19.5 L25 26"
          />
        </svg>

        <span className="text-xs text-[var(--color-text-subtle)] font-medium">
          in/sahilbanerjee1
        </span>
      </a>
    </BentoCard>
  );
};
