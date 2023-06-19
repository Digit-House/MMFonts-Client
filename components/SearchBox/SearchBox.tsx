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

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className="p-4 border-2 rounded-md border-darkblue dark:border-white mx-14 md:mx-20 lg:mx-26 xl:mx-auto max-w-[794px]">
      <div>
        <textarea
          name="postContent"
          rows={5}
          cols={100}
          value={value}
          onChange={handleChange}
          placeholder="လက်တည့်စမ်းရန်"
          className="peer min-h-[150px] md:min-h-[100px] h-auto w-full resize-none border-b-2 border-b-secondary dark:bg-lightblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline outline-0 "
        />
      </div>
      <div className="items-center hidden py-2 justify-evenly md:flex">
        <div
          className={`flex w-12 cursor-pointer box hover:w-full transition-all duration-500  ${
            isHovered ? 'w-full' : ''
          }`}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <input
            onChange={filterOnChange}
            type="text"
            className="box-border w-12 h-12 p-2 pl-4 text-white border-2 rounded-full outline-none text-md searchInput border-secondary hover:rounded-md dark:bg-lightblue bg-primary hover:w-full "
            name="txt"
          />
          <MagnifyingGlassIcon className="absolute w-12 h-12 p-2 rounded-full shadow-md cursor-pointer icon bg-secondary text-darkblue" />
        </div>
        <div className="flex flex-row justify-between w-full m-auto">
          <RadioSelectBar
            fontSize={fontSize}
            setFontSize={setFontSize}
            handleSliderChange={handleSliderChange}
            isHovered={isHovered}
            customClassName="ml-2 mr-2"
            isWidthFull={true}
          />

          <div className="flex flex-row items-center mx-2 mr-auto">
            {checked.map(({ task, done }, i) => (
              <CheckBox key={i} task={task} done={done} i={i} handleCheckBoxChange={handleCheckBoxChange} />
            ))}
          </div>
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
            <div className={`${!isHovered ? 'flex ' : 'hidden'} flex-row`}>
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
