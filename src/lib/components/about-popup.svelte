<script lang="ts">
	import { X } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	let { isOpen = $bindable(false) } = $props();

	function close() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-60 bg-black/40 backdrop-blur-[2px]"
		transition:fade={{ duration: 200 }}
		onclick={close}
	></div>

	<!-- Popup Container -->
	<div
		class="fixed bottom-0 left-0 right-0 z-70 mx-auto w-full max-w-2xl p-4 pb-12"
		transition:fly={{ y: 200, duration: 500, opacity: 1 }}
	>
		<!-- Double Border Card -->
		<div class="relative bg-pink p-1 zine-border shadow-[0_-20px_50px_rgba(255,102,255,0.2)]">
			<div class="zine-border bg-pink p-8 md:p-12">
				<!-- Close Button -->
				<button
					onclick={close}
					class="absolute top-4 right-4 flex h-6 w-6 items-center justify-center bg-black text-white hover:bg-white hover:text-black transition-colors z-10"
				>
					<X size={14} strokeWidth={3} />
				</button>

				<!-- Decoration Stars -->
				<div class="absolute left-6 top-8 hidden font-mono text-sm font-bold text-black/40 md:block">
					* . *
				</div>
				<div class="absolute right-14 top-8 hidden font-mono text-sm font-bold text-black/40 md:block">
					* . *
				</div>

				<!-- Content -->
				<div class="text-center">
					<p class="font-sans text-xs font-bold leading-relaxed tracking-tight text-black uppercase md:text-sm">
						Fusion is a discovery platform for <span class="underline decoration-black decoration-2 underline-offset-4">music covers</span> that share a narrative, vibe, or seamless transition.
						Built for the <span class="underline decoration-black decoration-2 underline-offset-4">curious listener</span> and the <span class="underline decoration-black decoration-2 underline-offset-4">storyteller</span>.
					</p>
					
					<p class="mt-4 font-sans text-xs font-bold leading-relaxed tracking-tight text-black uppercase md:text-sm">
						Site by <span class="underline decoration-black decoration-2 underline-offset-4">ED.</span>, inspired by the <span class="underline decoration-black decoration-2 underline-offset-4">Australian music industry</span> and the <span class="underline decoration-black decoration-2 underline-offset-4">art of the zine</span>.
					</p>

					<!-- Logo area -->
					<div class="mt-10 flex flex-col items-center">
						<div class="relative h-12 w-28 bg-black flex items-center justify-center">
							<span class="font-serif text-xl font-bold italic tracking-tighter text-white">Fusion</span>
						</div>
						<span class="mt-2 font-sans text-[8px] font-black tracking-[0.3em] text-black/40 uppercase">Music Discovery</span>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.zine-border {
		border: 1px solid black;
	}
</style>
