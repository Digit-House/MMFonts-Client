const getAllFonts = async () => {
  try {
    const response = await fetch('/fonts/data/font.csv');
    const csvData = await response.text();

    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      const font: any = {};

      for (let j = 0; j < headers.length; j++) {
        font[headers[j]] = currentLine[j];
      }
      jsonData.push(font);
    }

    return jsonData;
  } catch (err) {
    return [];
  }
};

export default getAllFonts;
