import { Metadata } from 'next';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lastIndex = params.id.lastIndexOf('-');
  return {
    title: {
      absolute: params.id.substring(0, lastIndex).replace(/[-_%2B]/g, ' ') + ' - MM fonts hub',
    },
    alternates: {
      canonical: `/fonts/${params.id}`,
      languages: {
        en: `en/fonts/${params.id}`,
      },
    },
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
