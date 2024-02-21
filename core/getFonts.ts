import fontJson from '../public/data/fonts/data/font.json';
import { FontJsonType, FontType } from './golobalTypes';

export const getAllFontsName = () => {
  const fontsName = Object.keys(fontJson);
  return fontsName;
};

export const getFontsArray = () => {
  const array = Object.values(fontJson);
  return array.reverse();
};

export const getFontByName = (fontName: string): FontType | undefined => {
  const fontJsonWithIndex = fontJson as FontJsonType;
  const font = fontJsonWithIndex[fontName];
  return font;
};
