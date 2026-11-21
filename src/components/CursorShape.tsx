import React, { useEffect, useState } from 'react';

export const CursorShape: React.FC = () => {
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: -100, y: -100 });
  const [isTextInput, setIsTextInput] = useState(false);

  useEffect(() => {
    // Only enable on desktop fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-tooltip]') as HTMLElement | null;
      if (target && target.dataset.tooltip) {
        setTooltipText(target.dataset.tooltip);
        // Position tooltip smoothly offset from the native cursor pointer
        setTooltipPos({
          x: Math.min(e.clientX + 16, window.innerWidth - 240),
          y: Math.min(e.clientY + 20, window.innerHeight - 70),
        });
      } else {
        setTooltipText('');
      }

      const textElement = (e.target as HTMLElement)?.closest('input, textarea, select, [contenteditable="true"]');
      setIsTextInput(!!textElement);
    };

    const onMouseLeave = () => {
      setTooltipText('');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!tooltipText || isTextInput) return null;

  return (
    <div
      className="cursor-tooltip"
      style={{
        left: `${tooltipPos.x}px`,
        top: `${tooltipPos.y}px`,
      }}
    >
      {tooltipText}
    </div>
  );
};
