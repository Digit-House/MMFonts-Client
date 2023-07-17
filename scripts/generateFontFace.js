/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../public/fonts/data/font.csv');
const cssPath = path.resolve(__dirname, '../app/fontFace.css');

const generateFontFace = () => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      const font = {};

      for (let j = 0; j < headers.length; j++) {
        font[headers[j]] = currentLine[j];
      }
      jsonData.push(font);
    }

    const cssRules = jsonData.map((font) => generateFontFaceCSS(font['nameEn'], font['fileName'], font['fontStyle']));

    const cssContent = cssRules.join('\n\n');
    fs.writeFileSync(cssPath, cssContent);
  });
};

// eslint-disable-next-line max-params
function generateFontFaceCSS(fontFamily, fontUrl, fontStyle) {
  const styles = fontStyle.split(' ');
  const oneFontFaceCSS = styles.map(
    (style) =>
      `@font-face {
  font-family: '${fontFamily}';
  src: url('https://raw.githubusercontent.com/Kaung-Htet-Naing/MMfonts/develop/public/fonts/${fontUrl}/${style}.ttf') format('truetype');
  font-weight: ${style};
  font-style: ${style};
}`
  );

  return oneFontFaceCSS.join('\n\n');
}

generateFontFace();
// src: url('/public/fonts/${fontUrl}/${style}.ttf') format('truetype');
