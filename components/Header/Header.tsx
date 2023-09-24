'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { LangSelectBox, LogoMenu, NavMenu } from '..';

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
        className="flex items-center justify-between w-full p-2 mx-auto border-b-2 shadow-lg max-w-8xl lg:px-8 border-secondary"
        aria-label="Global"
      >
        <div className="max-w-[996px] flex items-center w-full justify-between mx-auto">
          <div className="flex items-center lg:hidden">
            <div className="flex items-center ">
              {/* <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="w-8 h-8" aria-hidden="true" />
              </button> */}
              <div className={`menu ${mobileMenuOpen && 'open'}`} onClick={() => setMobileMenuOpen((prev) => !prev)}>
                <div className="button "></div>
                <div className="button"></div>
                <div className="button"></div>
              </div>
            </div>
            <LogoMenu />
          </div>
          <div className="flex items-center">
            <div className="lg:hidden">
              <LangSelectBox />
            </div>
            <div className="px-5 lg:hidden">
              <DarkModeSwitch
                checked={currentTheme === 'light'}
                onChange={switchTheme}
                size={24}
                sunColor="#E4D1AC"
                moonColor="#365880"
              />
            </div>
            <div className="hidden lg:flex">
              <LogoMenu />
            </div>
          </div>
          <NavMenu
            switchTheme={switchTheme}
            isLightTheme={currentTheme === 'light'}
            setMobileMenuOpen={setMobileMenuOpen}
            mobileMenuOpen={false}
          />
        </div>
      </nav>
    </header>
  );
}
