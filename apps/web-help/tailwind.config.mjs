/** @type {import('tailwindcss').Config} */
import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = { 200: '#97cfff', 600: '#0071b3', 900: '#003558', 950: '#002641' };
const gray = { 100: '#f0f7ff', 200: '#e1f0ff', 300: '#91c7ff', 400: '#008ef3', 500: '#005a9d', 700: '#003967', 800: '#00284a', 900: '#001932' };

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: { accent, gray },
		},
	},
	plugins: [starlightPlugin()],
};
