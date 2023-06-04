"use client";

import { useLayoutEffect, useState } from "react";
import { CheckBox, FontList, SearchBox } from "@components/index";
import classNames from "classnames";
import {
	MagnifyingGlassIcon,
	TableCellsIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
	const [value, setValue] = useState<string>("");

	const [slider, setSlider] = useState<string>("18");
	const [isToggled, setIsToggled] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean | null>(null);
	const [checked, setChecked] = useState<{ task: string; done: boolean }[]>([
		{ task: "ဇော်ဂျီ", done: false },
		{ task: "ယူနီကုဒ်", done: false },
	]);

	const gridContainerClasses = classNames("grid gap-4 mt-3", {
		"grid-cols-2": !isToggled,
		"grid-cols-1": isToggled,
	});

	useLayoutEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const array = Array.from({ length: 10 }, (_, index) => index + 1);

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSlider(event.target.value);
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

	return (
		<main className="px-20">
			<div className="flex flex-col items-center justify-center mt-5">
				<SearchBox
					value={value}
					handleChange={handleChange}
					slider={slider}
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
				<div className="flex flex-row items-center w-full p-2 ml-2 mr-2 rounded-full shadow-md bg-secondary">
					<span>{slider}px</span>
					<input
						type="range"
						min="0"
						max="100"
						value={slider}
						onChange={handleSliderChange}
						className="w-full h-2 ml-2 rounded-full outline-none appearance-none bg-darkblue"
					/>
				</div>
			</form>
			<div className="flex flex-row items-center mt-10">
				<p className="flex-1 text-xl font-bold">ဖောင့်ပုံစံ ၉၀</p>
				<TableCellsIcon
					className="hidden w-8 h-8 mr-3 text-secondary sm:flex"
					onClick={() => setIsToggled(false)}
				/>
				<TableCellsIcon
					className="hidden w-8 h-8 text-secondary sm:flex"
					onClick={() => setIsToggled(true)}
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
					<FontList key={i} />
				))}
			</div>
		</main>
	);
	``;
}
