/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				pokemonTypes: {
					normal: "#A0A2A0", 
					fighting: "#B22222", 
					flying: "#FF8100",
					poison: "#923FCC",
					ground: "#92501B",
					rock: "#B0AB82	", 
					bug: "#92A212",
					ghost: "#713F71",
					steel: "#60A2B9",
					fire: "#E72324",
					water: "#2481F0",
					grass: "#3DA224", 
					electric: "#FAC100",
					psychic: "#EF3F7A", 
					ice: "#3DD9FF",
					dragon: "#4F60E2",
					dark: "#4F3F3D",
					fairy: "#EF71F0",
					stellar: "#	40B5A5",
					unknown: "",
					shadow: "#5F5F5F",
				}
			}
		},
	},
	plugins: [],
}
