<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Контакты — Yoga Maya</title>
</svelte:head>

<section class="hero-small">
	<div class="container">
		<h1>Контакты</h1>
		<p>Напишите нам — ответим быстро</p>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="contacts-grid">
			{#if data.siteConfig.phone}
				<a
					href="tel:{data.siteConfig.phone}"
					class="contact-card"
					data-track-id="contacts-phone"
				>
					<div class="contact-icon">📞</div>
					<div>
						<div class="contact-label">Телефон</div>
						<div class="contact-value">{data.siteConfig.phone}</div>
					</div>
				</a>
			{/if}

			{#if data.siteConfig.telegram}
				<a
					href="https://t.me/{data.siteConfig.telegram.replace('@', '')}"
					target="_blank"
					rel="noopener"
					class="contact-card"
					data-track-id="contacts-telegram"
				>
					<div class="contact-icon">✈️</div>
					<div>
						<div class="contact-label">Telegram</div>
						<div class="contact-value">{data.siteConfig.telegram}</div>
					</div>
				</a>
			{/if}

			{#if data.siteConfig.whatsapp}
				<a
					href="https://wa.me/{data.siteConfig.whatsapp.replace(/\D/g, '')}"
					target="_blank"
					rel="noopener"
					class="contact-card"
					data-track-id="contacts-whatsapp"
				>
					<div class="contact-icon">💬</div>
					<div>
						<div class="contact-label">WhatsApp</div>
						<div class="contact-value">{data.siteConfig.whatsapp}</div>
					</div>
				</a>
			{/if}
		</div>

		<div id="privacy" class="privacy-section">
			<h2>Политика конфиденциальности</h2>
			<p>
				Мы собираем только необходимые данные (имя, телефон, email) для обратной связи
				с вами по вопросам обучения испанскому языку. Данные не передаются третьим лицам.
				Вы можете в любой момент отозвать согласие, написав нам.
			</p>
		</div>
	</div>
</section>

<style>
	.hero-small {
		background: var(--color-beige);
		padding: 3.5rem 0;
		text-align: center;
	}

	.hero-small h1 { font-size: clamp(1.6rem, 3.5vw, 2.4rem); margin-bottom: 0.5rem; }
	.hero-small p { color: var(--color-text-muted); }

	.contacts-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 480px;
	}

	.contact-card {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		background: var(--color-white);
		border: 1px solid var(--color-beige);
		border-radius: 16px;
		padding: 1.25rem 1.5rem;
		text-decoration: none;
		color: inherit;
		transition: box-shadow 0.2s, transform 0.2s;
	}

	.contact-card:hover {
		box-shadow: 0 4px 16px rgba(0,0,0,0.08);
		transform: translateY(-2px);
	}

	.contact-icon { font-size: 1.75rem; flex-shrink: 0; }

	.contact-label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-text-muted);
		margin-bottom: 0.125rem;
	}

	.contact-value { font-weight: 600; font-size: 1rem; }

	.privacy-section {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-beige);
		max-width: 680px;
	}

	.privacy-section h2 { font-size: 1.25rem; margin-bottom: 0.75rem; }
	.privacy-section p { color: var(--color-text-muted); line-height: 1.7; font-size: 0.9rem; }
</style>
