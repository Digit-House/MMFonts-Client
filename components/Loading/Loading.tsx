import { usePathname } from 'next/navigation';
import React from 'react';

const Loading = ({ waitingText = false }: { waitingText?: boolean }) => {
  const pathname = usePathname();
  const comingSoon = pathname?.includes('en')
    ? ['C', 'o', 'm', 'i', 'n', 'g', ' ', 'S', 'o', 'o', 'n']
    : ['မ', 'ကြာ', 'မီ', 'ရ', 'ပါ', 'မည်'];
  const text = !waitingText ? ['ခ', 'ဏ', 'စော', 'င့်', 'ဆို', 'င်း', 'ပါ'] : comingSoon;

  return (
    <div className="flex items-center justify-center select-none h-[500px] ">
      <div className="w-full max-w-[600px] text-center relative ">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#a11d33] dark:bg-[#000] rounded-full animate-moveLine"></div>
        <div className="text-[5vw] tracking-widest mb-8 leading-loose flex justify-evenly text-[#a11d33] dark:text-[#000]">
          {text.map((t, i) => (
            <span
              style={{ textShadow: '0px 2px 10px rgba(46, 74, 81, 0.3)', animationDelay: `${i * 0.1}s` }}
              key={i}
              className={'transition relative inline-block opacity-0 animate-moveLetters'}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
