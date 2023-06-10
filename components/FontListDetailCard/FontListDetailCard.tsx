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
  };
  console.log('FONST', fontStyle);

  return (
    <div className="flex-1 p-2 border-2 rounded cursor-pointer" style={{ boxShadow: ' 2px 2px 0px #292D53 ' }}>
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
        <div className="h-20" />
      </div>
    </div>
  );
};

export default FontListDetailCard;
