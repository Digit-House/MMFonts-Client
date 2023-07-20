import { Listbox, Transition } from '@headlessui/react';
import Link from 'next-intl/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { Fragment, useState } from 'react';
import { classNames } from '@core/classnames';
import UKFlag from '/public/unitedkingdom_flag.png';
import MyanmarFlag from '/public/myanmar_flag.png';

const languages = [
  {
    id: 1,
    name: 'Myan',
    avatar: MyanmarFlag,
    locale: 'my',
  },
  {
    id: 2,
    name: 'Eng',
    avatar: UKFlag,
    locale: 'en',
  },
];

const LangSelectBox = () => {
  const pathname: any = usePathname();
  const [initialValue, setInitialValue] = useState(pathname.includes('en') ? languages[1] : languages[0]);
  const href: any = pathname.includes('en') ? pathname.replace('en', '') : pathname;

  return (
    <Listbox value={initialValue} onChange={setInitialValue}>
      {({ open }) => (
        <>
          <div className="relative ">
            <Listbox.Button className="relative w-full  rounded-md bg-secondary py-1.5 pl-3  text-left  shadow-sm ring-1  ring-secondary focus:outline-none focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6 cursor-pointer">
              <span className="flex items-center ">
                <div className="relative w-5 h-5 overflow-hidden rounded-full drop-shadow-2xl">
                  <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={initialValue.avatar}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    alt="national flag"
                    className="flex-shrink-0 "
                    fill
                    placeholder="blur"
                  />
                </div>
                <span className="block w-10 h-5 mx-3 font-semibold truncate text-darkblue">{initialValue.name}</span>
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-secondary max-h-56 ring-1 ring-secondary ring-opacity-5 focus:outline-none sm:text-sm">
                {languages.map((lang) => (
                  <Listbox.Option
                    key={lang.id}
                    className={({ active }) =>
                      classNames(active ? 'text-white ' : 'text-darkblue', 'relative cursor-default select-none ')
                    }
                    value={lang}
                  >
                    {({ selected }) => (
                      <Link href={href} locale={lang.locale} className="flex items-center py-2 pl-3">
                        <div className="relative w-5 h-5 drop-shadow-2xl">
                          <Image
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={lang.avatar}
                            alt="national flag "
                            className="flex-shrink-0 rounded-full"
                            fill
                            placeholder="blur"
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                          />
                        </div>
                        <span
                          className={classNames(
                            selected ? 'font-bold text-white' : 'font-normal',
                            'ml-3 h-5 hover:text-white'
                          )}
                        >
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
