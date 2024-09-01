import { nextui } from '@nextui-org/theme';
import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./components/**/*.{js,ts,jsx,tsx,mdx}',    flowbite.content(),
		, './app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)'],
				mono: ['var(--font-mono)'],
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui(),
		flowbite.plugin(),

	],
};
