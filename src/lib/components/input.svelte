<script lang="ts">
	let {
		value = $bindable(),
		placeholder = '',
		type = 'text',
		name = '',
		label = '',
		error = '',
		multiline = false,
		rows = 4,
		oninput = ((e: any) => {}) as any,
		class: className = ''
	} = $props();
</script>

<div class="flex flex-col gap-2 {className}">
	{#if label}
		<label for={name} class="font-sans text-xs font-bold tracking-widest uppercase text-white/60">
			{label}
		</label>
	{/if}
	
	{#if multiline}
		<textarea
			id={name}
			{name}
			{placeholder}
			{rows}
			bind:value
			{oninput}
			class="zine-border bg-black p-4 font-sans text-sm text-white placeholder:text-white/20 focus:border-neon-green focus:ring-0 resize-none"
			class:border-orange={error}
		></textarea>
	{:else}
		<input
			id={name}
			{name}
			{type}
			{placeholder}
			bind:value
			{oninput}
			class="zine-border bg-black p-4 font-sans text-sm text-white placeholder:text-white/20 focus:border-neon-green focus:ring-0"
			class:border-orange={error}
		/>
	{/if}

	{#if error}
		<span class="font-sans text-[10px] font-bold tracking-tight text-orange uppercase">{error}</span>
	{/if}
</div>
