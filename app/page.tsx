"use client";

import { useLayoutEffect, useState } from "react";
import {
	MagnifyingGlassIcon,
	TableCellsIcon,
} from "@heroicons/react/24/outline";
import { CheckBox, FontList } from "@components/index";
import classNames from "classnames";

export default function Home() {
	const [value, setValue] = useState<string>("");
	const [checked, setChecked] = useState([
		{ task: "ဇော်ဂျီ", done: false },
		{ task: "ယူနီကုဒ်", done: false },
	]);
	const [slider, setSlider] = useState<string>("18");
	const [isToggled, setIsToggled] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean | null>(null);
	const [isHovered, setIsHovered] = useState(false);

	const gridContainerClasses = classNames("grid gap-4 mt-3", {
		"grid-cols-2": !isToggled,
		"grid-cols-1": isToggled,
	});
	const handleHover = () => {
		setIsHovered(!isHovered);
	};

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
				<div className="p-4 border-2 rounded-md border-darkblue dark:border-white ">
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
						<div
							className="flex w-12 cursor-pointer box hover:w-full"
							onMouseEnter={handleHover}
							onMouseLeave={handleHover}
						>
							<input
								type="text"
								className="box-border w-12 h-12 p-2 pl-4 text-white border-4 rounded-full outline-none text-md input border-secondary hover:rounded-md bg-darkblue focus:w-full "
								name="txt"
							/>
							<MagnifyingGlassIcon className="absolute w-12 h-12 p-2 rounded-full shadow-md cursor-pointer icon bg-secondary " />
						</div>
						<div
							className={`flex flex-row items-center  p-2 ml-2 mr-2 radio rounded-full ${
								isHovered ? "w-1/4" : "w-full"
							} shadow-md bg-secondary `}
						>
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
