import { useRef, useState } from 'react';

export function useAltIcon() {
  const [showAltIcon, setShowAltIcon] = useState(false);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const spinnerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 500) {
      clickCountRef.current += 1;
    } else {
      clickCountRef.current = 1;
    }
    lastClickTimeRef.current = now;

    if (clickCountRef.current >= 3) {
      setShowAltIcon(true);
      clickCountRef.current = 0;
      if (spinnerTimeoutRef.current) clearTimeout(spinnerTimeoutRef.current);
      spinnerTimeoutRef.current = setTimeout(() => setShowAltIcon(false), 5000);
    }
  };

  return {
    handleClick,
    showAltIcon,
  };
}
