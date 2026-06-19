import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Extract UTM params from URL and store in locals
	const url = event.url;
	event.locals.utmParams = {
		utm_source: url.searchParams.get('utm_source') ?? undefined,
		utm_medium: url.searchParams.get('utm_medium') ?? undefined,
		utm_campaign: url.searchParams.get('utm_campaign') ?? undefined
	};

	// A/B variant resolution: query param > cookie > default 'A'
	const queryVariant = url.searchParams.get('v')?.toUpperCase();
	const cookieVariant = event.cookies.get('ab_variant')?.toUpperCase();
	const variant = queryVariant ?? cookieVariant ?? 'A';
	event.locals.abVariant = variant;

	// Persist variant in cookie (30 days)
	if (queryVariant && queryVariant !== cookieVariant) {
		event.cookies.set('ab_variant', queryVariant, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
			httpOnly: false,  // readable by client-side analytics
			sameSite: 'lax'
		});
	}

	const response = await resolve(event);
	return response;
};
