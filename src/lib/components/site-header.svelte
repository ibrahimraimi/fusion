<script lang="ts">
	import NewCoverIcon from "./ui/new-cover-icon.svelte";
</script>

<header>
	<div class="container mx-auto flex items-center justify-between px-container py-4">
		<h1 class="font-meduim"><a href="/" aria-label="Go to homepage">Fusion.</a></h1>
		<div class="flex items-center gap-8">
			<div class="flex items-center gap-4">
				<div class="hidden [@media(min-width:400px)]:block">
					<a
						role="button"
						tabindex="0"
						class="text-md group relative inline-flex h-11 items-center justify-center rounded-sm bg-white px-5 font-medium leading-none text-black outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2 disabled:pointer-events-none disabled:opacity-60"
						href="/new"
					>
						<NewCoverIcon />
						<span class="ml-2">Add a cover</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
