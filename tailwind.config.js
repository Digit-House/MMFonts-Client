/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		colors: {
			white: "#fff",
			primary: "#E4D1AC",
			secondary: "#EDB92B",
			darkblue: "#292D53",
			lightblue: "#365880",
		},
		fontFamily: {
			acre: ["var(--font-acre)"],
		},
	},
	plugins: [],
};
