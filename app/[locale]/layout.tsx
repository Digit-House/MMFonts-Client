import '../globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getFontsArray } from '@core/getFonts';
import Providers from './Providers';

const myLocalFont = localFont({
  src: [
    {
      path: '../../public/fonts/site/AcreMMVariable-Thin.ttf',
      weight: '100',
    },
    {
      path: '../../public/fonts/site/AcreMMVariable-ExtraLight.ttf',
      weight: '200',
    },
    {
      path: '../../public/fonts/site/AcreMMVariable-Light.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/site/AcreMMVariable-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/site/AcreMMVariable-DemiBold.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/site/AcreMMVariable-Demi.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/site/AcreMMVariable-Bold.ttf',
      weight: '700',
    },
    {
      path: '../../public/fonts/site/AcreMMVariable-Black.ttf',
      weight: '800',
    },
  ],
  variable: '--font-acre',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mmfontshub.com'),
  title: { default: 'Myanmar Fonts Hub', template: '%s | Myanmar Fonts Hub' },
  description:
    "MmFontsHub.com is Myanmar's premier online platform for fonts, catering specifically to the needs of the Myanmar community. Our website offers a vast collection of high-quality fonts, carefully curated and optimized for various projects, including web design, graphic design, branding, and more. Discover an extensive range of traditional and contemporary fonts, all conveniently accessible in one place. Whether you're a professional designer or an enthusiast, MmFontsHub.com provides the perfect resource to enhance your creative projects and express your unique style in the Myanmar language.",
  keywords: [
    'Myanmar Fonts',
    'Fonts',
    'Fonts Collection',
    'Myanmar Fonts Collection',
    'Zaw-Gyi One Fonts',
    'Myanmar Unicode Fonts',
    'MM Fonts Hub',
  ],
  icons: {
    icon: '/icon.png',
    shortcut: '/apple-touch-icon.png',
    apple: '/apple-touch-icon.png',
    other: {
      url: '/apple-touch-icon.png',
    },
  },
  creator: 'Digital House Team',
  publisher: 'Digital House Myanmar',
  manifest: '/manifest.json',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [{ locale: 'mm' }, { locale: 'en' }];
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
        <script
          dangerouslySetInnerHTML={{
            __html: 'history.scrollRestoration = "manual"',
          }}
        />
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
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={`${myLocalFont.variable} font-acre `} suppressHydrationWarning={true}>
          <Providers>{children}</Providers>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
