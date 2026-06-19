<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { variant, copy } = data;

	const WHATSAPP = 'https://wa.me/79161234567';

	const topics = [
		'Знакомство с испанским, игрушки',
		'Цвета',
		'Счёт',
		'Домашние животные',
		'Дикие животные',
		'Лицо',
		'Глаголы (части лица)',
		'Части тела',
		'Глаголы (части тела)',
		'Ванная, мытьё рук',
		'Купание',
		'Утренний подъём',
		'Укладывание спать',
		'Фрукты',
		'Овощи',
		'Продукты питания',
		'Приём пищи',
		'Кухня',
		'Приготовление пищи',
		'Одежда (часть 1)',
		'Одежда (часть 2)',
		'Семья',
		'Помощь маме, уборка',
		'Домашние дела',
		'Эмоции',
		'Формы',
		'Детская площадка'
	];

	const extras = [
		{ icon: '🍂', title: 'Времена года', desc: 'Конспекты про сезоны' },
		{ icon: '🎃', title: 'Halloween', desc: 'Комплект материалов' },
		{ icon: '🎄', title: 'Новый год', desc: 'Новогодние конспекты' },
		{ icon: '🏖️', title: 'Пляж', desc: 'Пакет «Игры на пляже»' },
		{ icon: '🐣', title: 'Пасха', desc: 'Пасхальный пакет' },
		{ icon: '🎵', title: 'Поём с мамой', desc: 'Песенный курс на испанском' },
		{ icon: '📚', title: 'Курс для взрослых', desc: 'Испанский для начинающих' },
		{ icon: '🗣️', title: 'Фонетика', desc: 'Курс правильного произношения' }
	];

	const advantages = [
		{
			icon: '🎯',
			title: 'Индивидуальная нагрузка',
			text: 'Родители регулируют нагрузку в зависимости от возраста, заинтересованности и способностей ребёнка.'
		},
		{
			icon: '⏰',
			title: 'Любое время',
			text: 'Материалы остаются навсегда. Карточки и распечатки доступны в любое время и в любом месте.'
		},
		{
			icon: '📦',
			title: 'Много материала',
			text: 'Объём рассчитан на 1,5 года регулярных занятий. Самый объёмный курс на рынке.'
		},
		{
			icon: '👩‍👧‍👦',
			title: 'Чат единомышленниц',
			text: 'Неограниченный доступ к сообществу мам для помощи, поддержки и обмена опытом.'
		}
	];

	const faqs = [
		{
			q: 'Если я сама не говорю по-испански?',
			a: 'Можно изучать параллельно с ребёнком! В помощь — фонетический курс, курс «мама+ребёнок» и индивидуальные занятия по Skype. Также доступны бесплатные материалы по базовой грамматике.'
		},
		{
			q: 'Сколько времени длится курс?',
			a: 'При интенсивных занятиях — 8 месяцев. В среднем — 1,5 года. Многие мамы возвращаются к материалам снова и снова.'
		},
		{
			q: 'Есть ли обратная связь?',
			a: 'Можно задавать вопросы по материалам и общаться в чате единомышленниц. Для постоянной обратной связи с преподавателем — курс «мама+ребёнок».'
		},
		{
			q: 'Нужно ли распечатывать всё?',
			a: 'Не всё, но некоторые материалы нужны для конкретных игр и активностей. Карточки особенно удобны в печатном виде.'
		},
		{
			q: 'Не запутается ли ребёнок, если учит ещё и английский?',
			a: 'Не стоит бояться — дети прекрасно разделяют языки. Главное: используйте «переключатель» языка и сами не смешивайте испанский с другими языками на занятии.'
		}
	];

	let openFaq = $state<number | null>(null);

	function track(eventType: string, buttonId: string) {
		if (typeof window === 'undefined') return;
		fetch('/api/events', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event_type: eventType,
				button_id: buttonId,
				landing_slug: 'hispamama',
				ab_variant: variant,
				path: window.location.pathname,
				referrer: document.referrer,
				utm_source: data.utmParams?.utm_source,
				utm_campaign: data.utmParams?.utm_campaign
			})
		}).catch(() => {});
	}

	onMount(() => {
		track('page_view', 'hispamama-page');
	});
