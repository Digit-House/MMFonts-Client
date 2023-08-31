import { MetadataRoute } from 'next';
import { getAllFontsName } from '@core/getFonts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mmfontshub.com';
  const fonts = getAllFontsName();

  const fontUrls = (en = false) => {
    return fonts.map((font) => ({
      url: `${baseUrl}${en ? '/en' : ''}/fonts/${font}`,
      lastModified: new Date(),
    }));
  };

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
      url: `${baseUrl}/myanmar-fonts-generator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en/premium`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en/myanmar-fonts-generator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: new Date(),
    },
    ...fontUrls(false),
    ...fontUrls(true),
  ];
}
