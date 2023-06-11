'use client';

import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DetailNavMenu, Footer, Header } from '@components/index';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header />
      {pathname.includes('fonts') && <DetailNavMenu />}
      <div className="px-5 lg:px-10">{children}</div>
      <Footer />
    </ThemeProvider>
  );
};

export default Providers;
