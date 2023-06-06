import classNames from "classnames";
import React, { FC } from "react";

type FontListType = {
	onClick: (id: number) => void;
	id: number;
};

const FontListCard = ({ onClick, id }: FontListType) => {
	return (
		<div
			className="flex-1 p-2 border-2 rounded cursor-pointer"
			style={{ boxShadow: " 2px 2px 0px #292D53 " }}
			onClick={() => onClick(id)}
		>
			<div className="flex flex-row justify-between">
				<div className="">
					<div className="text-base font-medium">ဖောင့်အမည်</div>
					<div className="text-sm">ဖောင့်တစ်စောင်း</div>
				</div>
				<div className="inline-flex items-center justify-center p-2 text-center rounded-full bg-secondary">
					<p className="text-sm">အင်းဝ</p>
				</div>
			</div>
			<div className="pt-2 text-4xl break-words">
				ကောင်းသောနံနက်ခင်းပါ
				<div className="h-20" />
			</div>
		</div>
	);
};

export default FontListCard;
