"use client";

import { useState } from "react";
import { LogoMenu, NavMenu } from "..";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white">
			<nav
				className="mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>

				<LogoMenu />
				<NavMenu
					setMobileMenuOpen={setMobileMenuOpen}
					mobileMenuOpen={mobileMenuOpen}
				/>
			</nav>
		</header>
	);
}
