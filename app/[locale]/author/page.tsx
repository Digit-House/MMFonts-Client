// @ts-nocheck

'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { FramerMotionWrapper, RivLoading } from '@components/index';
import { getImageUrl } from '@core/api';

const url = process.env.NEXT_PUBLIC_API_URL;

type FontInfo = {
  bio: string;
  createdBy: string;
  enSupport: string;
  featureImage: string;
  fileName: string;
  fontStyle: string;
  fontSupportType: string;
  name: string;
  nameEn: string;
  profileImage: string;
  skills: string;
};

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
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

const fetchAuthorInfo = async (authorName: string | string[]) => {
  const response = await fetch(`${url}/author?name=${authorName}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
};

const Author = ({ searchParams }: { searchParams: { [key: string]: string | string[] } }) => {
  const authorName = searchParams && searchParams.author;

  const { data, isLoading, isError } = useQuery<FontInfo[]>(['authorInfo', authorName], () =>
    fetchAuthorInfo(authorName)
  );

  useEffect(() => {
    if (data && data.length > 0) {
      console.log(data);
    } else {
      // Handle the case when the array is empty or undefined
    }
  }, [data]);

  if (!data || isLoading) return <RivLoading />;

  const KaungHtetNaing = (img: string) => (
    <>
      <div className="relative h-60 w-60 mb-[.875rem] ">
        <Image
          src={getImageUrl(img)}
          className="object-cover w-auto border-2 rounded-lg"
          fill
          alt="Picture of the myanmar fonts"
          priority
        />
      </div>
      <div className="relative flex flex-row justify-between w-full">
        <button className="text-xl border rounded-md bg-secondary border-darkblue text-darkblue px-[2.1875rem] py-[.3125rem] font-bold">
          Buy
        </button>
        <button className="text-xl border rounded-md bg-secondary border-darkblue text-darkblue px-[2.1875rem] py-[.3125rem] font-bold">
          Test
        </button>
      </div>
    </>
  );

  return (
    <FramerMotionWrapper>
      <div className="flex flex-col sm:flex-row gap-x-6">
        <div className="sm:w-[17.5625rem] sm:h-[17.5625rem] relative rounded-lg overflow-hidden w-full h-[17.5625rem]">
          <Image fill alt={data[0].createdBy} src={getImageUrl(data[0].featureImage)} objectFit="cover" />
        </div>
        <div className="flex flex-col justify-between flex-1 w-full sm:mt-0 mt-[1.0625rem]">
          <div>
            <p className="font-bold text-[2.25rem]">{data[0].createdBy} </p>
            {data[0].skills &&
              data[0].skills.map((s, index) => (
                <p key={index} className="px-2 py-1 text-sm font-bold bg-white rounded-full text-darkblue w-min">
                  {s}
                </p>
              ))}
            <p className="text-xs sm:mt-0 mt-[.5625rem]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid sunt ea a facilis officia quam officiis
              laborum veniam numquam ab. Laboriosam repellat magni quibusdam aut perspiciatis nobis, sed minima eum!
            </p>
          </div>
          <div className="sm:mt-0 mt-[.5625rem]">
            <p className="text-sm font-bold">Total Fonts {data.length}</p>
            <button className="text-xl border rounded-md bg-secondary border-darkblue text-darkblue px-[2.1875rem] py-[.3125rem] font-bold mr-4 sm:mt-0 mt-[.5625rem]">
              Buy
            </button>
            <button className="text-xl border rounded-md bg-secondary border-darkblue text-darkblue px-[2.1875rem] py-[.3125rem] font-bold">
              Test
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-lg font-bold mb-[10px]">Available Fonts</p>
        <Slider {...settings} className="mb-8">
          {data.map((d, index) => (
            <>
              <div className="w-full ">
                <div className="relative h-60 w-full mb-[.875rem] ">
                  <Image
                    src={getImageUrl(d.featureImage)}
                    className="object-cover w-auto border-2 rounded-lg"
                    fill
                    alt="Picture of the myanmar fonts"
                    priority
                    objectFit="cover"
                  />
                </div>
                <div className="relative flex flex-row justify-between w-full ">
                  <button className="text-xl border rounded-md bg-secondary border-darkblue text-darkblue px-[2.1875rem] py-[.3125rem] font-bold">
                    Buy
                  </button>
                  <button className="text-xl border rounded-md bg-secondary border-darkblue text-darkblue px-[2.1875rem] py-[.3125rem] font-bold">
                    Test
                  </button>
                </div>
              </div>
            </>
          ))}
        </Slider>
        <div className="flex items-center justify-between sm:justify-center w-full bg-darkblue h-[8.375rem] sm:gap-x-[4.6875rem] dark:bg-white sm:p-0 px-1">
          <div className="flex flex-col items-start justify-center sm:items-center">
            <p className="text-xl font-bold text-white sm:text-4xl dark:text-darkblue">{data[0].createdBy}</p>
            <button className="sm:text-2xl  text-lg border rounded-md bg-secondary border-darkblue text-darkblue px-[.625rem] py-[.4375rem] font-bold w-auto">
              Buy All Fonts
            </button>
          </div>
          <div className="sm:w-[7.0625rem] sm:h-[7.0625rem] w-[5.4781rem] h-[5.4781rem] relative rounded-full overflow-hidden">
            <Image fill alt={data[0].createdBy} src={getImageUrl(data[0].featureImage)} objectFit="cover" />
          </div>
        </div>
      </div>
    </FramerMotionWrapper>
  );
};

export default Author;
