'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React from 'react';
import { classNames } from '@core/classnames';
import { SelectOptionType } from '@core/golobalTypes';
import { CheckBox, RadioSelectBar } from '..';

type SearchBoxType = {
  value: string;
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
    <div
      className={classNames(
        isSearchBoxScrolled && ' border-b-secondary  border-b-2 shadow-lg',
        'w-full   dark:bg-lightblue'
      )}
    >
      <div className="lg:w-[996px] max-w-[996px]  sm:mx-10 md:mx-24 lg:mx-auto lg:mt-10 mx-5 flex flex-row items-center gap-2 py-2 flex-wrap md:flex-nowrap">
        <div className="md:flex-1 flex-[1_0_70%] sm:flex-[1_0_80%] order-first">
          <input
            value={value}
            onChange={handleChange}
            placeholder={t('type-something')}
            className="peer h-auto  w-full resize-none border-2 shadow rounded-md border-secondary dark:bg-lightblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline focus:placeholder:text-[#a11d33] outline-0 "
          />
        </div>
        <div className="relative md:flex-1 grow w-[40%]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-1">
            <MagnifyingGlassIcon className="w-10 h-10 p-2 text-darkblue" />
          </span>
          <input
            onChange={filterOnChange}
            className="w-full h-12 pl-12 py-2 pr-4 border border-none rounded-md shadow text-darkblue bg-secondary focus:outline-none focus:placeholder:text-[#a11d33] "
            placeholder={t('search')}
            type="text"
          />
        </div>
        <div className="md:flex-1 grow w-[40%]">
          <RadioSelectBar
            fontSize={fontSize}
            setFontSize={setFontSize}
            handleSliderChange={handleSliderChange}
            customClassName="rounded-md "
            selectBoxRounded={false}
          />
        </div>
        <div className="flex flex-col -order-2 md:order-1">
          {checked.map(({ task, done }, i) => (
            <CheckBox key={i} task={task} done={done} i={i} handleCheckBoxChange={handleCheckBoxChange} />
          ))}
        </div>
      </div>
    </div>
  );
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
