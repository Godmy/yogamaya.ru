<script lang="ts">
	interface Props {
		landingSlug?: string;
		abVariant?: string;
		selectedTeacherId?: number;
		preselectedClass?: string;
		audience?: string;
	}

	let {
		landingSlug,
		abVariant,
		selectedTeacherId,
		preselectedClass,
		audience
	}: Props = $props();

	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMsg = $state('');

	let fields = $state({
		name: '',
		phone: '',
		telegram: '',
		email: '',
		child_age: '',
		learning_goal: '',
		message: '',
		consent: false
	});

	function trackFormStart() {
		fetch('/api/events', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event_type: 'lead_form_start',
				landing_slug: landingSlug,
				ab_variant: abVariant,
				path: typeof window !== 'undefined' ? window.location.pathname : ''
			})
		}).catch(() => {});
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!fields.consent) {
			errorMsg = 'Необходимо дать согласие на обработку данных';
			return;
		}

		formState = 'submitting';
		errorMsg = '';

		const utmParams = typeof window !== 'undefined'
			? Object.fromEntries(new URLSearchParams(window.location.search))
			: {};

		try {
			const res = await fetch('/api/leads', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...fields,
					selected_teacher_id: selectedTeacherId,
					selected_landing_slug: landingSlug,
					ab_variant: abVariant,
					utm_source: utmParams.utm_source,
					utm_medium: utmParams.utm_medium,
					utm_campaign: utmParams.utm_campaign
				})
			});

			if (!res.ok) throw new Error(await res.text());

			formState = 'success';

			fetch('/api/events', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					event_type: 'lead_form_submit',
					landing_slug: landingSlug,
					ab_variant: abVariant,
					path: window.location.pathname
				})
			}).catch(() => {});

		} catch (err) {
			formState = 'error';
			errorMsg = 'Произошла ошибка. Попробуйте ещё раз или напишите нам напрямую.';
		}
	}
</script>

{#if formState === 'success'}
	<div class="success-message">
		<div class="success-icon">✅</div>
		<h3>Заявка отправлена!</h3>
		<p>Мы свяжемся с вами в течение 24 часов. Ожидайте звонка или сообщения в Telegram.</p>
	</div>
{:else}
	<form class="lead-form" onsubmit={handleSubmit}>
		<div class="form-row">
			<div class="form-field">
				<label for="lf-name">Ваше имя *</label>
				<input
					id="lf-name"
					type="text"
					placeholder="Как вас зовут?"
					required
					bind:value={fields.name}
					onfocus={trackFormStart}
				/>
			</div>
		</div>

		<div class="form-row form-row--2">
			<div class="form-field">
				<label for="lf-phone">Телефон</label>
				<input
					id="lf-phone"
					type="tel"
					placeholder="+7 (___) ___-__-__"
					bind:value={fields.phone}
				/>
			</div>
			<div class="form-field">
				<label for="lf-telegram">Telegram</label>
				<input
					id="lf-telegram"
					type="text"
					placeholder="@username"
					bind:value={fields.telegram}
				/>
			</div>
		</div>

		<div class="form-field">
			<label for="lf-email">Email</label>
			<input
				id="lf-email"
				type="email"
				placeholder="your@email.com"
				bind:value={fields.email}
			/>
		</div>

		{#if audience === 'moms' || audience === 'kids'}
			<div class="form-field">
				<label for="lf-child-age">Возраст ребёнка</label>
				<input
					id="lf-child-age"
					type="text"
					placeholder="Например: 5 лет"
					bind:value={fields.child_age}
				/>
			</div>
		{/if}

		<div class="form-field">
			<label for="lf-goal">Цель изучения испанского</label>
			<select id="lf-goal" bind:value={fields.learning_goal}>
				<option value="">Выберите цель (необязательно)</option>
				<option value="travel">Путешествия</option>
				<option value="work">Работа</option>
				<option value="family">Семейное обучение с ребёнком</option>
				<option value="culture">Культура и кино</option>
				<option value="speaking">Разговорная практика</option>
				<option value="other">Другое</option>
			</select>
		</div>

		<div class="form-field">
			<label for="lf-message">Комментарий</label>
			<textarea
				id="lf-message"
				rows="3"
				placeholder="Ваш уровень, вопросы, пожелания..."
				bind:value={fields.message}
			></textarea>
		</div>

		<div class="form-field form-field--checkbox">
			<label class="checkbox-label">
				<input type="checkbox" bind:checked={fields.consent} required />
				<span>
					Я соглашаюсь на
					<a href="/contacts#privacy" target="_blank">обработку персональных данных</a>
				</span>
			</label>
		</div>

		{#if errorMsg}
			<p class="form-error">{errorMsg}</p>
		{/if}

		<button
			type="submit"
			class="submit-btn"
			disabled={formState === 'submitting'}
			data-track-id="lead-form-submit"
		>
			{formState === 'submitting' ? 'Отправляем...' : 'Записаться на пробное занятие'}
		</button>
	</form>
{/if}

<style>
	.lead-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-row { display: flex; flex-direction: column; gap: 1rem; }
	.form-row--2 { flex-direction: row; }

	@media (max-width: 480px) {
		.form-row--2 { flex-direction: column; }
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		flex: 1;
	}

	label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text);
	}

	input, select, textarea {
		border: 1.5px solid #ddd5c8;
		border-radius: 10px;
		padding: 0.625rem 0.875rem;
		font-size: 0.95rem;
		font-family: inherit;
		transition: border-color 0.15s, box-shadow 0.15s;
		background: var(--color-white);
		color: var(--color-text);
	}

	input:focus, select:focus, textarea:focus {
		outline: none;
		border-color: var(--color-coral);
		box-shadow: 0 0 0 3px rgba(232, 130, 106, 0.15);
	}

	textarea { resize: vertical; min-height: 80px; }

	.form-field--checkbox { flex-direction: row; align-items: flex-start; }

	.checkbox-label {
		display: flex;
		gap: 0.5rem;
		align-items: flex-start;
		font-size: 0.875rem;
		cursor: pointer;
		font-weight: 400;
	}

	.checkbox-label input { width: auto; flex-shrink: 0; margin-top: 2px; }

	.checkbox-label a { color: var(--color-coral); }

	.form-error {
		color: #e53e3e;
		font-size: 0.875rem;
		margin: 0;
	}

	.submit-btn {
		background: var(--color-coral);
		color: #fff;
		border: none;
		border-radius: 12px;
		padding: 0.875rem 1.5rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s, transform 0.15s;
		font-family: inherit;
	}

	.submit-btn:hover:not(:disabled) {
		background: #d96f56;
		transform: translateY(-1px);
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.success-message {
		text-align: center;
		padding: 2rem;
	}

	.success-icon { font-size: 3rem; margin-bottom: 1rem; }

	.success-message h3 {
		font-size: 1.4rem;
		margin-bottom: 0.5rem;
	}

	.success-message p {
		color: var(--color-text-muted);
		line-height: 1.6;
	}
</style>
