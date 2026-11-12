import { error, redirect, type Handle } from '@sveltejs/kit';
import { clearSessionCookie, readSession, SESSION_COOKIE } from '$lib/server/auth';
import { LOCALE_COOKIE, parseLocale } from '$lib/locale';

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

	// Interface language of the menu and the signed-in user
	event.locals.locale = parseLocale(event.cookies.get(LOCALE_COOKIE));
	event.locals.user = null;
	const env = event.platform?.env;
	if (env?.AUTH_SECRET) {
		try {
			event.locals.user = await readSession(event.cookies.get(SESSION_COOKIE), env);
		} catch (err) {
			console.error('auth session read failed', err);
			clearSessionCookie(event.cookies);
		}
	}

	// Cabinets need a session; /admin also the admin role
	const cabinet = url.pathname === '/account' || url.pathname.startsWith('/account/');
	const admin = url.pathname === '/admin' || url.pathname.startsWith('/admin/');
	if ((cabinet || admin) && !event.locals.user) {
		redirect(302, `/auth/login?to=${encodeURIComponent(url.pathname)}`);
	}
	if (admin && event.locals.user?.role !== 'admin') {
		error(403, 'Forbidden');
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', event.locals.locale)
	});
	if (cabinet || admin) response.headers.set('Cache-Control', 'no-store');
	return response;
};
