import { motion } from 'framer-motion';
import React from 'react';
import { FontType } from '@core/golobalTypes';

interface FontListDetailCardType {
  font: FontType;
  size: string;
  fontText: string;
  id: number;
}

const FontListDetailCard = ({ font, size, fontText, id }: FontListDetailCardType) => {
  const fontStyle = {
    fontFamily: `${font.fileName} , 'font-acre', sans-serif`,
    src: `url(/fonts/${font.fileName}/${font.fontStyle}.ttf)`,
    fontSize: parseInt(size),
    lineHeight: `${parseInt(size) + 20}px`,
    fontWeight: font.fontStyle,
  };

  const recalculatedDelay = id / 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
        delay: recalculatedDelay,
      }}
      className="w-full p-2 mb-2 overflow-hidden border-2 rounded cursor-pointer select-none dark:hover:bg-softblue hover:bg-softgold"
      style={{ boxShadow: ' 2px 2px 0px' }}
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
        <div className="">
          <div className="text-base font-medium">ဖောင့်စတိုင် - {font.fontStyle}</div>
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
          style={{
            ...fontStyle,
          }}
        >
          {fontText || 'ကောင်းသောနံနက်ခင်းပါ'}
        </motion.p>
        <div className="h-10" />
      </div>
    </motion.div>
  );
};

export default FontListDetailCard;
