import Link from "next/link";
import Image from "next/image";

export default function LogoMenu() {
	return (
		<Link href="#" className="m-1.5 p-1.5">
			<Image
				className="w-auto h-10"
				src="/icon.png"
				width={80}
				height={80}
				alt="mm fonts collection logo"
			/>
		</Link>
	);
}
