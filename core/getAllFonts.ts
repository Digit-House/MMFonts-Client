import fontJson from '../public/fonts/data/font.json';

const getAllFonts = () => {
  const fontsName = Object.keys(fontJson);
  return fontsName;
};

export default getAllFonts;
