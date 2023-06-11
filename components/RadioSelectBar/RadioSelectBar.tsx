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
function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

type RadioSelectBarType = {
  fontSize: SelectOptionType;
  setFontSize: React.Dispatch<React.SetStateAction<SelectOptionType>>;
  isHovered?: boolean;
  customClassName?: string | undefined;
  handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isWidthFull?: boolean;
};

export default function RadioSelectBar({
  fontSize,
  setFontSize,
  handleSliderChange,
  isHovered,
  customClassName,
  isWidthFull = false,
}: RadioSelectBarType) {
  return (
    <div
      className={classNames(
        isHovered && isHovered ? 'w-1/2' : `${isWidthFull ? 'w-2/3' : 'w-full'}`,
        customClassName,
        'flex flex-row items-center  p-1 rounded-full shadow-md bg-secondary radio'
      )}
    >
      <CustomSelectBox
        initialValue={fontSize}
        options={options}
        setInitialValue={setFontSize}
        unit="px"
        isRounded={true}
      />
      <input
        type="range"
        min="1"
        max="96"
        value={fontSize.value}
        onChange={handleSliderChange}
        className="w-full h-2 ml-2 mr-4 rounded-full outline-none appearance-none bg-darkblue accent-lightblue"
      />
    </div>
  );
}
