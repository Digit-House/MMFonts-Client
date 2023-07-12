import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'About Us',
    },
    alternates: {
      canonical: '/contact',
      languages: {
        en: 'en/contact-us',
      },
    },
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
