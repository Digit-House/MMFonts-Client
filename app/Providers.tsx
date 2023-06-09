"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { DetailNavMenu, Footer, Header } from "@components/index";
import { usePathname } from "next/navigation";

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<Header />
			{pathname.includes("fonts") && <DetailNavMenu />}
			<div className="px-10">{children}</div>
			<Footer />
		</ThemeProvider>
	);
};

export default Providers;
