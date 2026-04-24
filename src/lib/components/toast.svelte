<script lang="ts">
	import { CheckCircle2, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { message = '', duration = 5000, onclose = () => {} } = $props<{
		message: string;
		duration?: number;
		onclose?: () => void;
	}>();

	let visible = $state(true);

	$effect(() => {
		const timer = setTimeout(() => {
			visible = false;
			setTimeout(onclose, 500);
		}, duration);
		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	<div
		class="fixed top-24 right-4 z-100 md:right-8"
		transition:fly={{ x: 100, duration: 400 }}
	>
		<div class="zine-border bg-neon-green p-4 pr-12 shadow-[8px_8px_0px_white]">
			<div class="flex items-center gap-3">
				<CheckCircle2 size={18} class="text-black" />
				<p class="font-sans text-xs font-black tracking-tight text-black uppercase">
					{message}
				</p>
			</div>
			<button
				onclick={() => {
					visible = false;
					onclose();
				}}
				class="absolute top-0 right-0 flex h-full w-10 items-center justify-center border-l border-black/10 text-black hover:bg-black hover:text-white transition-colors"
			>
				<X size={14} />
			</button>
		</div>
	</div>
{/if}
