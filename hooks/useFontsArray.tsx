'use client';

import { useEffect, useState } from 'react';
import { FontType, PremiumFontType } from '@core/golobalTypes';

const useFontsArray = () => {
  const [data, setData] = useState<FontType[] | PremiumFontType[]>([]);

  useEffect(() => {
    fetch('/fonts/data/font.json', { next: { revalidate: 60 } })
      .then((response) => response.text())
      .then((csvData) => {
        const array = Object.values(JSON.parse(csvData));
        console.log('ARAR', array);
        setData(array as FontType[]);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }, []);

  return { data };
};

export default useFontsArray;
