'use client';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CheckBox, FontListCard, FramerMotionWrapper, RivLoading, SearchBox } from '@components/index';
import { classNames } from '@core/classnames';
import filterSearch from '@core/filterSearch';
import { fbEvent } from '@core/fpixel';
import { getFontsArray } from '@core/getFonts';
import { FontType, SelectOptionType } from '@core/golobalTypes';
import NumberConverter from '@core/NumberConverter';
import RowsIcon from '/public/icons8-columns.png';
import useDebounce from '@hooks/useDebounce';

const INPUT_TEXT_PARAMS = 'inputText';
const SEARCH_FONT_PARAMS = 'searchFont';

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
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [isSearchBoxScrolled, setIsSearchBoxScrolled] = useState<boolean>(false);
  const [checked, setChecked] = useState<{ task: string; done: boolean; value: string }[]>([
    { task: t('zaw-gyi'), done: true, value: 'zawgyi' },
    { task: t('unicode'), done: true, value: 'unicode' },
    { task: t('win'), done: true, value: 'win' },
  ]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [openSelectFontTypes, setOpenSelectFontTypes] = useState<boolean>(false);

  const debounceInputValue = useDebounce(value);
  const debounceSearchValue = useDebounce(searchValue);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debounceInputValue.length > 0) params.set(INPUT_TEXT_PARAMS, debounceInputValue.substring(0, 20));
    if (debounceSearchValue.length > 0) params.set(SEARCH_FONT_PARAMS, debounceSearchValue.substring(0, 10));
    router.replace(`${pathname}?${params}`);
  }, [debounceInputValue, debounceSearchValue]);

  useEffect(() => {
    if (searchParams?.get('inputText')) {
      setValue(searchParams?.get('inputText') as string);
    }

    if (searchParams?.get('searchFont')) {
      setSearchValue(searchParams?.get('searchFont') as string);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight > scrollHeight - 50 && fontList.length !== copyFontList.length) {
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
    const searchKeyword = event.target.value;
    setValue(searchKeyword);
    fbEvent('Search', { search_string: searchKeyword });
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
    const filterData = filterSearch(searchValue, data, checkedClone);
    setFontList(filterData);
    fbEvent('Search', { search_font_type: checkedClone[i].value });
  };

  useLayoutEffect(() => {
    const sessionFontTypes = sessionStorage.getItem('checked-font-types');
    const sessionSearchedText = sessionStorage.getItem('searched-text');
    if (sessionFontTypes && sessionSearchedText) {
      const retrievedFontTypes: { task: string; done: boolean; value: string }[] = JSON.parse(sessionFontTypes);
      const filterData = filterSearch(sessionSearchedText, data, retrievedFontTypes);
      setFontList(filterData);
      setSearchValue(sessionSearchedText);
      setChecked(retrievedFontTypes);
    } else setFontList(data);
    sessionStorage.removeItem('checked-font-types');
    sessionStorage.removeItem('searched-text');
  }, []);

  const onClickFont = (name: string) => {
    sessionStorage.setItem('checked-font-types', JSON.stringify(checked));
    if (searchValue.length > 0) sessionStorage.setItem('searched-text', searchValue);
    router.push(`/fonts/${name}`);
    fbEvent('Click', { content_name: name });
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchKeyword = event.target.value;
    setSearchValue(searchKeyword);
    const filterData = filterSearch(searchKeyword, data, checked);
    setFontList(filterData);
    fbEvent('Search', { search_font: searchKeyword });
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
                    <div className="absolute z-10 p-2 mt-1 border rounded-md shadow bg-primary dark:bg-lightblue">
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
              {fontList.map((font: FontType, i) => (
                <FontListCard
                  key={i}
                  id={i + 1}
                  onClick={() => onClickFont(font.nameEn)}
                  font={font}
                  typeText={value}
                  fontSize={parseInt(fontSize.value)}
                />
              ))}
            </div>
          </div>
        </div>
      </FramerMotionWrapper>
    </main>
  );
}
