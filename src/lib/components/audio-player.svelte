<script lang="ts">
	import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let { tracks } = $props<{
		tracks: Array<{ name: string; artists: string[]; previewUrl: string | null; albumImg: string[]; url: string }>;
	}>();

	let currentIndex = $state(0);
	let isPlaying = $state(false);
	let audio: HTMLAudioElement | null = $state(null);
	let progress = $state(0);

	const currentTrack = $derived(tracks[currentIndex]);

	function togglePlay() {
		if (!audio || !currentTrack.previewUrl) return;
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		isPlaying = !isPlaying;
	}

	function nextTrack() {
		currentIndex = (currentIndex + 1) % tracks.length;
		isPlaying = false;
		if (audio) {
			audio.pause();
			audio.src = tracks[currentIndex].previewUrl || '';
			audio.load();
		}
	}

	function prevTrack() {
		currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
		isPlaying = false;
		if (audio) {
			audio.pause();
			audio.src = tracks[currentIndex].previewUrl || '';
			audio.load();
		}
	}

	function handleTimeUpdate() {
		if (audio) {
			progress = (audio.currentTime / audio.duration) * 100;
		}
	}

	function handleEnded() {
		isPlaying = false;
		progress = 0;
	}
</script>

<div class="relative mx-auto mt-12 w-full max-w-md">
	<div class="absolute -right-20 top-1/2 -translate-y-1/2 hidden gap-4 opacity-20 pointer-events-none md:flex">
		<div class="h-24 w-24 rounded-full border-2 border-white/40 flex items-center justify-center">
			<div class="h-8 w-8 rounded-full border border-white/40"></div>
		</div>
		<div class="h-24 w-24 rounded-full border-2 border-white/40 flex items-center justify-center">
			<div class="h-8 w-8 rounded-full border border-white/40"></div>
		</div>
	</div>

	<div class="zine-border relative z-10 bg-neon-green p-6 shadow-[8px_8px_0px_white]">
		<div class="flex flex-col items-center text-center">
			<Volume2 size={32} class="mb-4 text-black" />
			
			<h3 class="mb-2 font-serif text-2xl font-bold italic leading-none tracking-tighter text-black uppercase md:text-3xl">
				Listen to <br /> {currentTrack.name}
			</h3>
			
			<p class="mb-6 font-sans text-[10px] font-black tracking-widest text-black/60 uppercase">
				by {currentTrack.artists.join(', ')}
			</p>

			<div class="mb-8 flex items-center gap-2">
				<span class="font-sans text-[8px] font-black uppercase text-black/40">Step</span>
				{#each tracks as _, i}
					<div 
						class="h-1 w-8 rounded-full border border-black/20 transition-colors"
						class:bg-black={currentIndex === i}
					></div>
				{/each}
			</div>

			<div class="flex items-center gap-8">
				<button onclick={prevTrack} class="text-black/40 hover:text-black transition-colors">
					<SkipBack size={24} />
				</button>

				<button 
					onclick={togglePlay}
					class="flex h-12 w-12 items-center justify-center rounded-full bg-black text-neon-green shadow-lg transition-transform hover:scale-110 active:scale-95 disabled:opacity-20"
					disabled={!currentTrack.previewUrl}
				>
					{#if isPlaying}
						<Pause size={24} fill="currentColor" />
					{:else}
						<Play size={24} fill="currentColor" class="ml-1" />
					{/if}
				</button>

				<button onclick={nextTrack} class="text-black/40 hover:text-black transition-colors">
					<SkipForward size={24} />
				</button>
			</div>

			{#if !currentTrack.previewUrl}
				<p class="mt-6 font-sans text-[10px] font-black tracking-widest text-black/40 uppercase">
					Preview unavailable for this track
				</p>
			{/if}

			<a 
				href={currentTrack.url} 
				target="_blank" 
				class="mt-4 flex items-center gap-2 font-sans text-[8px] font-black tracking-[0.2em] text-black/60 uppercase hover:text-black transition-colors"
			>
				Open in Spotify <SkipForward size={10} />
			</a>
		</div>

		<div class="absolute bottom-0 left-0 h-1 bg-black/10 transition-all" style="width: 100%">
			<div class="h-full bg-black transition-all" style="width: {progress}%"></div>
		</div>
	</div>

	<audio
		bind:this={audio}
		src={currentTrack.previewUrl || ''}
		ontimeupdate={handleTimeUpdate}
		onended={handleEnded}
	></audio>
</div>

<style>
	.zine-border {
		border: 2px solid black;
	}
</style>
