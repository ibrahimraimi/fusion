<script lang="ts">
	import CoverCard from '$lib/components/cover-card.svelte';
	import Metadata from '$lib/components/metadata.svelte';

	let { data } = $props();
</script>

<Metadata 
	title="Discovery Archive" 
	description="Browse the complete collection of music cover stories and narrative journeys." 
/>

<div class="crt-overlay"></div>

<main class="mx-auto max-w-7xl px-4 py-20">
	<div class="mb-12 flex flex-col items-start justify-between gap-4 border-b border-white pb-6 md:flex-row md:items-end">
		<div>
			<h1 class="font-serif text-5xl font-bold italic tracking-tighter uppercase md:text-7xl">
				The Archive
			</h1>
			<p class="mt-2 font-sans text-xs font-black tracking-[0.3em] text-white/40 uppercase">
				Total Discoveries: {data.covers.length}
			</p>
		</div>
		<a href="/new" class="font-sans text-xs font-bold tracking-widest text-neon-green uppercase hover:underline">
			Submit a cover +
		</a>
	</div>

	{#if data.covers.length === 0}
		<div class="zine-border flex flex-col items-center justify-center py-20 text-center bg-white/5">
			<p class="mb-6 font-serif text-2xl italic text-white/40 uppercase">The archive is empty...</p>
			<a href="/new" class="zine-border bg-neon-green px-8 py-4 font-sans text-sm font-black text-black uppercase shadow-[8px_8px_0px_white] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
				Start the Collection
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each data.covers as cover}
				<CoverCard {cover} />
			{/each}
		</div>
	{/if}
</main>
