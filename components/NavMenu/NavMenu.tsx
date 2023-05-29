import styles from "./NavMenu.module.css";
import Link from "next/link";

const menuItems = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Premium",
		href: "/premium",
	},
	{
		title: "lorem",
		href: "/lorem",
	},
	{
		title: "ContactUs",
		href: "/contact",
	},
];

export default function NavMenu() {
	return (
		<nav className={styles.nav}>
			<ul className={styles.nav__list}>
				<li className={styles.nav__item}>
					{menuItems.map((item) => (
						<Link href={item.href} key={item.title}>
							<a className={styles.nav__link}>{item.title}</a>
						</Link>
					))}
				</li>
			</ul>
		</nav>
	);
}
