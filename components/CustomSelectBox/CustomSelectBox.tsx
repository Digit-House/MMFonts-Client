import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';
import { classNames } from '@core/classnames';
import { SelectOptionType } from '@core/golobalTypes';

type CustomSelectBoxType = {
  initialValue: SelectOptionType;
  setInitialValue: React.Dispatch<React.SetStateAction<SelectOptionType>>;
  options: SelectOptionType[];
  isRounded?: boolean;
  customClassName?: string;
  unit?: string;
  shadow?: boolean;
  isSticky?: boolean;
};

const CustomSelectBox = ({
  initialValue,
  setInitialValue,
  options,
  unit,
  customClassName,
  isRounded = false,
  shadow = false,
  isSticky,
}: CustomSelectBoxType) => {
  return (
    <Listbox value={initialValue} onChange={setInitialValue}>
      {({ open }) => (
        <div className={`relative  items-center ${customClassName ? customClassName : 'flex'}`}>
          <Listbox.Button
            className={`hover:bg-[#fcd25d] text-darkblue relative w-full cursor-default  ${
              isRounded ? 'rounded-full' : 'rounded-sm'
            } bg-secondary py-1.5 pl-3 pr-10 text-left  focus:outline-none sm:text-sm sm:leading-6 cursor-pointer  ${
              shadow && 'shadow'
            }`}
          >
            <span className={`block ${!unit ? 'w-16' : 'w-auto'} py-1 text-base font-medium truncate`}>
              {initialValue.label} {unit}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute z-10 w-full py-1 mt-1 overflow-auto text-base border-2 rounded-md shadow-lg ${
                isSticky ? 'max-h-28' : 'max-h-60'
              } border-secondary focus:outline-none sm:text-sm dark:bg-lightblue bg-primary`}
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.label}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-darkblue text-primary' : 'text-black',
                      'relative cursor-default select-none  py-1 pl-3 pr-9 '
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => {
                    return (
                      <>
                        <span className={classNames(selected ? 'font-bold' : 'font-normal', 'block truncate py-1 ')}>
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-black',
                              'absolute inset-y-0 right-0 flex items-center pr-4 '
                            )}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default CustomSelectBox;
