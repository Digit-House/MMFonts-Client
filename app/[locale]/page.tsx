'use client';

import { QueueListIcon } from '@heroicons/react/20/solid';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
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
  const [checked, setChecked] = useState<{ task: string; done: boolean; value: string }[]>([
    { task: t('zaw-gyi'), done: false, value: 'zawgyi' },
    { task: t('unicode'), done: false, value: 'unicode' },
  ]);
  const router = useRouter();
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && fontList.length !== data.length) {
      const remainingData = data.slice(fontList.length, fontList.length + 8);
      setFontList((prevFontList) => [...prevFontList, ...remainingData]);
    }
  }, [data, fontList.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

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

  if (fontList.length === 0) return <Loading />;

  return (
    <main ref={containerRef}>
      <FramerMotionWrapper>
        <div className="flex items-center justify-center">
          <SearchBox
            filterOnChange={inputOnChange}
            value={value}
            handleChange={handleChange}
            fontSize={fontSize}
            setFontSize={setFontSize}
            handleCheckBoxChange={handleCheckBoxChange}
            checked={checked}
          />
        </div>
        <div className="flex flex-row items-center mt-10">
          <p className="flex-1 text-xl font-bold">{`${t('fonts')}  ${data.length}`}</p>
          <QueueListIcon className="hidden w-8 h-8 mr-3 text-secondary sm:flex" onClick={() => setIsToggled(true)} />
          <TableCellsIcon className="hidden w-8 h-8 text-secondary sm:flex" onClick={() => setIsToggled(false)} />
        </div>
        <div className={`${isToggled ? 'grid-cols-1' : 'md:grid-cols-2'}  grid gap-4 mt-3 w-full `}>
          {fontList.map((font: FontType, i) => (
            <FontListCard
              key={i}
              id={i}
              onClick={() => onClickFont(font.nameEn, i)}
              font={font}
              typeText={value}
              fontSize={parseInt(fontSize.value)}
            />
          ))}
        </div>
      </FramerMotionWrapper>
    </main>
  );
}
