'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';
import { classNames } from '@core/classnames';
import { SelectOptionType } from '@core/golobalTypes';
import { RadioSelectBar } from '..';

type SearchBoxType = {
  value: string;
  searchValue: string;
  filterOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckBoxChange: (d: boolean, i: number) => void;
  checked: { task: string; done: boolean }[];
  setFontSize: React.Dispatch<React.SetStateAction<SelectOptionType>>;
  fontSize: SelectOptionType;
  isSearchBoxScrolled: boolean;
};

const SearchBox = ({
  value,
  searchValue,
  handleChange,
  handleCheckBoxChange,
  checked,
  setFontSize,
  filterOnChange,
  fontSize,
  isSearchBoxScrolled,
}: SearchBoxType) => {
  let sliderTimeout: NodeJS.Timeout;
  const t = useTranslations('Index');

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(sliderTimeout);
    setFontSize({ label: event.target.value, value: event.target.value });
  };

  return (
    <>
      <div className={classNames('lg:w-[996px] max-w-[996px] sm:mx-10 md:mx-24 lg:mx-auto lg:mt-10 mx-5 ')}>
        <div className="p-4 border-2 rounded-md border-darkblue dark:border-white sm:mx-14 md:mx-20 lg:mx-26 xl:mx-auto max-w-[794px]">
          <textarea
            name="postContent"
            rows={5}
            cols={100}
            value={value}
            onChange={handleChange}
            placeholder={t('type-something')}
            className="peer min-h-[50px] md:min-h-[100px] h-auto w-full resize-none border-b-2 border-b-secondary dark:bg-lightblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline outline-0 focus:placeholder:text-[#a11d33]"
          />
          <div className="flex flex-row flex-wrap items-stretch flex-1 h-auto gap-2 py-2 md:flex-nowrap">
            <div className="relative flex-[1_0_10%] md:w-[50%] md:flex-none order-first">
              <span className="absolute inset-y-0 left-0 flex items-center pl-1">
                <MagnifyingGlassIcon className="w-10 h-10 p-2 text-darkblue" />
              </span>
              <input
                value={searchValue}
                onChange={filterOnChange}
                className="w-full h-12 pl-12 py-2 pr-4 border border-none rounded-full shadow text-darkblue bg-secondary focus:outline-none focus:placeholder:text-[#a11d33] "
                placeholder={t('search')}
                type="text"
              />
            </div>
            <RadioSelectBar
              id="range-bar"
              fontSize={fontSize}
              setFontSize={setFontSize}
              handleSliderChange={handleSliderChange}
              customClassName="w-full"
            />
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isSearchBoxScrolled ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: isSearchBoxScrolled ? 0.3 : 0 }}
        className={classNames(
          isSearchBoxScrolled ? 'fixed top-0 z-10 ' : 'h-0',
          'w-full  border-b-2 shadow-lg dark:bg-lightblue border-b-secondary bg-primary'
        )}
      >
        <div className="lg:w-[996px] max-w-[996px]  sm:mx-10 md:mx-24 lg:mx-auto  mx-5 flex flex-row items-center gap-2 py-2 flex-wrap md:flex-nowrap">
          <input
            value={value}
            onChange={handleChange}
            placeholder={t('type-something')}
            className="peer flex-[1_0_100%] md:flex-none h-auto order-first md:w-[33%] grow resize-none border-2 shadow rounded-md border-secondary dark:bg-lightblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline focus:placeholder:text-[#a11d33] outline-0 "
          />
          <div className="relative grow md:w-[33%] md:grow-0 w-[40%]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-1">
              <MagnifyingGlassIcon className="w-10 h-10 p-2 text-darkblue" />
            </span>
            <input
              value={searchValue}
              onChange={filterOnChange}
              className="w-full h-12 pl-12 py-2 pr-4 border border-none rounded-md shadow text-darkblue bg-secondary focus:outline-none focus:placeholder:text-[#a11d33] "
              placeholder={t('search')}
              type="text"
            />
          </div>
          <RadioSelectBar
            id="floating-range-bar"
            fontSize={fontSize}
            setFontSize={setFontSize}
            handleSliderChange={handleSliderChange}
            customClassName="grow rounded-md md:w-[33%] md:grow-0 w-[40%]"
            selectBoxRounded={false}
            isSticky={true}
          />
        </div>
      </motion.div>
    </>
  );
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
