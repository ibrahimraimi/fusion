/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./node_modules/@significa/svelte-ui/**/*.{html,js,svelte,ts}"
	],

	presets: [
		require("@significa/svelte-ui/tailwind-preset")({
			fonts: {
				sans: {
					name: "Significa Sans",
					fontFaces: [
						{
							fontWeight: "400",
							src: `url('/fonts/significa-regular.woff2') format('woff2')`,
							ascentOverride: "95%"
						},
						{
							fontWeight: "500",
							src: `url('/fonts/significa-medium.woff2') format('woff2')`,
							ascentOverride: "95%"
						},
						{
							fontWeight: "600",
							src: `url('/fonts/significa-semibold.woff2') format('woff2')`,
							ascentOverride: "95%"
						}
					]
				}
			}
		})
	],

	theme: {
		extend: {}
	},

	plugins: []
};

module.exports = config;
