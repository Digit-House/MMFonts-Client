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

  return (
    <div className="px-2 mx-auto ">
      <p className="mb-1">{font.name}</p>
      <p className="mb-1 text-sm">{font.createdBy}</p>
      <div style={{ boxShadow: ' 2px 2px 0px #292D53 ' }} className="border-2 rounded-md w-fit">
        <Image
          width={320}
          height={320}
          src={`/images/premium/${font.fileName}/${font.images.split(' ')[0]}`}
          alt="Picture of the author"
          priority
          className=" max-w-[320px]"
          onClick={() => router.push(`/premium/${font.nameEn}-${id}`)}
        />
      </div>
    </div>
  );
};

export default PremiumCard;
