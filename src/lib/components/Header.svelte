<script lang="ts">
	import { page } from '$app/state';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import YogaAppMenu from '$stylist/yoga/component/organism/yoga-app-menu/index.svelte';
	import { YOGA_LOCALE_NAME } from '$stylist/yoga/const/record/yoga-locale-name';
	import { YOGA_MENU_TEXT } from '$stylist/yoga/const/record/yoga-menu-text';
	import type { ContractYogaMenu } from '$stylist/yoga/interface/contract/yoga-menu';
	import type { ContractYogaViewer } from '$stylist/yoga/interface/contract/yoga-viewer';
	import type { YogaLocale } from '$stylist/yoga/type/alias/yoga-locale';

	interface Props {
		menu: ContractYogaMenu;
		locale: YogaLocale;
		viewer: ContractYogaViewer | null;
	}

	let { menu, locale, viewer }: Props = $props();

	// Phone and tablet: a Google apps top bar (burger, logo, account) opening the
	// YogaAppMenu sheet. Desktop: the main pages, language, account and the CTA.
	let menuOpen = $state(false);

	const text = $derived(YOGA_MENU_TEXT[locale]);
	const returnTo = $derived(page.url.pathname + page.url.search);
	const locales = Object.keys(YOGA_LOCALE_NAME) as YogaLocale[];
	const desktopLinks = $derived([
		...menu.links.learn.filter((link) => link.id !== 'home' && link.id !== 'apply'),
		...menu.links.contact.filter((link) => link.id === 'contacts')
	]);
</script>

{#snippet logo()}
	<a href="/" class="logo">
		<span class="logo-icon" aria-hidden="true">🌿</span>
		<span class="logo-text">{text.brand}</span>
	</a>
{/snippet}

<header class="site-header">
	<div class="container">
		<button
			class="icon-button burger"
			onclick={() => (menuOpen = true)}
			aria-label={text.openMenu}
			aria-expanded={menuOpen}
			aria-haspopup="dialog"
		>
			<Icon name="menu" size={24} aria-hidden="true" />
		</button>

		{@render logo()}

		<nav class="main-nav" aria-label={text.menu}>
			{#each desktopLinks as link (link.id)}
				<a
					href={link.href}
					class="nav-link"
					aria-current={page.url.pathname === link.href ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<form class="lang-switch" method="POST" action="/lang" aria-label={text.language}>
			<input type="hidden" name="to" value={returnTo} />
			{#each locales as code (code)}
				<button
					type="submit"
					name="lang"
					value={code}
					class="lang-option"
					lang={code}
					title={YOGA_LOCALE_NAME[code]}
					aria-current={code === locale ? 'true' : undefined}
				>
					{code.toUpperCase()}
				</button>
			{/each}
		</form>

		{#if viewer}
			<a href="/account" class="icon-button account" aria-label={text.account} title={viewer.name}>
				<span class="avatar" aria-hidden="true">{viewer.name.slice(0, 1).toUpperCase()}</span>
			</a>
		{:else}
			<a href={`/auth/login?to=${encodeURIComponent(returnTo)}`} class="sign-in">
				<Icon name="user" size={20} aria-hidden="true" />
				<span class="sign-in-label">{text.signIn}</span>
			</a>
		{/if}

		<a href="/apply" class="nav-cta" data-track-id="header-cta">{text.apply}</a>
	</div>
</header>

<YogaAppMenu bind:open={menuOpen} class="site-menu" {menu} {locale} {viewer} {returnTo}>
	{#snippet brand()}
		{@render logo()}
	{/snippet}
</YogaAppMenu>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(250, 250, 248, 0.95);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--color-beige);
	}

	.container {
		max-width: 1140px;
		margin: 0 auto;
		padding: 0 1.25rem;
		height: 64px;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.2rem;
		color: var(--color-text);
		flex-shrink: 0;
	}

	.logo-icon { font-size: 1.4rem; }

	.main-nav {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin-left: auto;
	}

	.nav-link {
		padding: 0.4rem 0.75rem;
		border-radius: 8px;
		text-decoration: none;
		color: var(--color-text-muted);
		font-size: 0.9rem;
		white-space: nowrap;
		transition: color 0.15s, background 0.15s;
	}

	.nav-link:hover,
	.nav-link[aria-current] {
		color: var(--color-text);
		background: var(--color-beige);
	}

	.lang-switch {
		display: flex;
		flex-shrink: 0;
		padding: 2px;
		border: 1px solid #e8dece;
		border-radius: 999px;
	}

	.lang-option {
		min-width: 2.25rem;
		min-height: 2rem;
		padding: 0 0.4rem;
		border: 0;
		border-radius: 999px;
		background: none;
		color: var(--color-text-muted);
		font: inherit;
		font-size: 0.75rem;
		font-weight: 700;
		cursor: pointer;
	}

	.lang-option[aria-current] {
		background: var(--color-beige);
		color: var(--color-text);
	}

	.icon-button {
		display: grid;
		flex-shrink: 0;
		place-items: center;
		width: 44px;
		height: 44px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: none;
		color: var(--color-text);
		cursor: pointer;
		transition: background 0.15s;
	}

	.icon-button:hover { background: var(--color-beige); }

	.avatar {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--color-coral);
		color: #fff;
		font-size: 0.9rem;
		font-weight: 700;
	}

	.sign-in {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.4rem;
		min-height: 40px;
		padding: 0 0.9rem;
		border: 1px solid #e8dece;
		border-radius: 999px;
		color: var(--color-text);
		font-size: 0.85rem;
		font-weight: 600;
		text-decoration: none;
	}

	.sign-in:hover { background: var(--color-beige); }

	.nav-cta {
		flex-shrink: 0;
		padding: 0.6rem 1.25rem;
		border-radius: 10px;
		background: var(--color-coral);
		color: #fff;
		font-weight: 600;
		text-decoration: none;
		font-size: 0.9rem;
	}

	.burger {
		display: none;
		margin-left: -0.5rem;
	}

	/* Google apps top bar: burger, logo, account; everything else lives in the menu
	   sheet and the bottom bar. */
	@media (max-width: 1023px) {
		.main-nav,
		.lang-switch,
		.nav-cta {
			display: none;
		}

		.burger { display: grid; }

		.container {
			gap: 0.5rem;
			height: 56px;
			padding: 0 0.75rem 0 1rem;
		}

		.account,
		.sign-in {
			margin-left: auto;
		}
	}

	@media (max-width: 420px) {
		.sign-in {
			width: 44px;
			padding: 0;
			justify-content: center;
			border: 0;
		}

		.sign-in-label { display: none; }
	}

	/* The sheet takes the site palette. */
	:global(.site-menu) {
		--color-background-primary: var(--color-white);
		--color-background-secondary: var(--color-beige);
		--color-text-primary: var(--color-text);
		--color-text-secondary: var(--color-text-muted);
		--color-border-primary: #e8dece;
		--color-primary-500: var(--color-coral);
		--color-primary-100: #fbe1d9;
		--color-text-inverse: #fff;
		font-family: var(--font-sans);
	}
</style>
