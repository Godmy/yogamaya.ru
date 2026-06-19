<script lang="ts">
	import type { Class } from '$lib/types';
	import CTAButton from './CTAButton.svelte';

	interface Props {
		cls: Class;
		landingSlug?: string;
		abVariant?: string;
	}

	let { cls, landingSlug, abVariant }: Props = $props();

	const formatLabel: Record<string, string> = {
		group: 'Группа',
		individual: 'Индивидуально',
		kids: 'Для детей',
		online: 'Онлайн',
		offline: 'Оффлайн'
	};

	const ageLabel: Record<string, string> = {
		adults: 'Взрослые',
		kids: 'Дети',
		mixed: 'Мамы + дети'
	};
</script>

<article class="class-card">
	<div class="class-badges">
		<span class="badge badge--format">{formatLabel[cls.format] ?? cls.format}</span>
		{#if cls.age_group}
			<span class="badge badge--age">{ageLabel[cls.age_group] ?? cls.age_group}</span>
		{/if}
	</div>

	<h3 class="class-title">{cls.title}</h3>

	{#if cls.description}
		<p class="class-desc">{cls.description}</p>
	{/if}

	<div class="class-meta">
		{#if cls.duration_min}
			<span>⏱ {cls.duration_min} мин</span>
		{/if}
		{#if cls.price_rub !== null}
			<span class="class-price">
				{cls.price_rub === 0 ? 'Бесплатно' : `${cls.price_rub.toLocaleString('ru')} ₽`}
			</span>
		{/if}
	</div>

	<CTAButton
		href="/apply?class={cls.slug}{landingSlug ? '&landing=' + landingSlug : ''}"
		trackId="class-apply-{cls.slug}"
		size="sm"
		{landingSlug}
		{abVariant}
	>
		Записаться
	</CTAButton>
</article>

<style>
	.class-card {
		background: var(--color-white);
		border-radius: 16px;
		padding: 1.5rem;
		border: 1px solid var(--color-beige);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition: box-shadow 0.2s, transform 0.2s;
	}

	.class-card:hover {
		box-shadow: 0 8px 24px rgba(0,0,0,0.08);
		transform: translateY(-2px);
	}

	.class-badges {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.badge {
		font-size: 0.75rem;
		padding: 0.2rem 0.6rem;
		border-radius: 20px;
		font-weight: 600;
	}

	.badge--format { background: #eef4ff; color: #4b6cb7; }
	.badge--age    { background: #fef0ec; color: #c0562e; }

	.class-title { font-size: 1.05rem; margin: 0; }

	.class-desc {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.class-meta {
		display: flex;
		gap: 1rem;
		font-size: 0.875rem;
		color: var(--color-text-muted);
		align-items: center;
	}

	.class-price {
		font-weight: 700;
		color: var(--color-text);
		font-size: 1rem;
	}
</style>
