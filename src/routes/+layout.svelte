<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ThemeProvider from '$stylist/theme/component/atom/theme-provider/index.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();
</script>

<svelte:head>
	<meta name="description" content="Yoga Maya — клуб испанского языка «Испанский с мамой». Занятия для детей и взрослых." />
</svelte:head>

<ThemeProvider>
	<div class="site-wrapper">
		<Header />
		<main class="site-main">
			{@render children()}
		</main>
		<Footer
			whatsapp={data.siteConfig.whatsapp}
			telegram={data.siteConfig.telegram}
			phone={data.siteConfig.phone}
		/>
	</div>
</ThemeProvider>

<style>
	:global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }

	:global(:root) {
		--color-white:      #FAFAF8;
		--color-beige:      #F5EFE6;
		--color-coral:      #E8826A;
		--color-lavender:   #B8A9D4;
		--color-sage:       #8FAF8C;
		--color-text:       #2D2A26;
		--color-text-muted: #7A736A;
		--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
	}

	:global(body) {
		font-family: var(--font-sans);
		background: var(--color-white);
		color: var(--color-text);
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
	}

	:global(h1, h2, h3, h4, h5, h6) { line-height: 1.25; }
	:global(img) { max-width: 100%; height: auto; }
	:global(a) { color: inherit; }

	.site-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	.site-main { flex: 1; }

	:global(.container) {
		max-width: 1140px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	:global(.section) {
		padding: 4rem 0;
	}

	:global(.section-title) {
		font-size: clamp(1.5rem, 4vw, 2.2rem);
		margin-bottom: 0.5rem;
	}

	:global(.section-subtitle) {
		color: var(--color-text-muted);
		margin-bottom: 2.5rem;
		font-size: 1.05rem;
	}

	:global(.grid-cards) {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.25rem;
	}
</style>
