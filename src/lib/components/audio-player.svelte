<script lang="ts">
	import { fly } from "svelte/transition";
	import { currentId } from "$lib/stores/playing";
</script>

{#if $currentId}
	<div class="audio-player" transition:fly={{ y: 80 }}>
		<iframe
			style="border-radius: 14px"
			src={`https://open.spotify.com/embed/track/${$currentId}`}
			title="Spotify"
			width="100%"
			height="80"
			frameBorder="0"
			allowfullscreen={null}
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
		/>
	</div>
{/if}

<style lang="scss">
	.audio-player {
		width: 100%;
		height: calc(80px + clamp(0.75rem, 0.6196rem + 0.6522vw, 1.125rem) * 2);
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		padding: clamp(0.75rem, 0.6196rem + 0.6522vw, 1.125rem);
		display: flex;
		gap: clamp(0.5rem, 0.413rem + 0.4348vw, 0.75rem);
		align-items: center;
		z-index: 80;
		background: linear-gradient(transparent, var(--mauve-1));
	}
</style>
