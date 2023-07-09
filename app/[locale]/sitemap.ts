import { MetadataRoute } from 'next';
import getAllFonts from '@core/getAllFonts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mmfontshub.com';
  const fonts = await getAllFonts();
  const fontUrls = fonts.map((font) => ({
    url: `${baseUrl}/fonts/${font.nameEn}`,
    lastModified: new Date(),
  }));

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
    ...fontUrls,
  ];
}
