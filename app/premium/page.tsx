'use client';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { PremiumCard } from '@components/index';
import { PremiumFontType } from '@core/golobalTypes';
import useCSVConvert from '@hooks/useCSVConvert';
import useIsMobile from '@hooks/useIsMobile';

const array = Array.from({ length: 10 }, (_, index) => index + 1);

const Page = () => {
  const { isMobile } = useIsMobile();

  const { data } = useCSVConvert('/fonts/data/premium.csv') as { data: PremiumFontType[] };
  const [fonts, setFonts] = React.useState<PremiumFontType[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      setFonts(data);
    }
  }, [data]);

  return (
    <div className="flex items-center justify-center ">
      <div className={classNames(isMobile ? 'grid-cols-1' : 'grid-cols-3', 'grid gap-4 mt-3  w-full 2xl:w-3/4 ')}>
        {fonts.map((font, i) => (
          <PremiumCard font={font} key={i} id={i} />
        ))}
      </div>
    </div>
  );
};

export default Page;
