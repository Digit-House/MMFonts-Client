'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const FramerMotionWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: 'spring', delay: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export default FramerMotionWrapper;
