import React from 'react';

const Loading = ({ waitingText = false }: { waitingText?: boolean }) => {
  const text = !waitingText ? ['ခ', 'ဏ', 'စော', 'င့်', 'ဆို', 'င်း', 'ပါ'] : ['မ', 'ရ', 'နိုင်', 'သေး', 'ပါ'];

  return (
    <div className="flex items-center justify-center select-none h-[600px]">
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
