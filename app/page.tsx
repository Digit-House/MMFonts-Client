'use client';

import { QueueListIcon } from '@heroicons/react/20/solid';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FontListCard, FramerMotionWrapper, Loading, SearchBox } from '@components/index';
import filterSearch from '@core/filterSearch';
import { FontType, SelectOptionType } from '@core/golobalTypes';
import useCSVConvert from '@hooks/useCSVConvert';

export default function Home() {
  const { data } = useCSVConvert('/fonts/data/font.csv');
  const [fontList, setFontList] = useState<FontType[]>(data);
  const [value, setValue] = useState<string>('');
  const [fontSize, setFontSize] = useState<SelectOptionType>({
    label: '24',
    value: '24',
  });
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [checked, setChecked] = useState<{ task: string; done: boolean; value: string }[]>([
    { task: 'ဇော်ဂျီ', done: false, value: 'zawgyi' },
    { task: 'ယူနီကုဒ်', done: false, value: 'unicode' },
  ]);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  /* eslint-disable */
  const handleCheckBoxChange = (done: boolean, i: number) => {
    const tmp = checked[i];
    tmp.done = !done;
    const checkedClone = [...checked];
    checkedClone[i] = tmp;
    setChecked([...checkedClone]);
    const filterData: FontType[] = [];

    if (!checked[0].done && checked[1].done) {
      console.log(checked[1].done);
      filterData.push(...data.filter((font) => font.fontSupportType === checked[1].value));
    }
    if (checked[0].done && !checked[1].done) {
      filterData.push(...data.filter((font) => font.fontSupportType === checked[0].value));
    }
    if (checked[0].done && checked[1].done) {
      filterData.push(...data);
    }
    if (!checked[0].done && !checked[1].done) {
      filterData.push(...data);
    }
    setFontList(filterData);
  };

  useEffect(() => {
    if (fontList.length === 0) setFontList(data);
  }, [data]);

  const onClickFont = useCallback((name: string, id: number) => {
    router.push(`/fonts/${name.split(' ').join('-')}-${id}`);
  }, []);

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontList(filterSearch(event, data));
  };

  if (data.length === 0) return <Loading />;

  return (
    <main>
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
          <p className="flex-1 text-xl font-bold">ဖောင့်ပုံစံ စုစုပေါင်း {data.length}</p>
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
