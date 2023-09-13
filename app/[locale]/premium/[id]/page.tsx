'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FramerMotionWrapper, RadioSelectBar, RivLoading } from '@components/index';
import PremiumFontDetail from '@components/PremiumFontDetail/PremiumFontDetail';
import { getPremiumFontByName } from '@core/getFonts';
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

  const [images, setImages] = useState<{ src: string }[]>([]);
  const [fontImages, setFontImages] = useState<
    {
      image: string;
      style: string;
    }[]
  >([]);

  const params: Record<string, string | string[]> | null = useParams();
  const fontName = params?.id as string;
  const currentFont = getPremiumFontByName(fontName);
  const [fonts, setFonts] = useState<PremiumFontType[]>();

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (currentFont) {
      getImages(currentFont);
    }
  }, [currentFont]);

  const getImages = (premiumFont: PremiumFontType) => {
    const imgs = premiumFont?.images.split(',');
    const updateURLs = imgs?.map((img) => {
      return {
        src: `/images/premium/${premiumFont.imageFolder}/${img}`,
      };
    });
    const styles = premiumFont.fontStyle.split(',');
    const fontStyles: PremiumFontType[] = styles.map((style) => {
      return {
        name: premiumFont.name,
        nameEn: style,
        fontStyle: style,
        fontSupportType: premiumFont.fontSupportType,
        fileName: premiumFont.fileName,
        createdBy: premiumFont.createdBy,
        imageFolder: premiumFont.imageFolder,
        images: premiumFont.images,
        fbLink: premiumFont.fbLink,
        downloadLink: premiumFont.downloadLink,
        price: premiumFont.price,
      };
    });
    setFonts(fontStyles);
    setImages(updateURLs);
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

  const generateTextImage = async () => {
    console.log('generateTextImage');
    const url = '/api/premiumfonts';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fontName: currentFont?.nameEn,
        word: value,
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.message === 'success') {
      setFontImages(data.data);
    }
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
      <Slider {...settings} className="mb-8">
        {images.map((img, index) => (
          <div key={index} className="relative h-60 w-60">
            <Image
              src={img.src}
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
            <div className="flex flex-col py-2 md:justify-between md:items-center md:flex-row">
              <RadioSelectBar fontSize={fontSize} setFontSize={setFontSize} handleSliderChange={handleSliderChange} />
              <button
                className="flex items-center justify-center px-5 py-2 border-2 border-black rounded-md shadow cursor-pointer bg-red text-white md:mt-4"
                onClick={generateTextImage}
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
          fonts &&
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
