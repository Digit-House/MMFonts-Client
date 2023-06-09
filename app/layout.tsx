import './globals.css';
import localFont from 'next/font/local';
import Providers from './Providers';

const myLocalFont = localFont({
  src: [
    {
      path: '../public/fonts/site/AcreMMVariable-Thin.ttf',
      weight: '100',
    },
    {
      path: '../public/fonts/site/AcreMMVariable-ExtraLight.ttf',
      weight: '200',
    },
    {
      path: '../public/fonts/site/AcreMMVariable-Light.ttf',
      weight: '300',
    },
    {
      path: '../public/fonts/site/AcreMMVariable-Regular.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/site/AcreMMVariable-DemiBold.ttf',
      weight: '500',
    },
    {
      path: '../public/fonts/site/AcreMMVariable-Demi.ttf',
      weight: '600',
    },

    {
      path: '../public/fonts/site/AcreMMVariable-Bold.ttf',
      weight: '700',
    },
    {
      path: '../public/fonts/site/AcreMMVariable-Black.ttf',
      weight: '800',
    },
  ],
  variable: '--font-acre',
});

export const metadata = {
  title: 'Myanmar Fonts Hub',
  description:
    "MmFontsHub.com is Myanmar's premier online platform for fonts, catering specifically to the needs of the Myanmar community. Our website offers a vast collection of high-quality fonts, carefully curated and optimized for various projects, including web design, graphic design, branding, and more. Discover an extensive range of traditional and contemporary fonts, all conveniently accessible in one place. Whether you're a professional designer or an enthusiast, MmFontsHub.com provides the perfect resource to enhance your creative projects and express your unique style in the Myanmar language.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${myLocalFont.variable} font-acre`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
