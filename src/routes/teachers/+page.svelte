<script lang="ts">
	import TeacherCard from '$lib/components/TeacherCard.svelte';
	import CTAButton from '$lib/components/CTAButton.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Преподаватели — Yoga Maya</title>
	<meta name="description" content="Знакомьтесь с преподавателями клуба «Испанский с мамой». Опыт, любовь к языку, индивидуальный подход." />
</svelte:head>

<section class="hero-small">
	<div class="container">
		<h1>Наши преподаватели</h1>
		<p>Профессионалы, которые влюбляют в испанский</p>
	</div>
</section>

<section class="section">
	<div class="container">
		{#if data.teachers.length}
			<div class="teachers-list">
				{#each data.teachers as teacher}
					<TeacherCard {teacher} abVariant={data.abVariant} />
				{/each}
			</div>
		{:else}
			<p class="empty-state">Информация о преподавателях скоро появится.</p>
		{/if}

		<div class="teachers-cta">
			<CTAButton href="/apply" trackId="teachers-page-cta" size="lg" abVariant={data.abVariant}>
				Выбрать преподавателя и записаться
			</CTAButton>
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

	.teachers-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.teachers-cta {
		margin-top: 3rem;
		text-align: center;
	}

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		padding: 3rem 0;
	}
</style>
