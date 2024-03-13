/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    fontFamily: {
      'body': ['Verdana', 'ui-sans-serif'],
      'mono': ['Azeret Mono', 'ui-monospace'],
    },
    extend: {
			colors: {
				background: {
          DEFAULT: 'hsl(0 0% 100% / <alpha-value>)',
          dark: 'hsl(0 0% 8% / <alpha-value>)'
        },
        foreground: {
          DEFAULT: 'hsl(0 0% 8% / <alpha-value>)',
          dark: 'hsl(210 40% 98% / <alpha-value>)'
        },
        border: {
          DEFAULT: 'hsl(210 11% 93% / <alpha-value>)',
          dark: 'hsl(210 5% 20% / <alpha-value>)'
        },
        emphasis: {
          DEFAULT: 'hsl(210 11% 98% / <alpha-value>)',
          dark: 'hsl(210 5% 11% / <alpha-value>)'
        }
			}
		}
  },
  plugins: [],
}

