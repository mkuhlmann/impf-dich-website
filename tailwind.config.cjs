/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {

			colors: {
				'impf': '#5d9bd4',
				'impf-2': '#222c56'
			}
		},
	},
	plugins: [],
}
