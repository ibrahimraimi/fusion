<script lang="ts">
	import Metadata from '$lib/components/metadata.svelte';
	import AudioPlayer from '$lib/components/audio-player.svelte';
	import Toast from '$lib/components/toast.svelte';
	import { page } from '$app/state';

	let { data } = $props();
	let cover = $derived(data.cover);

	const features = [
		{ name: 'Energy', key: 'energy' },
		{ name: 'Danceability', key: 'danceability' },
		{ name: 'Acousticness', key: 'acousticness' },
		{ name: 'Valence', key: 'valence' },
		{ name: 'Liveness', key: 'liveness' },
		{ name: 'Speechiness', key: 'speechiness' }
	];

	let showSuccessToast = $state(false);

	$effect(() => {
		if (page.url.searchParams.get('new') === 'true') {
			showSuccessToast = true;
		}
	});
</script>

<Metadata
	title="{cover.cover.name} ({cover.cover.artists[0]} Cover)"
	description={cover.description || `The story behind ${cover.cover.artists[0]}'s cover of ${cover.original.name} by ${cover.original.artists[0]}.`}
	image={cover.cover.albumImg[0]}
/>

<div class="crt-overlay"></div>

{#if showSuccessToast}
	<Toast 
		message="Cover story added to the archive!" 
		onclose={() => showSuccessToast = false} 
	/>
{/if}

<main class="mx-auto max-w-5xl px-4 py-12 md:py-20">
	<div class="mb-12 grid grid-cols-1 items-end gap-12 md:mb-20 md:grid-cols-2">
		<div>
			<h1 class="mb-4 font-serif text-4xl font-bold italic tracking-tighter uppercase md:mb-6 md:text-7xl">
				The Story Behind <br /> {cover.cover.name}
			</h1>
			<p class="font-sans text-[10px] font-bold tracking-widest text-white/40 uppercase md:text-sm">
				Originally by {cover.original.artists.join(', ')} • Contribution by {cover.contributor ||
					'Anonymous'}
			</p>
		</div>

		<div class="flex justify-center gap-4 md:justify-start">
			<div class="zine-card aspect-square w-24 border-neon-green p-0 overflow-hidden md:w-32">
				<img src={cover.original.albumImg[0]} alt={cover.original.name} class="h-full w-full object-cover grayscale" title="Original" />
			</div>
			<div class="zine-card aspect-square w-32 border-pink p-0 overflow-hidden -translate-y-4 md:w-48">
				<img src={cover.cover.albumImg[0]} alt={cover.cover.name} class="h-full w-full object-cover" title="Cover" />
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20">
		<div class="lg:col-span-2 space-y-12">
			<AudioPlayer 
				tracks={[
					{ name: cover.cover.name, artists: cover.cover.artists, previewUrl: cover.cover.previewUrl, albumImg: cover.cover.albumImg, url: cover.cover.url },
					{ name: cover.original.name, artists: cover.original.artists, previewUrl: cover.original.previewUrl, albumImg: cover.original.albumImg, url: cover.original.url }
				]} 
			/>

			<section class="zine-border border-white/20 p-6 md:p-8">
				<h2 class="mb-4 font-serif text-2xl font-bold uppercase tracking-tight text-neon-green md:mb-6 md:text-3xl">The Narrative</h2>
				<p class="font-sans text-base leading-relaxed text-white/80 md:text-lg">
					{cover.description || 'No description provided for this cover journey.'}
				</p>
			</section>

			{#if cover.tags && cover.tags.length > 0}
				<div class="flex flex-wrap gap-2 md:gap-3">
					{#each cover.tags as tag}
						<span class="zine-border px-2 py-1 font-sans text-[8px] font-bold tracking-widest uppercase text-white/40 md:px-3 md:text-[10px]">
							#{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<aside class="space-y-8">
			<h2 class="font-serif text-xl font-bold uppercase tracking-tight border-b border-white pb-2 md:text-2xl">Audio Features</h2>
			<div class="space-y-6">
				{#each features as feature}
					<div class="space-y-2">
						<div class="flex justify-between font-sans text-[8px] font-bold tracking-widest uppercase md:text-[10px]">
							<span>{feature.name}</span>
							<div class="flex gap-2 md:gap-4">
								<span class="text-neon-green">ORI: {(Number(cover.original[feature.key as keyof typeof cover.original]) * 100).toFixed(0)}%</span>
								<span class="text-pink">COV: {(Number(cover.cover[feature.key as keyof typeof cover.cover]) * 100).toFixed(0)}%</span>
							</div>
						</div>
						<div class="flex items-center gap-4">
							<div class="h-2 flex-1 bg-white/5 overflow-hidden">
								<div 
									class="h-full bg-neon-green transition-all duration-1000" 
									style="width: {(Number(cover.cover[feature.key as keyof typeof cover.cover]) || 0) * 100}%"
								></div>
							</div>
							<div class="h-2 flex-1 bg-white/5 overflow-hidden">
								<div 
									class="h-full bg-pink transition-all duration-1000" 
									style="width: {(Number(cover.original[feature.key as keyof typeof cover.original]) || 0) * 100}%"
								></div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<div class="zine-border border-white/20 p-6 md:p-8">
				<div class="flex items-center justify-between mb-6">
					<h2 class="font-serif text-2xl font-bold uppercase tracking-tight text-pink md:text-3xl">The Vibe Shift</h2>
					<div class="flex gap-2 font-sans text-[8px] font-black tracking-widest uppercase md:gap-4 md:text-[10px]">
						<span class="text-neon-green">Cover</span>
						<span class="text-pink">Original</span>
					</div>
				</div>
				
				<div class="space-y-4">
					<div class="flex items-center justify-between font-sans text-[10px] font-bold uppercase tracking-tight md:text-xs">
						<span>Energy</span>
						<div class="flex gap-2">
							<span class={ (cover.cover.energy || 0) > (cover.original.energy || 0) ? 'text-neon-green' : 'text-white/40' }>
								{ (cover.cover.energy || 0) > (cover.original.energy || 0) ? 'INTENSE' : 'MELLOW' }
							</span>
						</div>
					</div>
				</div>
			</div>
		</aside>
	</div>
</main>
