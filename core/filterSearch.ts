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

export const filterFontsByTypes = (
  data: FontType[],
  checked: { task: string; done: boolean; value: string }[],
  prevFontLists: FontType[]
) => {
  const [firstChecked, secondChecked, thirdChecked] = checked;
  const filterData = [];

  if (firstChecked.done && secondChecked.done && thirdChecked.done) {
    prevFontLists.length > 0 ? filterData.push(...prevFontLists) : filterData.push(...data);
  } else if (prevFontLists.length > 0) {
    for (let index = 0; index <= 2; index++)
      if (checked[index].done)
        filterData.push(...prevFontLists.filter((font) => font.fontSupportType === checked[index].value));
  } else {
    for (let index = 0; index <= 2; index++)
      if (checked[index].done) filterData.push(...data.filter((font) => font.fontSupportType === checked[index].value));
  }
  return filterData;
};

const filterSearch = (
  value: string,
  data: FontType[],
  checked: { task: string; done: boolean; value: string }[],
  prevFontLists: FontType[]
) => {
  const filterDataByTypes = filterFontsByTypes(data, checked, prevFontLists);
  const language = detectLanguage(value);
  const formattedInput = value.toLowerCase().replace(/\s/g, '');

  if (value == '') {
    const [firstChecked, secondChecked, thirdChecked] = checked;
    if (firstChecked.done && secondChecked.done && thirdChecked.done) {
      return data;
    } else {
      const previousData = checked
        .filter((item) => item.done)
        .flatMap((item) => data.filter((font) => font.fontSupportType === item.value));
      return previousData;
    }
  }

  if (filterDataByTypes.length !== 0) {
    const finalFilteredData = filterDataByTypes.filter((font) => {
      const fontName = language === 'english' ? font.nameEn.toLowerCase() : font.name;
      const formattedName = fontName.replace(/\s/g, '');
      return formattedName.includes(formattedInput);
    });
    return finalFilteredData;
  } else {
    return filterDataByTypes;
  }
};

export default filterSearch;
