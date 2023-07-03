import { Listbox, Transition } from '@headlessui/react';
import Link from 'next-intl/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { Fragment, useState } from 'react';
import { classNames } from '@core/classnames';

const languages = [
  {
    id: 1,
    name: 'Myan',
    avatar: '/myanmar_flag.png',
    locale: 'my',
  },
  {
    id: 2,
    name: 'Eng',
    avatar: '/unitedkingdom_flag.png',
    locale: 'en',
  },
];

const LangSelectBox = () => {
  const pathname = usePathname();
  const [initialValue, setInitialValue] = useState(pathname && pathname.includes('en') ? languages[1] : languages[0]);
  const href = pathname && pathname.includes('en') ? pathname.replace('en', '') : pathname;

  return (
    <Listbox value={initialValue} onChange={setInitialValue}>
      {({ open }) => (
        <>
          <div className="relative ">
            <Listbox.Button className="relative w-full  rounded-md bg-white py-1.5 pl-3  text-left  shadow-sm ring-1  ring-secondary focus:outline-none focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6 cursor-pointer">
              <span className="flex items-center ">
                <div className="relative w-5 h-5">
                  <Image
                    src={initialValue.avatar}
                    alt="national flag"
                    className="flex-shrink-0 object-fill rounded-full "
                    fill
                  />
                </div>
                <span className="block w-10 h-5 mx-3 truncate text-darkblue">{initialValue.name}</span>
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-secondary ring-opacity-5 focus:outline-none sm:text-sm">
                {languages.map((lang) => (
                  <Listbox.Option
                    key={lang.id}
                    className={({ active }) =>
                      classNames(active ? 'text-secondary ' : 'text-darkblue', 'relative cursor-default select-none ')
                    }
                    value={lang}
                  >
                    {({ selected }) => (
                      <Link href={href} locale={lang.locale} className="flex items-center py-2 pl-3">
                        <div className="relative w-5 h-5">
                          <Image src={lang.avatar} alt="" className="flex-shrink-0 rounded-full" fill />
                        </div>
                        <span className={classNames(selected ? 'font-bold' : 'font-normal', 'ml-3 h-5')}>
                          {lang.name}
                        </span>
                      </Link>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default LangSelectBox;
