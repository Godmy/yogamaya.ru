<script lang="ts">
	import CTAButton from '$lib/components/CTAButton.svelte';
	import TeacherCard from '$lib/components/TeacherCard.svelte';
	import ClassCard from '$lib/components/ClassCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Испанский язык — Yoga Maya</title>
	<meta name="description" content="Клуб испанского языка «Испанский с мамой». Занятия для мам, детей и взрослых. Небольшие группы, живое общение." />
</svelte:head>

<section class="hero-small">
	<div class="container">
		<h1>🇪🇸 Испанский с мамой</h1>
		<p class="hero-sub">
			Живые занятия для мам, детей и взрослых. Маленькие группы, профессиональные преподаватели,
			тёплая атмосфера. Начните говорить уже с первого занятия.
		</p>
		<CTAButton href="/apply" trackId="spanish-hero-cta" size="lg" abVariant={data.abVariant}>
			Записаться на пробный урок бесплатно
		</CTAButton>
	</div>
</section>

<section class="section">
	<div class="container">
		<h2 class="section-title">Почему «Испанский с мамой»?</h2>
		<div class="reasons-grid">
			{#each [
				{ icon: '👩‍👧', title: 'Учитесь вместе', text: 'Мама и ребёнок на одном занятии — двойная мотивация, домашняя практика' },
				{ icon: '🎮', title: 'Через игру', text: 'Для детей — только игровые форматы. Никаких скучных учебников' },
				{ icon: '👥', title: 'Малые группы', text: 'До 6 человек — каждый говорит, каждого слышат' },
				{ icon: '📱', title: 'Онлайн и офлайн', text: 'Занимайтесь откуда удобно. Расписание подстроим под вас' }
			] as r}
				<div class="reason-card">
					<div class="reason-icon">{r.icon}</div>
					<h3>{r.title}</h3>
					<p>{r.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

{#if data.classes.length}
	<section class="section bg-beige">
		<div class="container">
			<h2 class="section-title">Форматы занятий</h2>
			<p class="section-subtitle">Найдите подходящий формат для себя и ребёнка</p>
			<div class="grid-cards">
				{#each data.classes as cls}
					<ClassCard {cls} abVariant={data.abVariant} />
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if data.teachers.length}
	<section class="section">
		<div class="container">
			<h2 class="section-title">Наши преподаватели</h2>
			<p class="section-subtitle">Живые, заряженные, влюблённые в испанский</p>
			<div class="teachers-list">
				{#each data.teachers as teacher}
					<TeacherCard {teacher} abVariant={data.abVariant} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	.hero-small {
		background: linear-gradient(135deg, var(--color-beige) 0%, #fdf6ef 100%);
		padding: 4rem 0;
		text-align: center;
	}

	.hero-small h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 1rem; }
	.hero-sub {
		font-size: 1.1rem;
		color: var(--color-text-muted);
		max-width: 600px;
		margin: 0 auto 2rem;
		line-height: 1.7;
	}

	.bg-beige { background: var(--color-beige); }

	.reasons-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.25rem;
	}

	.reason-card {
		background: var(--color-white);
		border-radius: 16px;
		padding: 1.5rem;
		border: 1px solid var(--color-beige);
	}

	.reason-icon { font-size: 2rem; margin-bottom: 0.75rem; }
	.reason-card h3 { font-size: 1rem; margin-bottom: 0.5rem; }
	.reason-card p { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.6; }

	.teachers-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
</style>
