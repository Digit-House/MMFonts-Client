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
    <div>
      <p className="mb-1">{font.name}</p>
      <p className="mb-1 text-sm">{font.createdBy}</p>
      <div style={{ boxShadow: ' 2px 2px 0px #292D53 ' }} className="w-fit rounded-md border-2 cursor-pointer">
        <Image
          src={`/images/premium/${font.images.split(' ')[0]}`}
          width={400}
          height={400}
          alt="Picture of the author"
          priority
          className=""
          onClick={() => router.push(`/premium/${id}`)}
        />
      </div>
    </div>
  );
};

export default PremiumCard;
