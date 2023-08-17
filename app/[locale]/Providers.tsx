'use client';

import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { Footer, Header } from '@components/index';
import { pageview as fbPageview } from '@core/fpixel';
import { pageview } from '@core/gtag';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const hotJarKey = process.env.NEXT_PUBLIC_HOT_JAR;

  useEffect(() => {
    setMounted(true);
    if (hotJarKey) {
      hotjar.initialize(parseInt(hotJarKey), 1);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
      fbPageview(url);
    };
    if (pathname) {
      handleRouteChange(pathname);
    }
  }, [pathname]);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen ">
        <Header />
        <AnimatePresence mode="wait">
          {pathname && pathname?.length > 3 ? (
            <div className="flex-grow mx-5 mt-5 sm:mx-10 md:mx-24  h-full lg:mx-auto lg:mt-10 lg:w-[996px] max-w-[996px] selection:bg-[#b7b7a4]">
              {children}
            </div>
          ) : (
            children
          )}
        </AnimatePresence>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Providers;
