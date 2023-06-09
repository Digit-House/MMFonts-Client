"use client";

import { useState } from "react";
import { LogoMenu, NavMenu } from "..";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { theme, setTheme, systemTheme } = useTheme();

	const currentTheme = theme === "system" ? systemTheme : theme;

	return (
		<header>
			<nav
				className="flex items-center justify-between p-2 mx-auto border-b-2 shadow-lg max-w-8xl lg:px-8 border-secondary"
				aria-label="Global"
			>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="w-6 h-6" aria-hidden="true" />
					</button>
				</div>
				<LogoMenu />
				<NavMenu
					switchTheme={() => {
						setTheme(theme === "dark" ? "light" : "dark");
					}}
					isLightTheme={currentTheme === "light"}
					setMobileMenuOpen={setMobileMenuOpen}
					mobileMenuOpen={mobileMenuOpen}
				/>
			</nav>
		</header>
	);
}
