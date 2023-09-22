import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { getImageUrl } from '@core/api';
import { PremiumFontType } from '@core/golobalTypes';

type PremiumCardType = {
  font: PremiumFontType;
  id: number;
};

const PremiumCard = ({ font, id }: PremiumCardType) => {
  const router = useRouter();

  return (
    <div className="px-2 mx-auto cursor-pointer">
      <p className="mb-1 font-semibold text-2xl">{font.name} ဖောင့်</p>
      <p className="text-base font-normal mb-2">{font.createdBy}</p>
      <div style={{ boxShadow: ' 4px 3px 0px #292D53 ' }} className="border-2 rounded-md relative w-[300px] h-[300px]">
        {font.featureImage && (
          <Image
            fill
            src={getImageUrl(font.featureImage)}
            alt={`${font.name} ဖောင့်`}
            priority
            className="absolute top-0 left-0 overflow-hidden object-cover"
            onClick={() => router.push(`/premium/${font.nameEn}`)}
          />
        )}
      </div>
    </div>
  );
};

export default PremiumCard;
