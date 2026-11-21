import React, { useState } from 'react';
import { IOSStatusBar } from './IOSStatusBar';
import { IOSSettingsModal } from './IOSSettingsModal';
import { IOSMailModal } from './IOSMailModal';
import { IOSClockModal } from './IOSClockModal';
import { IOSMusicModal } from './IOSMusicModal';
import { IOSContactsModal } from './IOSContactsModal';
import { IOSGameCenterModal } from './IOSGameCenterModal';
import { IOSAppModal } from './IOSAppModal';
import { CASE_STUDIES } from '../../data/caseStudies';
import { CaseStudyData } from '../CaseStudyOverlay';
import { DuolingoCard } from '../cards/DuolingoCard';
import {
  IconMessages,
  IconCalendar,
  IconPhotos,
  IconWeather,
  IconVideos,
  IconMaps,
  IconPigeonCity,
  IconClock,
  IconCalculator,
  IconGameCenter,
  IconAppStore,
  IconSettings,
  IconContacts,
  IconMail,
  IconLinkedIn,
  IconMusic,
} from './IOSIcons';

interface IOSSpringBoardProps {
  onOpenCaseStudy: (data: CaseStudyData) => void;
  isLazy: boolean;
  onToggleLazy: () => void;
}

export const IOSSpringBoard: React.FC<IOSSpringBoardProps> = ({
  onOpenCaseStudy,
  isLazy,
  onToggleLazy,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [showClock, setShowClock] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showGameCenter, setShowGameCenter] = useState(false);
  const [showDuolingoModal, setShowDuolingoModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [, setRerenderTheme] = useState(0);

  const linkedinUrl = 'https://www.linkedin.com/in/sahilbanerjee1';

  const handleOpenLinkedIn = () => {
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  // 12 Main Grid Apps (3 rows × 4 cols — Real Projects, Mini-Game & Utilities)
  const gridRows: Array<
    Array<{
      id: string;
      label: string;
      icon: React.ReactNode;
      badge?: string | number;
      onClick: () => void;
    }>
  > = [
    // Row 1
    [
      {
        id: 'messages',
        label: 'Messages',
        icon: <IconMessages />,
        onClick: () => setShowMail(true),
      },
      {
        id: 'avatarnetwork',
        label: 'Avatar Net',
        icon: <IconMaps />,
        onClick: () => onOpenCaseStudy(CASE_STUDIES.avatarnetwork),
      },
      {
        id: 'watch',
        label: 'Watch Atelier',
        icon: <IconPhotos />,
        onClick: () => onOpenCaseStudy(CASE_STUDIES.designlab),
      },
      {
        id: 'voiceai',
        label: 'Voice AI',
        icon: <IconCalendar />,
        onClick: () => onOpenCaseStudy(CASE_STUDIES.schedule),
      },
    ],
    // Row 2
    [
      {
        id: 'learnos',
        label: 'learnOS',
        icon: <IconAppStore />,
        onClick: () => onOpenCaseStudy(CASE_STUDIES.plugin),
      },
      {
        id: 'temple',
        label: 'Temple 3D',
        icon: <IconWeather />,
        onClick: () => onOpenCaseStudy(CASE_STUDIES.alexa),
      },
      {
        id: 'agentpay',
        label: 'AgentPay',
        icon: <IconVideos />,
        onClick: () => onOpenCaseStudy(CASE_STUDIES.ds),
      },
      {
        id: 'pigeon',
        label: 'Pigeon City',
        icon: <IconPigeonCity />,
        onClick: () => setShowDuolingoModal(true),
      },
    ],
    // Row 3
    [
      {
        id: 'clock',
        label: 'Clock',
        icon: <IconClock />,
        onClick: () => setShowClock(true),
      },
      {
        id: 'calculator',
        label: 'Calculator',
        icon: <IconCalculator />,
        onClick: () => setShowCalculatorModal(true),
      },
      {
        id: 'gamecenter',
        label: 'Game Center',
        icon: <IconGameCenter />,
        onClick: () => setShowGameCenter(true),
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <IconSettings />,
        onClick: () => setShowSettings(true),
      },
    ],
  ];

  // 4 Bottom Dock Apps (Fixed Dock: Contacts, Mail, LinkedIn, Music)
  const dockApps = [
    {
      id: 'dock-contacts',
      label: 'Contacts',
      icon: <IconContacts />,
      onClick: () => setShowContacts(true),
    },
    {
      id: 'dock-mail',
      label: 'Mail',
      icon: <IconMail />,
      badge: 1,
      onClick: () => setShowMail(true),
    },
    {
      id: 'dock-linkedin',
      label: 'LinkedIn',
      icon: <IconLinkedIn />,
      onClick: handleOpenLinkedIn,
    },
    {
      id: 'dock-music',
      label: 'Music',
      icon: <IconMusic />,
      onClick: () => setShowMusic(true),
    },
  ];

  return (
    <div className="ios-screen-container">
      {/* 1. Dynamic Live Wallpaper */}
      <div className="ios-clean-wallpaper" />

      {/* 2. Classic Status Bar (Top) */}
      <IOSStatusBar />

      {/* 3. Main 4x4 App Grid (Zero Vertical Scrolling) */}
      <div className="ios-grid-area">
        {gridRows.map((row, rIdx) => (
          <div key={rIdx} className="ios-row">
            {row.map((app) => (
              <div
                key={app.id}
                className="ios-icon-item"
                onClick={app.onClick}
              >
                <div className="relative">
                  <div className="ios-icon-squircle">
                    {app.icon}
                  </div>
                  {app.badge !== undefined && (
                    <div className="ios-badge">{app.badge}</div>
                  )}
                </div>
                <span className="ios-label">{app.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 4. Page Indicator Dots */}
      <div className="ios-page-indicator">
        <div className="ios-page-dot" />
        <div className="ios-page-dot ios-page-dot--active" />
        <div className="ios-page-dot" />
      </div>

      {/* 5. 3D Glass Shelf Dock with Downward Mirror Reflection */}
      <div className="ios-glass-dock">
        <div className="ios-glass-shelf-plane" />
        <div className="ios-dock-icons-row">
          {dockApps.map((app) => (
            <div
              key={app.id}
              className="ios-icon-item"
              onClick={app.onClick}
            >
              <div className="relative ios-dock-reflection">
                <div className="ios-icon-squircle">
                  {app.icon}
                </div>
                {app.badge !== undefined && (
                  <div className="ios-badge">{app.badge}</div>
                )}
              </div>
              <span className="ios-label">{app.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Interactive App Modals ── */}
      {/* 1. Contacts Modal */}
      <IOSContactsModal
        isOpen={showContacts}
        onClose={() => setShowContacts(false)}
        onOpenMail={() => setShowMail(true)}
      />

      {/* 2. Mail Modal */}
      <IOSMailModal
        isOpen={showMail}
        onClose={() => setShowMail(false)}
      />

      {/* 3. Music Modal */}
      <IOSMusicModal
        isOpen={showMusic}
        onClose={() => setShowMusic(false)}
      />

      {/* 4. Clock Modal (Local Time, Stopwatch, Timer) */}
      <IOSClockModal
        isOpen={showClock}
        onClose={() => setShowClock(false)}
      />

      {/* 5. Game Center Modal (Snake, Tic-Tac-Toe, Games Hub) */}
      <IOSGameCenterModal
        isOpen={showGameCenter}
        onClose={() => setShowGameCenter(false)}
      />

      {/* 6. Settings Modal (Light/Dark Toggle with Live Sync) */}
      <IOSSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        isLazy={isLazy}
        onToggleLazy={onToggleLazy}
        onThemeChange={() => setRerenderTheme((k) => k + 1)}
      />

      {/* 7. Pigeon City Modal */}
      <IOSAppModal
        title="Pigeon City"
        isOpen={showDuolingoModal}
        onClose={() => setShowDuolingoModal(false)}
      >
        <div className="max-w-md mx-auto h-[360px]">
          <DuolingoCard />
        </div>
      </IOSAppModal>

      {/* 10. Calculator Modal */}
      <IOSAppModal
        title="Calculator"
        isOpen={showCalculatorModal}
        onClose={() => setShowCalculatorModal(false)}
      >
        <div className="max-w-xs mx-auto p-4 ios-card space-y-3">
          <div className="w-full bg-black/60 rounded-2xl p-4 text-right">
            <span className="text-3xl font-mono font-bold text-white">42</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn, i) => (
              <button
                key={btn}
                type="button"
                className={`h-12 rounded-full font-bold text-sm flex items-center justify-center active:scale-90 transition-all ${
                  btn === '=' || btn === '÷' || btn === '×' || btn === '-' || btn === '+'
                    ? 'bg-amber-500 text-white shadow-md'
                    : btn === '0'
                    ? 'col-span-2 bg-[#333a4d] text-white'
                    : i < 3
                    ? 'bg-[#475066] text-white'
                    : 'bg-[#333a4d] text-white'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </IOSAppModal>
    </div>
  );
};
