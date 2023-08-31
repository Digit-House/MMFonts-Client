import { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import React from 'react';

interface Props {
  params: {
    id: string;
    locale: string;
  };
}

export async function generateMetadata({ params: { locale, id } }: Props): Promise<Metadata> {
  const messages = (await import(`/messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: {
      absolute: '404' + ` - ${t('Meta.title')}`,
    },
    description: t('Meta.dynamic-description'),
    alternates: {
      canonical: `/fonts/${id}`,
      languages: {
        en: `en/fonts/${id}`,
      },
    },
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
