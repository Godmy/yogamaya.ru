<script lang="ts">
	import CTAButton from '$lib/components/CTAButton.svelte';
	import TeacherCard from '$lib/components/TeacherCard.svelte';
	import LeadForm from '$lib/components/LeadForm.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	const { landing, teachers, painPoints, abVariant } = data;

	onMount(() => {
		// Track page view
		fetch('/api/events', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event_type: 'page_view',
				landing_slug: landing.slug,
				ab_variant: abVariant,
				audience: landing.audience,
				path: window.location.pathname,
				referrer: document.referrer,
				utm_source: data.utmParams?.utm_source,
				utm_medium: data.utmParams?.utm_medium,
				utm_campaign: data.utmParams?.utm_campaign
			})
		}).catch(() => {});
	});
</script>

<svelte:head>
	<title>{landing.title} — Yoga Maya</title>
	{#if landing.subtitle}
		<meta name="description" content={landing.subtitle} />
	{/if}
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- Landing Hero -->
<section class="landing-hero">
	<div class="container">
		<div class="hero-content">
			<h1 class="landing-title">{landing.title}</h1>
			{#if landing.subtitle}
				<p class="landing-subtitle">{landing.subtitle}</p>
			{/if}
			{#if landing.hero_text}
				<p class="landing-hero-text">{landing.hero_text}</p>
			{/if}
			<CTAButton
				href="{landing.cta_url}#{landing.slug}"
				trackId="landing-hero-cta-{landing.slug}"
				size="lg"
				landingSlug={landing.slug}
				{abVariant}
			>
				{landing.cta_text}
			</CTAButton>
		</div>
	</div>
</section>

<!-- Pain Points -->
{#if painPoints.length}
	<section class="section pain-section">
		<div class="container">
			<h2 class="section-title">Узнаёте себя?</h2>
			<div class="pain-grid">
				{#each painPoints as pain}
					<div class="pain-card">
						<span class="pain-check">😔</span>
						<span>{pain}</span>
					</div>
				{/each}
			</div>
			<div class="pain-cta">
				<p class="pain-bridge">Мы знаем, как это изменить. Запишитесь на пробное занятие — бесплатно.</p>
				<CTAButton
					href="{landing.cta_url}#{landing.slug}"
					trackId="landing-pain-cta-{landing.slug}"
					landingSlug={landing.slug}
					{abVariant}
				>
					{landing.cta_text}
				</CTAButton>
			</div>
		</div>
	</section>
{/if}

<!-- Offer -->
{#if landing.offer}
	<section class="section offer-section">
		<div class="container">
			<div class="offer-card">
				<h2>Что вы получите</h2>
				<p class="offer-text">{landing.offer}</p>
				<CTAButton
					href="{landing.cta_url}#{landing.slug}"
					trackId="landing-offer-cta-{landing.slug}"
					landingSlug={landing.slug}
					{abVariant}
				>
					{landing.cta_text}
				</CTAButton>
			</div>
		</div>
	</section>
{/if}

<!-- Teachers -->
{#if teachers.length}
	<section class="section">
		<div class="container">
			<h2 class="section-title">
				{teachers.length === 1 ? 'Ваш преподаватель' : 'Ваши преподаватели'}
			</h2>
			<div class="teachers-list">
				{#each teachers as teacher}
					<TeacherCard {teacher} landingSlug={landing.slug} {abVariant} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Form Anchor + Lead Form -->
<section class="section form-section" id={landing.slug}>
	<div class="container">
		<div class="form-wrap">
			<div class="form-header">
				<h2>{landing.cta_text}</h2>
				<p>Заполните форму — ответим в течение 24 часов</p>
			</div>
			<LeadForm
				landingSlug={landing.slug}
				{abVariant}
				audience={landing.audience ?? undefined}
			/>
		</div>
	</div>
</section>

<style>
	/* Hero */
	.landing-hero {
		background: linear-gradient(135deg, #fdf0e8 0%, #f5e8f8 100%);
		padding: 5rem 0 4rem;
		text-align: center;
	}

	.hero-content { max-width: 700px; margin: 0 auto; }

	.landing-title {
		font-size: clamp(2rem, 5vw, 3rem);
		margin-bottom: 1rem;
		line-height: 1.15;
	}

	.landing-subtitle {
		font-size: 1.2rem;
		color: var(--color-text-muted);
		margin-bottom: 1rem;
	}

	.landing-hero-text {
		font-size: 1.05rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		margin-bottom: 2rem;
		max-width: 560px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Pain */
	.pain-section { background: var(--color-beige); }

	.pain-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 0.875rem;
		margin-bottom: 2.5rem;
	}

	.pain-card {
		background: var(--color-white);
		border-radius: 12px;
		padding: 1rem 1.25rem;
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
		font-size: 0.9rem;
		line-height: 1.5;
		border: 1px solid #e8dece;
	}

	.pain-check { flex-shrink: 0; }

	.pain-cta { text-align: center; }

	.pain-bridge {
		color: var(--color-text-muted);
		margin-bottom: 1.25rem;
		font-size: 1rem;
	}

	/* Offer */
	.offer-section { background: var(--color-white); }

	.offer-card {
		background: linear-gradient(135deg, var(--color-beige), #f0eaf8);
		border-radius: 20px;
		padding: 2.5rem 3rem;
		max-width: 700px;
		margin: 0 auto;
		text-align: center;
	}

	.offer-card h2 { margin-bottom: 1rem; }

	.offer-text {
		color: var(--color-text-muted);
		line-height: 1.7;
		margin-bottom: 1.75rem;
	}

	/* Form */
	.form-section { background: var(--color-beige); }

	.form-wrap {
		max-width: 560px;
		margin: 0 auto;
	}

	.form-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.form-header h2 { font-size: clamp(1.4rem, 3vw, 1.9rem); margin-bottom: 0.5rem; }
	.form-header p { color: var(--color-text-muted); }

	.teachers-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
</style>
