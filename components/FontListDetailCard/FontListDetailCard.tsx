import React from 'react';

const FontListDetailCard = () => {
  return (
    <div className="flex-1 p-2 border-2 rounded cursor-pointer" style={{ boxShadow: ' 2px 2px 0px #292D53 ' }}>
      <div className="flex flex-row justify-between">
        <div className="">
          <div className="text-base font-medium">ဖောင့်ပုံမှန် ၁၀၀</div>
        </div>
      </div>
      <div className="pt-2 text-4xl break-words">
        ကောင်းသောနံနက်ခင်းပါ
        <div className="h-20" />
      </div>
    </div>
  );
};

export default FontListDetailCard;
