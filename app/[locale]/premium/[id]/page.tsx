// @ts-nocheck

'use client';

import va from '@vercel/analytics';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FramerMotionWrapper, RadioSelectBar, RivLoading } from '@components/index';
import PremiumFontDetail from '@components/PremiumFontDetail/PremiumFontDetail';
import { generateTextImage, getImageUrl, getPremiumFontByName } from '@core/api';
import { PremiumFontType, SelectOptionType } from '@core/golobalTypes';

const settings = {
  dots: true,
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
  nextArrow: <div>next</div>,
  prevArrow: <div>prev</div>,
};

const Premium = () => {
  const t = useTranslations('Index');

  const [images, setImages] = useState<string[]>([]);
  const [fontImages, setFontImages] = useState<
    {
      image: string;
      style: string;
    }[]
  >([]);

  const params: Record<string, string | string[]> | null = useParams();
  const [font, setFont] = useState<PremiumFontType>();

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const fontName = params?.id as string;

    if (fontName) {
      getFont(fontName);
    }
  }, []);

  const getFont = async (fontName: string) => {
    const data = await getPremiumFontByName(fontName);
    if (data) {
      setFont(data);
      setImages(data.images);
    }
  };

  const [fontSize, setFontSize] = useState<SelectOptionType>({
    label: '20',
    value: '20',
  });
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize({ label: event.target.value, value: event.target.value });
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const generate = async (fontName: string, word: string) => {
    const data = await generateTextImage(fontName, word);
    setFontImages(data);
  };

  const goToFb = () => {
    va.track('buy-font', { fontName: name });
    window.open(font?.fbLink, '_blank');
  };

  if (!font) return <RivLoading />;

  return (
    <FramerMotionWrapper>
      <div className="flex flex-row items-center justify-between p-5">
        <div>
          <p className="mb-1 font-medium">{font?.name}</p>
          <p className="font-medium">{font?.createdBy}</p>
        </div>
        <div
          className="flex items-center justify-center px-5 py-2 border-2 border-black rounded-md shadow cursor-pointer bg-secondary text-darkblue"
          onClick={goToFb}
        >
          <p>ဝယ်ယူရန်</p>
        </div>
      </div>
      <Slider {...settings} className="mb-8">
        {images.map((img, index) => (
          <div key={index} className="relative h-60 w-60">
            <Image
              src={getImageUrl(img)}
              className="w-auto mb-1 border-2 rounded-lg object-cover"
              fill
              alt="Picture of the myanmar fonts"
              priority
            />
          </div>
        ))}
      </Slider>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-center w-full">
          <div className="p-4 border-2 rounded-md border-darkblue dark:border-white sm:mx-14 md:mx-20 lg:mx-26 xl:mx-auto w-full">
            <div className="relative">
              <textarea
                name="postContent"
                value={value}
                onChange={handleChange}
                rows={2}
                cols={100}
                maxLength={50}
                placeholder={t('type-something')}
                className="peer h-full min-h-[100px] w-full resize-none border-b-2 border-b-secondary dark:bg-lightblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 placeholder-secondaryText dark:placeholder-darkSecondaryText outline outline-0 "
              />
              <small className="absolute bottom-4 right-0 text-xs font-medium">{value.length}/50</small>
            </div>
            <div className="flex flex-col py-2 md:justify-between md:items-center md:flex-row gap-4">
              <RadioSelectBar fontSize={fontSize} setFontSize={setFontSize} handleSliderChange={handleSliderChange} />
              <button
                className="flex items-center justify-center px-5 py-2 border-2 border-black rounded-md shadow cursor-pointer bg-secondary text-darkblue"
                onClick={() => generate(font.nameEn, value)}
              >
                <p>စာစမ်းထုတ်ရန်</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {fontImages.length > 0 && (
        <div className="flex flex-row items-center mt-10">
          <p className="flex-1 text-sm font-medium text-md text-secondaryText dark:text-darkSecondaryText">
            {t('fonts')}
          </p>
        </div>
      )}
      <div className="grid flex-1 gap-4 mt-3">
        {fontImages &&
          fontImages?.map((fData, index) => (
            <PremiumFontDetail
              key={index}
              fontStyle={fData.style}
              size={fontSize.value}
              imageUrl={fData.image}
              id={index}
            />
          ))}
      </div>
    </FramerMotionWrapper>
  );
};

export default Premium;
