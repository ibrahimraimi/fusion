<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Metadata from '$lib/components/metadata.svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const { form, errors, enhance, constraints } = superForm(data.form);

	let originalQuery = $state('');
	let coverQuery = $state('');
	let originalResults = $state<any[]>([]);
	let coverResults = $state<any[]>([]);
	let isSearchingOriginal = $state(false);
	let isSearchingCover = $state(false);

	async function search(query: string, type: 'original' | 'cover') {
		if (query.length < 3) return;
		if (type === 'original') isSearchingOriginal = true;
		else isSearchingCover = true;

		const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
		const data = await res.json();
		const results = data.results || [];

		if (type === 'original') {
			originalResults = results;
			isSearchingOriginal = false;
		} else {
			coverResults = results;
			isSearchingCover = false;
		}
	}

	function selectTrack(track: any, type: 'original' | 'cover') {
		if (type === 'original') {
			$form.originalId = track.id;
			originalQuery = `${track.name} - ${track.artists.map((a: any) => a.name).join(', ')}`;
			originalResults = [];
		} else {
			$form.coverId = track.id;
			coverQuery = `${track.name} - ${track.artists.map((a: any) => a.name).join(', ')}`;
			coverResults = [];
		}
	}
</script>

<Metadata title="Add a Cover" description="Share your favorite music cover story with the Fusion community." />

<main class="mx-auto mt-20 max-w-4xl px-4 py-12">
	<h1 class="mb-12 font-serif text-5xl font-bold italic tracking-tighter uppercase md:text-7xl">
		Add a Cover
	</h1>

	<form method="POST" action="?/create" use:enhance class="space-y-20">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
			<!-- Original Song Search -->
			<div class="relative space-y-6">
				<div class="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-serif text-sm font-bold text-white">1</div>
				<h2 class="font-serif text-3xl font-bold tracking-tighter uppercase italic">seleCt tHE ORIGInal</h2>
				
				<div class="space-y-4">
					<Input
						placeholder="Search for original..."
						bind:value={originalQuery}
						error={$errors.originalId?.[0]}
						oninput={() => search(originalQuery, 'original')}
					/>
					<input type="hidden" name="originalId" bind:value={$form.originalId} />

					{#if originalResults.length > 0}
						<div class="zine-border zine-scrollbar zine-scrollbar-neon max-h-80 overflow-y-auto bg-black shadow-[10px_10px_0px_var(--neon-green)]">
							{#each originalResults as track}
								<button
									type="button"
									class="flex w-full items-center gap-4 border-b border-white/5 p-3 text-left hover:bg-neon-green group"
									onclick={() => selectTrack(track, 'original')}
								>
									<div class="h-12 w-12 shrink-0 zine-border overflow-hidden">
										<img src={track.album.images[track.album.images.length - 1]?.url} alt="" class="h-full w-full object-cover grayscale group-hover:grayscale-0" />
									</div>
									<div class="min-w-0 flex-1">
										<p class="truncate font-sans text-xs font-bold uppercase text-white group-hover:text-black">{track.name}</p>
										<p class="truncate font-sans text-[10px] text-white/40 uppercase group-hover:text-black/60">
											{track.artists.map((a: any) => a.name).join(', ')} • {new Date(track.album.release_date).getFullYear()}
										</p>
									</div>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Cover Song Search -->
			<div class="relative space-y-6">
				<div class="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-serif text-sm font-bold text-white">2</div>
				<h2 class="font-serif text-3xl font-bold tracking-tighter uppercase italic">seleCt tHE cOVER</h2>
				
				<div class="space-y-4">
					<Input
						placeholder="Search for cover..."
						bind:value={coverQuery}
						error={$errors.coverId?.[0]}
						oninput={() => search(coverQuery, 'cover')}
					/>
					<input type="hidden" name="coverId" bind:value={$form.coverId} />

					{#if coverResults.length > 0}
						<div class="zine-border zine-scrollbar zine-scrollbar-purple max-h-80 overflow-y-auto bg-black shadow-[10px_10px_0px_var(--purple)]">
							{#each coverResults as track}
								<button
									type="button"
									class="flex w-full items-center gap-4 border-b border-white/5 p-3 text-left hover:bg-purple group"
									onclick={() => selectTrack(track, 'cover')}
								>
									<div class="h-12 w-12 shrink-0 zine-border overflow-hidden">
										<img src={track.album.images[track.album.images.length - 1]?.url} alt="" class="h-full w-full object-cover grayscale group-hover:grayscale-0" />
									</div>
									<div class="min-w-0 flex-1">
										<p class="truncate font-sans text-xs font-bold uppercase text-white group-hover:text-white">{track.name}</p>
										<p class="truncate font-sans text-[10px] text-white/40 uppercase group-hover:text-white/60">
											{track.artists.map((a: any) => a.name).join(', ')} • {new Date(track.album.release_date).getFullYear()}
										</p>
									</div>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>

		<div class="relative space-y-8">
			<div class="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-serif text-sm font-bold text-white">3</div>
			<h2 class="font-serif text-3xl font-bold tracking-tighter uppercase italic">tHE stORy</h2>
			<Input
				label="The Story (Description)"
				name="description"
				placeholder="Why does this cover work? What's the narrative?"
				bind:value={$form.description}
			/>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<Input
					label="Contributor Name"
					name="contributor"
					placeholder="Your name..."
					bind:value={$form.contributor}
				/>
				<Input
					label="Tags (comma separated)"
					name="tags"
					placeholder="jazz, acoustic, moody..."
					bind:value={$form.tags}
				/>
			</div>
		</div>

		<div class="pt-8">
			<Button type="submit" size="lg" class="w-full md:w-auto">
				Submit Cover Story
			</Button>
		</div>
	</form>
</main>
