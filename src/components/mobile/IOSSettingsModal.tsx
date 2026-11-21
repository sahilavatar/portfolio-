import React, { useState, useEffect } from 'react';
import { IOSAppModal } from './IOSAppModal';
import { Moon, Sun, Waves, Zap } from 'lucide-react';

interface IOSSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLazy: boolean;
  onToggleLazy: () => void;
  onThemeChange?: () => void;
}

export const IOSSettingsModal: React.FC<IOSSettingsModalProps> = ({
  isOpen,
  onClose,
  isLazy,
  onToggleLazy,
  onThemeChange,
}) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      document.documentElement.dataset.theme === 'dark' ||
      document.documentElement.classList.contains('dark') ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  const handleToggleTheme = () => {
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
    if (onThemeChange) onThemeChange();
  };

  return (
    <IOSAppModal title="Settings" isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto space-y-5 pt-1">
        {/* Profile / System Banner */}
        <div className="ios-card p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-linear-to-tr from-teal-400 to-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
            SB
          </div>
          <div>
            <h3 className="font-bold text-base ios-text-title">
              Sahil
            </h3>
            <p className="text-xs ios-text-subtle">
              Portfolio Settings & Preferences
            </p>
          </div>
        </div>

        {/* Section 1: Appearance & Physics */}
        <div>
          <div className="text-[11px] font-bold ios-text-subtle uppercase tracking-wider px-3 mb-1.5">
            Display & Interaction
          </div>
          <div className="ios-card overflow-hidden divide-y divide-[var(--ios-card-divide)]">
            {/* Theme Row */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                  {isDark ? <Moon size={18} /> : <Sun size={18} />}
                </div>
                <div>
                  <div className="font-semibold text-sm ios-text-title">
                    Dark Appearance
                  </div>
                  <div className="text-[11px] ios-text-subtle">
                    {isDark ? 'Obsidian Slate (Dark)' : 'Vibrant Studio (Light)'}
                  </div>
                </div>
              </div>

              <div
                className={`ios-toggle-track ${isDark ? 'ios-toggle-track--active' : ''}`}
                onClick={handleToggleTheme}
              >
                <div className="ios-toggle-knob" />
              </div>
            </div>

            {/* Smooth Scroll Row */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-500">
                  {isLazy ? <Waves size={18} /> : <Zap size={18} />}
                </div>
                <div>
                  <div className="font-semibold text-sm ios-text-title">
                    Inertia Smooth Scroll
                  </div>
                  <div className="text-[11px] ios-text-subtle">
                    {isLazy ? 'Lazy mode active' : 'Snappy mode active'}
                  </div>
                </div>
              </div>

              <div
                className={`ios-toggle-track ${isLazy ? 'ios-toggle-track--active' : ''}`}
                onClick={onToggleLazy}
              >
                <div className="ios-toggle-knob" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: About Portfolio */}
        <div>
          <div className="text-[11px] font-bold ios-text-subtle uppercase tracking-wider px-3 mb-1.5">
            General
          </div>
          <div className="ios-card overflow-hidden divide-y divide-[var(--ios-card-divide)] text-sm">
            <div className="flex items-center justify-between p-3.5">
              <span className="ios-text-title font-medium">Layout System</span>
              <span className="ios-text-subtle font-mono text-xs">Retro iOS SpringBoard</span>
            </div>
            <div className="flex items-center justify-between p-3.5">
              <span className="ios-text-title font-medium">Theme Engine</span>
              <span className="ios-text-subtle font-mono text-xs">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3.5">
              <span className="ios-text-title font-medium">Author</span>
              <span className="ios-text-title font-semibold">Sahil</span>
            </div>
          </div>
        </div>
      </div>
    </IOSAppModal>
  );
};
