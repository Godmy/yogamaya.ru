<script lang="ts">
	import { page } from '$app/stores';

	const nav = [
		{ href: '/',         label: 'Главная' },
		{ href: '/spanish',  label: 'Испанский' },
		{ href: '/teachers', label: 'Преподаватели' },
		{ href: '/classes',  label: 'Форматы' },
		{ href: '/apply',    label: 'Записаться' },
		{ href: '/contacts', label: 'Контакты' }
	];

	let menuOpen = $state(false);
</script>

<header class="site-header">
	<div class="container">
		<a href="/" class="logo">
			<span class="logo-icon">🌿</span>
			<span class="logo-text">Yoga Maya</span>
		</a>

		<nav class="main-nav" class:open={menuOpen}>
			{#each nav as item}
				<a
					href={item.href}
					class="nav-link"
					class:active={$page.url.pathname === item.href}
					onclick={() => (menuOpen = false)}
				>
					{item.label}
				</a>
			{/each}
			<a href="/apply" class="nav-cta" onclick={() => (menuOpen = false)}>
				Записаться
			</a>
		</nav>

		<button
			class="burger"
			aria-label="Меню"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span></span><span></span><span></span>
		</button>
	</div>
</header>

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
		gap: 2rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
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
		transition: color 0.15s, background 0.15s;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--color-text);
		background: var(--color-beige);
	}

	.nav-cta {
		display: none; /* shown only in mobile menu */
		padding: 0.6rem 1.25rem;
		border-radius: 10px;
		background: var(--color-coral);
		color: #fff;
		font-weight: 600;
		text-decoration: none;
		font-size: 0.95rem;
	}

	.burger {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		margin-left: auto;
	}

	.burger span {
		display: block;
		width: 24px;
		height: 2px;
		background: var(--color-text);
		border-radius: 2px;
		transition: transform 0.2s;
	}

	@media (max-width: 768px) {
		.burger { display: flex; }

		.main-nav {
			position: fixed;
			inset: 64px 0 0 0;
			background: var(--color-white);
			flex-direction: column;
			align-items: stretch;
			padding: 1.5rem 1.25rem;
			gap: 0.5rem;
			transform: translateX(100%);
			transition: transform 0.25s ease;
		}

		.main-nav.open { transform: none; }

		.nav-link {
			font-size: 1.1rem;
			padding: 0.75rem 1rem;
		}

		.nav-cta {
			display: block;
			text-align: center;
			margin-top: 0.5rem;
		}
	}
</style>
