import { motion } from 'framer-motion';
import React from 'react';
import { getImageUrl } from '@core/api';

interface PremiumFontDetailType {
  fontStyle: string;
  size: string;
  id: number;
  imageUrl: string;
}

const PremiumFontDetail = ({ fontStyle, size, id, imageUrl }: PremiumFontDetailType) => {
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
      className="w-full p-2 overflow-hidden border-2 rounded shadow-md cursor-pointer select-none "
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
          <div className="text-base font-medium">ဖောင့်စတိုင် - {fontStyle}</div>
        </div>
      </motion.div>
      <div className="py-4 text-4xl break-words">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.25, 0, 1],
            delay: recalculatedDelay,
          }}
        >
          <img
            src={getImageUrl(imageUrl)}
            alt="text"
            style={{
              width: 'auto',
              minHeight: '20px',
              height: `${+80 + +size}px`,
            }}
          />
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PremiumFontDetail;
