import { Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import filterSearch from '@core/filterSearch';
import { getFontsArray } from '@core/getFonts';
import { FontType } from '@core/golobalTypes';
import { CustomSelectBox } from '..';

const parargraph =
  'မြန်မာဘာသာစကားသည် မြန်မာနိုင်ငံ၏ ရုံးသုံး ဘာသာစကားဖြစ်သည်။ ဗမာလူမျိုးနှင့် ဗမာနွယ်ဝင်(ဓနု၊ အင်းသား၊ တောင်ရိုးနှင့် ယော)တို့၏ ဇာတိစကားဖြစ်သည်။ ဗမာလူမျိုးတို့သည် တိဘက်-ဗမာနွယ် ဘာသာစကားများ ပြောဆိုသည့် လူမျိုးနွယ်စုကြီးမှ အကြီးဆုံးသော လူမျိုးဖြစ်သည်။ လူဦးရေ ၃၈သန်းကျော်ခန့်သည် မြန်မာဘာသာစကားကို မိခင်ဘာသာစကား အနေဖြင့် သုံး၍ မြန်မာတိုင်းရင်သားများသည် ဒုတိယဘာသာစကား အနေဖြင့် သုံးသည်။ မြန်မာဘာသာစကားသည် တိဘက်-ဗမာနွယ် ဘာသာစကားများ အုပ်စုတွင် ပါဝင်သည်။ တိဘက်-ဗမာနွယ် ဘာသာစကားများ အုပ်စုသည် တရုတ်-တိဗက်နွယ် ဘာသာစကားများ မိသားစု ထဲတွင် ပါသည်။ မြန်မာဘာသာသည် တက်ကျသံရှိသော ၊ နိမ့်မြင့်အမှတ်အသားရှိ ဖြစ်သော၊ ဧကဝဏ္ဏစကားလုံး အလွန်များသော ဘာသာစကား ဖြစ်သည်။ ကတ္တား-ကံ-တြိယာ စကားလုံးအစီအစဉ်ဖြင့် ရေးသော သရုပ်ခွဲဘာသာစကား လည်းဖြစ်သည်။ မြန်မာအက္ခရာများသည် ဗြာဟ္မီအက္ခရာ မှ ဆင်းသက်လာသည်။';
const sentence = 'မြန်မာဘာသာစကားသည် တရုတ်-တိဗက်နွယ် ဘာသာစကား မိသားစု ၏ ဗမာနွယ်ဘာသာစကားများ  မှ တစ်ခုဖြစ်သည်';

const TextGenerateComponent = () => {
  const t = useTranslations('Index');
  const options = [
    { label: t('paragraph'), value: 'စာပိုဒ်' },
    { label: t('sentence'), value: 'စာကြောင်း' },
  ];

  const data = getFontsArray();

  const [filterFontNames, setFilterFontNames] = useState<FontType[]>([]);
  const [optionValue, setOptionValue] = useState(options[0]);
  const [open, setOpen] = useState<boolean>(false);
  const currentRoute = usePathname();
  const renderText = currentRoute === '/lorem' ? t('generate') : t('done');
  const countInputRef = useRef<HTMLInputElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const [generatedText, setGeneratedText] = useState<JSX.Element[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fontName, setFontName] = useState<string>('');

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
    setFontName(font.fileName);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current && inputRef.current.value.length > 0) {
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
              className="w-full py-2 pl-4 pr-4 border border-none rounded-full drop-shadow	 text-darkblue bg-secondary focus:outline-none focus:placeholder:text-[#a11d33]"
              placeholder={t('search')}
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
          shadow
        />
        <input
          ref={countInputRef}
          type="number"
          className="flex flex-1 w-20 h-auto px-3 rounded-md shadow bg-secondary text-darkblue md:flex-none focus:outline-none"
          min={1}
          max={10}
        />
        <div className="flex flex-1 md:justify-end md:flex-1">
          <button
            className="flex items-center justify-center w-full h-auto px-3 font-semibold rounded-md shadow md:w-auto bg-secondary text-darkblue"
            onClick={() => generateLoremIpsum('desktop')}
          >
            {renderText}
          </button>
        </div>
      </div>
      <div className="flex items-center h-12 py-1 ">
        {fontName.length > 0 && <p className="text-xl font-semibold tracking-wide">{fontName}</p>}
      </div>
      <p className="w-auto py-3 text-base leading-loose tracking-wide text-left break-words " ref={paragraphRef}>
        {generatedText.length > 0
          ? generatedText.map((paragraph, index) => (
              <p key={index} className="mb-2">
                {paragraph}
              </p>
            ))
          : parargraph}
      </p>
    </div>
  );
};

export default TextGenerateComponent;
