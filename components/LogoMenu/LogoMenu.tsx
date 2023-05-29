import Link from "next/link";
import Image from "next/image";
import styles from "./LogoMenu.module.css";

export default function LogoMenu() {
	return (
		<Link href="#" className="-m-1.5 p-1.5">
			<Image
				className="h-8 w-auto"
				src="./next.svg"
				width={40}
				height={40}
				alt="mm fonts collection logo"
			/>
		</Link>
	);
}
