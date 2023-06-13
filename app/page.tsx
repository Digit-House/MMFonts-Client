'use client';

import { QueueListIcon } from '@heroicons/react/20/solid';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FontListCard, SearchBox } from '@components/index';
import { FontType } from '@core/golobalTypes';
import useCSVConvert from '@hooks/useCSVConvert';

export default function Home() {
  const { data } = useCSVConvert('/fonts/data/font.csv');

  const [fontList, setFontList] = useState<FontType[]>(data);

  const [value, setValue] = useState<string>('');

  const [fontSize, setFont] = useState<number>(24);

  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [checked, setChecked] = useState<{ task: string; done: boolean; value: string }[]>([
    { task: 'ဇော်ဂျီ', done: false, value: 'zawgyi' },
    { task: 'ယူနီကုဒ်', done: false, value: 'unicode' },
  ]);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const handleCheckBoxChange = (done: boolean, i: number) => {
    const tmp = checked[i];
    tmp.done = !done;
    const checkedClone = [...checked];
    checkedClone[i] = tmp;
    setChecked([...checkedClone]);
    const filterData = data.filter((font) => font.fontSupportType === tmp.value);
    setFontList(filterData);
  };

  useEffect(() => {
    if (fontList.length === 0) setFontList(data);
  }, [data]);

  const onClickFont = useCallback((name: string, id: number) => {
    router.push(`/fonts/${name.split(' ').join('-')}-${id}`);
  }, []);

  if (data.length === 0) return <div>Loading...</div>;

  return (
    <main className="mx-0 lg:mx-32 w-auto">
      <div className="flex items-center justify-center mt-5">
        <SearchBox
          value={value}
          handleChange={handleChange}
          setFont={setFont}
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
            fontSize={fontSize}
          />
        ))}
      </div>
    </main>
  );
}
