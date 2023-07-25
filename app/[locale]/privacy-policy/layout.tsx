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
      absolute: t('Meta.privacy-policy-title'),
    },
    alternates: {
      canonical: '/privacy-policy',
      languages: {
        en: 'en/privacy-policy',
      },
    },
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
