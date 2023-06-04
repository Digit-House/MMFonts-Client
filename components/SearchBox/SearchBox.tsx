import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CheckBox } from "..";

type SearchBoxType = {
	value: string;
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	slider: string;
	handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleCheckBoxChange: (d: boolean, i: number) => void;
	checked: { task: string; done: boolean }[];
};

const SearchBox = ({
	value,
	handleChange,
	slider,
	handleSliderChange,
	handleCheckBoxChange,
	checked,
}: SearchBoxType) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleHover = () => {
		setIsHovered(!isHovered);
	};

	return (
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
						className="box-border w-12 h-12 p-2 pl-4 text-white border-4 rounded-full outline-none text-md input border-secondary hover:rounded-md bg-darkblue hover:w-full "
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
	);
};

export default SearchBox;
