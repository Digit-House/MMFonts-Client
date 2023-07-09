import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'MM Texts Generator',
    },
    keywords: ['myanmar text generator', 'mm texts generator'],
    alternates: {
      canonical: '/mmtextsgenerator',
      languages: {
        en: 'en/mmtextsgenerator',
      },
    },
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
