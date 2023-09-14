import path from 'path';
import { createCanvas, deregisterAllFonts, registerFont } from 'canvas';
import { NextResponse } from 'next/server';
import { getPremiumFontByName } from '@core/getFonts';

const fontUrl = 'https://raw.githubusercontent.com/Digit-House/MMfonts/develop/public/data/local/AcreMMVariable';

type FontData = {
  fontName: string;
  word: string;
};

export function GET(req: Request) {
  const data = { message: 'Hello from Next.js!' };
  return NextResponse.json(data);
}

function fontFile(name: string) {
  return path.resolve('./public/data/local/', name);

  // return path.join(process.cwd(), '/public/data/local/', name);
}

const generateCanvasImage = (word: string, style: string, fontName: string) => {
  const url = fontFile('AcreMMVariable' + '-' + style + '.ttf');
  console.log('URL', url, style, fontName);
  registerFont(url, { family: fontName, weight: style });

  const width = 3000;
  const height = 200;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  const fontStyle = `${style} 80pt ${fontName}`;
  context.font = fontStyle;
  console.log('fontStyle', context.font);
  deregisterAllFonts();
  context.fillText(word, 100, 130);
  const imgBuffer = canvas.toBuffer('image/png');
  const imgBase64 = imgBuffer.toString('base64');
  return imgBase64;
};

export async function POST(req: Request) {
  const data: FontData = await req.json();
  const { fontName, word } = data;
  if (!fontName || !word) {
    return NextResponse.json({ message: 'Please fill all the fields!' });
  }

  const font = getPremiumFontByName(fontName);

  if (font) {
    const { name, fileName, fontSupportType, fontStyle, nameEn } = font;

    const styles = fontStyle.split(',');

    const imageData = styles.map((style) => {
      return {
        style,
        image: generateCanvasImage(word, style, nameEn),
      };
    });

    return NextResponse.json({ message: 'success', data: imageData });
  }

  return NextResponse.json({ message: 'font name is not found!' });
}
