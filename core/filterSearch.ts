import { FontType } from './golobalTypes';

export function detectLanguage(input: string) {
  const charCodes = input
    .toLowerCase()
    .split('')
    .map((char) => char.charCodeAt(0));

  const englishCount = charCodes.filter((charCode) => charCode >= 97 && charCode <= 122).length;
  const myanmarCount = charCodes.filter((charCode) => charCode >= 4096 && charCode <= 4255).length;

  if (englishCount > 0 && myanmarCount === 0) {
    return 'english';
  } else if (englishCount === 0 && myanmarCount > 0) {
    return 'myanmar';
  } else {
    return 'unknown';
  }
}

export default function filterSearch(event: React.ChangeEvent<HTMLInputElement>, data: FontType[]) {
  const language = detectLanguage(event.target.value);
  const filterData = data.filter((font) => {
    const fontName = language === 'english' ? font.nameEn.toLowerCase() : font.name;
    const formattedName = fontName.replace(/\s/g, '');
    const formattedInput = event.target.value.toLowerCase().replace(/\s/g, '');
    return formattedName.includes(formattedInput);
  });
  return filterData;
}
