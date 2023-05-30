"use client";

import Link from "next/link";
import { Dialog } from "@headlessui/react";
import {
	Bars3Icon,
	MoonIcon,
	SunIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

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

interface NavMenuProps {
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (value: boolean) => void;
	isLightTheme: boolean;
	switchTheme: () => void;
}

export default function NavMenu({
	mobileMenuOpen,
	setMobileMenuOpen,
	isLightTheme,
	switchTheme,
}: NavMenuProps) {
	return (
		<>
			<div className="hidden lg:flex lg:gap-x-12">
				{menuItems.map((item) => (
					<Link
						key={item.title}
						href={item.href}
						className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
					>
						{item.title}
					</Link>
				))}
				<div className="w-20 justify-center items-center">
					<button
						onClick={switchTheme}
						className="bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center"
					>
						{isLightTheme ? (
							<SunIcon className="w-4 h-4" />
						) : (
							<MoonIcon className="w-4 h-4" />
						)}
					</button>
				</div>
			</div>

			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<Image
								className="h-8 w-auto"
								src="./next.svg"
								width={40}
								height={40}
								alt="mm fonts collection logo"
							/>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{menuItems.map((item) => (
									<a
										key={item.title}
										href={item.href}
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										{item.title}
									</a>
								))}
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</>
	);
}
