/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { CursorShape } from './components/CursorShape';
import { BackToTop } from './components/BackToTop';
import { CaseStudyOverlay, CaseStudyData } from './components/CaseStudyOverlay';
import { AboutCard } from './components/cards/AboutCard';
import { GmailCard } from './components/cards/GmailCard';
import { LinkedInCard } from './components/cards/LinkedInCard';
import { DuolingoCard as PigeonGameCard } from './components/cards/DuolingoCard';
import { CaseStudyCard } from './components/cards/CaseStudyCard';
import { CASE_STUDIES } from './data/caseStudies';
import {
  FilterCategory,
  LAYOUTS,
  MOBILE_LAYOUTS,
  MOBILE_BREAKPOINT,
} from './filterLayouts';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [isLazy, setIsLazy] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudyData | null>(null);

  // Synchronize mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll inertia engine (Lazy mode)
  useEffect(() => {
    if (!isLazy || isMobile) {
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    let current = window.scrollY;
    let target = window.scrollY;
    let rafId: number | null = null;
    const LERP = 0.09;
    const SPEED = 1.0;

    const tick = () => {
      const dist = target - current;
      if (Math.abs(dist) < 0.5) {
        current = target;
        window.scrollTo(0, Math.round(current));
        rafId = null;
        return;
      }
      current += dist * LERP;
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      // Let modal containers handle their own scrolling
      if ((e.target as HTMLElement)?.closest('.about-expanded-card, .cs-expanded, .ios-app-sheet')) {
        return;
      }
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 40;
      if (e.deltaMode === 2) delta *= window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(target + delta * SPEED, maxScroll));
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const onScrollSync = () => {
      if (!rafId) {
        current = window.scrollY;
        target = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScrollSync, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScrollSync);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLazy, isMobile]);

  // Handle filter changes with smooth scroll to top (Desktop)
  const handleFilterChange = (newFilter: FilterCategory) => {
    setActiveFilter(newFilter);
    window.scrollTo({
      top: 0,
      behavior: isLazy ? 'smooth' : 'auto',
    });
  };

  // Card definitions for Desktop Laptop Bento Grid
  const CARD_ITEMS = [
    { key: 'about', comp: <AboutCard /> },
    { key: 'gmail', comp: <GmailCard /> },
    { key: 'linkedin', comp: <LinkedInCard /> },
    {
      key: 'strava',
      comp: (
        <CaseStudyCard
          data={CASE_STUDIES.avatarnetwork}
          onOpen={setActiveCaseStudy}
        />
      ),
    },
    { key: 'duolingo', comp: <PigeonGameCard /> },
    {
      key: 'designlab',
      comp: (
        <CaseStudyCard
          data={CASE_STUDIES.designlab}
          onOpen={setActiveCaseStudy}
          dark={true}
        />
      ),
    },
    {
      key: 'schedule',
      comp: (
        <CaseStudyCard
          data={CASE_STUDIES.schedule}
          onOpen={setActiveCaseStudy}
        />
      ),
    },
    {
      key: 'plugin',
      comp: (
        <CaseStudyCard
          data={CASE_STUDIES.plugin}
          onOpen={setActiveCaseStudy}
        />
      ),
    },
    {
      key: 'alexa',
      comp: (
        <CaseStudyCard
          data={CASE_STUDIES.alexa}
          onOpen={setActiveCaseStudy}
        />
      ),
    },
    {
      key: 'ds',
      comp: (
        <CaseStudyCard
          data={CASE_STUDIES.ds}
          onOpen={setActiveCaseStudy}
        />
      ),
    },
  ];

  const currentLayout =
    (isMobile ? MOBILE_LAYOUTS[activeFilter] : LAYOUTS[activeFilter]) || LAYOUTS.All;

  // Render Unified Editorial Bento Grid across Desktop, Tablet, and Mobile
  return (
    <div className="relative min-h-screen">
      {/* Interactive Cursor follower and tooltip (desktop) */}
      {!isMobile && <CursorShape />}

      {/* Navigation */}
      <NavBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        isLazy={isLazy}
        onToggleLazy={() => setIsLazy((prev) => !prev)}
      />

      {/* Main Grid Section */}
      <main className="main">
        <div className="mobile-page-logo">
          <span>Sahil Banerjee</span>
        </div>

        <div className="grid">
          {CARD_ITEMS.map(({ key, comp }) => {
            const pos = currentLayout[key];
            if (!pos) return null;

            return (
              <div
                key={key}
                className={`grid-slot ${pos.dim ? 'grid-slot--dim' : ''}`}
                style={{
                  gridColumn: pos.col,
                  gridRow: pos.row,
                }}
              >
                {comp}
              </div>
            );
          })}
        </div>
      </main>

      {/* Back to Top */}
      <BackToTop isLazy={isLazy} />

      {/* Case Study Fullscreen Overlay */}
      <CaseStudyOverlay
        data={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </div>
  );
}
