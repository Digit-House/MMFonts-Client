'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DetailNavMenu, FontListDetailCard, FramerMotionWrapper, Loading, RadioSelectBar } from '@components/index';
import { getFontByName } from '@core/getFonts';
import { FontType, SelectOptionType } from '@core/golobalTypes';

function Page() {
  const params: any = useParams();

  const [value, setValue] = useState<string>('');
  const [fontSize, setFontSize] = useState<SelectOptionType>({
    label: '20',
    value: '20',
  });
  const [fontStyles, setFontStyles] = useState<FontType[]>();
  const t = useTranslations('Index');

  const font = getFontByName(params.id) as FontType;

  useEffect(() => {
    if (font) {
      const styles = font.fontStyle.split(' ');

      const fonts = styles.map((style) => {
        return {
          name: font.name,
          nameEn: style,
          fontStyle: style,
          fontSupportType: font.fontSupportType,
          fileName: font.fileName,
          createdBy: font.createdBy,
        };
      });
      setFontStyles(fonts);
    }
  }, [font]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize({ label: event.target.value, value: event.target.value });
  };

  if (!font) return <Loading />;

  return (
    <FramerMotionWrapper>
      <DetailNavMenu fileName={font.fileName} fontName={font.fileName} createdBy={font.createdBy} />
      <div>
        <div className="flex items-center justify-center mt-5 ">
          <div className="p-4 border-2 rounded-md border-darkblue dark:border-white sm:mx-14 md:mx-20 lg:mx-26 xl:mx-auto max-w-[794px]">
            <div>
              <textarea
                name="postContent"
                value={value}
                onChange={handleChange}
                rows={5}
                cols={100}
                placeholder={t('type-something')}
                className="peer h-full min-h-[100px] w-full resize-none border-b-2 border-b-secondary dark:bg-lightblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline outline-0 "
              />
            </div>
            <div className="flex flex-col py-2 md:justify-between md:items-center md:flex-row">
              <RadioSelectBar fontSize={fontSize} setFontSize={setFontSize} handleSliderChange={handleSliderChange} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mt-10">
        <p className="flex-1 text-sm font-medium text-md text-secondaryText dark:text-darkSecondaryText">
          {t('fonts')}
        </p>
      </div>
      <div className="grid flex-1 gap-4 mt-3">
        {fontStyles &&
          fontStyles?.map((fontData, index) => (
            <FontListDetailCard key={index} font={fontData} size={fontSize.value} fontText={value} id={index} />
          ))}
      </div>
    </FramerMotionWrapper>
  );
}

export default Page;
