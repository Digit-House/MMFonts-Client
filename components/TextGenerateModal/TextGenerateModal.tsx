"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CustomSelectBox } from "..";

type TextGenerateModalType = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const options = [
	{ label: "စာပိုဒ်", value: "စာပိုဒ်" },
	{ label: "စာကြောင်း", value: "စာကြောင်း" },
];

const TextGenerateModal = ({ open, setOpen }: TextGenerateModalType) => {
	const [optionValue, setOptionValue] = useState(options[0]);
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
				</Transition.Child>
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex items-end justify-center min-h-full p-4 sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative w-1/2 h-auto px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform border-2 border-black shadow-xl bg-primary dark:bg-lightblue sm:my-8 sm:p-6">
								<div className="absolute cursor-pointer top-1 right-1">
									<XMarkIcon
										className="w-6 h-6 text-green-600"
										onClick={() => setOpen(false)}
									/>
								</div>

								<div className="">
									<div className="mt-3 text-center sm:mt-5">
										<div className="flex flex-row justify-between ">
											<div className="flex flex-row justify-around w-4/6 ">
												<label className="relative block w-4/6">
													<span className="absolute inset-y-0 left-0 flex items-center pl-1">
														<MagnifyingGlassIcon className="w-10 h-10 p-1 " />
													</span>
													<input
														className="w-full py-2 pl-10 pr-4 border rounded-full shadow bg-secondary border-secondary focus:outline-none"
														placeholder="ရှာရန်"
														type="text"
													/>
												</label>
												<CustomSelectBox
													options={options}
													initialValue={optionValue}
													setInitialValue={setOptionValue}
												/>
												<p className="flex items-center justify-center w-10 h-auto px-3 rounded-sm bg-secondary">
													၅
												</p>
											</div>
											<p className="flex items-center justify-center w-10 h-auto px-3 rounded-sm bg-secondary">
												ပြီးပြီ
											</p>
										</div>
										<Dialog.Title
											as="h3"
											className="p-6 mb-5 text-base font-semibold leading-6 text-left"
										>
											အတ္တလန်တိတ်ဟာရီကိန်းရာသီသည် ဇွန်လ ၁ ရက်မှ နိုဝင်ဘာ ၃၀
											ရက်အထိဖြစ်သည်။ ထို့ကြောင့် အနည်းဆုံးလေတိုက်နှုန်း တစ်နာရီ
											၃၉ မိုင်(တစ်နာရီ ၆၃ ကီလိုမီတာ)နှုန်းရှိသော လေများဖြင့်
											မုန်တိုင်းအမည်ပေး၍ရသည့် မုန်တိုင်း ၁၂ ခုမှ ၁၇
											ခုရှိနေခြင်းနှင့်အတူ ဖြစ်နေကျပုံစံ
											ဟာရီကိန်းမုန်တိုင်းရာသီကို မေလ ၂၅ ရက်တွင်
											အမေရိကန်အမျိုးသားသမုဒ္ဒရာနှင့်လေဖိအားဆိုင်ရာဌာန (NOAA)
											ခန့်မှန်းထားသည်။ (လေတိုက်နှုန်း တစ်နာရီ ၁၁၁ မိုုင်နှုန်း
											သို့မဟုတ် ထို့ထက်ပိုများသောနှုန်းဖြင့်ပြင်းအားအဆင့်
											နှစ်၊သုံး၊လေးသို့မဟုတ်ငါးအထိရှိသော)
											ဟာရီကိန်းမုန်တိုင်းကြီးတစ်ခုမှ လေးခုအပါအဝင် ၎င်းတို့ထဲက
											မုန်တိုင်းငါးခုမှကိုးခုသည် (တစ်နာရီ ၇၄ မိုင်နှုန်း
											ရှိသောလေများ သို့မဟုတ် ထို့ထက် ပိုပြင်းသောလေများဖြင့်)
											ဟာရီကိန်းမုန်တိုင်းများ ဖြစ်လာနိုင်သည်ဟုဆိုသည်။
											ပြင်းအားအသီး သီးရှိသော ဟာရီကိန်းများ ဖြစ်လာမည်ဟု ၇၀
											ရာခိုင်နှုန်း ယုံကြည်ထားကြောင်း NOAA ကဖော်ပြ ထားသည်။
											အတ္တလန်တိတ် ဟာရီကိန်းရာသီသည် ဇွန်လ ၁ ရက်မှ နိုဝင်ဘာ ၃၀
											အထိကြာမြင့်သည်။ “ပြောင်းလဲနေတဲ့ ရာသီဥတု၊
											အချက်အလက်တွေ၊ပညာရပ်ဆိုင်ရာ ကျွမ်းကျင်မှုတို့နဲ့အတူ
											မုန်တိုင်း မလာမီ၊ တိုက်ခတ်နေတုန်းနဲ့ တိုက်ပြီးနောက်
											ဟာရီကိန်းဟာဘယ်တော့မှ ပိုအရေးကြီးလာမျိုးမဟုတ်ဘူးဆိုတာကို
											အရေးပေါ်စီမံခန့်ခွဲမှု မန်နေဂျာတွေ၊
											ပါတနာတွေဆုံးဖြတ်ချက်ချမှတ်မှုကို NOAA က
											ထောက်ပံ့ပေးနေပါတယ်” ဟု NOAA အုပ်ချုပ်ရေးမှူးရစ်စပင်းရက်က
											ထုတ်ပြန်ချက်တွင် ဖော်ပြထားသည်။
											အတ္တလန်တိတ်ဟာရီကိန်းရာသီတွင် သာမန်ဖြစ်နေကျ မုန်တိုင်း
											ဖစ်ပေါ်သောရာသီဖြစ်ရန် ဖြစ်နိုင်ခြေ ၄၀
											ရာခိုင်နှုန်းရှိနေပြီး သာမန်ထက်ပိုသည့်
											မုန်တိုင်းရာသီဖြစ်ရန် ရာခိုင်နှုန်း ၃၀၊ သာမန်အောက်
											မုန်တိုင်းရာသီဖြစ်ရန် ဖြစ်နိုင်ခြေ ၃၀
											ရာခိုင်နှုန်းရှိသည်ဟု NOAAက ခန့်မှန်းထားသည်။ လာနီညာဆိုသည့်
											လေထုဆိုင်ရာဖြစ်စဉ် သုံးရာသီဖြစ်ပေါ်ခဲ့ပြီးနောက်
											ယခုနွေရာသီတွင် အယ်လ်နီညိုဖြစ်ပေါ်မည်ဟု NOAA က
											ခန့်မှန်းထားရာ ဟာရီကိန်းလှုပ်ရှားမှုကို
											အဟန့်အတားဖြစ်နိုင်သော အကျိုးဆက်ရှိနေသည်ဟုဆိုသည်။
										</Dialog.Title>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default TextGenerateModal;
