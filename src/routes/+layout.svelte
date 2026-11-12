<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ThemeProvider from '$stylist/theme/component/atom/theme-provider/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import YogaBottomBar from '$stylist/yoga/component/organism/yoga-bottom-bar/index.svelte';
	import { YOGA_MENU_TEXT } from '$stylist/yoga/const/record/yoga-menu-text';
	import { createYogaMenu } from '$stylist/yoga/function/create/yoga-menu';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	// One menu graph feeds the top bar sheet and the bottom bar of the phone layout.
	const text = $derived(YOGA_MENU_TEXT[data.locale]);
	const menu = $derived(
		createYogaMenu({
			locale: data.locale,
			role: data.viewer?.role,
			contacts: data.siteConfig
		})
	);
	// The trial lesson FAB stays off the form itself and the account pages.
	const showFab = $derived(!/^\/(apply|auth|account|admin)(\/|$)/.test(page.url.pathname));
</script>

<svelte:head>
	<meta name="description" content="Yoga Maya — клуб испанского языка «Испанский с мамой». Занятия для детей и взрослых." />
</svelte:head>

<ThemeProvider>
	<div class="site-wrapper">
		<Header {menu} locale={data.locale} viewer={data.viewer} />
		<main class="site-main">
			{@render children()}
		</main>
		<Footer
			whatsapp={data.siteConfig.whatsapp}
			telegram={data.siteConfig.telegram}
			phone={data.siteConfig.phone}
		/>
	</div>

	{#if showFab}
		<a href="/apply" class="site-fab" data-track-id="mobile-fab-trial">
			<Icon name="calendar" size={24} aria-hidden="true" />
			{text.trial}
		</a>
	{/if}
	<YogaBottomBar class="site-tabs" tabs={menu.tabs} path={page.url.pathname} label={text.tabs} />
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

	/* Phone layout: bottom navigation bar and the extended FAB above it. */
	.site-fab,
	:global(.site-tabs) {
		display: none;
	}

	:global(.site-tabs) {
		--color-background-primary: var(--color-white);
		--color-background-secondary: var(--color-beige);
		--color-text-primary: var(--color-text);
		--color-text-secondary: var(--color-text-muted);
		--color-primary-100: #fbe1d9;
		position: fixed;
		inset: auto 0 0;
		z-index: 90;
		border-top: 1px solid #e8dece;
	}

	.site-fab {
		position: fixed;
		right: 1rem;
		bottom: calc(5rem + env(safe-area-inset-bottom) + 1rem);
		z-index: 90;
		align-items: center;
		gap: 0.75rem;
		min-height: 56px;
		padding: 0 1.25rem 0 1rem;
		border-radius: 16px;
		background: var(--color-coral);
		color: #fff;
		font-weight: 600;
		text-decoration: none;
		box-shadow: 0 6px 18px rgba(232, 130, 106, 0.4);
	}

	@media (max-width: 767px) {
		:global(.site-tabs) { display: grid; }
		.site-fab { display: flex; }

		/* Room for the bottom bar and the FAB at the end of the footer. */
		.site-wrapper :global(.site-footer) { padding-bottom: calc(10rem + env(safe-area-inset-bottom)); }
		:global(.section) { padding: 2.5rem 0; }
	}
</style>
