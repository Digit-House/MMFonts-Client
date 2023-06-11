'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { LogoMenu, NavMenu } from '..';
import { MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header>
      <nav
        className="flex items-center justify-between p-2 mx-auto border-b-2 shadow-lg max-w-8xl lg:px-8 border-secondary"
        aria-label="Global"
      >
        <div className="flex flex-row items-center lg:hidden ">
          <div className="flex px-5">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md  text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="w-8 h-8" aria-hidden="true" />
            </button>
          </div>
          <div className="items-center justify-center ml-5">
            <button
              onClick={switchTheme}
              className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full checked"
            >
              {currentTheme === 'light' ? <SunIcon className="w-18 h-18" /> : <MoonIcon className="w-18 h-18" />}
            </button>
          </div>
        </div>
        <LogoMenu />
        <NavMenu
          switchTheme={switchTheme}
          isLightTheme={currentTheme === 'light'}
          setMobileMenuOpen={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
      </nav>
    </header>
  );
}
