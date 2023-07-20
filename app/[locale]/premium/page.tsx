'use client';
import React, { useEffect } from 'react';
import { FramerMotionWrapper, Loading, PremiumCard } from '@components/index';
import { PremiumFontType } from '@core/golobalTypes';
import useCSVConvert from '@core/getFontsArray';

const Page = () => {
  const { data } = useCSVConvert('/fonts/data/premium.csv') as { data: PremiumFontType[] };
  const [fonts, setFonts] = React.useState<PremiumFontType[]>([]);

  useEffect(() => {
    setFonts(data);
  }, []);

  if (data.length > 0) return <Loading waitingText={true} />;

  return (
    <FramerMotionWrapper>
      <div className="grid grid-cols-1 gap-4 mx-auto mt-3 w-fit lg:grid-cols-3 sm:grid-cols-2">
        {fonts.map((font, i) => (
          <PremiumCard font={font} key={i} id={i} />
        ))}
      </div>
    </FramerMotionWrapper>
  );
};

export default Page;
