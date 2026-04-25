<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import CoverCard from '$lib/components/cover-card.svelte';
	import Button from '$lib/components/button.svelte';

	let { data } = $props();
</script>

<div class="crt-overlay"></div>

<main class="mx-auto max-w-7xl px-4 py-12 mt-12">
	<section class="mb-20 text-center">
		<h1 class="glitch-text mb-6 font-serif text-4xl font-bold italic tracking-tighter uppercase sm:text-6xl md:text-8xl" data-text="The Story Behind The Music">
			The Story Behind <br /> The Music
		</h1>
		<p class="mx-auto max-w-2xl font-sans text-base font-medium tracking-wide text-white/60 uppercase md:text-lg">
			Curating music covers that share a narrative, vibe, or seamless transition.
		</p>
	</section>

	<div class="mb-12 flex items-center justify-between border-b border-white pb-4">
		<h2 class="font-serif text-3xl font-bold uppercase tracking-tight italic">Recent Discoveries</h2>
		<a href="/new" class="font-sans text-xs font-bold tracking-widest text-neon-green uppercase hover:underline">
			Submit a cover +
		</a>
	</div>

	{#if data.covers.length === 0}
		<div class="zine-card flex flex-col items-center justify-center py-20 text-center">
			<p class="mb-6 font-serif text-2xl italic text-white/40">No covers found yet...</p>
			<Button variant="outline" onclick={() => (window.location.href = '/new')}>
				Be the first to add one
			</Button>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each data.covers as cover}
				<CoverCard {cover} />
			{/each}
		</div>

		<div class="mt-12 flex justify-center">
			<a href="/covers" class="zine-border border-white px-8 py-4 font-sans text-xs font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all">
				Explore the Full Archive →
			</a>
		</div>
	{/if}
</main>
