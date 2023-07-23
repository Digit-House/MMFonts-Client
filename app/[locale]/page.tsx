'use client';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckBox, FontListCard, FramerMotionWrapper, RivLoading, SearchBox } from '@components/index';
import { classNames } from '@core/classnames';
import filterSearch from '@core/filterSearch';
import { getFontsArray } from '@core/getFonts';
import { FontType, SelectOptionType } from '@core/golobalTypes';
import NumberConverter from '@core/NumberConverter';
import RowsIcon from '/public/icons8-columns.png';

export default function Home() {
  const data = getFontsArray();
  const t = useTranslations('Index');
  const [fontList, setFontList] = useState<FontType[]>([]);
  const [copyFontList, setCopyFontList] = useState<FontType[]>([]);
  const [value, setValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [fontSize, setFontSize] = useState<SelectOptionType>({
    label: '24',
    value: '24',
  });
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(1);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [isSearchBoxScrolled, setIsSearchBoxScrolled] = useState<boolean>(false);
  const [checked, setChecked] = useState<{ task: string; done: boolean; value: string }[]>([
    { task: t('zaw-gyi'), done: true, value: 'zawgyi' },
    { task: t('unicode'), done: true, value: 'unicode' },
    { task: t('win'), done: true, value: 'win' },
  ]);
  const router = useRouter();
  const pathname = usePathname();
  const prevFontLists = useRef<FontType[]>([]);
  const [openSelectFontTypes, setOpenSelectFontTypes] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight > scrollHeight - 50 && fontList.length !== copyFontList.length) {
      setOffset((prev) => prev + 1);
      const remainingData = fontList.slice(copyFontList.length, copyFontList.length + 8);
      setCopyFontList((prevFontList) => [...prevFontList, ...remainingData]);
    }
  }, [copyFontList, fontList]);

  const handleSearchBoxScroll = useCallback(() => {
    const searchBoxElement = searchBoxRef.current;
    if (searchBoxElement && searchBoxElement.getBoundingClientRect().bottom <= 0) {
      setIsSearchBoxScrolled(true);
    } else setIsSearchBoxScrolled(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleSearchBoxScroll);

    return () => {
      window.removeEventListener('scroll', handleSearchBoxScroll);
    };
  }, [handleSearchBoxScroll]);

  const handleCheckBoxChange = (done: boolean, i: number) => {
    const tmp = checked[i];
    tmp.done = !done;
    const checkedClone = [...checked];
    checkedClone[i] = tmp;
    setChecked([...checkedClone]);
    const filterData = filterSearch(searchValue, data, checkedClone, prevFontLists.current);
    setFontList(filterData);
  };

  useEffect(() => {
    if (fontList.length === 0) setFontList(data);
    if (copyFontList.length === 0) setCopyFontList(data.slice(0, 8));
  }, []);

  useEffect(() => {
    setCopyFontList(fontList.slice(0, 8));
  }, [fontList]);

  const onClickFont = (name: string) => {
    router.push(`/fonts/${name}`);
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setFontList(filterSearch(event.target.value, data, checked, prevFontLists.current));
    prevFontLists.current = filterSearch(event.target.value, data, checked, prevFontLists.current);
  };

  if (data.length === 0) return <RivLoading />;

  return (
    <main className="flex-grow h-full mt-5 ">
      <FramerMotionWrapper>
        <div className="w-full bg-primary dark:bg-lightblue" ref={searchBoxRef}>
          <SearchBox
            isSearchBoxScrolled={isSearchBoxScrolled}
            filterOnChange={inputOnChange}
            value={value}
            searchValue={searchValue}
            handleChange={handleChange}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </div>
        <div className="md:min-h-[1000px] min-h-[800px]">
          <div className="lg:w-[996px] max-w-[996px] sm:mx-10 md:mx-24 lg:mx-auto lg:mt-10 mx-5 ">
            <div className="flex flex-row items-center mt-10 ">
              <p className="flex-1 mt-1 text-sm font-medium text-md text-secondaryText dark:text-darkSecondaryText">
                {pathname && pathname.includes('en')
                  ? ` ${fontList.length} of ${data.length} fonts`
                  : `ဖောင့် ${NumberConverter(data.length)} မှ ${NumberConverter(fontList.length)}`}
              </p>
              <div className="flex h-6 gap-x-4">
                <div className="relative select-none ">
                  <div
                    className="items-center h-full bg-transparent border rounded-full cursor-pointer "
                    onClick={() => setOpenSelectFontTypes((prev) => !prev)}
                  >
                    <div className="flex flex-row items-center h-full px-4 gap-x-1">
                      <p className="text-xs text-secondaryText dark:text-darkSecondaryText">{t('font-types')}</p>
                      <ChevronUpIcon className={classNames(openSelectFontTypes && 'transform rotate-180', 'w-4')} />
                    </div>
                  </div>
                  {openSelectFontTypes && (
                    <div className="z-10 p-2 mt-1 border rounded-md shadow bg-primary dark:bg-lightblue">
                      {checked.map(({ task, done }, i) => (
                        <CheckBox key={i} task={task} done={done} i={i} handleCheckBoxChange={handleCheckBoxChange} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="hidden sm:flex">
                  <div className="relative w-8 h-full cursor-pointer" onClick={() => setIsToggled(true)}>
                    <Image
                      alt="rows"
                      src={RowsIcon}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                      quality={50}
                    />
                  </div>
                  <div className="relative w-8 h-full cursor-pointer" onClick={() => setIsToggled(false)}>
                    <Image
                      alt="columns"
                      src={RowsIcon}
                      fill
                      className="transform rotate-90"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                      quality={50}
                    />
                  </div>
                </div>
              </div>
            </div>
            {fontList.length == 0 && (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-2xl font-semibold tracking-widest">{t('not-found-fontlist')}</p>
              </div>
            )}
            <div className={`${isToggled ? 'grid-cols-1' : 'sm:grid-cols-2'}  grid gap-4 mt-3 w-full `}>
              {copyFontList.map((font: FontType, i) => (
                <FontListCard
                  key={i}
                  id={i + 1}
                  onClick={() => onClickFont(font.nameEn)}
                  font={font}
                  typeText={value}
                  fontSize={parseInt(fontSize.value)}
                  offset={offset}
                />
              ))}
            </div>
          </div>
        </div>
      </FramerMotionWrapper>
    </main>
  );
}
