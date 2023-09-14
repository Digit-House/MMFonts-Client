const url = process.env.NEXT_PUBLIC_API_URL;
const imageUrl = process.env.NEXT_PUBLIC_IMAGE_PATH;

export const getAllPremiumFonts = async () => {
  const response = await fetch(`${url}/fonts`);
  const data = await response.json();
  return data.data;
};

export const getPremiumFontByName = async (fontName: string) => {
  const response = await fetch(`${url}/fonts/${fontName}`);
  const data = await response.json();
  return data.data;
};

export const getImageUrl = (imagePath: string) => {
  return `${imageUrl}${imagePath}`;
};

export const generateTextImage = async (fontName: string, word: string, color = '#000000') => {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      word,
      color,
    }),
  };
  const response = await fetch(`${url}/fonts/${fontName}`, option);
  const data = await response.json();
  return data.data;
};
