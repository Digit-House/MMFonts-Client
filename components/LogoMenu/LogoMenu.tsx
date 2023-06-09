import Link from "next/link";
import Image from "next/image";

export default function LogoMenu() {
	return (
		<Link href="#" className="m-1.5 p-1.5">
			<Image
				className="w-auto h-8"
				src="./icon.svg"
				width={40}
				height={40}
				alt="mm fonts collection logo"
			/>
		</Link>
	);
}
