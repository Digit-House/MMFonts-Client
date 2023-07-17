import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FontType } from '@core/golobalTypes';

type FontListType = {
  onClick: (id: number) => void;
  typeText: string | undefined;
  id: number;
  font: FontType;
  fontSize: number;
  offset: number;
};

const FontListCard = ({ onClick, id, font, typeText, fontSize, offset }: FontListType) => {
  console.log('FONT ', font);
  const fontStyle = {
    fontFamily: `${font.fileName} , sans-serif`,
    fontSize: `${fontSize}px`,
    lineHeight: `${fontSize + 20}px`,
    fontWeight: font.fontStyle,
    margin: '10px 0',
  };

  const pathname: any = usePathname();
  const isEnglish = pathname.includes('en');

  const fontSupportType = () => {
    if (!isEnglish) {
      if (font.fontSupportType === 'zawgyi') {
        return 'ဇော်ဂျီ';
      } else {
        return 'ယူနီကုဒ်';
      }
    } else {
      return font.fontSupportType;
    }
  };

  const PAGE_COUNT = 8;
  const recalculatedDelay = id >= PAGE_COUNT ? (id - PAGE_COUNT * (offset - 1)) / 15 : id / 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
        delay: recalculatedDelay,
      }}
      className="w-full p-5 overflow-hidden border-2 rounded shadow-md  dark:text-[white] cursor-pointer select-none dark:hover:bg-softblue hover:bg-softgold hover:shadow-xl"
      onClick={() => onClick(id)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.25, 0, 1],
          delay: recalculatedDelay,
        }}
        className="flex flex-row justify-between"
      >
        <div className="max-w-[80%]">
          <motion.div className="text-lg font-bold tracking-wider">{font.name}</motion.div>
          <div className="mt-2 text-sm tracking-wide text-secondaryText dark:text-darkSecondaryText">
            {font.fontStyle.replace(/ /g, ', ')}
          </div>
        </div>
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full shadow-2xl md:w-14 md:h-14 bg-secondary">
          <p className="text-[0.6rem] md:text-xs text-darkblue font-semibold ">{fontSupportType()}</p>
        </div>
      </motion.div>
      <div className="pt-2 text-4xl break-words">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.25, 0, 1],
            delay: recalculatedDelay,
          }}
          style={{ ...fontStyle }}
        >
          {typeText || 'ကောင်းသော နံနက်ခင်း ပါ'}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FontListCard;
