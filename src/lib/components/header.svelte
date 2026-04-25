<script lang="ts">
	import { page } from '$app/state';

	let { onToggleAbout } = $props<{ onToggleAbout?: () => void }>();
</script>

<header class="sticky top-0 z-50 bg-black">
	<div class="h-4 w-full bg-pink shadow-[0_0_15px_rgba(255,102,255,0.5)]"></div>

	<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 p-4 md:flex-row md:gap-0">
		<a href="/" class="group relative block">
			<div class="relative font-serif text-2xl font-bold tracking-tighter uppercase italic md:text-3xl">
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

		<nav class="flex flex-wrap justify-center gap-4 md:gap-8">
			<a
				href="/covers"
				class="font-sans text-[8px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:text-purple md:text-[10px]"
				class:text-purple={page.url.pathname.includes('/covers')}
			>
				Discover
			</a>
			<button
				onclick={onToggleAbout}
				class="font-sans text-[8px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:text-pink cursor-pointer md:text-[10px]"
			>
				What is Fusion?
			</button>
			<a
				href="/new"
				class="font-sans text-[8px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:text-neon-green md:text-[10px]"
				class:text-neon-green={page.url.pathname.includes('/new')}
			>
				Add Cover
			</a>
		</nav>
	</div>
</header>
