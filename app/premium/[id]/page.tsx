'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Slider from 'react-slick';
import { FontListPremiumCard, RadioSelectBar } from '@components/index';
import { SelectOptionType } from '@core/golobalTypes';
import fontCoverImage from '@public/fontcoverimage.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const array = Array.from({ length: 10 }, (_, index) => index + 1);

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Premium = () => {
  const [fontSize, setFontSize] = useState<SelectOptionType>({
    label: '12',
    value: '12',
  });
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize({ label: event.target.value, value: event.target.value });
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-5">
        <div>
          <p className="mb-1 font-medium">ဖောင့်အမည််</p>
          <p className="font-medium">ဖန်တီးသူအမည််</p>
        </div>
        <div className="flex items-center justify-center px-5 py-2 border-2 border-black rounded-sm shadow cursor-pointer bg-secondary text-darkblue">
          <p>ဝယ်ယူရန်</p>
        </div>
      </div>
      <Slider {...settings} className="mx-5 md:0 ">
        {array.map((i) => (
          <Image
            key={i}
            src={fontCoverImage}
            alt="Picture of the myanmar fonts"
            placeholder="blur"
            priority
            className="mb-1 border-2 rounded-lg "
          />
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
              <div className="">
                <RadioSelectBar fontSize={fontSize} setFontSize={setFontSize} handleSliderChange={handleSliderChange} />
              </div>
            </div>
          </div>

          <p className="mt-5 mb-5 font-medium">ဖောင့်ပုံစံများ</p>
          {array.map((i) => (
            <FontListPremiumCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Premium;
