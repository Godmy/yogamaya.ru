<script lang="ts">
	interface Props {
		href: string;
		trackId: string;
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		class?: string;
		landingSlug?: string;
		abVariant?: string;
	}

	let {
		href,
		trackId,
		variant = 'primary',
		size = 'md',
		fullWidth = false,
		class: className = '',
		landingSlug,
		abVariant,
		children
	}: Props & { children?: import('svelte').Snippet } = $props();

	function handleClick() {
		if (typeof window === 'undefined') return;
		fetch('/api/events', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event_type: 'cta_click',
				button_id: trackId,
				landing_slug: landingSlug,
				ab_variant: abVariant,
				path: window.location.pathname,
				referrer: document.referrer
			})
		}).catch(() => {/* fire and forget */});
	}
</script>

<a
	{href}
	data-track-id={trackId}
	class="cta-btn cta-btn--{variant} cta-btn--{size} {fullWidth ? 'cta-btn--full' : ''} {className}"
	onclick={handleClick}
>
	{#if children}
		{@render children()}
	{/if}
</a>

<style>
	.cta-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		font-weight: 600;
		text-decoration: none;
		transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
		cursor: pointer;
		border: 2px solid transparent;
		line-height: 1.2;
	}

	.cta-btn:hover { transform: translateY(-1px); }
	.cta-btn:active { transform: translateY(0); }

	/* Sizes */
	.cta-btn--sm  { padding: 0.5rem 1rem;    font-size: 0.875rem; }
	.cta-btn--md  { padding: 0.75rem 1.5rem; font-size: 1rem; }
	.cta-btn--lg  { padding: 1rem 2rem;      font-size: 1.125rem; }
	.cta-btn--full { width: 100%; }

	/* Variants */
	.cta-btn--primary {
		background: var(--color-coral);
		color: #fff;
		box-shadow: 0 4px 14px rgba(232, 130, 106, 0.35);
	}
	.cta-btn--primary:hover {
		background: #d96f56;
		box-shadow: 0 6px 20px rgba(232, 130, 106, 0.45);
	}

	.cta-btn--secondary {
		background: var(--color-lavender);
		color: #fff;
	}
	.cta-btn--secondary:hover { background: #a296c2; }

	.cta-btn--ghost {
		background: transparent;
		color: var(--color-coral);
		border-color: var(--color-coral);
	}
	.cta-btn--ghost:hover {
		background: rgba(232, 130, 106, 0.08);
	}
</style>
