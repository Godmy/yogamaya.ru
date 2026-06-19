<script lang="ts">
	import CTAButton from '$lib/components/CTAButton.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Yoga Maya — Испанский с мамой</title>
	<meta name="description" content="Духовный проект Yoga Maya и клуб испанского языка «Испанский с мамой». Занятия для мам, детей и взрослых." />
</svelte:head>

<!-- Hero -->
<section class="hero">
	<div class="container">
		<div class="hero-content">
			<p class="hero-tagline">Клуб испанского языка</p>
			<h1 class="hero-title">
				Испанский —<br />
				<span class="accent">вместе с мамой</span>
			</h1>
			<p class="hero-desc">
				Живые занятия для мам, детей и всей семьи. Маленькие группы, опытные преподаватели,
				тёплая атмосфера. Первое занятие — бесплатно.
			</p>
			<div class="hero-actions">
				<CTAButton
					href="/apply"
					trackId="home-hero-cta-primary"
					size="lg"
					abVariant={data.abVariant}
				>
					Записаться на пробный урок
				</CTAButton>
				<CTAButton
					href="/spanish"
					trackId="home-hero-cta-secondary"
					variant="ghost"
					size="lg"
				>
					Узнать больше
				</CTAButton>
			</div>
		</div>
		<div class="hero-visual">
			<div class="hero-card">
				<div class="hero-emoji">🇪🇸</div>
				<p>Hola, mamá!</p>
				<span>Учим вместе — говорим дома</span>
			</div>
		</div>
	</div>
</section>

<!-- About Yoga Maya -->
<section class="section about-section">
	<div class="container">
		<div class="about-grid">
			<div class="about-text">
				<p class="section-eyebrow">О проекте</p>
				<h2 class="section-title">Что такое Yoga Maya?</h2>
				<p>
					Yoga Maya — духовное имя основательницы проекта, полученное в ашраме от Саи Бабы.
					Это имя несёт в себе идею единства, творчества и передачи знаний.
				</p>
				<p>
					Главный проект сегодня — клуб испанского языка <strong>«Испанский с мамой»</strong>.
					Мы верим, что язык лучше всего учится в живом общении, в радости и вместе с теми, кого любишь.
				</p>
			</div>
			<div class="about-values">
				{#each ['🌿 Живое общение', '❤️ Тёплая атмосфера', '👶 Семейный подход', '🎯 Реальный результат'] as value}
					<div class="value-pill">{value}</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Spanish club promo -->
<section class="section spanish-promo">
	<div class="container">
		<h2 class="section-title">«Испанский с мамой»</h2>
		<p class="section-subtitle">Активный проект клуба</p>

		<div class="promo-grid">
			{#each [
				{ icon: '👩‍👧', title: 'Мамы + дети', desc: 'Занятия вместе — вы оба учитесь, вы оба говорите', href: '/l/spanish-for-moms' },
				{ icon: '🧒', title: 'Испанский для детей', desc: 'Игровые занятия 5–12 лет: мультфильмы, песни, игры', href: '/l/spanish-for-kids' },
				{ icon: '💬', title: 'Разговорный клуб', desc: 'Онлайн-практика каждую неделю для уровня A2+', href: '/l/spanish-speaking-club' },
				{ icon: '🎁', title: 'Пробный урок', desc: '30 минут бесплатно — познакомьтесь с преподавателем', href: '/l/spanish-trial-lesson' }
			] as item}
				<a href={item.href} class="promo-card" data-track-id="home-promo-{item.href.split('/').pop()}">
					<div class="promo-icon">{item.icon}</div>
					<h3>{item.title}</h3>
					<p>{item.desc}</p>
					<span class="promo-link">Подробнее →</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Banner -->
<section class="section cta-banner">
	<div class="container">
		<div class="cta-banner-inner">
			<h2>Готовы начать?</h2>
			<p>Запишитесь на бесплатное пробное занятие — без обязательств</p>
			<CTAButton
				href="/apply"
				trackId="home-bottom-cta"
				size="lg"
				abVariant={data.abVariant}
			>
				Записаться бесплатно
			</CTAButton>
		</div>
	</div>
</section>

<style>
	/* Hero */
	.hero {
		background: linear-gradient(135deg, var(--color-beige) 0%, #fdf6ef 100%);
		padding: 5rem 0 4rem;
	}

	.hero .container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	.hero-tagline {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-coral);
		margin-bottom: 0.75rem;
	}

	.hero-title {
		font-size: clamp(2rem, 5vw, 3.2rem);
		margin-bottom: 1.25rem;
		line-height: 1.15;
	}

	.accent { color: var(--color-coral); }

	.hero-desc {
		font-size: 1.1rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		margin-bottom: 2rem;
		max-width: 480px;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.hero-visual { display: flex; justify-content: center; }

	.hero-card {
		background: var(--color-white);
		border-radius: 24px;
		padding: 2.5rem 3rem;
		text-align: center;
		box-shadow: 0 20px 60px rgba(0,0,0,0.08);
	}

	.hero-emoji { font-size: 4rem; margin-bottom: 1rem; }
	.hero-card p { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; }
	.hero-card span { color: var(--color-text-muted); font-size: 0.9rem; }

	/* About */
	.about-section { background: var(--color-white); }

	.about-grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	.section-eyebrow {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-sage);
		margin-bottom: 0.5rem;
	}

	.about-text h2 { margin-bottom: 1rem; }
	.about-text p { color: var(--color-text-muted); line-height: 1.7; margin-bottom: 0.75rem; }

	.about-values {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.value-pill {
		background: var(--color-beige);
		border-radius: 12px;
		padding: 0.875rem 1.25rem;
		font-weight: 500;
		font-size: 0.95rem;
	}

	/* Promo grid */
	.promo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1.25rem;
	}

	.promo-card {
		background: var(--color-white);
		border: 1px solid var(--color-beige);
		border-radius: 16px;
		padding: 1.75rem;
		text-decoration: none;
		color: inherit;
		transition: box-shadow 0.2s, transform 0.2s;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.promo-card:hover {
		box-shadow: 0 8px 28px rgba(0,0,0,0.09);
		transform: translateY(-3px);
	}

	.promo-icon { font-size: 2.25rem; }
	.promo-card h3 { font-size: 1.05rem; }
	.promo-card p { font-size: 0.875rem; color: var(--color-text-muted); flex: 1; }

	.promo-link {
		font-size: 0.875rem;
		color: var(--color-coral);
		font-weight: 500;
	}

	/* CTA Banner */
	.cta-banner { background: var(--color-beige); }

	.cta-banner-inner {
		text-align: center;
		max-width: 560px;
		margin: 0 auto;
	}

	.cta-banner-inner h2 { font-size: clamp(1.5rem, 3vw, 2rem); margin-bottom: 0.75rem; }
	.cta-banner-inner p { color: var(--color-text-muted); margin-bottom: 1.75rem; }

	@media (max-width: 768px) {
		.hero .container { grid-template-columns: 1fr; }
		.hero-visual { display: none; }
		.about-grid { grid-template-columns: 1fr; }
	}
</style>
