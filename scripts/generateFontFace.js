/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../public/data/fonts/data/font.json');
const cssPath = path.resolve(__dirname, '../app/fontFace.css');

const generateFontFace = () => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return;
    }
    const jsonData = Object.values(JSON.parse(data));
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
  src: url('https://raw.githubusercontent.com/Digit-House/MMfonts/develop/public/data/fonts/${fontUrl}/${style}.ttf') format('truetype');
  font-weight: ${style};
  font-style: ${style};
  font-display: swap;
}`
  );

  return oneFontFaceCSS.join('\n\n');
}

generateFontFace();
