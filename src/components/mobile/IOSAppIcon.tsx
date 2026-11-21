import React from 'react';

export interface IOSAppIconProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgGradient: string;
  badge?: string | number;
  onClick: () => void;
  isDock?: boolean;
}

export const IOSAppIcon: React.FC<IOSAppIconProps> = ({
  title,
  icon,
  bgGradient,
  badge,
  onClick,
  isDock = false,
}) => {
  return (
    <div className="ios-app-icon-wrap" onClick={onClick}>
      <div className="relative">
        <div
          className={`ios-app-icon ${isDock ? 'ios-dock-icon' : ''}`}
          style={{ background: bgGradient }}
        >
          {/* Inner icon element */}
          <div className="relative z-2 text-white flex items-center justify-center">
            {icon}
          </div>
        </div>

        {/* Red notification badge */}
        {badge !== undefined && (
          <div className="ios-badge">
            {badge}
          </div>
        )}
      </div>

      {/* Label under icon */}
      <span className="ios-app-label">
        {title}
      </span>
    </div>
  );
};
