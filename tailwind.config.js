/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
	theme: {
		// screens: { //! NOT WORKING
		//   sm: '480px',
		//   md: '768px',
		//   lg: '976px',
		//   xl: '1440px',
		// },
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
			},
		},
		extend: {
			colors: {
				mainColor: "#ff515a",
				bgDark: "#161a1e",
				card: "#22252f",
				skeleton: "#2a2e3a",
			},
		},
	},
	plugins: [],
};
