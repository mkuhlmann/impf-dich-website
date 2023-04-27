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
				raleway: ['Raleway', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
				inter: ['Inter', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
				roboto: ['Roboto', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
