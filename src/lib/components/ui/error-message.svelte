<script lang="ts">
	import { CircleOff } from "lucide-svelte";

	export let error: string;
	export let banner: boolean = false;
</script>

<div class="error" class:banner>
	<CircleOff />
	<span class="error__message">{error}</span>
</div>

<style lang="scss">
	.error {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		color: var(--red-9);
		margin-block-start: var(--space-s);

		&.banner {
			background-color: var(--red-3);
			padding-block: var(--space-s);
			padding-inline: var(--space-m);
			border-radius: var(--radius-s);
		}
	}
</style>
