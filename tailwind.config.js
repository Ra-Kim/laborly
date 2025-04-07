/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],

	theme: {
		extend: {
			colors: {
				primary: "#164EA8",
				darkPrimary: "#0d2f65",
				accent: "#cdddf5",
			},

			fontFamily: {
				primaryFont: ["DM Sans", "sans-serif"],
				secondaryFont: ["Archivo", "sans-serif"],
				otherFont: ["Nunito", "sans-serif"],
			},
		},
	},
};
