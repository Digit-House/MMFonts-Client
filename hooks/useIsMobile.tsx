'use client';

import { useLayoutEffect, useState } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, setIsMobile };
}
