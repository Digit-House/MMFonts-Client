"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Footer, Header } from "@components/index";

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<ThemeProvider attribute="class" forcedTheme="dark">
			<Header />
			{children}
			<Footer />
		</ThemeProvider>
	);
};

export default Providers;
