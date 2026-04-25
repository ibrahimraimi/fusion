<script lang="ts">
	import { page } from '$app/state';

	let { onToggleAbout } = $props<{ onToggleAbout?: () => void }>();
</script>

<header class="sticky top-0 z-50 bg-black">
	<div class="h-4 w-full bg-pink shadow-[0_0_15px_rgba(255,102,255,0.5)]"></div>

	<div class="mx-auto flex max-w-7xl items-center justify-between p-4">
		<a href="/" class="group relative block">
			<div class="relative font-serif text-2xl font-bold tracking-tighter uppercase italic">
				<span class="relative z-10 text-white group-hover:text-neon-green">Fusion</span>
				<span
					class="absolute top-0 left-0 -z-10 translate-x-[2px] text-pink opacity-70 blur-[1px] group-hover:translate-x-[4px]"
					>Fusion</span
				>
				<span
					class="absolute top-0 left-0 -z-10 translate-x-[-2px] text-purple opacity-70 blur-[1px] group-hover:translate-x-[-4px]"
					>Fusion</span
				>
			</div>
		</a>

		<nav class="flex gap-8">
			<a
				href="/covers"
				class="font-sans text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:text-purple"
				class:text-purple={page.url.pathname.includes('/covers')}
			>
				Discover
			</a>
			<button
				onclick={onToggleAbout}
				class="font-sans text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:text-pink cursor-pointer"
			>
				What is Fusion?
			</button>
			<a
				href="/new"
				class="font-sans text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:text-neon-green"
				class:text-neon-green={page.url.pathname.includes('/new')}
			>
				Add Cover
			</a>
		</nav>
	</div>
</header>
