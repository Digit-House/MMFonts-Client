import { Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import filterSearch from '@core/filterSearch';
import { FontType, PremiumFontType } from '@core/golobalTypes';
import useCSVConvert from '@hooks/useCSVConvert';
import { CustomSelectBox } from '..';

const options = [
  { label: 'စာပိုဒ်', value: 'စာပိုဒ်' },
  { label: 'စာကြောင်း', value: 'စာကြောင်း' },
];

const parargraph =
  'အချက်အလက်များထည့်သွင်းနေဆဲဖြစ်ပါသဖြင့်အများအယွင်းများတွေ.ရှိပါကအကြောင်းကြားပေးရန်နှင့်ရန်နှင့် မူလဖန်တီးသူအနေနှင့်ထည့်သွင်းလိုပါကအသိပေးအကြောင်းကြားရန်ဆက်သွယ်ရန်Formမှတစ်ဆင့်ဖိတ်ခေါ်လိုပါသည်။ အခြားလိုအပ်ချက်များကိုလည်း အကြံပေးနိုင်ပါသည်။';
const sentence = 'အချက်အလက်များထည့်သွင်းနေဆဲဖြစ်ပါသဖြင့်အများအယွင်းများတွေ.ရှိပါကအကြောင်းကြားပေးရန်';

const TextGenerateComponent = () => {
  const { data } = useCSVConvert('/fonts/data/font.csv') as { data: PremiumFontType[] };
  const [filterFontNames, setFilterFontNames] = useState<FontType[]>([]);
  const [optionValue, setOptionValue] = useState(options[0]);
  const [open, setOpen] = useState<boolean>(false);
  const currentRoute = usePathname();
  const renderText = currentRoute === '/lorem' ? 'စာထုတ်ရန်' : 'ပြီးပြီ';
  const countInputRef = useRef<HTMLInputElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const [generatedText, setGeneratedText] = useState<JSX.Element[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (countInputRef.current) {
      countInputRef.current.value = '3';
    }
  }, []);

  const generateLoremIpsum = (device: 'mobile' | 'desktop') => {
    const value = countInputRef.current?.value;
    const numParagraphs = parseInt(value || '0', 10);
    if (isNaN(numParagraphs)) {
      return;
    }
    const paragraphs: JSX.Element[] = [];
    for (let i = 0; i < numParagraphs; i++) {
      const content = optionValue.value === 'စာပိုဒ်' ? parargraph : sentence;
      paragraphs.push(<p key={i}>{content}</p>);
    }
    setGeneratedText(paragraphs);
  };

  const onSelectFont = (font: FontType) => {
    if (paragraphRef.current) {
      (paragraphRef.current.style.fontFamily = `${font.fileName} , 'font-acre', sans-serif`),
        paragraphRef.current.setAttribute('src', font.fileName);
    }
    setOpen(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current && inputRef.current.value.length > 0) {
      console.log('typing');
      setOpen(true);
    } else setOpen(false);

    setFilterFontNames(filterSearch(event, data));
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-2 md:flex-nowrap ">
        <div className="relative flex-[1_0_100%] block mr-3 md:w-4/6 md:order-first md:flex-1">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-1">
              <MagnifyingGlassIcon className="w-10 h-10 p-2 text-darkblue" />
            </span>
            <input
              ref={inputRef}
              onChange={inputOnChange}
              className="w-full py-2 pl-12 pr-4 border border-none rounded-full shadow text-darkblue bg-secondary focus:outline-none focus:placeholder:text-[#a11d33]"
              placeholder="ဖောင့်ရှာရန်"
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
        <CustomSelectBox
          options={options}
          initialValue={optionValue}
          setInitialValue={setOptionValue}
          customClassName="flex-1 md:flex-none"
        />
        <input
          ref={countInputRef}
          type="number"
          className="flex flex-1 w-20 h-auto px-3 rounded-sm shadow bg-secondary text-darkblue md:flex-none focus:outline-none"
          min={1}
          max={10}
        />
        <div className="flex flex-1 md:justify-end md:flex-1">
          <button
            className="flex items-center justify-center w-full h-auto px-3 font-semibold rounded-sm shadow md:w-auto bg-secondary text-darkblue"
            onClick={() => generateLoremIpsum('desktop')}
          >
            {renderText}
          </button>
        </div>
      </div>
      <p
        className="w-auto py-6 mb-5 text-base font-semibold leading-loose tracking-wide text-left break-words selection:bg-[#b7b7a4]"
        ref={paragraphRef}
      >
        {generatedText.length > 0
          ? generatedText.map((paragraph, index) => <React.Fragment key={index}>{paragraph}</React.Fragment>)
          : parargraph}
      </p>
    </div>
  );
};

export default TextGenerateComponent;
