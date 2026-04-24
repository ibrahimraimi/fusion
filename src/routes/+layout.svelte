<script lang="ts">
	import { page } from '$app/state';
	import './layout.css';
	import Header from '$lib/components/header.svelte';
	import AboutPopup from '$lib/components/about-popup.svelte';
	import Toast from '$lib/components/toast.svelte';
	import Metadata from '$lib/components/metadata.svelte';

	let { children } = $props();
	let isAboutOpen = $state(false);
	let showSuccessToast = $derived(page.url.searchParams.get('new') === 'true');

	function toggleAbout() {
		isAboutOpen = !isAboutOpen;
	}
</script>

<Metadata />

<div class="min-h-screen bg-black text-white selection:bg-neon-green selection:text-black">
	<Header onToggleAbout={toggleAbout} />
	
	{@render children()}

	{#if showSuccessToast}
		<Toast message="Cover story added to the collection" />
	{/if}

	<AboutPopup bind:isOpen={isAboutOpen} />
</div>
