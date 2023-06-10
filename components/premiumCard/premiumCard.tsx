import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type PremiumCardType = {
  image: StaticImageData;
  id: number;
};

const PremiumCard = ({ image, id }: PremiumCardType) => {
  const router = useRouter();

  return (
    <div>
      <p className="mb-1">ဖောင့်အမည််</p>
      <p className="mb-1 text-sm">ဖန်တီးသူအမည််</p>
      <div style={{ boxShadow: ' 2px 2px 0px #292D53 ' }} className="w-fit rounded-md border-2">
        <Image
          src={image}
          width={400}
          alt="Picture of the author"
          placeholder="blur"
          priority
          className=""
          onClick={() => router.push(`/premium/${id}`)}
        />
      </div>
    </div>
  );
};

export default PremiumCard;
