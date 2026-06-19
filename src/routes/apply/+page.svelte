<script lang="ts">
	import LeadForm from '$lib/components/LeadForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Записаться — Yoga Maya</title>
	<meta name="description" content="Запишитесь на пробное занятие испанским языком. Первый урок — бесплатно." />
</svelte:head>

<section class="apply-page">
	<div class="container">
		<div class="apply-grid">
			<div class="apply-info">
				<h1>Запишитесь на пробное занятие</h1>
				<p class="apply-desc">
					Первое занятие — бесплатно. Познакомитесь с преподавателем, узнаете свой уровень
					и получите персональный план обучения.
				</p>

				<div class="apply-benefits">
					{#each [
						'✅ Бесплатное пробное занятие',
						'🎯 Оценка уровня и цели',
						'📚 Персональный план обучения',
						'⚡ Ответим в течение 24 часов'
					] as benefit}
						<div class="benefit">{benefit}</div>
					{/each}
				</div>

				{#if data.teachers.length}
					<div class="apply-teachers">
						<p class="teachers-label">Ваши преподаватели:</p>
						{#each data.teachers as t}
							<div class="apply-teacher-chip">{t.name}</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="apply-form-wrap">
				<div class="form-card">
					<LeadForm
						landingSlug={data.landingSlug}
						abVariant={data.abVariant}
						preselectedClass={data.preselectedClass}
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.apply-page { padding: 4rem 0; }

	.apply-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.apply-info h1 {
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		margin-bottom: 1rem;
	}

	.apply-desc {
		color: var(--color-text-muted);
		line-height: 1.7;
		margin-bottom: 2rem;
	}

	.apply-benefits {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		margin-bottom: 2rem;
	}

	.benefit {
		font-size: 0.95rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-beige);
	}

	.teachers-label {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
		margin-bottom: 0.5rem;
	}

	.apply-teachers {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.apply-teacher-chip {
		background: var(--color-beige);
		border-radius: 20px;
		padding: 0.3rem 0.875rem;
		font-size: 0.875rem;
	}

	.form-card {
		background: var(--color-white);
		border: 1px solid var(--color-beige);
		border-radius: 20px;
		padding: 2rem;
		box-shadow: 0 4px 20px rgba(0,0,0,0.06);
	}

	@media (max-width: 768px) {
		.apply-grid { grid-template-columns: 1fr; gap: 2rem; }
	}
</style>
