import { FontType } from './golobalTypes';

export function detectLanguage(input: string) {
  const en = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const mm = 'ကခဂဃငစဆဇဈညဋဌဍဎဏတထဒဓနပဖဗဘမယရလဝသဟဠအ';

  if (en.includes(input[0])) return 'english';
  if (mm.includes(input[0])) return 'myanmar';
  else return 'unknown';
}

const filterSearch = (
  searchKeyWord: string,
  originData: FontType[],
  fontChecks: { task: string; done: boolean; value: string }[]
) => {
  let filteredData: FontType[];
  const formattedSearchKeyWord = searchKeyWord.toLowerCase().replace(/\s/g, '');
  const searchLang = detectLanguage(formattedSearchKeyWord);

  if (fontChecks.every((item) => item.done === true)) {
    filteredData = originData;
  } else {
    const data: FontType[] = fontChecks
      .filter((item) => item.done)
      .flatMap((item) => originData.filter((font) => font.fontSupportType === item.value));

    filteredData = data;
  }
  if (formattedSearchKeyWord.length > 0) {
    filteredData = filteredData.filter((font) => {
      const fontName = searchLang === 'english' ? font.nameEn.toLowerCase() : font.name;
      const formattedName = fontName.replace(/\s/g, '');
      return formattedName.includes(formattedSearchKeyWord);
    });
  }

  return filteredData;
};

export default filterSearch;
