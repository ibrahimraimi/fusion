<script lang="ts">
	import dayjs from "dayjs";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import { confetti, type ConfettiOptions } from "@tsparticles/confetti";

	import { TAGS } from "$lib/constants";
	import Tag from "$lib/components/tag.svelte";
	import Sparkle from "$lib/components/ui/sparkle.svelte";
	import TagCloud from "$lib/components/tag-cloud.svelte";
	import { getArtistLink, getSortedTags } from "$lib/helpers.js";
	import CoverComparison from "$lib/components/cover-comparision.svelte";

	export let data: PageData;

	const isNew = $page.url.searchParams.get("new") === "true" ? true : false;

	const formattedDate = dayjs(data.created_at).format("MMMM D, YYYY");

	onMount(async () => {
		const fireConfetti = (placement: "left" | "right" | "bottom") => {
			const center = 90;

			const minWidth = 400;
			const maxWidth = 1600;

			const interpolate = (minValue: number, maxValue: number) =>
				((window.innerWidth - minWidth) / (maxWidth - minWidth)) * (maxValue - minValue) + minValue;

			const scalar = interpolate(1.4, 1.8);
			const velocity = interpolate(85, 120);
			const angle = interpolate(20, 45);
			const count = interpolate(40, 80);
			const spread = interpolate(8, 20);

			const sharedProps: Partial<ConfettiOptions> = {
				scalar: scalar,
				colors: ["#ff69b4"],
				shapes: ["square"],
				gravity: 2,
				ticks: 30,
				disableForReducedMotion: true
			};

			const directionalProps: Record<"left" | "right" | "bottom", Partial<ConfettiOptions>> = {
				left: {
					count,
					startVelocity: velocity - 10,
					angle: center - angle,
					origin: { x: 0, y: 1 },
					spread
				},
				right: {
					count,
					startVelocity: velocity - 10,
					angle: center + angle,
					origin: { x: 1, y: 1 },
					spread
				},
				bottom: {
					count: count * 2,
					startVelocity: velocity,
					angle: center,
					origin: { x: 0.5, y: 1 },
					spread: spread * 2.5
				}
			};

			confetti({
				...sharedProps,
				...directionalProps[placement]
			});
		};

		if (isNew) {
			setTimeout(() => fireConfetti("left"), 1000);
			setTimeout(() => fireConfetti("right"), 1600);
			setTimeout(() => fireConfetti("bottom"), 3000);
		}
	});
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta
		name="description"
		content={data.description ?? "Some covers deliver the age-old simple pleasures of drag."}
	/>
	<link rel="canonical" href={`https://fusion.ibrahimraimi.com${$page.url.pathname}`} />
	<meta property="og:image" content={`${$page.url.pathname}/og.png`} />
	<meta property="og:image:alt" content={data.pageTitle} />
</svelte:head>

<header class="header">
	<h1 class="title">
		{data.pageTitle}{#if isNew}<Sparkle />{/if}
	</h1>
	<div class="subtitle">
		<a class="artist" href={getArtistLink(data.cover.artists[0])}>{data.cover.artists[0]}</a>
		covering{" "}
		<a class="artist" href={getArtistLink(data.original.artists[0])}>{data.original.artists[0]}</a>
	</div>
	{#if data.description}
		<p class="description">{data.description}</p>
	{/if}
	{#if data.tags}
		<TagCloud>
			{#each getSortedTags(data.tags) as tag}
				<Tag text={TAGS[tag].label} url={`/?tag=${tag}`} />
			{/each}
		</TagCloud>
	{/if}
</header>
<CoverComparison cover={data} />
<footer class="footer">
	<span
		>Added {data.contributor && `by ${data.contributor} on `}
		<time datetime={data.created_at}>{formattedDate}</time></span
	>
</footer>

<style lang="scss">
	.header {
		padding-block-start: var(--space-xl);
		padding-block-end: var(--space-3xl);
		padding-inline: var(--space-l);
		@supports (padding: max(0px)) {
			padding-inline-start: max(var(--space-l), env(safe-area-inset-left));
			padding-inline-end: max(var(--space-l), env(safe-area-inset-right));
		}
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		text-wrap: balance;
	}

	.title {
		position: relative;
	}

	.subtitle {
		font-size: var(--step-2);
		line-height: var(--line-height-h3);
		color: var(--mauve-11);
		margin-block-start: var(--space-m);
		margin-block-end: var(--space-l);
		text-wrap: balance;
	}

	.artist {
		font-weight: var(--font-weight-bold);

		&:hover {
			text-decoration: underline;
			text-decoration-color: var(--mauve-9);
		}
	}

	.description {
		font-size: var(--step-1);
		text-wrap: balance;
		margin-block-end: var(--space-l);
		max-width: 40ch;
	}

	.footer {
		padding-block: var(--space-2xl);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
