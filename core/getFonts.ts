import fontJson from '../public/data/fonts/data/font.json';
import PremiumFontJson from '../public/data/fonts/data/premiumFont.json';
import { FontJsonType, FontType, PremiumFontJsonType, PremiumFontType } from './golobalTypes';

export const getAllFontsName = () => {
  const fontsName = Object.keys(fontJson);
  return fontsName;
};

export const getFontsArray = () => {
  const array = Object.values(fontJson);
  return array;
};

export const getFontByName = (fontName: string): FontType | undefined => {
  const fontJsonWithIndex = fontJson as FontJsonType;
  const font = fontJsonWithIndex[fontName];
  return font;
};

export const getPremiumFonts = () => {
  const array = Object.values(PremiumFontJson);
  return array as PremiumFontType[];
};

export const getPremiumFontByName = (fontName: string): PremiumFontType | undefined => {
  const fontJsonWithIndex = PremiumFontJson as PremiumFontJsonType;
  const font = fontJsonWithIndex[fontName];
  return font;
};
