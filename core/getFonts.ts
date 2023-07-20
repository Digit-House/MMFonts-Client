import fontJson from '../public/fonts/data/font.json';

export const getAllFontsName = () => {
  const fontsName = Object.keys(fontJson);
  return fontsName;
};

export const getFontsArray = () => {
  const array = Object.values(fontJson);
  return array;
};

export const getFontByName = (fontName: string) => {
  const font = fontJson[fontName];
  return font;
};
