export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				linkTree: {
					text: '#d2e823',
					bg: '#254f1a',
					bg2: '#43e660',
					accent: '#e9c0e9'
				}
			},
			screens: {
				md: '840px'
			},
			keyframes: {
				slideUp: {
					from: {
						transform: 'translateY(100px)',
						opacity: 0
					},
					to: {
						transform: 'translateY(0)',
						opacity: 1
					}
				},
				slideRight: {
					from: {
						transform: 'translateX(-100px)',
						opacity: 0
					},
					to: {
						transform: 'translateX(0)',
						opacity: 1
					}
				},
				slideLeft: {
					from: {
						transform: 'translateX(100px)',
						opacity: 0
					},
					to: {
						transform: 'translateX(0)',
						opacity: 1
					}
				},
				fadeIn: {
					from: {
						opacity: 0
					},
					to: {
						opacity: 1
					}
				}
			},
			animation: {
				slideUp: 'slideUp 1s ease-in-out',
				slideRight: 'slideRight 1s ease-in-out',
				slideLeft: 'slideLeft 1s ease-in-out',
				fadeIn: 'fadeIn 1s'
			},
			fontFamily: {
				heading: ['Afacad', 'sans-serif'],
				text: ['Poppins', 'sans-serif']
			}
		}
	},

	plugins: [require('daisyui')]
}
