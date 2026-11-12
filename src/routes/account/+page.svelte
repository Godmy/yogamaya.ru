<script lang="ts">
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import { YOGA_MENU_TEXT } from '$stylist/yoga/const/record/yoga-menu-text';
	import { createYogaMenu } from '$stylist/yoga/function/create/yoga-menu';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// The hooks let only signed-in users here; the items are the menu's «Кабинет».
	const viewer = $derived(data.viewer!);
	const text = $derived(YOGA_MENU_TEXT[data.locale]);
	const items = $derived(
		createYogaMenu({ locale: data.locale, role: viewer.role }).links.account.filter(
			(item) => item.id !== 'profile'
		)
	);
</script>

<svelte:head>
	<title>{text.account} — Yoga Maya</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="account">
	<div class="container">
		<header class="account-head">
			<span class="avatar" aria-hidden="true">{viewer.name.slice(0, 1).toUpperCase()}</span>
			<div>
				<h1>{viewer.name}</h1>
				<p>{text[`role-${viewer.role}`]}</p>
			</div>
		</header>

		<ul class="account-items">
			{#each items as item (item.id)}
				<li>
					{#if item.disabled}
						<span class="account-item" aria-disabled="true">
							<Icon name={item.icon ?? 'file'} size={24} aria-hidden="true" />
							<span class="label">{item.label}</span>
							<span class="badge">{item.badge}</span>
						</span>
					{:else}
						<a class="account-item" href={item.href}>
							<Icon name={item.icon ?? 'file'} size={24} aria-hidden="true" />
							<span class="label">{item.label}</span>
						</a>
					{/if}
				</li>
			{/each}
		</ul>

		<form method="POST" action="/auth/logout">
			<button type="submit" class="sign-out">
				<Icon name="lock" size={20} aria-hidden="true" />
				{text.signOut}
			</button>
		</form>
	</div>
</section>

<style>
	.account { padding: 2rem 0 3rem; }

	.account-head {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.account-head h1 { font-size: 1.4rem; }
	.account-head p { color: var(--color-text-muted); }

	.avatar {
		display: grid;
		flex-shrink: 0;
		place-items: center;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: var(--color-coral);
		color: #fff;
		font-size: 1.4rem;
		font-weight: 700;
	}

	.account-items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 0.5rem;
		list-style: none;
	}

	.account-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-height: 56px;
		padding: 0 1rem;
		border-radius: 16px;
		background: var(--color-beige);
		font-weight: 500;
		text-decoration: none;
	}

	a.account-item:hover { background: #efe5d6; }
	.account-item[aria-disabled] { opacity: 0.6; }
	.label { flex: 1; min-width: 0; }

	.badge {
		padding: 0.1rem 0.5rem;
		border-radius: 999px;
		background: var(--color-white);
		font-size: 0.75rem;
	}

	.sign-out {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 44px;
		margin-top: 2rem;
		padding: 0 1.25rem;
		border: 1px solid #ddd5c8;
		border-radius: 999px;
		background: none;
		color: var(--color-text);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}
</style>
