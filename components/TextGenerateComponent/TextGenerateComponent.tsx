import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { CustomSelectBox } from '..';

const options = [
  { label: 'စာပိုဒ်', value: 'စာပိုဒ်' },
  { label: 'စာကြောင်း', value: 'စာကြောင်း' },
];

const TextGenerateComponent = () => {
  const [optionValue, setOptionValue] = useState(options[0]);
  const currentRoute = usePathname();
  const renderText = currentRoute === '/lorem' ? 'စာထုတ်ရန်' : 'ပြီးပြီ';
  return (
    <div className="mt-3 text-center sm:mt-5">
      <div className="flex-row justify-between md:flex hidden">
        <div className="flex-row  w-4/6 flex">
          <label className="relative block w-4/6 mr-3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-1">
              <MagnifyingGlassIcon className="w-10 h-10  text-darkblue p-2" />
            </span>
            <input
              className="w-full py-2 pl-12 pr-4 border rounded-full text-darkblue bg-secondary border-none focus:outline-none shadow "
              placeholder="ရှာရန်"
              type="text"
            />
          </label>
          <CustomSelectBox options={options} initialValue={optionValue} setInitialValue={setOptionValue} />
          <p className="flex items-center justify-center w-auto h-auto px-3 rounded-sm bg-secondary text-darkblue shadow ml-3">
            ၅
          </p>
        </div>
        <p className="rounded-sm bg-secondary w-auto h-auto flex items-center justify-center px-3 text-darkblue shadow font-semibold  ">
          {renderText}
        </p>
      </div>
      <div className="flex flex-col w-full flex-1 md:hidden ">
        <div className="flex flex-row justify-between mb-2">
          <label className="relative block w-4/6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-1">
              <MagnifyingGlassIcon className="w-10 h-10 p-1 text-darkblue" />
            </span>
            <input
              className="w-full py-2 pl-10 pr-4 border rounded-full shadow bg-secondary border-secondary focus:outline-none"
              placeholder="ရှာရန်"
              type="text"
            />
          </label>
          <p className="rounded-sm bg-secondary w-auto h-auto flex items-center justify-center px-3 text-darkblue shadow font-semibold">
            {renderText}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <CustomSelectBox options={options} initialValue={optionValue} setInitialValue={setOptionValue} />
          <p className="flex items-center justify-center w-auto h-auto px-3 rounded-sm bg-secondary shadow text-darkblue">
            ၅
          </p>
        </div>
      </div>
      <h3 className="py-6 mb-5 text-base font-semibold leading-6 text-left">
        အတ္တလန်တိတ်ဟာရီကိန်းရာသီသည် ဇွန်လ ၁ ရက်မှ နိုဝင်ဘာ ၃၀ ရက်အထိဖြစ်သည်။ ထို့ကြောင့် အနည်းဆုံးလေတိုက်နှုန်း တစ်နာရီ
        ၃၉ မိုင်(တစ်နာရီ ၆၃ ကီလိုမီတာ)နှုန်းရှိသော လေများဖြင့် မုန်တိုင်းအမည်ပေး၍ရသည့် မုန်တိုင်း ၁၂ ခုမှ ၁၇
        ခုရှိနေခြင်းနှင့်အတူ ဖြစ်နေကျပုံစံ ဟာရီကိန်းမုန်တိုင်းရာသီကို မေလ ၂၅ ရက်တွင်
        အမေရိကန်အမျိုးသားသမုဒ္ဒရာနှင့်လေဖိအားဆိုင်ရာဌာန (NOAA) ခန့်မှန်းထားသည်။ (လေတိုက်နှုန်း တစ်နာရီ ၁၁၁ မိုုင်နှုန်း
        သို့မဟုတ် ထို့ထက်ပိုများသောနှုန်းဖြင့်ပြင်းအားအဆင့် နှစ်၊သုံး၊လေးသို့မဟုတ်ငါးအထိရှိသော)
        ဟာရီကိန်းမုန်တိုင်းကြီးတစ်ခုမှ လေးခုအပါအဝင် ၎င်းတို့ထဲက မုန်တိုင်းငါးခုမှကိုးခုသည် (တစ်နာရီ ၇၄ မိုင်နှုန်း
        ရှိသောလေများ သို့မဟုတ် ထို့ထက် ပိုပြင်းသောလေများဖြင့်) ဟာရီကိန်းမုန်တိုင်းများ ဖြစ်လာနိုင်သည်ဟုဆိုသည်။
        ပြင်းအားအသီး သီးရှိသော ဟာရီကိန်းများ ဖြစ်လာမည်ဟု ၇၀ ရာခိုင်နှုန်း ယုံကြည်ထားကြောင်း NOAA ကဖော်ပြ ထားသည်။
        အတ္တလန်တိတ် ဟာရီကိန်းရာသီသည် ဇွန်လ ၁ ရက်မှ နိုဝင်ဘာ ၃၀ အထိကြာမြင့်သည်။ “ပြောင်းလဲနေတဲ့ ရာသီဥတု၊
        အချက်အလက်တွေ၊ပညာရပ်ဆိုင်ရာ ကျွမ်းကျင်မှုတို့နဲ့အတူ မုန်တိုင်း မလာမီ၊ တိုက်ခတ်နေတုန်းနဲ့ တိုက်ပြီးနောက်
        ဟာရီကိန်းဟာဘယ်တော့မှ ပိုအရေးကြီးလာမျိုးမဟုတ်ဘူးဆိုတာကို အရေးပေါ်စီမံခန့်ခွဲမှု မန်နေဂျာတွေ၊
        ပါတနာတွေဆုံးဖြတ်ချက်ချမှတ်မှုကို NOAA က ထောက်ပံ့ပေးနေပါတယ်” ဟု NOAA အုပ်ချုပ်ရေးမှူးရစ်စပင်းရက်က
        ထုတ်ပြန်ချက်တွင် ဖော်ပြထားသည်။ အတ္တလန်တိတ်ဟာရီကိန်းရာသီတွင် သာမန်ဖြစ်နေကျ မုန်တိုင်း ဖစ်ပေါ်သောရာသီဖြစ်ရန်
        ဖြစ်နိုင်ခြေ ၄၀ ရာခိုင်နှုန်းရှိနေပြီး သာမန်ထက်ပိုသည့် မုန်တိုင်းရာသီဖြစ်ရန် ရာခိုင်နှုန်း ၃၀၊ သာမန်အောက်
        မုန်တိုင်းရာသီဖြစ်ရန် ဖြစ်နိုင်ခြေ ၃၀ ရာခိုင်နှုန်းရှိသည်ဟု NOAAက ခန့်မှန်းထားသည်။ လာနီညာဆိုသည့်
        လေထုဆိုင်ရာဖြစ်စဉ် သုံးရာသီဖြစ်ပေါ်ခဲ့ပြီးနောက် ယခုနွေရာသီတွင် အယ်လ်နီညိုဖြစ်ပေါ်မည်ဟု NOAA က ခန့်မှန်းထားရာ
        ဟာရီကိန်းလှုပ်ရှားမှုကို အဟန့်အတားဖြစ်နိုင်သော အကျိုးဆက်ရှိနေသည်ဟုဆိုသည်။
      </h3>
    </div>
  );
};

export default TextGenerateComponent;
