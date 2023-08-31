import { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import React from 'react';
import checkValidUrl from '@core/checkValidUrl';
import { getFontByName } from '@core/getFonts';
import { FontType } from '@core/golobalTypes';

interface Props {
  params: {
    id: string;
    locale: string;
  };
}

export async function generateMetadata({ params: { locale, id } }: Props): Promise<Metadata> {
  const font = getFontByName(id) as FontType;
  const FontName = checkValidUrl(locale, font);
  const messages = (await import(`/messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: {
      absolute: FontName + ` - ${t('Meta.title')}`,
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
