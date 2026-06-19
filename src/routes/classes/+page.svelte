<script lang="ts">
	import ClassCard from '$lib/components/ClassCard.svelte';
	import CTAButton from '$lib/components/CTAButton.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Форматы занятий — Yoga Maya</title>
	<meta name="description" content="Форматы занятий испанским языком: группы для взрослых, детей, мамы и малыша, индивидуально, разговорный клуб." />
</svelte:head>

<section class="hero-small">
	<div class="container">
		<h1>Форматы занятий</h1>
		<p>Выберите то, что подходит вам и вашей семье</p>
	</div>
</section>

<section class="section">
	<div class="container">
		{#if data.classes.length}
			<div class="grid-cards">
				{#each data.classes as cls}
					<ClassCard {cls} abVariant={data.abVariant} />
				{/each}
			</div>
		{:else}
			<p class="empty-state">Информация о занятиях скоро появится.</p>
		{/if}

		<div class="classes-cta">
			<p>Не нашли подходящий формат? Напишите нам — подберём индивидуально.</p>
			<CTAButton href="/contacts" trackId="classes-contacts-cta" variant="ghost">
				Связаться с нами
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

	.classes-cta {
		margin-top: 3rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.classes-cta p { color: var(--color-text-muted); }

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		padding: 3rem 0;
	}
</style>
