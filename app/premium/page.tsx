'use client';
import React from 'react';
import { PremiumCard } from '@components/index';
import fontCoverImage from '@public/fontcoverimage.jpg';

const array = Array.from({ length: 10 }, (_, index) => index + 1);

const Page = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mx-auto mt-3 w-fit lg:grid-cols-3 sm:grid-cols-2">
      {array.map((i) => (
        <PremiumCard image={fontCoverImage} key={i} id={i} />
      ))}
    </div>
  );
};

export default Page;
