<script>
	import "$lib/styles/app.pcss";
	import "$lib/styles/theme.pcss";

	import Metadata from "$lib/components/metadata.svelte";
	import SiteHeader from "$lib/components/site-header.svelte";
	import AudioPlayer from "$lib/components/audio-player.svelte";
</script>

<Metadata />

<SiteHeader />
<main class="main">
	<slot />
</main>
<AudioPlayer />

<style>
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
