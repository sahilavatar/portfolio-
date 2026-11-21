import React, { useState } from 'react';
import { ExternalLink, Maximize2 } from 'lucide-react';

interface BentoCardProps {
  children?: React.ReactNode;
  className?: string;
  dark?: boolean;
  tooltip?: string;
  actionIcon?: 'expand' | 'link' | 'none';
  onActionClick?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  dark = false,
  tooltip,
  actionIcon = 'expand',
  onActionClick,
  onClick,
}) => {
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setPressed(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev.slice(-3), { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  const handlePointerUp = () => setPressed(false);

  return (
    <div
      className={`bento-card ${dark ? 'dark' : ''} ${pressed ? 'bento-card--pressed' : ''} ${className}`}
      data-tooltip={tooltip}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={onClick}
    >
      {actionIcon !== 'none' && (
        <button
          type="button"
          className="action-icon"
          aria-label="Action"
          onClick={(e) => {
            e.stopPropagation();
            onActionClick ? onActionClick(e) : onClick?.(e);
          }}
        >
          {actionIcon === 'link' ? (
            <ExternalLink size={16} />
          ) : (
            <Maximize2 size={16} />
          )}
        </button>
      )}

      {children}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--color-card-ripple)',
            transform: 'scale(1)',
            animation: 'ripple-anim 0.6s ease-out forwards',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />
      ))}
    </div>
  );
};
