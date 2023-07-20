'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FontListCard, FramerMotionWrapper, RivLoading, SearchBox } from '@components/index';
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
    { task: t('zaw-gyi'), done: false, value: 'zawgyi' },
    { task: t('unicode'), done: false, value: 'unicode' },
  ]);
  const router = useRouter();
  const pathname = usePathname();
  const prevFontLists = useRef<FontType[]>([]);

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
    const filterData: FontType[] = [];
    const [firstChecked, secondChecked] = checkedClone;
    if (!firstChecked.done && secondChecked.done) {
      filterData.push(...fontList.filter((font) => font.fontSupportType === secondChecked.value));
    } else if (firstChecked.done && !secondChecked.done) {
      filterData.push(...fontList.filter((font) => font.fontSupportType === firstChecked.value));
    } else {
      prevFontLists.current.length > 0 ? filterData.push(...prevFontLists.current) : filterData.push(...data);
    }
    setFontList(filterData);
  };

  useEffect(() => {
    if (fontList.length === 0) setFontList(data);
    if (copyFontList.length === 0) setCopyFontList(data.slice(0, 8));
  }, [data]);

  useEffect(() => {
    setCopyFontList(fontList.slice(0, 8));
  }, [fontList]);

  const onClickFont = (name: string) => {
    router.push(`/fonts/${name}`);
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setFontList(filterSearch(event, data));
    prevFontLists.current = filterSearch(event, data);
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
            handleCheckBoxChange={handleCheckBoxChange}
            checked={checked}
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
              <div className="items-center hidden gap-2 cursor-pointer sm:flex">
                <div className="relative w-8 h-8" onClick={() => setIsToggled(true)}>
                  <Image
                    alt="rows"
                    src={RowsIcon}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="relative w-8 h-8" onClick={() => setIsToggled(false)}>
                  <Image
                    alt="columns"
                    src={RowsIcon}
                    fill
                    className="transform rotate-90"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
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
