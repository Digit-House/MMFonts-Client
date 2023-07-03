'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FontListCard, FramerMotionWrapper, Loading, SearchBox } from '@components/index';
import filterSearch from '@core/filterSearch';
import { FontType, SelectOptionType } from '@core/golobalTypes';
import useCSVConvert from '@hooks/useCSVConvert';

export default function Home() {
  const t = useTranslations('Index');
  const { data } = useCSVConvert('/fonts/data/font.csv');
  const [fontList, setFontList] = useState<FontType[]>([]);
  const [value, setValue] = useState<string>('');
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

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 50 && fontList.length !== data.length) {
      setOffset((prev) => prev + 1);
      const remainingData = data.slice(fontList.length, fontList.length + 8);
      setFontList((prevFontList) => [...prevFontList, ...remainingData]);
    }
  }, [data, fontList.length]);

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
      filterData.push(...data.filter((font) => font.fontSupportType === secondChecked.value));
    } else if (firstChecked.done && !secondChecked.done) {
      filterData.push(...data.filter((font) => font.fontSupportType === firstChecked.value));
    } else {
      filterData.push(...data);
    }
    setFontList(filterData);
  };

  useEffect(() => {
    if (fontList.length === 0) setFontList(data.slice(0, 8));
  }, [data]);

  const onClickFont = useCallback((name: string, id: number) => {
    router.push(`/fonts/${name.split(' ').join('-')}-${id}`);
  }, []);

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontList(filterSearch(event, data));
  };

  if (data.length === 0) return <Loading />;

  return (
    <main className="flex-grow h-full mt-5">
      <FramerMotionWrapper>
        <div className="w-full bg-primary dark:bg-lightblue" ref={searchBoxRef}>
          <SearchBox
            isSearchBoxScrolled={isSearchBoxScrolled}
            filterOnChange={inputOnChange}
            value={value}
            handleChange={handleChange}
            fontSize={fontSize}
            setFontSize={setFontSize}
            handleCheckBoxChange={handleCheckBoxChange}
            checked={checked}
          />
        </div>
        <div className="lg:w-[996px] max-w-[996px] sm:mx-10 md:mx-24 lg:mx-auto lg:mt-10 mx-5">
          <div className="flex flex-row items-center mt-10 ">
            <p className="flex-1 text-xl font-bold">{`${t('fonts')}  ${data.length}`}</p>
            <div className="hidden gap-2 sm:flex">
              <div className="relative w-8 h-8" onClick={() => setIsToggled(true)}>
                <Image alt="rows" src="/icons8-columns.png" fill />
              </div>
              <div className="relative w-8 h-8" onClick={() => setIsToggled(false)}>
                <Image alt="columns" src="/icons8-columns.png" fill className="transform rotate-90" />
              </div>
            </div>
          </div>
          <div className={`${isToggled ? 'grid-cols-1' : 'sm:grid-cols-2'}  grid gap-4 mt-3 w-full `}>
            {fontList.map((font: FontType, i) => (
              <FontListCard
                key={i}
                id={i}
                onClick={() => onClickFont(font.nameEn, i)}
                font={font}
                typeText={value}
                fontSize={parseInt(fontSize.value)}
                offset={offset}
              />
            ))}
          </div>
        </div>
      </FramerMotionWrapper>
    </main>
  );
}
