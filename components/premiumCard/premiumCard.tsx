import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { PremiumFontType } from '@core/golobalTypes';

type PremiumCardType = {
  font: PremiumFontType;
  id: number;
};

const PremiumCard = ({ font, id }: PremiumCardType) => {
  const router = useRouter();

  console.log(font);
  return (
    <div className="px-2 mx-auto cursor-pointer ">
      <p className="mb-1 font-semibold text-2xl">{font.name} ဖောင့်</p>
      <p className="text-base font-normal mb-2">{font.createdBy}</p>
      <div style={{ boxShadow: ' 2px 2px 0px #292D53 ' }} className="border-2 rounded-md w-fit">
        <Image
          width={320}
          height={320}
          src={`/images/premium/${font.imageFolder}/${font.images.split(',')[0]}`}
          alt={`${font.name} ဖောင့်`}
          priority
          className=" max-w-[320px]"
          onClick={() => router.push(`/premium/${font.nameEn}`)}
        />
      </div>
    </div>
  );
};

export default PremiumCard;
