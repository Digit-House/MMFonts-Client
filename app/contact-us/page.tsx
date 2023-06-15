'use client';

import { CheckCircleIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const ContactUs = () => {
  const [isCopied, setCopied] = useState<boolean>(false);

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      },
      (err) => {
        console.log('failed to copy', err.mesage);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 text-left md:text-center">
      <div className="w-full mt-10 mb-10 md:w-3/4">
        <p className="mb-3 text-xl font-semibold">ရည်ရွယ်ချက်</p>
        <p className="mb-8 text-base">
          “MyanmarFontsCollection” website သည် နည်းပညာ သမားများ အတွက် လွယ်ကူစေရန် မြန်မာစာ fonts များကို တနေရာထဲမှာ
          စုစည်းပေးထားသော website တခု ဖြစ်သည်။ website စာမျက်နှာ ရှိ fonts များမှာ ဤ website မှ ပိုင်ဆိုင်မှု မရှိပါ။
          သက်ဆိုင်ရာ ဖန်တီးထုတ်လုပ်သူ မှ ပိုင်ဆိုင်ပါသည်။
        </p>
        <p className="mb-3 text-xl font-medium">မူပိုင်ခွင့်</p>
        <p className="mb-8 text-base">
          အကြောင်း တစုံတရာကြောင့် website ပေါ်ရှိ font ကိုပယ်ဖျက်လိုပါ က သင်သည် မူလဖန်တီးထုတ်လုပ်သူ အဖြစ်
          ကျွန်ုပ်တို့ကို ဆက်သွယ်၍ပယ်ဖျက်နိုင်ပါသည်။
        </p>
        <p className="mb-3 text-xl font-medium">ဝိုင်းဝန်းကူညီရန်</p>
        <p className="text-base">
          အချက်အလက်များထည့်သွင်းနေဆဲဖြစ်ပါသဖြင့်အများအယွင်းများတွေ.ရှိပါကအကြောင်းကြားပေးရန်နှင့်ရန်နှင့်
          မူလဖန်တီးသူအနေနှင့်ထည့်သွင်းလိုပါကအသိပေးအကြောင်းကြားရန်ဆက်သွယ်ရန်Formမှတစ်ဆင့်ဖိတ်ခေါ်လိုပါသည်။
          အခြားလိုအပ်ချက်များကိုလည်း အကြံပေးနိုင်ပါသည်။
        </p>
      </div>
      <div className="flex flex-col w-full md:w-2/5 lg:w-2/6 ">
        <p className="mb-3 text-xl font-medium">ဆက်သွယ်ရန်</p>
        <div className="flex md:items-center md:justify-center">
          <div className="flex flex-row w-48 h-10 ">
            <a href="mailto:mmfontshub@gmail.com" className="flex items-center mr-3 text-base ">
              <p>mmfontshub@gmail.com</p>
            </a>
            <span
              onClick={() => copyToClipboard('mmfontshub@gmail.com')}
              className="flex flex-row transition-all duration-1000"
            >
              {!isCopied ? (
                <DocumentDuplicateIcon className="w-6 hover:text-darkblue hover:animate-shake hover:w-7" />
              ) : (
                <CheckCircleIcon className="transition-all w-7 text-secondary duration-3000" />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
