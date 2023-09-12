import { motion } from 'framer-motion';
import React from 'react';
import { FontType } from '@core/golobalTypes';

interface PremiumFontDetailType {
  font: FontType;
  size: string;
  id: number;
}

const PremiumFontDetail = ({ font, size, id }: PremiumFontDetailType) => {
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
          <div className="text-base font-medium">ဖောင့်စတိုင် - {font.fontStyle}</div>
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
            src="https://render.myfonts.net/fonts/font_rend.php?id=c576ae24282f9ccd68f38b2937b0c44b&rt=Hello%20world%20nyan%20lin%20tun%20yae&rs=109&w=1500&rbe=&sc=2&nie=true&fg=CA0B0B&bg=FFFFFF&ft=&nf=1"
            alt="text"
            style={{
              width: 'auto',
              minHeight: '20px',
              height: size + 'px',
            }}
          />
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PremiumFontDetail;
