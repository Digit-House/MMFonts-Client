import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'About Us',
    },
    alternates: {
      canonical: '/contact-us',
      languages: {
        en: 'en/contact',
      },
    },
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
