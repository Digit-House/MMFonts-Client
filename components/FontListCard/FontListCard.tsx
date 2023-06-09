import { FontType } from "@core/golobalTypes";
import classNames from "classnames";
import React, { FC } from "react";

type FontListType = {
	onClick: (id: number) => void;
	typeText: string | undefined;
	id: number;
	font: FontType;
};

const FontListCard = ({ onClick, id, font, typeText }: FontListType) => {
	const fontStyle = {
		fontFamily: `${font.fileName} , 'font-acre', sans-serif`,
		src: `url(/fonts/${font.fileName}/${font.fontStyle}.ttf)`,
	};

	console.log("FONT", fontStyle);
	return (
		<div
			className="flex-1 p-2 border-2 rounded cursor-pointer"
			style={{ boxShadow: " 2px 2px 0px #292D53 " }}
			onClick={() => onClick(id)}
		>
			<div className="flex flex-row justify-between">
				<div className="">
					<div className="text-base font-medium">{font.name}</div>
					<div className="text-sm mt-2">{font.fontStyle}</div>
				</div>
				<div className="inline-flex items-center justify-center p-2 text-center rounded-full bg-secondary">
					<p className="text-sm">{font.fontSupportType}</p>
				</div>
			</div>
			<div className="pt-2 text-4xl break-words h-40">
				<p style={{ ...fontStyle }}>{typeText || "ကောင်းသော နံနက်ခင်း ပါ"}</p>
			</div>
		</div>
	);
};

export default FontListCard;
