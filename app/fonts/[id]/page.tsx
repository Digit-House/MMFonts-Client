"use client";

import React, { useState } from "react";
import {
	DetailNavMenu,
	FontListDetailCard,
	RadioSelectBar,
	TextGenerateModal,
} from "@components/index";
import { SelectOptionType } from "@core/golobalTypes";
import useIsMobile from "@hooks/useIsMobile";
import classNames from "classnames";

const array = Array.from({ length: 10 }, (_, index) => index + 1);

function Page() {
	const [value, setValue] = useState<string>("");
	const [fontSize, setFontSize] = useState<SelectOptionType>({
		label: "12",
		value: "12",
	});
	const [open, setOpen] = useState<boolean>(false);
	const { isMobile } = useIsMobile();

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
	};

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFontSize({ label: event.target.value, value: event.target.value });
	};

	return (
		<div className="">
			<div>
				<div className="flex-col hidden sm:flex">
					<p>ဖောင့်အမည်</p>
					<p>ဖန်တီးသူ အမည်မသိ</p>
				</div>
				<div className="py-6 mr-5 text-right bock sm:hidden">
					<p className="">အကြောင်းနှင့်မူပိုင်ခွင့်</p>
				</div>

				<div className="flex items-center justify-center mt-5">
					<div className="p-4 border-2 rounded-md border-darkblue dark:border-white">
						<div>
							<textarea
								name="postContent"
								value={value}
								onChange={handleChange}
								rows={5}
								cols={100}
								placeholder="လက်တည့်စမ်းရန်"
								className="peer h-full min-h-[100px] w-full resize-none sm:border-b-2 sm:border-b-secondary dark:bg-darkblue bg-primary px-3 py-2.5 text-md font-normal text-blue-gray-700 outline outline-0 "
							/>
						</div>
						<div className="items-center justify-between hidden p-4 sm:flex ">
							<RadioSelectBar
								fontSize={fontSize}
								setFontSize={setFontSize}
								handleSliderChange={handleSliderChange}
								customClassName="mr-2"
							/>
							<p
								className="px-3 py-2 border-2 border-black rounded-sm cursor-pointer border-sm bg-secondary"
								onClick={() => setOpen(true)}
							>
								စာထုတ်ရန်
							</p>
						</div>
					</div>
				</div>
				<div className="block mt-5 sm:hidden">
					<RadioSelectBar
						fontSize={fontSize}
						setFontSize={setFontSize}
						handleSliderChange={handleSliderChange}
					/>
					<div
						className="flex items-center justify-center px-3 py-2 mx-3 mt-5 border-2 border-black rounded-sm cursor-pointer border-sm bg-secondary"
						onClick={() => setOpen(true)}
					>
						<p>စာထုတ်ရန်</p>
					</div>
				</div>
			</div>
			<div className="flex flex-row items-center mt-10">
				<p className="flex-1 text-xl font-bold">ဖောင့်ပုံစံများ</p>
			</div>
			<div
				className={classNames(
					isMobile ? "grid-cols-1" : "grid-cols-2",
					"grid gap-4 mt-3"
				)}
			>
				{array.map((i) => (
					<FontListDetailCard key={i} />
				))}
			</div>
			<TextGenerateModal open={open} setOpen={setOpen} />
		</div>
	);
}

export default Page;
