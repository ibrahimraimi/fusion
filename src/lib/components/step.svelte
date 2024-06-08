<script lang="ts">
	export let title: string;
</script>

<li class="step">
	<h2 class="step__title">{title}</h2>
	<div class="step__content">
		<slot />
	</div>
</li>

<style lang="scss">
	.step {
		display: grid;
		grid-template:
			"number title"
			"line content";
		grid-template-columns: var(--space-2xl) 1fr;
		counter-increment: step;
		column-gap: var(--space-m);

		&::before {
			content: counter(step);
			display: flex;
			align-items: center;
			justify-content: center;
			grid-area: number;
			font-weight: var(--font-weight-bold);
			background: var(--mauve-4);
			border-radius: var(--radius-full);
			width: var(--space-2xl);
			height: var(--space-2xl);
		}

		&:not(:last-child)::after {
			content: "";
			grid-area: line;
			display: block;
			justify-self: center;
			width: 3px;
			height: 100%;
			background: var(--mauve-4);
		}

		@media (max-width: 480px) {
			grid-template:
				"number title"
				"content content";
			grid-template-columns: var(--space-2xl) 1fr;

			&:not(:last-child)::after {
				content: unset;
			}
		}
	}

	.step__title {
		font-size: var(--step-1);
		grid-area: title;
		align-self: center;
	}

	.step__content {
		grid-area: content;
		padding-block-start: var(--space-s);
		padding-block-end: var(--space-3xl);
		display: flex;
		flex-direction: column;
		gap: var(--space-l);
	}
</style>
