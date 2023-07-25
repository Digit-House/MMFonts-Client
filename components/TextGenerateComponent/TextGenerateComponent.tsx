import { Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { classNames } from '@core/classnames';
import { detectLanguage } from '@core/filterSearch';
import { getFontsArray } from '@core/getFonts';
import { FontType } from '@core/golobalTypes';

// const parargraph =
//   'မြန်မာဘာသာစကားသည် မြန်မာနိုင်ငံ၏ ရုံးသုံး ဘာသာစကားဖြစ်သည်။ ဗမာလူမျိုးနှင့် ဗမာနွယ်ဝင်(ဓနု၊ အင်းသား၊ တောင်ရိုးနှင့် ယော)တို့၏ ဇာတိစကားဖြစ်သည်။ ဗမာလူမျိုးတို့သည် တိဘက်-ဗမာနွယ် ဘာသာစကားများ ပြောဆိုသည့် လူမျိုးနွယ်စုကြီးမှ အကြီးဆုံးသော လူမျိုးဖြစ်သည်။ လူဦးရေ ၃၈သန်းကျော်ခန့်သည် မြန်မာဘာသာစကားကို မိခင်ဘာသာစကား အနေဖြင့် သုံး၍ မြန်မာတိုင်းရင်သားများသည် ဒုတိယဘာသာစကား အနေဖြင့် သုံးသည်။ မြန်မာဘာသာစကားသည် တိဘက်-ဗမာနွယ် ဘာသာစကားများ အုပ်စုတွင် ပါဝင်သည်။ တိဘက်-ဗမာနွယ် ဘာသာစကားများ အုပ်စုသည် တရုတ်-တိဗက်နွယ် ဘာသာစကားများ မိသားစု ထဲတွင် ပါသည်။ မြန်မာဘာသာသည် တက်ကျသံရှိသော ၊ နိမ့်မြင့်အမှတ်အသားရှိ ဖြစ်သော၊ ဧကဝဏ္ဏစကားလုံး အလွန်များသော ဘာသာစကား ဖြစ်သည်။ ကတ္တား-ကံ-တြိယာ စကားလုံးအစီအစဉ်ဖြင့် ရေးသော သရုပ်ခွဲဘာသာစကား လည်းဖြစ်သည်။ မြန်မာအက္ခရာများသည် ဗြာဟ္မီအက္ခရာ မှ ဆင်းသက်လာသည်။';
// const sentence = 'မြန်မာဘာသာစကားသည် တရုတ်-တိဗက်နွယ် ဘာသာစကား မိသားစု ၏ ဗမာနွယ်ဘာသာစကားများ  မှ တစ်ခုဖြစ်သည်';
// const zawgyi_paragraph =
//   'ျမန္မာဘာသာစကားသည္ ျမန္မာႏိုင္ငံ၏ ႐ုံးသုံး ဘာသာစကားျဖစ္သည္။ ဗမာလူမ်ိဳးႏွင့္ ဗမာႏြယ္ဝင္(ဓႏု၊ အင္းသား၊ ေတာင္႐ိုးႏွင့္ ေယာ)တို႔၏ ဇာတိစကားျဖစ္သည္။ ဗမာလူမ်ိဳးတို႔သည္ တိဘက္-ဗမာႏြယ္ ဘာသာစကားမ်ား ေျပာဆိုသည့္ လူမ်ိဳးႏြယ္စုႀကီးမွ အႀကီးဆုံးေသာ လူမ်ိဳးျဖစ္သည္။ လူဦးေရ ၃၈သန္းေက်ာ္ခန႔္သည္ ျမန္မာဘာသာစကားကို မိခင္ဘာသာစကား အေနျဖင့္ သုံး၍ ျမန္မာတိုင္းရင္သားမ်ားသည္ ဒုတိယဘာသာစကား အေနျဖင့္ သုံးသည္။ ျမန္မာဘာသာစကားသည္ တိဘက္-ဗမာႏြယ္ ဘာသာစကားမ်ား အုပ္စုတြင္ ပါဝင္သည္။ တိဘက္-ဗမာႏြယ္ ဘာသာစကားမ်ား အုပ္စုသည္ တ႐ုတ္-တိဗက္ႏြယ္ ဘာသာစကားမ်ား မိသားစု ထဲတြင္ ပါသည္။ ျမန္မာဘာသာသည္ တက္က်သံရွိေသာ ၊ နိမ့္ျမင့္အမွတ္အသားရွိ ျဖစ္ေသာ၊ ဧကဝဏၰစကားလုံး အလြန္မ်ားေသာ ဘာသာစကား ျဖစ္သည္။ ကတၱား-ကံ-ႀတိယာ စကားလုံးအစီအစဥ္ျဖင့္ ေရးေသာ သ႐ုပ္ခြဲဘာသာစကား လည္းျဖစ္သည္။ ျမန္မာအကၡရာမ်ားသည္ ျဗာဟၼီအကၡရာ မွ ဆင္းသက္လာသည္။';
// const zawgyi_sentence = 'ျမန္မာဘာသာစကားသည္ တ႐ုတ္-တိဗက္ႏြယ္ ဘာသာစကား မိသားစု ၏ ဗမာႏြယ္ဘာသာစကားမ်ား  မွ တစ္ခုျဖစ္သည္';
// const win_paragraph =
//   'jrefrmbmompum;onf jrefrmEdkifiH ½kH;okH; bmompum;jzpfonf/ ArmvlrsdK;ESihf ArmEG,fêif("Ek? tif;om;? awmif½dk;ESihf a,m)wdkY Zmwdpum;jzpfonf/ ArmvlrsdK;wdkYonf wdbuf-ArmEG,f bmompum;rsm; ajymqdkonhf vlrsdK;EG,fpkBuD;rS tBuD;qkH;aom vlrsdK;jzpfonf/ vlè;a& 38oef;ausmfceYfonf jrefrmbmompum;udk rdcifbmompum; taejzihf okH;í jrefrmwdkif;&ifom;rsm;onf \'kwd,bmompum; taejzihf okH;onf/ jrefrmbmompum;onf wdbuf-ArmEG,f bmompum;rsm; tkyfpkwGif ygêifonf/ wdbuf-ArmEG,f bmompum;rsm; tkyfpkonf w½kwf-wdAufEG,f bmompum;rsm; rdom;pk xJwGif ygonf/ jrefrmbmomonf wufusoH&Sdaom ? edrhfjrihftrSwftom;&Sd jzpfaom? {uêPÖpum;vkH; tvGefrsm;aom bmompum; jzpfonf/ uwåm;-uH-Bwd,m pum;vkH;tpDtpOfjzihf a&;aom o½kyfcGJbmompum; vnf;jzpfonf/ jrefrmtu©&mrsm;onf jAm[®Dtu©&m rS qif;oufvmonf/';
// const win_sentence = 'jrefrmbmompum;onf w½kwf-wdAufEG,f bmompum; rdom;pk  ArmEG,fbmompum;rsm;  rS wpfckjzpfonf';

const paragraph = {
  unicode:
    'မြန်မာဘာသာစကားသည် မြန်မာနိုင်ငံ၏ ရုံးသုံး ဘာသာစကားဖြစ်သည်။ ဗမာလူမျိုးနှင့် ဗမာနွယ်ဝင်(ဓနု၊ အင်းသား၊ တောင်ရိုးနှင့် ယော)တို့၏ ဇာတိစကားဖြစ်သည်။ ဗမာလူမျိုးတို့သည် တိဘက်-ဗမာနွယ် ဘာသာစကားများ ပြောဆိုသည့် လူမျိုးနွယ်စုကြီးမှ အကြီးဆုံးသော လူမျိုးဖြစ်သည်။ လူဦးရေ ၃၈သန်းကျော်ခန့်သည် မြန်မာဘာသာစကားကို မိခင်ဘာသာစကား အနေဖြင့် သုံး၍ မြန်မာတိုင်းရင်သားများသည် ဒုတိယဘာသာစကား အနေဖြင့် သုံးသည်။ မြန်မာဘာသာစကားသည် တိဘက်-ဗမာနွယ် ဘာသာစကားများ အုပ်စုတွင် ပါဝင်သည်။ တိဘက်-ဗမာနွယ် ဘာသာစကားများ အုပ်စုသည် တရုတ်-တိဗက်နွယ် ဘာသာစကားများ မိသားစု ထဲတွင် ပါသည်။ မြန်မာဘာသာသည် တက်ကျသံရှိသော ၊ နိမ့်မြင့်အမှတ်အသားရှိ ဖြစ်သော၊ ဧကဝဏ္ဏစကားလုံး အလွန်များသော ဘာသာစကား ဖြစ်သည်။ ကတ္တား-ကံ-တြိယာ စကားလုံးအစီအစဉ်ဖြင့် ရေးသော သရုပ်ခွဲဘာသာစကား လည်းဖြစ်သည်။ မြန်မာအက္ခရာများသည် ဗြာဟ္မီအက္ခရာ မှ ဆင်းသက်လာသည်။',
  zawgyi:
    'ျမန္မာဘာသာစကားသည္ ျမန္မာႏိုင္ငံ၏ ႐ုံးသုံး ဘာသာစကားျဖစ္သည္။ ဗမာလူမ်ိဳးႏွင့္ ဗမာႏြယ္ဝင္(ဓႏု၊ အင္းသား၊ ေတာင္႐ိုးႏွင့္ ေယာ)တို႔၏ ဇာတိစကားျဖစ္သည္။ ဗမာလူမ်ိဳးတို႔သည္ တိဘက္-ဗမာႏြယ္ ဘာသာစကားမ်ား ေျပာဆိုသည့္ လူမ်ိဳးႏြယ္စုႀကီးမွ အႀကီးဆုံးေသာ လူမ်ိဳးျဖစ္သည္။ လူဦးေရ ၃၈သန္းေက်ာ္ခန႔္သည္ ျမန္မာဘာသာစကားကို မိခင္ဘာသာစကား အေနျဖင့္ သုံး၍ ျမန္မာတိုင္းရင္သားမ်ားသည္ ဒုတိယဘာသာစကား အေနျဖင့္ သုံးသည္။ ျမန္မာဘာသာစကားသည္ တိဘက္-ဗမာႏြယ္ ဘာသာစကားမ်ား အုပ္စုတြင္ ပါဝင္သည္။ တိဘက္-ဗမာႏြယ္ ဘာသာစကားမ်ား အုပ္စုသည္ တ႐ုတ္-တိဗက္ႏြယ္ ဘာသာစကားမ်ား မိသားစု ထဲတြင္ ပါသည္။ ျမန္မာဘာသာသည္ တက္က်သံရွိေသာ ၊ နိမ့္ျမင့္အမွတ္အသားရွိ ျဖစ္ေသာ၊ ဧကဝဏၰစကားလုံး အလြန္မ်ားေသာ ဘာသာစကား ျဖစ္သည္။ ကတၱား-ကံ-ႀတိယာ စကားလုံးအစီအစဥ္ျဖင့္ ေရးေသာ သ႐ုပ္ခြဲဘာသာစကား လည္းျဖစ္သည္။ ျမန္မာအကၡရာမ်ားသည္ ျဗာဟၼီအကၡရာ မွ ဆင္းသက္လာသည္။',
  win: 'jrefrmbmompum;onf jrefrmEdkifiH ½kH;okH; bmompum;jzpfonf/ ArmvlrsdK;ESihf ArmEG,fêif("Ek? tif;om;? awmif½dk;ESihf a,m)wdkY Zmwdpum;jzpfonf/ ArmvlrsdK;wdkYonf wdbuf-ArmEG,f bmompum;rsm; ajymqdkonhf vlrsdK;EG,fpkBuD;rS tBuD;qkH;aom vlrsdK;jzpfonf/ vlè;a& 38oef;ausmfceYfonf jrefrmbmompum;udk rdcifbmompum; taejzihf okH;í jrefrmwdkif;&ifom;rsm;onf \'kwd,bmompum; taejzihf okH;onf/ jrefrmbmompum;onf wdbuf-ArmEG,f bmompum;rsm; tkyfpkwGif ygêifonf/ wdbuf-ArmEG,f bmompum;rsm; tkyfpkonf w½kwf-wdAufEG,f bmompum;rsm; rdom;pk xJwGif ygonf/ jrefrmbmomonf wufusoH&Sdaom ? edrhfjrihftrSwftom;&Sd jzpfaom? {uêPÖpum;vkH; tvGefrsm;aom bmompum; jzpfonf/ uwåm;-uH-Bwd,m pum;vkH;tpDtpOfjzihf a&;aom o½kyfcGJbmompum; vnf;jzpfonf/ jrefrmtu©&mrsm;onf jAm[®Dtu©&m rS qif;oufvmonf/',
};

const sentence = {
  unicode: 'မြန်မာဘာသာစကားသည် တရုတ်-တိဗက်နွယ် ဘာသာစကား မိသားစု ၏ ဗမာနွယ်ဘာသာစကားများ  မှ တစ်ခုဖြစ်သည်',
  zawgyi: 'ျမန္မာဘာသာစကားသည္ တ႐ုတ္-တိဗက္ႏြယ္ ဘာသာစကား မိသားစု ၏ ဗမာႏြယ္ဘာသာစကားမ်ား  မွ တစ္ခုျဖစ္သည္',
  win: 'jrefrmbmompum;onf w½kwf-wdAufEG,f bmompum; rdom;pk  ArmEG,fbmompum;rsm;  rS wpfckjzpfonf',
};

const TextGenerateComponent = () => {
  const t = useTranslations('Index');
  const data = getFontsArray();
  const [filterFontNames, setFilterFontNames] = useState<FontType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [generatedText, setGeneratedText] = useState<JSX.Element[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSentence, setIsSentence] = useState<boolean>(false);
  const [countInput, setCountInput] = useState<number>(5);
  const [selectedFont, setSelectedFont] = useState<FontType>();

  useEffect(() => {
    generateLoremIpsum();
  }, [isSentence, countInput, selectedFont]);

  const generateLoremIpsum = () => {
    const paragraphs: JSX.Element[] = [];
    for (let i = 0; i < countInput; i++) {
      const fontType =
        selectedFont?.fontSupportType == 'win'
          ? 'win'
          : selectedFont?.fontSupportType === 'zawgyi'
          ? 'zawgyi'
          : 'unicode';

      const content = isSentence ? sentence[fontType] : paragraph[fontType];

      paragraphs.push(<p key={i}>{content}</p>);
    }
    setGeneratedText(paragraphs);
  };

  const onSelectFont = (font: FontType) => {
    setSelectedFont(font);
    setOpen(false);
    if (inputRef.current) {
      inputRef.current.value = font.fileName;
    }
  };

  function filterSearch(value: string, d: FontType[]) {
    const language = detectLanguage(value);
    const filterData = d.filter((font) => {
      const fontName = language === 'english' ? font.nameEn.toLowerCase() : font.name;
      const formattedName = fontName.replace(/\s/g, '');
      const formattedInput = value.toLowerCase().replace(/\s/g, '');
      return formattedName.includes(formattedInput);
    });
    return filterData;
  }

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current && inputRef.current.value.length > 0) {
      setOpen(true);
    } else setOpen(false);
    setFilterFontNames(filterSearch(event.target.value, data));
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-2 md:flex-nowrap md:justify-between">
        <div className="relative flex-[1_0_100%] block md:w-[30%] md:order-first md:flex-none">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-1">
              <MagnifyingGlassIcon className="w-10 h-10 p-2 text-darkblue" />
            </span>
            <input
              value={inputRef.current?.value ?? ''}
              ref={inputRef}
              onChange={inputOnChange}
              className="w-full h-12 pl-12 py-2 pr-4 border border-none rounded-full shadow text-darkblue bg-secondary focus:outline-none focus:placeholder:text-[#a11d33] "
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
        <div className="flex flex-1 h-12 md:flex-none gap-x-4">
          <div className="flex items-center px-2 rounded-md shadow bg-secondary gap-x-2">
            <p className={`${!isSentence ? 'text-[#808080]' : 'text-darkblue'}`}>{t('sentence')}</p>
            <label htmlFor="toggleBar" className="flex items-center cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggleBar"
                  className="sr-only"
                  checked={isSentence}
                  onChange={(event) => setIsSentence(event.target.checked)}
                />
                <div className="block h-8 rounded-full box bg-primary dark:bg-lightblue w-14"></div>
                <div
                  className={classNames(
                    isSentence ? 'left-1 top-1' : 'right-1 top-1',
                    'absolute flex items-center justify-center w-6 h-6 transition bg-secondary rounded-full dot '
                  )}
                ></div>
              </div>
            </label>
            <p className={`${isSentence ? 'text-[#808080]' : 'text-darkblue'}`}>{t('paragraph')}</p>
          </div>
          <input
            value={countInput}
            onChange={(event) => {
              const inputValue = parseInt(event.target.value, 10);
              setCountInput(inputValue);
            }}
            type="number"
            className="flex flex-1 w-20 h-auto px-3 rounded-md shadow bg-secondary text-darkblue md:flex-none focus:outline-none"
            min={1}
            max={10}
          />
        </div>
      </div>
      <p
        className={classNames(
          selectedFont?.fontSupportType == 'win' ? 'text-xl' : 'text-lg',
          'w-auto py-3  leading-loose tracking-wide text-left break-words '
        )}
        style={{
          fontFamily: `${selectedFont?.fileName}`,
        }}
      >
        {generatedText.length > 0
          ? generatedText.map((para, index) => (
              <p key={index} className="mb-2">
                {para}
              </p>
            ))
          : paragraph.unicode}
      </p>
    </div>
  );
};

export default TextGenerateComponent;
