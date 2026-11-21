import React from 'react';
import { IOSAppIcon, IOSAppIconProps } from './IOSAppIcon';

interface IOSDockProps {
  apps: IOSAppIconProps[];
}

export const IOSDock: React.FC<IOSDockProps> = ({ apps }) => {
  return (
    <div className="ios-dock-container">
      {/* 3D Glass Shelf */}
      <div className="ios-dock-shelf" />

      {/* Dock Apps */}
      <div className="ios-dock-apps">
        {apps.map((app) => (
          <IOSAppIcon key={app.id} {...app} isDock={true} />
        ))}
      </div>
    </div>
  );
};
