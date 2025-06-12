/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			],
  			serif: [
  				'Playfair Display',
  				'serif'
  			],
  			script: [
  				'Great Vibes',
  				'cursive'
  			]
  		},
  		colors: {
  			dusty: {
  				'50': '#F5F7FA',
  				'100': '#E4E9F2',
  				'200': '#CBD6E6',
  				'300': '#A8BCD5',
  				'400': '#839DC2',
  				'500': '#6584B0',
  				'600': '#4E6A94',
  				'700': '#3D5275',
  				'800': '#2C3B55',
  				'900': '#1B2436'
  			},
  			mocha: {
  				'50': '#FAF7F5',
  				'100': '#F2EAE4',
  				'200': '#E6D5CB',
  				'300': '#D5BBA8',
  				'400': '#C29E83',
  				'500': '#B08465',
  				'600': '#94684E',
  				'700': '#75523D',
  				'800': '#553B2C',
  				'900': '#36241B'
  			},
  			cream: {
  				'50': '#FDFCFA',
  				'100': '#FAF7F2',
  				'200': '#F5EFE6',
  				'300': '#EFE4D5',
  				'400': '#E6D5C2',
  				'500': '#D9C3AC',
  				'600': '#B69C80',
  				'700': '#8C7660',
  				'800': '#665545',
  				'900': '#403328'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			fadeIn: 'fadeIn 1s ease-out forwards',
  			bounce: 'bounce 1.5s infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			},
  			bounce: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-15px)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};