<script lang="ts">
	let {
		cover
	}: {
		cover: {
			id: number;
			slug: string;
			original: { name: string; artists: string[]; albumImg: string[] };
			cover: { name: string; artists: string[]; albumImg: string[] };
			description?: string | null;
		};
	} = $props();

	const colors = ['var(--neon-green)', 'var(--orange)', 'var(--purple)', 'var(--pink)', 'var(--yellow)'];
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
</script>

<a href="/{cover.slug}/cover" class="zine-card group block">
	<div class="relative mb-4 aspect-square overflow-hidden zine-border">
		<img
			src={cover.cover.albumImg[0]}
			alt={cover.cover.name}
			class="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-black/40 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
	</div>

	<div class="space-y-1">
		<h3 class="font-serif text-xl leading-none font-bold uppercase tracking-tight text-white group-hover:text-neon-green">
			{cover.cover.name}
		</h3>
		<p class="font-sans text-xs font-medium tracking-wider text-gray-400 uppercase">
			by {cover.cover.artists.join(', ')}
		</p>
	</div>

	<div class="mt-4 border-t border-white/20 pt-2">
		<p class="font-serif text-[10px] italic text-white/60">
			Originally by {cover.original.artists.join(', ')}
		</p>
	</div>
</a>

<style>
	.zine-card:hover {
		box-shadow: 8px 8px 0px var(--hover-color, var(--neon-green));
	}
</style>
