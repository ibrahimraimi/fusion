import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";
import { preprocessMeltUI } from "@melt-ui/pp";
import sequence from "svelte-sequential-preprocessor";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sequence([
		preprocess({
			typescript: true,
			scss: true
		}),
		mdsvex({
			extensions: [".md"],
			layout: {
				_: "src/lib/components/prose-layout.svelte"
			}
		}),
		preprocessMeltUI()
	]),

	kit: {
		adapter: adapter()
	}
};

export default config;
