'use client';
import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

type DetailNavMenuType = {
  fontName: string;
  createdBy: string;
};

const DetailNavMenu = ({ fontName, createdBy }: DetailNavMenuType) => {
  const [isHide, setIsHide] = useState<boolean>(true);
  const t = useTranslations('Index');

  const showModal = () => {
    setIsHide((prev) => !prev);
  };

  return (
    <div className="text-lg ">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col items-left">
          <p className="mr-5 font-medium ">{fontName}</p>
          <p className="text-sm">{createdBy === undefined && t('create-by')}</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="hidden mr-5 md:flex">{t('terms-and-conditions')}</p>
          <p className="p-4 px-3 py-2 mr-4 border-2 border-black rounded-sm bg-secondary text-darkblue">
            {t('download')}
          </p>
          <div className="relative">
            <EllipsisHorizontalIcon className="w-10 h-10 text-secondary" onClick={showModal} />
            {!isHide && (
              <div className="absolute p-2 leading-normal border-2 rounded right-3 bg-primary dark:bg-lightblue min-w-max">
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
      <p className="flex justify-end mt-5 md:hidden">အကြောင်းနှင့်မူပိုင်ခွင့်</p>
    </div>
  );
};

export default DetailNavMenu;
