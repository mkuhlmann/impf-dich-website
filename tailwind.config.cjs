/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				impf: '#5d9bd4',
				impfhover: '#3a85cb',
				'impf-2': '#222c56',
			},
			fontFamily: {
				heading: ['Raleway', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
