<script lang="ts">
	import { siteConfig } from '$lib/config/site';

	let {
		title = '',
		description = siteConfig.description,
		image = siteConfig.ogImage,
		canonical = siteConfig.url,
		type = 'website'
	} = $props<{
		title?: string;
		description?: string;
		image?: string;
		canonical?: string;
		type?: string;
	}>();

	const pageTitle = $derived(title ? `${title} | ${siteConfig.name}` : siteConfig.name);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonical} />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />

	<!-- Keywords -->
	<meta name="keywords" content={siteConfig.keywords.join(', ')} />
	<meta name="author" content={siteConfig.author} />
</svelte:head>
