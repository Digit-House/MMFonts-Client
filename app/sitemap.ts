import { MetadataRoute } from 'next';
import { getAllFontsName } from '@core/getFonts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mmfontshub.com';
  const fonts = getAllFontsName();
  const fontUrls = fonts.map((font, index) => {
    const fontName = font.replaceAll(' ', '+');

    return {
      url: `${baseUrl}/fonts/${fontName}-${index}`,
      lastModified: new Date(),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/premium`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/mmtextsgenerator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    ...fontUrls,
  ];
}
