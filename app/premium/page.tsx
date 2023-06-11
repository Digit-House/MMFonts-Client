'use client';
import React from 'react';
import { PremiumCard } from '@components/index';
import useIsMobile from '@hooks/useIsMobile';
import fontCoverImage from '@public/fontcoverimage.jpg';

const array = Array.from({ length: 10 }, (_, index) => index + 1);

const Page = () => {
  const { isMobile } = useIsMobile();

  return (
    <div className="flex items-center justify-center ">
      <div className="grid-cols-1 md:grid-cols-3 grid gap-4 mt-3  w-full 2xl:w-3/4 ">
        {array.map((i) => (
          <PremiumCard image={fontCoverImage} key={i} id={i} />
        ))}
      </div>
    </div>
  );
};

export default Page;
