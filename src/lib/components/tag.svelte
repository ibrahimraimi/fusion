<script lang="ts">
	export let text: string;
	export let count: number | null = 0;
	export let url: string;
	export let isActive: boolean = false;
</script>

{#if url}
	<a href={url} class="tag" class:active={isActive}>
		{text}
		{#if count}
			<span class="count">{count}</span>
		{/if}
	</a>
{:else}
	<div class="tag">
		{text}
		{#if count}
			<span class="count">{count}</span>
		{/if}
	</div>
{/if}

<style lang="scss">
	.tag {
		all: unset;
		display: inline-flex;
		gap: var(--space-xs);
		align-items: baseline;
		background: var(--mauve-3);
		color: var(--mauve-11);
		padding-block: var(--space-2xs);
		padding-inline: var(--space-s);
		border-radius: var(--radius-s);
		font-size: var(--step-0);
		flex-shrink: 0;
		text-wrap: nowrap;

		&.active {
			background: var(--mauve-12);
			color: var(--mauve-1);
		}
	}

	a.tag:hover:not(.active) {
		background: var(--mauve-4);
		cursor: pointer;
	}

	.count {
		color: var(--mauve-10);
		font-size: var(--step--1);
	}
</style>
