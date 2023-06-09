import React from "react";
import Image from "next/image";
import fontCoverImage from "@public/fontcoverimage.jpg";
const Premium = () => {
	return (
		<div>
			<div className="flex justify-between flex-row items-center">
				<div>
					<p className="mb-1">ဖောင့်အမည််</p>
					<p>ဖန်တီးသူအမည််</p>
				</div>
				<div className="flex items-center justify-center px-3 py-2 mx-3 mt-5 border-2 border-black rounded-sm cursor-pointer border-sm bg-secondary">
					<p>ဝယ်ယူရန်</p>
				</div>
			</div>
			<div>
				<Image
					src={fontCoverImage}
					width={500}
					height={500}
					alt="Picture of the author"
				/>
			</div>
		</div>
	);
};

export default Premium;
