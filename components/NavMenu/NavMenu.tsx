'use client';

import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

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
  const activeLink = 'relative font-medium leading-6 tracking-wide ';
  const unactiveLink = 'relative text-sm font-semibold leading-6 tracking-wide ';

  return (
    <>
      <div className="items-center hidden lg:flex lg:gap-x-12">
        {menuItems.map((item) => (
          <motion.div whileHover={{ scale: 1.2 }} key={item.title}>
            <Link href={item.href} className={pathname == item.href ? activeLink : unactiveLink}>
              {item.href === pathname && (
                <motion.span
                  layoutId="underline"
                  className="absolute top-full left-0 block h-[1px] bg-darkblue dark:bg-white w-full"
                />
              )}
              {item.title}
            </Link>
          </motion.div>
        ))}
        <DarkModeSwitch
          checked={isLightTheme}
          onChange={switchTheme}
          size={30}
          sunColor="#E4D1AC"
          moonColor="#365880"
        />
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
