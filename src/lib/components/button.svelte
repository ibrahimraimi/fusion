<script lang="ts">
	let {
		type = 'button',
		variant = 'primary',
		size = 'md',
		disabled = false,
		children,
		onclick,
		class: className = '',
		...rest
	}: {
		type?: 'button' | 'submit' | 'reset';
		variant?: 'primary' | 'secondary' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		children?: import('svelte').Snippet;
		onclick?: () => void;
		class?: string;
		[key: string]: any;
	} = $props();
</script>

<button
	{type}
	{disabled}
	class="zine-border relative inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 {className}"
	class:bg-neon-green={variant === 'primary'}
	class:text-black={variant === 'primary'}
	class:shadow-[4px_4px_0px_white]={variant === 'primary' || variant === 'secondary' || variant === 'outline'}
	class:hover:shadow-[6px_6px_0px_white]={variant === 'primary' || variant === 'secondary'}
	class:bg-purple={variant === 'secondary'}
	class:text-white={variant === 'secondary'}
	class:bg-transparent={variant === 'outline'}
	class:hover:bg-white={variant === 'outline'}
	class:hover:text-black={variant === 'outline'}
	class:px-4={size === 'sm'}
	class:py-2={size === 'sm'}
	class:text-xs={size === 'sm'}
	class:px-6={size === 'md'}
	class:py-3={size === 'md'}
	class:text-sm={size === 'md'}
	class:px-8={size === 'lg'}
	class:py-4={size === 'lg'}
	class:text-base={size === 'lg'}
	{onclick}
>
	{@render children?.()}
</button>
