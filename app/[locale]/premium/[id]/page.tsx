'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FramerMotionWrapper, RadioSelectBar, RivLoading } from '@components/index';
import { PremiumFontType, SelectOptionType } from '@core/golobalTypes';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 640, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const Premium = () => {
  const data: any = [];

  const [currentFont, setCurrentFont] = useState<PremiumFontType | null>();
  const [images, setImages] = useState<{ src: string }[]>([]);
  const params: any = useParams();

  useEffect(() => {
    const index = params.id.split('-').pop();
    if (data && index) {
      if (currentFont) return;
      getFontDetail(parseInt(index));
    }
  }, [data]);

  const getFontDetail = useCallback(
    (position: number) => {
      const fontData: PremiumFontType = data[position];
      const imgs = fontData?.images.split(' ');
      const updateURLs = imgs?.map((img) => {
        return {
          src: `/images/premium/${fontData.fileName}/${img}`,
        };
      });
      setCurrentFont(fontData);
      setImages(updateURLs);
    },
    [data]
  );

  const [fontSize, setFontSize] = useState<SelectOptionType>({
    label: '12',
    value: '12',
  });
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize({ label: event.target.value, value: event.target.value });
  };

  if (!currentFont) return <RivLoading />;
  return (
    <FramerMotionWrapper>
      <div className="flex flex-row items-center justify-between p-5">
        <div>
          <p className="mb-1 font-medium">{currentFont?.name}</p>
          <p className="font-medium">{currentFont?.createdBy}</p>
        </div>
        <div className="flex items-center justify-center px-5 py-2 border-2 border-black rounded-md shadow cursor-pointer bg-secondary text-darkblue">
          <p>ဝယ်ယူရန်</p>
        </div>
      </div>
      <Slider {...settings} className="flex justify-center h-48 mx-5 md:0 ">
        {images.map((img, index) => (
          <div key={index} className="relative w-full h-48">
            <Image
              src={img.src}
              className="w-auto mb-1 border-2 rounded-lg "
              fill
              alt="Picture of the myanmar fonts"
              priority
            />
          </div>
        ))}
      </Slider>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full">
          <div className="flex items-center justify-center mt-5">
            <div className="p-4 border-2 rounded-md border-darkblue dark:border-white mx-14 md:mx-20 lg:mx-26 xl:mx-auto max-w-[794px]">
              <div>
                <textarea
                  name="postContent"
                  rows={5}
                  cols={100}
                  placeholder="လက်တည့်စမ်းရန်"
                  className="peer h-full min-h-[100px] w-full resize-none border-b-2 border-b-secondary dark:bg-lightblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline outline-0 "
                />
              </div>
              <div className="flex flex-col py-2 md:justify-between md:items-center md:flex-row">
                <RadioSelectBar fontSize={fontSize} setFontSize={setFontSize} handleSliderChange={handleSliderChange} />
              </div>
            </div>
          </div>
          <p className="mt-5 mb-5 font-medium">ဖောင့်ပုံစံများ</p>
        </div>
      </div>
    </FramerMotionWrapper>
  );
};

export default Premium;
