'use client';

import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Footer, Header } from '@components/index';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header />
      <div className="mx-5 sm:mx-10 md:mx-24 lg:mx-auto max-w-[996px] mt-5 lg:mt-10">{children}</div>
      <Footer />
    </ThemeProvider>
  );
};

export default Providers;
