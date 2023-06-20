'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  DetailNavMenu,
  FontListDetailCard,
  FramerMotionWrapper,
  RadioSelectBar,
  TextGenerateModal,
} from '@components/index';
import { FontType, SelectOptionType } from '@core/golobalTypes';
import useCSVConvert from '@hooks/useCSVConvert';

function Page() {
  const params = useParams();

  const [value, setValue] = useState<string>('');
  const [fontSize, setFontSize] = useState<SelectOptionType>({
    label: '20',
    value: '20',
  });
  const [open, setOpen] = useState<boolean>(false);
  const [font, setFont] = useState<FontType | null>();
  const [fontStyles, setFontStyles] = useState<FontType[]>();

  const { data } = useCSVConvert('/fonts/data/font.csv') as { data: FontType[] };

  useEffect(() => {
    const index = params.id.split('-').pop();
    if (index) {
      if (!font) {
        console.log(index, font);

        const fontData: FontType = data[parseInt(index)];
        if (fontData) {
          const styles = fontData.fontStyle.split(' ');
          const dataStyles: FontType[] = styles.map((style) => {
            return { ...fontData, fontStyle: style };
          });

          setFontStyles([...dataStyles]);
          setFont(fontData);
        }
      }
    }
  }, [params, font]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize({ label: event.target.value, value: event.target.value });
  };

  if (!font) return <div>Loading...</div>;

  return (
    <FramerMotionWrapper>
      <DetailNavMenu fontName={font.fileName} createdBy={font.createdBy} />
      <div>
        <div className="flex items-center justify-center mt-5">
          <div className="p-4 border-2 rounded-md border-darkblue dark:border-white mx-14 md:mx-20 lg:mx-26 xl:mx-auto max-w-[794px]">
            <div>
              <textarea
                name="postContent"
                value={value}
                onChange={handleChange}
                rows={5}
                cols={100}
                placeholder="လက်တည့်စမ်းရန်"
                className="peer h-full min-h-[100px] w-full resize-none border-b-2 border-b-secondary dark:bg-lightblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline outline-0 "
              />
            </div>
            <div className="flex flex-col py-2 md:justify-between md:items-center md:flex-row">
              <RadioSelectBar fontSize={fontSize} setFontSize={setFontSize} handleSliderChange={handleSliderChange} />
              <p
                className="flex items-center justify-center p-3 mt-5 border-2 rounded-sm cursor-pointer md:mt-0 border-sm border-darkblue bg-secondary text-darkblue"
                onClick={() => setOpen(true)}
              >
                စာထုတ်ရန်
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mt-10">
        <p className="flex-1 text-xl font-bold">ဖောင့်ပုံစံများ</p>
      </div>
      <div className="flex-1 mt-3">
        {fontStyles &&
          fontStyles?.map((fontData, index) => (
            <FontListDetailCard key={index} font={fontData} size={fontSize.value} fontText={value} />
          ))}
      </div>
      <TextGenerateModal open={open} setOpen={setOpen} />
    </FramerMotionWrapper>
  );
}

export default Page;
