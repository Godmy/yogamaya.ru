<script lang="ts">
	import type { Teacher } from '$lib/types';

	interface Props {
		teacher: Teacher;
		landingSlug?: string;
		abVariant?: string;
		compact?: boolean;
	}

	let { teacher, landingSlug, abVariant, compact = false }: Props = $props();

	function handleClick() {
		if (typeof window === 'undefined') return;
		fetch('/api/events', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event_type: 'teacher_card_click',
				teacher_id: String(teacher.id),
				landing_slug: landingSlug,
				ab_variant: abVariant,
				path: window.location.pathname
			})
		}).catch(() => {});
	}
</script>

<article class="teacher-card" class:compact onclick={handleClick}>
	<div class="teacher-photo">
		{#if teacher.photo_url}
			<img src={teacher.photo_url} alt={teacher.name} loading="lazy" />
		{:else}
			<div class="photo-placeholder">{teacher.name[0]}</div>
		{/if}
	</div>

	<div class="teacher-info">
		<h3 class="teacher-name">{teacher.name}</h3>
		{#if teacher.speciality}
			<p class="teacher-speciality">{teacher.speciality}</p>
		{/if}
		{#if !compact && teacher.bio}
			<p class="teacher-bio">{teacher.bio}</p>
		{/if}
		<a
			href="/l/teacher/{teacher.slug}"
			class="teacher-link"
			data-track-id="teacher-profile-{teacher.slug}"
		>
			Подробнее →
		</a>
	</div>
</article>

<style>
	.teacher-card {
		display: flex;
		gap: 1.25rem;
		background: var(--color-white);
		border-radius: 16px;
		padding: 1.5rem;
		border: 1px solid var(--color-beige);
		transition: box-shadow 0.2s, transform 0.2s;
		cursor: default;
	}

	.teacher-card:hover {
		box-shadow: 0 8px 24px rgba(0,0,0,0.08);
		transform: translateY(-2px);
	}

	.teacher-photo {
		flex-shrink: 0;
	}

	.teacher-photo img,
	.photo-placeholder {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
	}

	.photo-placeholder {
		background: var(--color-sage);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: 700;
	}

	.compact .teacher-photo img,
	.compact .photo-placeholder {
		width: 56px;
		height: 56px;
		font-size: 1.4rem;
	}

	.teacher-name {
		font-size: 1.1rem;
		margin: 0 0 0.25rem;
	}

	.teacher-speciality {
		font-size: 0.85rem;
		color: var(--color-coral);
		margin: 0 0 0.5rem;
		font-weight: 500;
	}

	.teacher-bio {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0 0 0.75rem;
	}

	.teacher-link {
		font-size: 0.875rem;
		color: var(--color-coral);
		text-decoration: none;
		font-weight: 500;
	}

	.teacher-link:hover { text-decoration: underline; }
</style>
