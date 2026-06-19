import type { D1Database } from '@cloudflare/workers-types';
import type { LandingPage, LandingVariant } from '$lib/types';

export async function getLandingBySlug(db: D1Database, slug: string): Promise<LandingPage | null> {
	return db
		.prepare('SELECT * FROM landing_pages WHERE slug = ? AND is_active = 1')
		.bind(slug)
		.first<LandingPage>();
}

export async function getVariantsForLanding(db: D1Database, landingId: number): Promise<LandingVariant[]> {
	const { results } = await db
		.prepare('SELECT * FROM landing_variants WHERE landing_id = ? AND is_active = 1')
		.bind(landingId)
		.all<LandingVariant>();
	return results;
}

/** Pick variant by weight or query param. Returns variant key ('A','B','C'). */
export function resolveVariant(
	variants: LandingVariant[],
	requested: string | null,
	cookieVariant: string | null
): string {
	if (!variants.length) return 'A';

	if (requested) {
		const found = variants.find((v) => v.ab_variant === requested.toUpperCase());
		if (found) return found.ab_variant;
	}

	if (cookieVariant) {
		const found = variants.find((v) => v.ab_variant === cookieVariant.toUpperCase());
		if (found) return found.ab_variant;
	}

	// Weighted random selection
	const total = variants.reduce((s, v) => s + v.weight, 0);
	let rand = Math.random() * total;
	for (const v of variants) {
		rand -= v.weight;
		if (rand <= 0) return v.ab_variant;
	}
	return variants[0].ab_variant;
}

export function applyVariant(landing: LandingPage, variant: LandingVariant): LandingPage {
	return {
		...landing,
		title: variant.title ?? landing.title,
		subtitle: variant.subtitle ?? landing.subtitle,
		hero_text: variant.hero_text ?? landing.hero_text,
		cta_text: variant.cta_text ?? landing.cta_text,
		ab_variant: variant.ab_variant
	};
}
