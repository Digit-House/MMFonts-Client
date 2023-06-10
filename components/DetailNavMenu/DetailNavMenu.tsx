'use client';
import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const DetailNavMenu = () => {
  const [isHide, setIsHide] = useState<boolean>(true);

  const showModal = () => {
    setIsHide((prev) => !prev);
  };

  return (
    <div className="flex flex-row justify-between mx-2 mt-5 text-lg py-5">
      <div className="flex flex-row items-center">
        <p className="mr-5">မြန်မာဖောင့်</p>
        <p>အမည်မသိ</p>
      </div>
      <div className="flex flex-row items-center">
        <p className="hidden mr-5 md:flex">အကြောင်းနှင့်မူပိုင်ခွင့်</p>
        <p className="p-4 px-3 py-2 mr-4 border-2 border-black rounded-sm bg-secondary">ဒေါင်းလော့လုပ်ရန်</p>
        <div className="relative">
          <EllipsisHorizontalIcon className="w-10 h-10 text-secondary" onClick={showModal} />
          {!isHide && (
            <div className="absolute p-2 leading-normal border-2 right-3 bg-primary min-w-max">
              <div className="flex flex-row justify-between mb-2 ">
                <p>အစီရင်ခံရန်</p>
                <XMarkIcon className="w-6" onClick={showModal} />
              </div>
              <p>ဒီဖောင့်ကိုသင်ပိုင်ပါသည်</p>
              <p>ဖောင့်ကိုဝက်ဆိုဒ်မှဖျက်ပါမည်</p>
              <p>ဒီဖောင့်ကိုအခကြေးငွေပေးဆောင်ရပါမည်</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailNavMenu;
