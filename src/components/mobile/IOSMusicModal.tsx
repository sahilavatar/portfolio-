import React from 'react';
import { IOSAppModal } from './IOSAppModal';
import { IOSMusicPlayer } from './IOSMusicPlayer';

interface IOSMusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSMusicModal: React.FC<IOSMusicModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <IOSAppModal title="Music" isOpen={isOpen} onClose={onClose}>
      <IOSMusicPlayer />
    </IOSAppModal>
  );
};
