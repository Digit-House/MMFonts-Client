import { Listbox, Transition } from '@headlessui/react';
import { LanguageIcon } from '@heroicons/react/24/outline';
import Link from 'next-intl/link';
import { usePathname } from 'next/navigation';
import React, { Fragment, useState } from 'react';
import { classNames } from '@core/classnames';

const languages = [
  {
    id: 1,
    name: 'မြန်မာ',
    locale: 'my',
  },
  {
    id: 2,
    name: 'Eng',
    locale: 'en',
  },
];

const LangSelectBox = () => {
  const pathname: any = usePathname();
  const [initialValue, setInitialValue] = useState(pathname.includes('en') ? languages[1] : languages[0]);
  const href: any = pathname.includes('/en') ? pathname.replace('/en', '/') : pathname;

  return (
    <Listbox value={initialValue} onChange={setInitialValue}>
      {({ open }) => (
        <div className="relative ">
          <Listbox.Button
            aria-label="language select button"
            className="relative flex items-center w-full text-left rounded-md cursor-pointer"
            type="button"
          >
            <LanguageIcon className="w-6" />
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-auto py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-secondary max-h-56 ring-1 ring-secondary ring-opacity-5 focus:outline-none sm:text-sm">
              {languages.map((lang) => (
                <Listbox.Option
                  key={lang.id}
                  className={({ active }) =>
                    classNames(active ? 'text-white ' : 'text-darkblue', 'relative cursor-default select-none ')
                  }
                  value={lang}
                >
                  {({ selected }) => (
                    <Link href={href} locale={lang.locale} className="flex items-center py-2 ">
                      <span
                        className={classNames(
                          selected ? 'font-bold text-white' : 'font-normal',
                          'mx-3 h-5 hover:text-white'
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
      )}
    </Listbox>
  );
};

export default LangSelectBox;
