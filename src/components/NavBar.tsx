import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Zap, Waves } from 'lucide-react';
import { FilterCategory, MOBILE_BREAKPOINT } from '../filterLayouts';

interface NavBarProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
  isLazy: boolean;
  onToggleLazy: () => void;
}

const NAV_ITEMS: FilterCategory[] = ['All', 'About', 'Work', 'Side Quests'];

export const NavBar: React.FC<NavBarProps> = ({
  activeFilter,
  onFilterChange,
  isLazy,
  onToggleLazy,
}) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.dataset.theme === 'dark';
  });
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );
  const [hidden, setHidden] = useState<boolean>(false);

  // Indicator measurement state
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 4, width: 0 });
  const [hoverStyle, setHoverStyle] = useState({ left: 4, width: 0, opacity: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Sync theme
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.dataset.theme = 'dark';
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.dataset.theme = 'light';
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Measure pills
  const updateIndicator = () => {
    if (!pillsRef.current) return;
    const idx = NAV_ITEMS.indexOf(activeFilter);
    const el = pillRefs.current[idx];
    if (!el) return;

    const containerRect = pillsRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const left = elRect.left - containerRect.left;
    const width = elRect.width;

    setIndicatorStyle({ left, width });
  };

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeFilter, isMobile]);

  // Window scroll handler
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setHidden(false);
        return;
      }
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentY;
    };

    const onResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleSelect = (item: FilterCategory) => {
    if (item === activeFilter) return;
    setIsAnimating(true);
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
    onFilterChange(item);
    setTimeout(() => {
      setIsAnimating(false);
    }, 450);
  };

  const handlePillHover = (item: FilterCategory) => {
    if (item === activeFilter || !pillsRef.current) {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const idx = NAV_ITEMS.indexOf(item);
    const el = pillRefs.current[idx];
    if (!el) return;

    const containerRect = pillsRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setHoverStyle({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1,
    });
  };

  return (
    <nav className={`nav ${hidden ? 'nav--hidden' : ''}`}>
      {/* Filter pills */}
      <div
        className="nav-pills"
        ref={pillsRef}
        onMouseLeave={() => setHoverStyle((prev) => ({ ...prev, opacity: 0 }))}
      >
        {/* Hover ghost pill */}
        <span
          className="nav-pill-hover-ghost"
          style={{
            left: `${hoverStyle.left}px`,
            width: `${hoverStyle.width}px`,
            opacity: hoverStyle.opacity,
          }}
        />

        {/* Sliding liquid indicator */}
        <span
          className={`nav-pill-indicator ${
            isAnimating ? 'nav-pill-indicator--liquid' : ''
          }`}
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />

        {NAV_ITEMS.map((item, i) => (
          <button
            key={item}
            ref={(el) => {
              pillRefs.current[i] = el;
            }}
            type="button"
            className={`nav-pill ${activeFilter === item ? 'active' : ''}`}
            onClick={() => handleSelect(item)}
            onMouseEnter={() => handlePillHover(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Top right toggles: lazy scroll + theme */}
      <div className="nav-toggles">
        <button
          type="button"
          className="lazy-toggle"
          onClick={onToggleLazy}
          data-tooltip={isLazy ? 'Switch to Snappy scroll' : 'Switch to Lazy smooth scroll'}
        >
          {isLazy ? (
            <Waves size={16} className="text-teal-600 dark:text-teal-400" />
          ) : (
            <Zap size={16} className="text-amber-500" />
          )}
          <span className="hidden sm:inline">
            {isLazy ? 'Lazy' : 'Snappy'}
          </span>
        </button>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          data-tooltip={isDark ? 'Switch to Light theme ☀️' : 'Switch to Dark theme 🌙'}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun size={17} className="text-amber-300" />
          ) : (
            <Moon size={17} className="text-indigo-900" />
          )}
        </button>
      </div>
    </nav>
  );
};
