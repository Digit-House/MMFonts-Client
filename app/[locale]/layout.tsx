import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { createTranslator, NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getFontsArray } from '@core/getFonts';
import Providers from './Providers';

const myLocalFont = localFont({
  src: [
    {
      path: '../../public/data/fonts/site/AcreMMVariable-Thin.ttf',
      weight: '100',
    },
    {
      path: '../../public/data/fonts/site/AcreMMVariable-ExtraLight.ttf',
      weight: '200',
    },
    {
      path: '../../public/data/fonts/site/AcreMMVariable-Light.ttf',
      weight: '300',
    },
    {
      path: '../../public/data/fonts/site/AcreMMVariable-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/data/fonts/site/AcreMMVariable-DemiBold.ttf',
      weight: '500',
    },
    {
      path: '../../public/data/fonts/site/AcreMMVariable-Demi.ttf',
      weight: '600',
    },
    {
      path: '../../public/data/fonts/site/AcreMMVariable-Bold.ttf',
      weight: '700',
    },
    {
      path: '../../public/data/fonts/site/AcreMMVariable-Black.ttf',
      weight: '800',
    },
  ],
  variable: '--font-acre',
});

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
    metadataBase: new URL('https://www.mmfontshub.com'),
    title: { default: t('Meta.title'), template: '%s | Myanmar Fonts Hub' },
    description: t('Meta.description'),
    keywords: [
      'Myanmar Fonts',
      'Fonts',
      'Fonts Collection',
      'Myanmar Fonts Collection',
      'Zaw-Gyi One Fonts',
      'Myanmar Unicode Fonts',
      'MM Fonts Hub',
      'မြန်မာဖောင့်',
      'မြန်မာ',
      'မြန်မာစာလုံးဒီဇိုင်း',
      'ယူနီကုဒ်ဖောင့်',
      'ဇော်ဂျီဖောင့်',
      'ဝင်းဖောင့်',
    ],
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
      },
    },
    creator: 'Digital House Team',
    publisher: 'Digital House Myanmar',
    manifest: '/manifest.json',
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const generateFontLink = () => {
  const fontsLink = getFontsArray().map((font) => {
    const styleLinks = font.fontStyle
      .split(' ')
      .map(
        (style) =>
          `https://raw.githubusercontent.com/Kaung-Htet-Naing/MMfonts/develop/public/fonts/${font.fileName}/${style}.ttf`
      );
    return styleLinks.join('\n');
  });
  return fontsLink;
};

export const revalidate = 60;

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} translate="no">
      <Head>
        {generateFontLink().map((link) => (
          <link rel="preload" href={link} as="font" crossOrigin="anonymous" key={link} />
        ))}
        <link rel="preload" href="/loading.riv" as="fetch" crossOrigin="anonymous" />
        <meta name="theme-color" content="#FFFFFF" />
      </Head>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.NEXT_PUBLIC_GA_TRAKCING_ID}`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-${process.env.NEXT_PUBLIC_GA_TRAKCING_ID}');
        `}
      </Script>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', ${process.env.NEXT_PUBLIC_FB_PIXEL_ID});
         fbq('track', 'PageView');
    `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style="display:none"
          src="https://www.facebook.com/tr?id=686090216189198&ev=PageView&noscript=1"
        />
      </noscript>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={`${myLocalFont.variable} font-acre `} suppressHydrationWarning={true}>
          <Providers>{children}</Providers>
          <Analytics />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
