import { MetadataRoute } from 'next';
import { getAllPremiumFonts } from '@core/api';
import { getAllFontsName } from '@core/getFonts';
import { PremiumFontType } from '@core/golobalTypes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mmfontshub.app';
  
  // Static routes that don't depend on API calls
  const staticRoutes = [
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
  ];
  
  interface SitemapRoute {
    url: string;
    lastModified: Date;
  }

  let fontUrlsArray: SitemapRoute[] = [];
  let premiumUrlsArray  : SitemapRoute[] = [];
  
  // Try to get regular fonts
  try {
    const fonts = await getAllFontsName();
    fontUrlsArray = [
      ...fonts.map((font) => ({
        url: `${baseUrl}/fonts/${font}`,
        lastModified: new Date(),
      })),
      ...fonts.map((font) => ({
        url: `${baseUrl}/en/fonts/${font}`,
        lastModified: new Date(),
      })),
    ];
  } catch (error) {
    // If there's an error fetching fonts, log it but don't fail the sitemap generation
  }

  // Try to get premium fonts
  try {
    const premiumFonts: PremiumFontType[] = await getAllPremiumFonts();
    premiumUrlsArray = [
      ...premiumFonts.map((font) => ({
        url: `${baseUrl}/premium/${font.nameEn}`,
        lastModified: new Date(),
      })),
      ...premiumFonts.map((font) => ({
        url: `${baseUrl}/en/premium/${font.nameEn}`,
        lastModified: new Date(),
      })),
    ];
  } catch (error) {
    // If there's an error fetching premium fonts, log it but don't fail the sitemap generation
  }

  // Return combined sitemap entries
  return [...staticRoutes, ...fontUrlsArray, ...premiumUrlsArray];
}
