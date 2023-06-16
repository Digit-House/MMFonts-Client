import { Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FontType, PremiumFontType } from '@core/golobalTypes';
import useCSVConvert from '@hooks/useCSVConvert';
import { CustomSelectBox } from '..';

const options = [
  { label: 'စာပိုဒ်', value: 'စာပိုဒ်' },
  { label: 'စာကြောင်း', value: 'စာကြောင်း' },
];

const parargraph =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const sentence = 'Hello Kaung Htet Naing';

const TextGenerateComponent = () => {
  const { data } = useCSVConvert('/fonts/data/font.csv') as { data: PremiumFontType[] };
  const [filterFontNames, setfilterFontNames] = useState<FontType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [optionValue, setOptionValue] = useState(options[0]);
  const [open, setOpen] = useState<boolean>(false);
  const currentRoute = usePathname();
  const renderText = currentRoute === '/lorem' ? 'စာထုတ်ရန်' : 'ပြီးပြီ';
  const countInputRef = useRef<HTMLInputElement | null>(null);
  const countMobileInputRef = useRef<HTMLInputElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const [generatedText, setGeneratedText] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (countInputRef.current && countMobileInputRef.current) {
      countInputRef.current.value = '3';
      countMobileInputRef.current.value = '3';
    }
  }, []);

  const inputDetect = (device: string) => {
    let value: string | undefined;
    if (device === 'mobile') {
      value = countMobileInputRef.current?.value;
    } else {
      value = countInputRef.current?.value;
    }
    return value;
  };

  const generateLoremIpsum = (device: string) => {
    const value = inputDetect(device);
    const numParagraphs = parseInt(value || '0', 10);
    if (isNaN(numParagraphs)) {
      return;
    }
    const paragraphs: JSX.Element[] = [];
    for (let i = 0; i < numParagraphs; i++) {
      if (optionValue.value === 'စာပိုဒ်') {
        paragraphs.push(<p key={i}>{parargraph}</p>);
      } else {
        paragraphs.push(<p key={i}>{sentence}</p>);
      }
    }
    setGeneratedText(paragraphs);
  };

  const onSelectFont = (font: FontType) => {
    if (paragraphRef.current) {
      (paragraphRef.current.style.fontFamily = `${font.fileName} , 'font-acre', sans-serif`),
        paragraphRef.current.setAttribute('src', font.fileName);
    }
    setOpen(false);
    setInputValue('');
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      filterSearch();
      setOpen(true);
    }
  }, [inputValue]);

  const filterSearch = () => {
    const filterData = data.filter((font) => {
      const formattedName = font.nameEn.toLowerCase().replace(/\s/g, '');
      const formattedInput = inputValue.toLowerCase().replace(/\s/g, '');
      return formattedName.includes(formattedInput);
    });
    setfilterFontNames(filterData);
  };

  return (
    <div>
      <div className="flex-row justify-between hidden md:flex">
        <div className="flex flex-row w-4/6">
          <div className="relative block w-4/6 mr-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-1">
                <MagnifyingGlassIcon className="w-10 h-10 p-2 text-darkblue" />
              </span>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full py-2 pl-12 pr-4 border border-none rounded-full shadow text-darkblue bg-secondary focus:outline-none "
                placeholder="ရှာရန်"
                type="text"
              />
            </div>
            {filterFontNames.length > 0 && (
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute z-10 w-full p-2 py-1 mt-1 overflow-auto text-base border-2 rounded-md shadow-lg max-h-60 border-secondary focus:outline-none sm:text-sm dark:bg-lightblue bg-primary">
                  <ul className="divide-y divide-secondary/50">
                    {filterFontNames.map((font, i) => (
                      <li
                        key={i}
                        className="block py-2 pl-3 truncate select-none hover:bg-darkblue hover:text-primary hover:font-normal pr-9"
                        onClick={() => onSelectFont(font)}
                      >
                        {`${font.name}  ( ${font.nameEn} )`}
                      </li>
                    ))}
                  </ul>
                </div>
              </Transition>
            )}
          </div>
          <CustomSelectBox options={options} initialValue={optionValue} setInitialValue={setOptionValue} />
          <input
            ref={countInputRef}
            type="number"
            className="flex w-auto h-auto px-3 ml-3 rounded-sm shadow bg-secondary text-darkblue"
            min={1}
            max={10}
          />
        </div>
        <button
          className="flex items-center justify-center w-auto h-auto px-3 font-semibold rounded-sm shadow bg-secondary text-darkblue"
          onClick={() => generateLoremIpsum('Destop')}
        >
          {renderText}
        </button>
      </div>
      <div className="flex flex-col flex-1 w-full md:hidden ">
        <div className="flex flex-row justify-between mb-2">
          <label className="relative block w-4/6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-1">
              <MagnifyingGlassIcon className="w-10 h-10 p-2 text-darkblue" />
            </span>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border rounded-full shadow bg-secondary border-secondary focus:outline-none"
              placeholder="ရှာရန်"
              type="text"
            />
            {filterFontNames.length > 0 && (
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute z-10 w-full p-2 py-1 mt-1 overflow-auto text-base border-2 rounded-md shadow-lg max-h-60 border-secondary focus:outline-none sm:text-sm dark:bg-lightblue bg-primary ">
                  <ul className="divide-y divide-secondary/50">
                    {filterFontNames.map((font, i) => (
                      <li
                        key={i}
                        className="block py-2 pl-3 truncate select-none hover:bg-darkblue hover:text-primary hover:font-normal pr-9"
                        onClick={() => onSelectFont(font)}
                      >
                        {font.nameEn}
                      </li>
                    ))}
                  </ul>
                </div>
              </Transition>
            )}
          </label>
          <button
            className="flex items-center justify-center w-auto h-auto px-3 font-semibold rounded-sm shadow bg-secondary text-darkblue"
            onClick={() => generateLoremIpsum('mobile')}
          >
            {renderText}
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <CustomSelectBox options={options} initialValue={optionValue} setInitialValue={setOptionValue} />
          <input
            ref={countMobileInputRef}
            type="number"
            className="flex items-center justify-center w-auto h-auto px-3 rounded-sm shadow bg-secondary text-darkblue"
            min={1}
            max={10}
          />
        </div>
      </div>
      <p className="py-6 mb-5 text-base font-semibold leading-loose tracking-wide text-left " ref={paragraphRef}>
        {generatedText.length > 0
          ? generatedText.map((paragraph, index) => <React.Fragment key={index}>{paragraph}</React.Fragment>)
          : parargraph}
      </p>
    </div>
  );
};

export default TextGenerateComponent;
