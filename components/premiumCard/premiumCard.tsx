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
    <div className="px-2 mx-auto ">
      <p className="mb-1">ဖောင့်အမည််</p>
      <p className="mb-1 text-sm">ဖန်တီးသူအမည််</p>
      <div style={{ boxShadow: ' 2px 2px 0px #292D53 ' }} className="border-2 rounded-md w-fit">
        <Image
          src={image}
          alt="Picture of the author"
          placeholder="blur"
          priority
          className=" max-w-[320px]"
          onClick={() => router.push(`/premium/${id}`)}
        />
      </div>
    </div>
  );
};

export default PremiumCard;
