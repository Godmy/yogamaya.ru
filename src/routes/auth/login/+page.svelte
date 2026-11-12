<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// The Telegram widget is a script that renders an iframe in place; a script in the
	// markup would not run after client-side navigation, so it is mounted here.
	let widget = $state<HTMLDivElement>();
	$effect(() => {
		if (!widget || !data.isConfigured || !data.botUsername) return;
		const script = document.createElement('script');
		script.async = true;
		script.src = 'https://telegram.org/js/telegram-widget.js?22';
		script.dataset.telegramLogin = data.botUsername;
		script.dataset.size = 'large';
		script.dataset.radius = '20';
		script.dataset.userpic = 'false';
		script.dataset.authUrl = '/auth/telegram/callback';
		script.dataset.requestAccess = 'write';
		widget.replaceChildren(script);
		return () => widget?.replaceChildren();
	});
</script>

<svelte:head>
	<title>Вход — Yoga Maya</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="auth-page">
	<div class="auth-card">
		<span class="auth-logo" aria-hidden="true">🌿</span>
		<h1>Вход в кабинет</h1>
		<p class="auth-copy">
			Расписание, материалы курсов, домашние задания и оплата — в одном месте. Входите через
			Telegram: пароль не нужен.
		</p>

		{#if data.isConfigured}
			<div class="telegram-widget" bind:this={widget}></div>
		{:else}
			<p class="auth-note">Вход ещё не настроен на сервере. Напишите нам — запишем вручную.</p>
		{/if}

		{#if data.error}
			<p class="auth-error" role="alert">Не удалось войти ({data.error}). Попробуйте ещё раз.</p>
		{/if}

		<a href="/apply" class="auth-trial">Ещё не учитесь у нас? Пробный урок бесплатно</a>
	</div>
</section>

<style>
	.auth-page {
		display: grid;
		place-items: center;
		min-height: 70dvh;
		padding: 2rem 1rem;
	}

	.auth-card {
		display: grid;
		justify-items: center;
		gap: 1rem;
		width: min(100%, 420px);
		padding: 2rem 1.5rem;
		border-radius: 28px;
		background: var(--color-beige);
		text-align: center;
	}

	.auth-logo { font-size: 2.5rem; }
	h1 { font-size: 1.6rem; }

	.auth-copy,
	.auth-note {
		color: var(--color-text-muted);
	}

	.telegram-widget { min-height: 44px; }

	.auth-error { color: #b42318; }

	.auth-trial {
		color: var(--color-coral);
		font-weight: 600;
		text-decoration: none;
	}
</style>
