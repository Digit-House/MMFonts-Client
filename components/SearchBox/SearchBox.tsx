'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { SelectOptionType } from '@core/golobalTypes';
import { CheckBox, RadioSelectBar } from '..';

type SearchBoxType = {
  value: string;
  filterOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCheckBoxChange: (d: boolean, i: number) => void;
  checked: { task: string; done: boolean }[];
  setFontSize: React.Dispatch<React.SetStateAction<SelectOptionType>>;
  fontSize: SelectOptionType;
};

const SearchBox = ({
  value,
  handleChange,
  handleCheckBoxChange,
  checked,
  setFontSize,
  filterOnChange,
  fontSize,
}: SearchBoxType) => {
  let sliderTimeout: NodeJS.Timeout;

  const [isHovered, setIsHovered] = useState(false);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(sliderTimeout);
    setFontSize({ label: event.target.value, value: event.target.value });
  };

  return (
    <div className="p-4 border-2 rounded-md border-darkblue dark:border-white mx-14 md:mx-20 lg:mx-26 xl:mx-auto max-w-[794px]">
      <textarea
        name="postContent"
        rows={5}
        cols={100}
        value={value}
        onChange={handleChange}
        placeholder="လက်တည့်စမ်းရန်"
        className="peer min-h-[150px] md:min-h-[100px] h-auto w-full resize-none border-b-2 border-b-secondary dark:bg-lightblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline outline-0 "
      />
      <div className="items-stretch hidden h-auto py-2 md:flex gap-x-2">
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-1">
            <MagnifyingGlassIcon className="w-10 h-10 p-2 text-darkblue" />
          </span>
          <input
            onChange={filterOnChange}
            className="w-full h-12 pl-12 py-2 pr-4 border border-none rounded-full shadow text-darkblue bg-secondary focus:outline-none focus:placeholder:text-[#a11d33] "
            placeholder="ဖောင့်ရှာရန်"
            type="text"
          />
        </div>

        <RadioSelectBar
          fontSize={fontSize}
          setFontSize={setFontSize}
          handleSliderChange={handleSliderChange}
          isWidthFull
        />
        <div>
          {checked.map(({ task, done }, i) => (
            <CheckBox key={i} task={task} done={done} i={i} handleCheckBoxChange={handleCheckBoxChange} />
          ))}
        </div>
      </div>
      <form className="block md:hidden">
        <div className="flex flex-row items-center justify-between my-3">
          <div
            className={`flex w-12 cursor-pointer box hover:w-full transition-all duration-500   ${
              isHovered ? 'w-full' : ''
            }`}
            onMouseEnter={() => {
              setTimeout(() => {
                setIsHovered(!isHovered);
              }, 100);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setIsHovered(!isHovered);
              }, 1000);
            }}
          >
            <input
              type="text"
              className="box-border w-12 h-12 p-2 text-white border-2 rounded-full outline-none text-md searchInput dark:bg-lightblue bg-primary border-secondary hover:rounded-md hover:w-full "
              name="txt"
            />
            <MagnifyingGlassIcon className="absolute w-12 h-12 p-2 rounded-full shadow-md cursor-pointer icon bg-secondary text-darkblue" />
          </div>

          {
            <div className={`${!isHovered ? 'flex gap-2' : 'hidden'} flex-row`}>
              {checked.map(({ task, done }, i) => (
                <CheckBox key={i} task={task} done={done} i={i} handleCheckBoxChange={handleCheckBoxChange} />
              ))}
            </div>
          }
        </div>
        <RadioSelectBar fontSize={fontSize} setFontSize={setFontSize} handleSliderChange={handleSliderChange} />
      </form>
    </div>
  );
};

export default SearchBox;
