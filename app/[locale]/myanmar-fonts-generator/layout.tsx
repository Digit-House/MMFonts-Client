import { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import React from 'react';

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}): Promise<Metadata> {
  const messages = (await import(`/messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  return {
    title: {
      absolute: t('Meta.generate-title'),
    },
    keywords: [
      'myanmar texts generator',
      'mm texts generator',
      'myanmar fonts generator',
      'mm fonts generator',
      'မြန်မာစာထုတ်ရန်',
      'မြန်မာဖောင့်စမ်းရန်',
    ],
    alternates: {
      canonical: '/myanmar-fonts-generator',
      languages: {
        en: 'en/myanmar-fonts-generator',
      },
    },
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
