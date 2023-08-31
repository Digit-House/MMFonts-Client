export default function checkValidUrl(locale: string, font: { nameEn?: string; name?: string }) {
  if (typeof font !== 'undefined') {
    return locale === 'en' ? font.nameEn : font.name;
  } else return '404';
}
