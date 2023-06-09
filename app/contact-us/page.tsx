import React from 'react';

const ContactUs = () => {
  return (
    <div className="items-center flex-col flex justify-center">
      <div className="w-3/4 text-center mb-10 mt-10">
        <p className="text-xl font-semibold mb-3">ရည်ရွယ်ချက်</p>
        <p className="text-base mb-8">
          “MyanmarFontsCollection” website သည် နည်းပညာ သမားများ အတွက်
          လွယ်ကူစေရန် မြန်မာစာ fonts များကို တနေရာထဲမှာ စုစည်းပေးထားသော website
          တခု ဖြစ်သည်။ website စာမျက်နှာ ရှိ fonts များမှာ ဤ website မှ
          ပိုင်ဆိုင်မှု မရှိပါ။ သက်ဆိုင်ရာ ဖန်တီးထုတ်လုပ်သူ မှ ပိုင်ဆိုင်ပါသည်။
        </p>
        <p className="text-xl font-medium mb-3">မူပိုင်ခွင့်</p>
        <p className="text-base mb-8">
          အကြောင်း တစုံတရာကြောင့် website ပေါ်ရှိ font ကိုပယ်ဖျက်လိုပါ က သင်သည်
          မူလဖန်တီးထုတ်လုပ်သူ အဖြစ် ကျွန်ုပ်တို့ကို ဆက်သွယ်၍ပယ်ဖျက်နိုင်ပါသည်။
        </p>
        <p className="text-xl font-medium mb-3">ဝိုင်းဝန်းကူညီရန်</p>
        <p className="text-base">
          အချက်အလက်များထည့်သွင်းနေဆဲဖြစ်ပါသဖြင့်အများအယွင်းများတွေ.ရှိပါကအကြောင်းကြားပေးရန်နှင့်ရန်နှင့်
          မူလဖန်တီးသူအနေနှင့်ထည့်သွင်းလိုပါကအသိပေးအကြောင်းကြားရန်ဆက်သွယ်ရန်Formမှတစ်ဆင့်ဖိတ်ခေါ်လိုပါသည်။
          အခြားလိုအပ်ချက်များကိုလည်း အကြံပေးနိုင်ပါသည်။
        </p>
      </div>
      <div className="flex-col flex w-4/5	md:w-2/5 lg:w-2/6">
        <p className="text-xl font-medium text-center">ဆက်သွယ်ရန်</p>
        <input
          type="text"
          className="border-b bg-primary dark:bg-darkblue mb-3 outline outline-0 focus:border-b-2"
          placeholder="အမည်"
        />
        <input
          type="text"
          className="border-b bg-primary dark:bg-darkblue mb-3 outline outline-0 focus:border-b-2"
          placeholder="အီးမေးလ်"
        />
        <textarea
          name="postContent"
          rows={5}
          cols={100}
          placeholder="စာပိုရန််"
          className="peer h-full min-h-[100px] w-full resize-none border dark:bg-darkblue bg-primary px-3 py-2.5 text-md font-normal  outline outline-0 focus:border-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default ContactUs;
