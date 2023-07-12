'use client';

import { useEffect, useState } from 'react';
import { FontType, PremiumFontType } from '@core/golobalTypes';

const useCSVConvert = (csvFilePath: string) => {
  const [data, setData] = useState<FontType[] | PremiumFontType[]>([]);

  useEffect(() => {
    fetch(csvFilePath, { next: { revalidate: 60 } })
      .then((response) => response.text())
      .then((csvData) => {
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
        setData(jsonData);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }, [csvFilePath]);

  return { data };
};

export default useCSVConvert;
