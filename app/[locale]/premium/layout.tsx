import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'Premium',
    },
    alternates: {
      canonical: '/premium',
      languages: {
        en: 'en/premium',
      },
    },
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
