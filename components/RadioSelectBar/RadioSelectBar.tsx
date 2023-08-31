import { classNames } from '@core/classnames';
import { SelectOptionType } from '@core/golobalTypes';
import { CustomSelectBox } from '..';

const options = [
  { label: '8', value: '8' },
  { label: '12', value: '12' },
  { label: '14', value: '14' },
  { label: '20', value: '20' },
  { label: '24', value: '24' },
  { label: '32', value: '32' },
  { label: '40', value: '40' },
  { label: '64', value: '64' },
  { label: '96', value: '96' },
  { label: '120', value: '120' },
  { label: '184', value: '184' },
  { label: '280', value: '280' },
];

type RadioSelectBarType = {
  fontSize: SelectOptionType;
  setFontSize: React.Dispatch<React.SetStateAction<SelectOptionType>>;
  handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectBoxRounded?: boolean;
  customClassName?: string;
  isSticky?: boolean;
  id?: string;
};

export default function RadioSelectBar({
  fontSize,
  setFontSize,
  handleSliderChange,
  customClassName,
  selectBoxRounded = true,
  isSticky = false,
  id,
}: RadioSelectBarType) {
  return (
    <div
      className={classNames(
        customClassName ? customClassName : 'w-full md:w-2/3',
        'flex flex-row items-center p-1 rounded-full shadow bg-secondary radio h-12'
      )}
    >
      <CustomSelectBox
        initialValue={fontSize}
        options={options}
        setInitialValue={setFontSize}
        unit="px"
        isRounded={selectBoxRounded}
        customClassName={isSticky ? 'flex-1' : 'flex'}
        isSticky={isSticky}
      />
      <label className="sr-only" htmlFor={id}>
        pixel range bar
      </label>
      <input
        id={id}
        type="range"
        min="1"
        max="96"
        value={fontSize.value}
        onChange={handleSliderChange}
        className="w-full h-2 ml-2 mr-4 rounded-full outline-none appearance-none cursor-pointer bg-darkblue accent-lightblue"
      />
    </div>
  );
}
