'use client';
import React, { useEffect } from 'react';
import { FramerMotionWrapper, PremiumCard } from '@components/index';
import { getPremiumFonts } from '@core/getFonts';
import { PremiumFontType } from '@core/golobalTypes';

const Page = () => {
  const [fonts, setFonts] = React.useState<PremiumFontType[]>([]);

  useEffect(() => {
    setFonts(getPremiumFonts());
  }, []);

  return (
    <FramerMotionWrapper>
      <div className="grid grid-cols-1 gap-4 mx-auto mt-3 w-fit lg:grid-cols-3 sm:grid-cols-2">
        {fonts?.length > 0 && fonts.map((font, i) => <PremiumCard font={font} key={i} id={i} />)}
      </div>
    </FramerMotionWrapper>
  );
};

export default Page;
