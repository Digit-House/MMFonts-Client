'use client';

import { Dialog } from '@headlessui/react';
import { MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    title: 'မာတိကာ',
    href: '/',
  },
  {
    title: 'အခကြေးငွေဖြင့်',
    href: '/premium',
  },
  {
    title: 'စာထုတ်ရန်',
    href: '/lorem',
  },
  {
    title: 'ကျွန်တော်တို့အကြောင်း',
    href: '/contact-us',
  },
];

interface NavMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  isLightTheme: boolean;
  switchTheme: () => void;
}

export default function NavMenu({ mobileMenuOpen, setMobileMenuOpen, isLightTheme, switchTheme }: NavMenuProps) {
  const pathname = usePathname();

  const activeLink =
    'border-b-2 border-blue-500 text-sm  font-bold leading-6 tracking-wide text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300';
  const unactiveLink =
    'text-sm font-semibold leading-6 tracking-wide text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300';

  return (
    <>
      <div className="items-center hidden lg:flex lg:gap-x-12">
        {menuItems.map((item) => (
          <Link key={item.title} href={item.href} className={pathname == item.href ? activeLink : unactiveLink}>
            {item.title}
          </Link>
        ))}
        <div className="items-center justify-center w-20">
          <button
            onClick={switchTheme}
            className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full checked"
          >
            {isLightTheme ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-primary dark:bg-lightblue sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <Image className="w-auto h-10" src="/icon.png" width={80} height={80} alt="mm fonts collection logo" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                {menuItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
