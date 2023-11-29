import { Metadata } from 'next';
import { createTranslator } from 'next-intl';
import React from 'react';
import { getImageUrl, getPremiumFontByName } from '@core/api';
import checkValidUrl from '@core/checkValidUrl';

export async function generateMetadata({
  params: { locale, id },
}: {
  params: {
    locale: string;
    id: string;
  };
}): Promise<Metadata> {
  const messages = (await import(`/messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  const font = await getPremiumFontByName(id);
  const FontName = checkValidUrl(locale, font);

  return {
    title: {
      absolute: FontName + ` - ${t('Meta.premium-title')}`,
    },
    alternates: {
      canonical: `/premium/${id}`,
      languages: {
        en: `en/premium/${id}`,
      },
    },
    openGraph: {
      title: FontName + ` - ${t('Meta.premium-title')}`,
      siteName: t('Meta.title'),
      locale: 'en_US',
      description: t('Meta.description'),
      type: 'article',
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      url: './',
      images: {
        url: getImageUrl(font.featureImage),
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: FontName + ` - ${t('Meta.premium-title')}`,
      description: t('Meta.description'),
      images: getImageUrl(font.featureImage),
    },
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
