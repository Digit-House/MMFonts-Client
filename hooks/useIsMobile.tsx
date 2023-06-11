'use client';

import { useLayoutEffect, useState } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useLayoutEffect(() => {
    console.log('Hello world');
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      console.log('Hello world');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, setIsMobile };
}