</script>

<svelte:head>
	<title>Испанские недельки — учи язык вместе с ребёнком</title>
	<meta name="description" content="Курс детского испанского для мам. 27 готовых конспектов, песни, игры, карточки. Занимайтесь дома в удобное время." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- ═══════════════════════════════════ HERO ═══════════════════════════════════ -->
<section class="hero">
	<div class="container">
		<div class="hero-inner">
			<p class="eyebrow">🇪🇸 Испанский с мамой</p>
			<h1>{copy.hero_title}</h1>
			<p class="hero-sub">{copy.hero_subtitle}</p>
			<p class="hero-desc">{copy.hero_desc}</p>
			<div class="hero-actions">
				<a
					href={WHATSAPP}
					target="_blank"
					rel="noopener"
					class="btn btn--primary"
					data-track-id="hero-whatsapp"
					onclick={() => track('whatsapp_click', 'hero-whatsapp')}
				>
					{copy.cta_primary}
				</a>
				<a
					href="#program"
					class="btn btn--ghost"
					data-track-id="hero-program"
					onclick={() => track('cta_click', 'hero-program')}
				>
					Смотреть программу
				</a>
			</div>
		</div>
		<div class="hero-badge-wrap">
			<div class="hero-badge">
				<div class="badge-num">27</div>
				<div class="badge-label">тематических<br/>конспектов</div>
			</div>
			<div class="hero-badge">
				<div class="badge-num">1,5</div>
				<div class="badge-label">года<br/>материала</div>
			</div>
			<div class="hero-badge">
				<div class="badge-num">0</div>
				<div class="badge-label">знаний<br/>испанского<br/>не нужно</div>
			</div>
		</div>
	</div>
</section>

