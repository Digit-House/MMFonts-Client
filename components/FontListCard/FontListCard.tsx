import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';
import { convertText } from '@core/fontCovert';
import { FontType } from '@core/golobalTypes';

type FontListType = {
  onClick: (id: number) => void;
  typeText: string | undefined;
  id: number;
  font: FontType;
  fontSize: number;
};

const FontListCard = ({ onClick, id, font, typeText, fontSize }: FontListType) => {
  const fontStyle = {
    fontFamily: `${font.fileName}`,
    fontSize: `${fontSize}px`,
    lineHeight: `${fontSize + 20}px`,
    margin: '10px 0',
  };
  const pathname: any = usePathname();
  const isEnglish = pathname.includes('en');

  const fontSupportType = () => {
    if (!isEnglish) {
      if (font.fontSupportType === 'zawgyi') {
        return 'ဇော်ဂျီ';
      } else if (font.fontSupportType === 'unicode') {
        return 'ယူနီကုဒ်';
      } else {
        return 'ဝင်းဖောင့်';
      }
    } else {
      return font.fontSupportType;
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }, hidden: { opacity: 0, y: 20 } }}
      className="w-full p-5 overflow-hidden border-2 rounded shadow-md  dark:text-[white] cursor-pointer select-none dark:hover:bg-softblue hover:bg-softgold hover:shadow-xl"
      onClick={() => onClick(id)}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, hidden: { opacity: 0, y: 20 } }}
        className="flex flex-row justify-between"
      >
        <div className="max-w-[80%]">
          <div className="text-lg font-bold tracking-wider">{font.name}</div>
          <div className="mt-2 text-sm tracking-wide text-secondaryText dark:text-darkSecondaryText">
            {font.fontStyle.replace(/ /g, ', ')}
          </div>
        </div>
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full shadow-2xl md:w-14 md:h-14 bg-secondary">
          <p className="text-[0.6rem] md:text-xs text-darkblue font-semibold ">{fontSupportType()}</p>
        </div>
      </motion.div>
      <div className="pt-2 text-4xl break-words ">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, hidden: { opacity: 0, y: 20 } }}
          style={{ ...fontStyle }}
        >
          {convertText(font, typeText)}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FontListCard;
