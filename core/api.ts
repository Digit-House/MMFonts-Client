import { PremiumFontType } from './golobalTypes';

const url = process.env.NEXT_PUBLIC_API_URL;
const imageUrl = process.env.NEXT_PUBLIC_IMAGE_PATH;

export const getAllPremiumFonts = async () => {
  const response = await fetch(`${url}/fonts`);
  const data = await response.json();
  return data.data as PremiumFontType[];
};

export const getPremiumFontByName = async (fontName: string) => {
  const response = await fetch(`${url}/fonts/${fontName}`);
  const data = await response.json();
  return data.data as PremiumFontType;
};

export const getImageUrl = (imagePath: string) => {
  return `${imageUrl}${imagePath}`;
};

export const generateTextImage = async (fontName: string, word: string) => {
  const uniString = prepareToRender(word);
  const theme = localStorage.getItem('theme');
  let color = 'black';
  if (!theme || theme === 'dark') {
    color = 'black';
  } else {
    color = 'white';
  }
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      word: uniString,
      color,
    }),
  };
  const response = await fetch(`${url}/fonts/${fontName}`, option);
  const data = await response.json();
  return data.data;
};

const convertUnicodeString = (str: string) => {
  let unicodeString = '';
  for (let i = 0; i < str.length; i++) {
    const unicodeChar = str.charCodeAt(i).toString(16).toUpperCase();
    unicodeString += '\\u' + '0000'.substring(0, 4 - unicodeChar.length) + unicodeChar;
  }
  return unicodeString;
};

const convertCodePoint = ['ေ', 'ြ'];

const prepareToRender = (str: string) => {
  let uniString = convertUnicodeString(str);
  convertCodePoint.forEach((codePoint) => {
    let uni = convertUnicodeString(codePoint);
    uni = pop(uni);
    const reStr = String.raw`(\\u[0-9A-Fa-f]{4})(\\${uni})`;
    const regexPattern = new RegExp(`${reStr}`, 'g');
    uniString = uniString.replace(regexPattern, (match, g1, g2) => {
      return g2 + g1;
    });
  });
  return uniString;
};

const pop = (str: string) => {
  return str.slice(1, str.length);
};
