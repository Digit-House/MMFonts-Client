import React from 'react';
import { FontType } from '@core/golobalTypes';

interface FontListDetailCardType {
  font: FontType;
  size: string;
  fontText: string;
}

const FontListDetailCard = ({ font, size, fontText }: FontListDetailCardType) => {
  const fontStyle = {
    fontFamily: `${font.fileName} , 'font-acre', sans-serif`,
    src: `url(/fonts/${font.fileName}/${font.fontStyle}.ttf)`,
    fontSize: parseInt(size),
    lineHeight: `${parseInt(size) + 20}px`,
    fontWeight: font.fontStyle,
  };
  console.log('FONST', fontStyle);

  return (
    <div
      className="w-full p-2 mb-2 overflow-hidden border-2 rounded cursor-pointer select-none dark:hover:bg-softblue hover:bg-softgold"
      style={{ boxShadow: ' 2px 2px 0px' }}
    >
      <div className="flex flex-row justify-between">
        <div className="">
          <div className="text-base font-medium">ဖောင့်စတိုင် - {font.fontStyle}</div>
        </div>
      </div>
      <div className="pt-2 text-4xl break-words">
        <p
          style={{
            ...fontStyle,
          }}
        >
          {fontText || 'ကောင်းသောနံနက်ခင်းပါ'}
        </p>
        <div className="h-10" />
      </div>
    </div>
  );
};

export default FontListDetailCard;
