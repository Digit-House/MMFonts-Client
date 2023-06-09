"use client";

import { useState } from "react";
import {
	CheckBox,
	FontListCard,
	RadioSelectBar,
	SearchBox,
} from "@components/index";
import classNames from "classnames";
import {
	MagnifyingGlassIcon,
	TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { QueueListIcon } from "@heroicons/react/20/solid";
import { SelectOptionType } from "@core/golobalTypes";
import useIsMobile from "@hooks/useIsMobile";

export default function Home() {
	const [value, setValue] = useState<string>("");
	const [fontSize, setFontSize] = useState<SelectOptionType>({
		label: "12",
		value: "12",
	});
	const [isToggled, setIsToggled] = useState<boolean>(false);
	const { isMobile } = useIsMobile();
	const [checked, setChecked] = useState<{ task: string; done: boolean }[]>([
		{ task: "ဇော်ဂျီ", done: false },
		{ task: "ယူနီကုဒ်", done: false },
	]);
	const router = useRouter();

	const gridContainerClasses = classNames("grid gap-4 mt-3", {
		"grid-cols-2": !isToggled,
		"grid-cols-1": isToggled,
	});

	const array = Array.from({ length: 10 }, (_, index) => index + 1);

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFontSize({ label: event.target.value, value: event.target.value });
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
	};

	const handleCheckBoxChange = (done: boolean, i: number) => {
		let tmp = checked[i];
		tmp.done = !done;
		let checkedClone = [...checked];
		checkedClone[i] = tmp;
		setChecked([...checkedClone]);
	};

	const onClick = (id: number) => {
		router.push(`/fonts/${id}`);
	};

	return (
		<main className="">
			<div className="flex items-center justify-center mt-5">
				<SearchBox
					value={value}
					handleChange={handleChange}
					setFontSize={setFontSize}
					fontSize={fontSize}
					handleSliderChange={handleSliderChange}
					handleCheckBoxChange={handleCheckBoxChange}
					checked={checked}
				/>
			</div>
			<form className="block sm:hidden">
				<div className="flex flex-row items-center">
					<label className="relative flex-1 block m-2">
						<span className="absolute inset-y-0 left-0 flex items-center pl-1">
							<MagnifyingGlassIcon className="w-10 h-10 p-1 " />
						</span>
						<input
							className="w-full py-2 pl-10 pr-4 border rounded-full shadow bg-secondary border-secondary focus:outline-none"
							placeholder="Enter your keyword to search"
							type="text"
						/>
					</label>
					<div>
						{checked.map(({ task, done }, i) => (
							<CheckBox
								key={i}
								task={task}
								done={done}
								i={i}
								handleCheckBoxChange={handleCheckBoxChange}
							/>
						))}
					</div>
				</div>
				<RadioSelectBar
					fontSize={fontSize}
					setFontSize={setFontSize}
					handleSliderChange={handleSliderChange}
				/>
			</form>
			<div className="flex flex-row items-center mt-10">
				<p className="flex-1 text-xl font-bold">ဖောင့်ပုံစံ ၉၀</p>
				<QueueListIcon
					className="hidden w-8 h-8 mr-3 text-secondary sm:flex"
					onClick={() => setIsToggled(true)}
				/>
				<TableCellsIcon
					className="hidden w-8 h-8 text-secondary sm:flex"
					onClick={() => setIsToggled(false)}
				/>
			</div>
			<div
				className={
					isMobile === false
						? gridContainerClasses
						: "grid gap-4 mt-3 grid-cols-1"
				}
			>
				{array.map((i) => (
					<FontListCard key={i} id={i} onClick={onClick} />
				))}
			</div>
		</main>
	);
	``;
}
