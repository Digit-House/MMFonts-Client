'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FontListPremiumCard, RadioSelectBar } from '@components/index';
import { SelectOptionType } from '@core/golobalTypes';
import fontCoverImage from '@public/fontcoverimage.jpg';

const Premium = () => {
  const array = Array.from({ length: 10 }, (_, index) => index + 1);
  const [fontSize, setFontSize] = useState<SelectOptionType>({
    label: '12',
    value: '12',
  });
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize({ label: event.target.value, value: event.target.value });
  };
  return (
    <div>
      <div className="flex justify-between flex-row items-center p-5">
        <div>
          <p className="mb-1 font-medium">ဖောင့်အမည််</p>
          <p className="font-medium">ဖန်တီးသူအမည််</p>
        </div>
        <div className="flex items-center justify-center px-3 py-2 mx-3 mt-5 border-2 border-black rounded-sm cursor-pointer border-sm bg-secondary">
          <p>ဝယ်ယူရန်</p>
        </div>
      </div>
      <div className="flex flex-1 flex-row overflow-y-scroll scrollbar-hide  h-60">
        {array.map((i) => (
          <Image
            key={i}
            src={fontCoverImage}
            width={400}
            height={400}
            alt="Picture of the myanmar fonts"
            placeholder="blur"
            priority
            className="rounded-lg border-2 mb-1"
          />
        ))}
      </div>
      <div className="justify-center items-center flex flex-col">
        <div className="w-full md:w-2/3 lg:w-3/4 xl:w-1/2">
          <div className="flex items-center justify-center mt-5">
            <div className="p-4 border-2 rounded-md border-darkblue dark:border-white">
              <div>
                <textarea
                  name="postContent"
                  rows={5}
                  cols={100}
                  placeholder="လက်တည့်စမ်းရန်"
                  className="peer h-full min-h-[100px] w-full resize-none sm:border-b-2 sm:border-b-secondary dark:bg-darkblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline outline-0 "
                />
              </div>
              <div className="items-center justify-between hidden p-4 sm:flex ">
                <RadioSelectBar fontSize={fontSize} setFontSize={setFontSize} handleSliderChange={handleSliderChange} />
              </div>
            </div>
          </div>
          <p className="mb-5 mt-5 font-medium">ဖောင့်ပုံစံများ</p>
          {array.map((i) => (
            <FontListPremiumCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Premium;
