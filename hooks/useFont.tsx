'use client';

import { useEffect, useState } from 'react';
import { FontType, PremiumFontType } from '@core/golobalTypes';

const useFont = (objectName: string) => {
  const [data, setData] = useState<FontType | PremiumFontType>();

  useEffect(() => {
    fetch('/fonts/data/font.json', { next: { revalidate: 60 } })
      .then((response) => response.text())
      .then((csvData) => {
        const object = JSON.parse(csvData)[objectName];
        setData(object as FontType);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }, [objectName]);

  return { data };
};

export default useFont;
