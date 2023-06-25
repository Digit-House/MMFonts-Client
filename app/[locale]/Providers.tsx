'use client';

import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Footer, Header } from '@components/index';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Header />
        <AnimatePresence mode="wait">
          <div className="flex-grow mx-5 mt-5 sm:mx-10 md:mx-24 max-w-[996px] lg:mx-auto lg:mt-10">{children}</div>
        </AnimatePresence>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Providers;
