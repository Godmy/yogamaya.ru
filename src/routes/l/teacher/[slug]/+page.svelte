<script lang="ts">
	import CTAButton from '$lib/components/CTAButton.svelte';
	import ClassCard from '$lib/components/ClassCard.svelte';
	import LeadForm from '$lib/components/LeadForm.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();
	const { teacher, classes, abVariant } = data;

	onMount(() => {
		fetch('/api/events', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event_type: 'teacher_card_click',
				teacher_id: String(teacher.id),
				landing_slug: `teacher-${teacher.slug}`,
				ab_variant: abVariant,
				path: window.location.pathname,
				referrer: document.referrer
			})
		}).catch(() => {});
	});
</script>

<svelte:head>
	<title>{teacher.name} — преподаватель испанского — Yoga Maya</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="teacher-hero">
	<div class="container">
		<div class="teacher-profile">
			<div class="teacher-avatar">
				{#if teacher.photo_url}
					<img src={teacher.photo_url} alt={teacher.name} />
				{:else}
					<div class="avatar-placeholder">{teacher.name[0]}</div>
				{/if}
			</div>
			<div class="teacher-details">
				<h1>{teacher.name}</h1>
				{#if teacher.speciality}
					<p class="teacher-spec">{teacher.speciality}</p>
				{/if}
				{#if teacher.bio}
					<p class="teacher-bio-full">{teacher.bio}</p>
				{/if}
				<CTAButton
					href="/apply?teacher={teacher.id}"
					trackId="teacher-lp-cta-{teacher.slug}"
					size="lg"
					landingSlug="teacher-{teacher.slug}"
					{abVariant}
				>
					Записаться к {teacher.name.split(' ')[0]}
				</CTAButton>
			</div>
		</div>
	</div>
</section>

{#if classes.length}
	<section class="section">
		<div class="container">
			<h2 class="section-title">Форматы занятий</h2>
			<div class="grid-cards">
				{#each classes as cls}
					<ClassCard {cls} landingSlug="teacher-{teacher.slug}" {abVariant} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<section class="section form-section" id="apply">
	<div class="container">
		<div class="form-wrap">
			<h2>Записаться к {teacher.name.split(' ')[0]}</h2>
			<p class="form-sub">Заполните форму — ответим в течение 24 часов</p>
			<LeadForm
				selectedTeacherId={teacher.id}
				landingSlug="teacher-{teacher.slug}"
				{abVariant}
			/>
		</div>
	</div>
</section>

<style>
	.teacher-hero {
		background: linear-gradient(135deg, var(--color-beige) 0%, #f0eaf8 100%);
		padding: 4.5rem 0;
	}

	.teacher-profile {
		display: flex;
		gap: 3rem;
		align-items: flex-start;
		max-width: 800px;
		margin: 0 auto;
	}

	.teacher-avatar img,
	.avatar-placeholder {
		width: 140px;
		height: 140px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.avatar-placeholder {
		background: var(--color-sage);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3.5rem;
		font-weight: 700;
	}

	.teacher-details h1 { font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 0.5rem; }

	.teacher-spec { color: var(--color-coral); font-weight: 500; margin-bottom: 1rem; }

	.teacher-bio-full {
		color: var(--color-text-muted);
		line-height: 1.7;
		margin-bottom: 1.75rem;
	}

	.form-section { background: var(--color-beige); }

	.form-wrap {
		max-width: 540px;
		margin: 0 auto;
	}

	.form-wrap h2 { font-size: clamp(1.3rem, 2.5vw, 1.8rem); margin-bottom: 0.5rem; }

	.form-sub {
		color: var(--color-text-muted);
		margin-bottom: 2rem;
	}

	@media (max-width: 600px) {
		.teacher-profile { flex-direction: column; align-items: center; text-align: center; }
	}
</style>
