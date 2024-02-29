/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte,ts,js}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: {
          DEFAULT: 'hsl(0 0% 100% / <alpha-value>)',
          dark: 'hsl(222.2 84% 4.9% / <alpha-value>)'
        },
        foreground: {
          DEFAULT: 'hsl(222.2 84% 4.9% / <alpha-value>)',
          dark: 'hsl(210 40% 98% / <alpha-value>)'
        }
			}
		}
	},
	plugins: []
};
