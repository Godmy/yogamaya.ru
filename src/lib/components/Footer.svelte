<script lang="ts">
	interface Props {
		whatsapp?: string;
		telegram?: string;
		phone?: string;
	}

	let { whatsapp = '', telegram = '', phone = '' }: Props = $props();
</script>

<footer class="site-footer">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-brand">
				<span class="footer-logo">🌿 Yoga Maya</span>
				<p>Духовный проект и клуб испанского языка "Испанский с мамой"</p>
			</div>

			<div class="footer-nav">
				<h4>Разделы</h4>
				<nav>
					<a href="/">Главная</a>
					<a href="/spanish">Испанский</a>
					<a href="/teachers">Преподаватели</a>
					<a href="/classes">Форматы</a>
					<a href="/apply">Записаться</a>
					<a href="/contacts">Контакты</a>
				</nav>
			</div>

			<div class="footer-contacts">
				<h4>Связаться</h4>
				{#if phone}
					<a href="tel:{phone}" data-track-id="footer-phone" class="contact-link">
						📞 {phone}
					</a>
				{/if}
				{#if telegram}
					<a
						href="https://t.me/{telegram.replace('@', '')}"
						data-track-id="footer-telegram"
						target="_blank"
						rel="noopener"
						class="contact-link"
					>
						✈️ Telegram
					</a>
				{/if}
				{#if whatsapp}
					<a
						href="https://wa.me/{whatsapp.replace(/\D/g, '')}"
						data-track-id="footer-whatsapp"
						target="_blank"
						rel="noopener"
						class="contact-link"
					>
						💬 WhatsApp
					</a>
				{/if}
			</div>
		</div>

		<div class="footer-bottom">
			<span>© {new Date().getFullYear()} Yoga Maya. Все права защищены.</span>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		background: var(--color-beige);
		border-top: 1px solid #e8dece;
		margin-top: auto;
		padding: 3rem 0 1.5rem;
	}

	.container {
		max-width: 1140px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 2.5rem;
	}

	.footer-brand p {
		margin-top: 0.5rem;
		color: var(--color-text-muted);
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.footer-logo {
		font-weight: 700;
		font-size: 1.1rem;
	}

	h4 {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
		margin-bottom: 1rem;
	}

	nav, .footer-contacts {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	nav a, .contact-link {
		color: var(--color-text);
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.15s;
	}

	nav a:hover, .contact-link:hover { color: var(--color-coral); }

	.footer-bottom {
		margin-top: 2.5rem;
		padding-top: 1rem;
		border-top: 1px solid #ddd5c8;
		color: var(--color-text-muted);
		font-size: 0.8rem;
	}

	@media (max-width: 640px) {
		.footer-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
