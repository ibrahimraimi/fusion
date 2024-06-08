<script lang="ts">
	import { page } from "$app/stores";
	import autosize from "svelte-autosize";
	import type { PageData } from "./$types";
	import { browser } from "$app/environment";
	import { superForm } from "sveltekit-superforms/client";
	import type { FormEventHandler } from "svelte/elements";

	import Step from "$lib/components/step.svelte";
	import Steps from "$lib/components/steps.svelte";
	import { getMaxCharacterHelpText } from "$lib/helpers";
	import SongSelect from "$lib/components/song-select.svelte";
	import ErrorMessage from "$lib/components/ui/error-message.svelte";
	import NewCoverIcon from "$lib/components/ui/new-cover-icon.svelte";
	import { MAX_CONTRIBUTOR_CHARS, MAX_DESCRIPTION_CHARS } from "$lib/constants";
	import LoaderIcon from "~icons/ri/loader-4-line";

	export let data: PageData;

	const { form, errors, enhance, submitting, delayed } = superForm(data.form, {
		dataType: "json",
		defaultValidator: "clear",
		scrollToError: "smooth"
	});

	$form.contributor = browser ? window.localStorage.getItem("contributor") ?? "" : "";

	const handleDescriptionInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
		$form.description = e.currentTarget.value;
		// Replace any newlines with spaces and trim
		$form.description = $form.description.replace(/\r?\n|\r/g, " ").trimStart();

		$form.description = $form.description;
	};

	const handleContributorInput: FormEventHandler<HTMLInputElement> = (e) => {
		$form.contributor = e.currentTarget.value;
		// Trim spaces
		$form.contributor = $form.contributor.trimStart();
	};

	const handleSubmit = () => {
		// Save name to local storage for reuse
		if (browser) window.localStorage.setItem("contributor", $form.contributor);
	};
</script>

<svelte:head>
	<title>Add a cover</title>
	<meta name="description" content="Upload a fresh cover to the catalogue." />
	<link rel="canonical" href={`https://fusion.ibrahimraimi.com${$page.url.pathname}`} />
</svelte:head>

<form class="submit__form" method="POST" use:enhance>
	<h1 class="header">Add a cover</h1>
	<Steps>
		<Step title="Select the original">
			<SongSelect name="original" bind:value={$form.original} errors={$errors.original} />
		</Step>
		<Step title="Select the cover">
			<SongSelect name="cover" bind:value={$form.cover} errors={$errors.cover} />
		</Step>
		<Step title="Add thoughts">
			<label>
				<div class="label">
					Description <span class="optional">optional</span>
				</div>
				<textarea
					on:input={handleDescriptionInput}
					bind:value={$form.description}
					use:autosize
					name="description"
					class="input"
					minRows={2}
					maxRows={4}
					placeholder="What’s different about this cover?"
				/>
				<div
					class="help__text"
					class:warning={$form.description && $form.description.length > MAX_DESCRIPTION_CHARS}
				>
					{getMaxCharacterHelpText($form.description ?? "", MAX_DESCRIPTION_CHARS)}
				</div>
			</label>
			<label>
				<div class="label">
					Your first name <span class="optional">optional</span>
				</div>
				<input
					on:input={handleContributorInput}
					bind:value={$form.contributor}
					name="contributor"
					type="text"
					class="input"
					maxlength={MAX_CONTRIBUTOR_CHARS}
					placeholder="Agnetha"
				/>
			</label>
			{#if $errors?._errors}
				{#each $errors._errors as error}
					<ErrorMessage {error} banner />
				{/each}
			{/if}
		</Step>
	</Steps>

	<button
		disabled={$submitting}
		class="submit__button h-11 rotate-3 items-center justify-center rounded-sm bg-white px-8 py-6 font-medium leading-none text-black outline-none transition-all hover:ring-4 focus-visible:ring-4 active:scale-[0.98] active:ring-2"
		type="submit"
		on:click={handleSubmit}
	>
		{#if $delayed}
			<div class="spinner">
				<LoaderIcon />
			</div>
		{:else}
			<NewCoverIcon />
		{/if}
		Submit
	</button>
</form>

<style lang="scss">
	.submit__form {
		inline-size: 100%;
		max-inline-size: 50ch;
		margin-inline: auto;
		padding-inline: var(--space-l);
		padding-block-end: var(--space-2xl);
	}

	.header {
		text-align: center;
		font-size: var(--step-4);
		padding-block: var(--space-m) var(--space-xl);
	}

	.submit__button {
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-inline: auto;

		:global(svg) {
			width: var(--space-xl);
		}
	}

	.spinner {
		animation: spin 0.7s linear infinite;
	}

	.label {
		display: block;
		padding-block-end: var(--space-xs);
	}

	.optional {
		font-size: var(--step--1);
		font-style: italic;
	}

	.input {
		border: none;
		display: block;
		background: var(--mauve-3);
		border-radius: var(--radius-m);
		padding-block: var(--space-s);
		padding-inline: var(--space-m);
		width: 100%;
		resize: none;

		&::placeholder {
			color: var(--mauve-8);
		}

		&:focus {
			outline: 3px solid #fee376;
			outline-offset: 3px;
		}
	}

	.help__text {
		padding-block-start: var(--space-xs);
		font-size: var(--step--1);
		font-variant-numeric: tabular-nums;

		&.warning {
			color: var(--red-9);
			font-weight: var(--font-weight-bold);
		}
	}
</style>