<!-- ════════════════════════════════ ДЛЯ КОГО ═══════════════════════════════ -->
<section class="section bg-white">
	<div class="container">
		<h2 class="section-title">Этот курс для вас, если вы хотите…</h2>
		<div class="for-whom-grid">
			{#each [
				{ icon: '✈️', text: 'Чтобы ребёнок знал испанский — для путешествий, переезда или учёбы за рубежом' },
				{ icon: '🚀', text: 'Дать ребёнку больше возможностей в жизни через знание иностранного языка' },
				{ icon: '🏠', text: 'Заниматься дома, в удобное время, без жёсткого расписания и поездок к репетитору' },
				{ icon: '👩‍🏫', text: 'Самой стать преподавателем для собственного ребёнка — и проводить время с пользой' }
			] as item}
				<div class="for-whom-card">
					<div class="for-whom-icon">{item.icon}</div>
					<p>{item.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════ БЕСПЛАТНО ══════════════════════════════════ -->
<section class="section bg-beige">
	<div class="container">
		<div class="free-block">
			<div class="free-text">
				<p class="eyebrow">Бесплатно</p>
				<h2>Попробуйте прямо сейчас</h2>
				<p>Скачайте бесплатные кроссворды на испанском для занятий с детьми — никакой регистрации.</p>
				<a
					href={WHATSAPP}
					target="_blank"
					rel="noopener"
					class="btn btn--primary"
					data-track-id="free-download"
					onclick={() => track('cta_click', 'free-download')}
				>
					Скачать бесплатно
				</a>
			</div>
			<div class="free-visual">
				<div class="free-card">
					<div class="free-icon">🧩</div>
					<p>Кроссворды<br/>на испанском</p>
					<span>PDF для печати</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════ ОБ АВТОРЕ ════════════════════════════════ -->
<section class="section bg-white">
	<div class="container">
		<div class="author-block">
			<div class="author-photo">
				<div class="author-avatar">М</div>
			</div>
			<div class="author-text">
				<p class="eyebrow">Об авторе</p>
				<h2>Марина Синельникова</h2>
				<ul class="author-facts">
					<li>🎓 Училась в Университете Балеарских островов (Пальма-де-Майорка)</li>
					<li>🗓️ Преподаёт испанский <strong>10 лет</strong> — взрослым и детям, группам и индивидуально, очно и по Skype</li>
					<li>🌍 Жила в Испании, работала с испанскими компаниями и представителями Латинской Америки</li>
					<li>🏆 Создала первый на рынке курс детского испанского</li>
					<li>👶 Говорит с сыном на испанском с 2 лет, на английском с 1,5 лет</li>
				</ul>
				<a
					href={WHATSAPP}
					target="_blank"
					rel="noopener"
					class="btn btn--ghost"
					data-track-id="author-whatsapp"
					onclick={() => track('whatsapp_click', 'author-whatsapp')}
				>
					Написать Марине
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════ ЧТО ВАС ЖДЁТ ════════════════════════════════ -->
<section class="section bg-beige">
	<div class="container">
		<h2 class="section-title">Что вас ждёт</h2>
		<div class="awaits-grid">
			<div class="awaits-card">
				<div class="awaits-icon">🏡</div>
				<h3>Испанский станет частью вашей жизни</h3>
				<p>
					Базовая лексика для всех бытовых ситуаций: игры дома, прогулки, творчество,
					домашние дела, игрушки, дом, семья, еда. Язык входит в жизнь естественно — через ежедневные ритуалы.
				</p>
			</div>
			<div class="awaits-card">
				<div class="awaits-icon">🎮</div>
				<h3>Увлекательные занятия без скуки</h3>
				<p>
					Только игры, песни и творческие активности. Никаких скучных учебников.
					Ребёнок не замечает, что учится — он просто играет на испанском.
				</p>
				<a
					href={WHATSAPP}
					target="_blank"
					rel="noopener"
					class="btn btn--primary"
					data-track-id="awaits-cta"
					onclick={() => track('whatsapp_click', 'awaits-cta')}
				>
					Связаться
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════ ПРОГРАММА ════════════════════════════════════ -->
<section class="section bg-white" id="program">
	<div class="container">
		<p class="eyebrow">Программа</p>
		<h2 class="section-title">27 тематических конспектов</h2>
		<p class="section-subtitle">Каждый конспект — готовая неделя занятий с ребёнком</p>

		<div class="topics-grid">
			{#each topics as topic, i}
				<div class="topic-item">
					<span class="topic-num">{i + 1}</span>
					<span class="topic-text">{topic}</span>
				</div>
			{/each}
		</div>

		<div class="plan-includes">
			<h3>В каждом конспекте:</h3>
			<div class="includes-grid">
				{#each [
					{ icon: '🎵', text: '1–3 песни с переводом, идеями разыгрывания и глоссариями' },
					{ icon: '🎲', text: '1–5 игр с глоссариями, переводом, озвучкой и материалами для печати' },
					{ icon: '📋', text: 'Глоссарии по режимным моментам' },
					{ icon: '🃏', text: 'Набор карточек для занятий' },
					{ icon: '📹', text: 'Озвученные видео-презентации' },
					{ icon: '📚', text: 'Подборка книг в PDF' },
					{ icon: '📅', text: 'Планы на 5 дней активных занятий' }
				] as item}
					<div class="include-item">
						<span class="include-icon">{item.icon}</span>
						<span>{item.text}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════ ПРЕИМУЩЕСТВА ═════════════════════════════════ -->
<section class="section bg-beige">
	<div class="container">
		<h2 class="section-title">Почему это работает</h2>
		<div class="grid-cards">
			{#each advantages as adv}
				<div class="adv-card">
					<div class="adv-icon">{adv.icon}</div>
					<h3>{adv.title}</h3>
					<p>{adv.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════ ДОП. МАТЕРИАЛЫ ═══════════════════════════════ -->
<section class="section bg-white">
	<div class="container">
		<h2 class="section-title">Другие материалы проекта</h2>
		<p class="section-subtitle">Дополните основной курс тематическими наборами</p>
		<div class="extras-grid">
			{#each extras as item}
				<div class="extra-card">
					<div class="extra-icon">{item.icon}</div>
					<div>
						<div class="extra-title">{item.title}</div>
						<div class="extra-desc">{item.desc}</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="extras-cta">
			<a
				href={WHATSAPP}
				target="_blank"
				rel="noopener"
				class="btn btn--ghost"
				data-track-id="extras-whatsapp"
				onclick={() => track('whatsapp_click', 'extras-whatsapp')}
			>
				Узнать о всех материалах
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════ СТОИМОСТЬ ════════════════════════════════════ -->
<section class="section bg-beige">
	<div class="container">
		<h2 class="section-title">Стоимость</h2>
		<div class="price-wrap">
			<div class="price-card">
				{#if copy.price_badge}
					<div class="price-badge">{copy.price_badge}</div>
				{/if}
				<div class="price-name">Испанские недельки</div>
				<div class="price-main">10 000 ₽</div>
				<div class="price-note">≈ 500 ₽ в месяц при занятиях 1,5 года</div>
				<ul class="price-list">
					<li>✅ 27 тематических конспектов (электронно, навсегда)</li>
					<li>✅ Материал на 1,5 года регулярных занятий</li>
					<li>✅ Чат единомышленниц</li>
					<li>✅ Пробные уроки доступны бесплатно</li>
					<li>✅ Периодические акции со скидкой до 40%</li>
				</ul>
				<a
					href={WHATSAPP}
					target="_blank"
					rel="noopener"
					class="btn btn--primary btn--full"
					data-track-id="price-whatsapp"
					onclick={() => track('whatsapp_click', 'price-whatsapp')}
				>
					{copy.cta_primary}
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════ ОТЗЫВЫ ═══════════════════════════════════════ -->
<section class="section bg-white">
	<div class="container">
		<h2 class="section-title">Что говорят мамы</h2>
		<div class="reviews-grid">
			<div class="review-card">
				<div class="review-stars">★★★★★</div>
				<p class="review-text">
					«Мой сын и я обожаем клуб. Материалы тщательно продуманы, но оставляют место для воображения.
					Темы очень жизненные. Мы живём на испанском, а не просто занимаемся.»
				</p>
				<div class="review-author">Ольга Петрова</div>
			</div>
			<div class="review-card">
				<div class="review-stars">★★★★★</div>
				<p class="review-text">
					«Была ноль в испанском, через месяц уже понимаю и строю фразы. Есть озвучка, распечатки,
					глоссарии. Дочка ждёт испанский каждый день.»
				</p>
				<div class="review-author">Ольга Привалова</div>
			</div>
		</div>
		<div class="reviews-more">
			<a
				href="https://vk.com"
				target="_blank"
				rel="noopener"
				class="btn btn--ghost"
				data-track-id="reviews-vk"
				onclick={() => track('cta_click', 'reviews-vk')}
			>
				Больше отзывов во ВКонтакте
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════ FAQ ══════════════════════════════════════════ -->
<section class="section bg-beige">
	<div class="container">
		<h2 class="section-title">Часто задаваемые вопросы</h2>
		<div class="faq-list">
			{#each faqs as faq, i}
				<div class="faq-item" class:open={openFaq === i}>
					<button
						class="faq-q"
						onclick={() => (openFaq = openFaq === i ? null : i)}
						aria-expanded={openFaq === i}
					>
						<span>{faq.q}</span>
						<span class="faq-arrow">{openFaq === i ? '▲' : '▼'}</span>
					</button>
					{#if openFaq === i}
						<div class="faq-a">{faq.a}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════ ФИНАЛЬНЫЙ CTA ════════════════════════════════ -->
<section class="section final-cta">
	<div class="container">
		<h2>Готовы начать?</h2>
		<p>Напишите Марине — она ответит на все вопросы и поможет выбрать подходящий формат</p>
		<div class="final-actions">
			<a
				href={WHATSAPP}
				target="_blank"
				rel="noopener"
				class="btn btn--primary btn--lg"
				data-track-id="final-whatsapp"
				onclick={() => track('whatsapp_click', 'final-whatsapp')}
			>
				💬 Написать в WhatsApp
			</a>
			<a
				href="mailto:hispamama@gmail.com"
				class="btn btn--ghost btn--lg"
				data-track-id="final-email"
				onclick={() => track('cta_click', 'final-email')}
			>
				✉️ hispamama@gmail.com
			</a>
		</div>
		<p class="final-copy">© 2019–2025 Испанские недельки. Копирование и распространение материалов запрещено.</p>
	</div>
</section>

<style>
	/* ── Tokens ─────────────────────────────────────────── */
	:global(:root) {
		--color-white:    #FAFAF8;
		--color-beige:    #F5EFE6;
		--color-coral:    #E8826A;
		--color-lavender: #B8A9D4;
		--color-sage:     #8FAF8C;
		--color-text:     #2D2A26;
		--color-muted:    #7A736A;
	}

	/* ── Sections ───────────────────────────────────────── */
	.bg-white  { background: var(--color-white); }
	.bg-beige  { background: var(--color-beige); }

	/* ── Buttons ────────────────────────────────────────── */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1.75rem;
		border-radius: 12px;
		font-weight: 600;
		font-size: 1rem;
		text-decoration: none;
		border: 2px solid transparent;
		cursor: pointer;
		transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
		font-family: inherit;
	}
	.btn:hover { transform: translateY(-1px); }

	.btn--primary {
		background: var(--color-coral);
		color: #fff;
		box-shadow: 0 4px 14px rgba(232,130,106,.3);
	}
	.btn--primary:hover { background: #d96f56; }

	.btn--ghost {
		color: var(--color-coral);
		border-color: var(--color-coral);
	}
	.btn--ghost:hover { background: rgba(232,130,106,.07); }

	.btn--full { width: 100%; }
	.btn--lg   { padding: 1rem 2.25rem; font-size: 1.1rem; }

	/* ── Eyebrow ────────────────────────────────────────── */
	.eyebrow {
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: .1em;
		color: var(--color-coral);
		margin-bottom: 0.5rem;
	}

	/* ─────────────────── HERO ─────────────────────────── */
	.hero {
		background: linear-gradient(135deg, #fdf0e8 0%, #f0eaf8 100%);
		padding: 5rem 0 4rem;
	}

	.hero .container {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 3rem;
		align-items: center;
	}

	.hero h1 {
		font-size: clamp(2rem, 5vw, 3.2rem);
		line-height: 1.15;
		margin: 0.25rem 0 0.5rem;
	}

	.hero-sub {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--color-coral);
		margin-bottom: 1rem;
	}

	.hero-desc {
		font-size: 1.05rem;
		color: var(--color-muted);
		line-height: 1.7;
		max-width: 520px;
		margin-bottom: 2rem;
	}

	.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

	.hero-badge-wrap {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.hero-badge {
		background: #fff;
		border-radius: 16px;
		padding: 1rem 1.5rem;
		text-align: center;
		box-shadow: 0 4px 16px rgba(0,0,0,.07);
		min-width: 110px;
	}

	.badge-num {
		font-size: 2.2rem;
		font-weight: 800;
		color: var(--color-coral);
		line-height: 1;
	}

	.badge-label {
		font-size: 0.75rem;
		color: var(--color-muted);
		line-height: 1.4;
		margin-top: 0.25rem;
	}

	/* ─────────────────── FOR WHOM ─────────────────────── */
	.for-whom-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
		gap: 1.25rem;
	}

	.for-whom-card {
		background: var(--color-beige);
		border-radius: 16px;
		padding: 1.5rem;
	}

	.for-whom-icon { font-size: 2rem; margin-bottom: 0.75rem; }
	.for-whom-card p { font-size: .9rem; color: var(--color-muted); line-height: 1.6; }

	/* ─────────────────── FREE ──────────────────────────── */
	.free-block {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 3rem;
		align-items: center;
	}

	.free-text h2 { font-size: clamp(1.5rem, 3vw, 2rem); margin: .5rem 0 .75rem; }
	.free-text p  { color: var(--color-muted); margin-bottom: 1.5rem; line-height: 1.6; }

	.free-visual { display: flex; justify-content: center; }

	.free-card {
		background: #fff;
		border-radius: 20px;
		padding: 2rem;
		text-align: center;
		box-shadow: 0 8px 28px rgba(0,0,0,.08);
		min-width: 160px;
	}

	.free-icon { font-size: 3rem; margin-bottom: .75rem; }
	.free-card p { font-weight: 600; margin-bottom: .25rem; }
	.free-card span { font-size: .8rem; color: var(--color-muted); }

	/* ─────────────────── AUTHOR ────────────────────────── */
	.author-block {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 3rem;
		align-items: start;
		max-width: 800px;
		margin: 0 auto;
	}

	.author-avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: var(--color-sage);
		color: #fff;
		font-size: 3rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.author-text h2 { margin: .5rem 0 1rem; }

	.author-facts {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: .6rem;
		margin-bottom: 1.5rem;
	}

	.author-facts li { font-size: .9rem; color: var(--color-muted); line-height: 1.6; }

	/* ─────────────────── AWAITS ────────────────────────── */
	.awaits-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.awaits-card {
		background: #fff;
		border-radius: 20px;
		padding: 2rem;
		border: 1px solid #e8dece;
	}

	.awaits-icon { font-size: 2.5rem; margin-bottom: .75rem; }
	.awaits-card h3 { margin-bottom: .75rem; font-size: 1.1rem; }
	.awaits-card p  { color: var(--color-muted); line-height: 1.7; font-size: .9rem; margin-bottom: 1.25rem; }

	/* ─────────────────── TOPICS ────────────────────────── */
	.topics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: .625rem;
		margin-bottom: 2.5rem;
	}

	.topic-item {
		display: flex;
		align-items: center;
		gap: .75rem;
		background: var(--color-beige);
		border-radius: 10px;
		padding: .625rem 1rem;
		font-size: .875rem;
	}

	.topic-num {
		font-weight: 700;
		color: var(--color-coral);
		font-size: .8rem;
		min-width: 1.5rem;
	}

	/* Plan includes */
	.plan-includes {
		background: var(--color-beige);
		border-radius: 20px;
		padding: 2rem;
	}

	.plan-includes h3 { margin-bottom: 1.25rem; }

	.includes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: .75rem;
	}

	.include-item {
		display: flex;
		align-items: flex-start;
		gap: .625rem;
		font-size: .875rem;
		line-height: 1.5;
	}

	.include-icon { font-size: 1.1rem; flex-shrink: 0; }

	/* ─────────────────── ADVANTAGES ───────────────────── */
	.adv-card {
		background: #fff;
		border-radius: 16px;
		padding: 1.75rem;
		border: 1px solid #e8dece;
	}

	.adv-icon { font-size: 2rem; margin-bottom: .75rem; }
	.adv-card h3 { font-size: 1rem; margin-bottom: .5rem; }
	.adv-card p  { font-size: .875rem; color: var(--color-muted); line-height: 1.6; }

	/* ─────────────────── EXTRAS ────────────────────────── */
	.extras-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.extra-card {
		display: flex;
		align-items: center;
		gap: .875rem;
		background: var(--color-beige);
		border-radius: 12px;
		padding: 1rem 1.25rem;
	}

	.extra-icon { font-size: 1.75rem; flex-shrink: 0; }
	.extra-title { font-weight: 600; font-size: .9rem; }
	.extra-desc  { font-size: .8rem; color: var(--color-muted); }

	.extras-cta { text-align: center; }

	/* ─────────────────── PRICE ─────────────────────────── */
	.price-wrap { display: flex; justify-content: center; }

	.price-card {
		position: relative;
		background: #fff;
		border-radius: 24px;
		padding: 2.5rem 3rem;
		box-shadow: 0 16px 48px rgba(0,0,0,.1);
		max-width: 440px;
		width: 100%;
		text-align: center;
	}

	.price-badge {
		position: absolute;
		top: -14px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--color-coral);
		color: #fff;
		font-size: .8rem;
		font-weight: 700;
		padding: .3rem 1rem;
		border-radius: 20px;
		white-space: nowrap;
	}

	.price-name { font-size: 1.1rem; font-weight: 600; margin-bottom: .5rem; }

	.price-main {
		font-size: 3rem;
		font-weight: 800;
		color: var(--color-coral);
		line-height: 1;
		margin-bottom: .375rem;
	}

	.price-note { font-size: .85rem; color: var(--color-muted); margin-bottom: 1.5rem; }

	.price-list {
		list-style: none;
		text-align: left;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		gap: .5rem;
	}

	.price-list li { font-size: .9rem; }

	/* ─────────────────── REVIEWS ───────────────────────── */
	.reviews-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.review-card {
		background: var(--color-beige);
		border-radius: 16px;
		padding: 1.75rem;
	}

	.review-stars { color: #f5a623; font-size: 1.1rem; margin-bottom: .75rem; }
	.review-text  { font-size: .9rem; color: var(--color-muted); line-height: 1.7; margin-bottom: 1rem; font-style: italic; }
	.review-author { font-weight: 600; font-size: .875rem; }

	.reviews-more { text-align: center; }

	/* ─────────────────── FAQ ───────────────────────────── */
	.faq-list { max-width: 720px; margin: 0 auto; }

	.faq-item {
		border-bottom: 1px solid #ddd5c8;
	}

	.faq-q {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 1.125rem 0;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-size: .95rem;
		font-weight: 600;
		text-align: left;
		color: var(--color-text);
	}

	.faq-arrow { font-size: .75rem; color: var(--color-coral); flex-shrink: 0; }

	.faq-a {
		padding: 0 0 1.125rem;
		font-size: .9rem;
		color: var(--color-muted);
		line-height: 1.7;
	}

	/* ─────────────────── FINAL CTA ─────────────────────── */
	.final-cta {
		background: linear-gradient(135deg, #fdf0e8 0%, #f0eaf8 100%);
		text-align: center;
	}

	.final-cta h2 { font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: .75rem; }
	.final-cta > .container > p:first-of-type {
		color: var(--color-muted);
		margin-bottom: 2rem;
	}

	.final-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	.final-copy { font-size: .75rem; color: var(--color-muted); }

	/* ─────────────────── RESPONSIVE ───────────────────── */
	@media (max-width: 768px) {
		.hero .container   { grid-template-columns: 1fr; }
		.hero-badge-wrap   { flex-direction: row; flex-wrap: wrap; justify-content: center; }
		.free-block        { grid-template-columns: 1fr; }
		.free-visual       { display: none; }
		.author-block      { grid-template-columns: 1fr; text-align: center; }
		.author-avatar     { margin: 0 auto; }
		.author-facts      { text-align: left; }
		.awaits-grid       { grid-template-columns: 1fr; }
		.reviews-grid      { grid-template-columns: 1fr; }
		.price-card        { padding: 2rem 1.5rem; }
	}
</style>
