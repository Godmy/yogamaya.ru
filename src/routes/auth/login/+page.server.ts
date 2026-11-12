import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { RETURN_COOKIE } from '$lib/server/auth';
import { safeReturnPath } from '$lib/locale';

export const load: PageServerLoad = async ({ platform, url, locals, cookies }) => {
	const to = safeReturnPath(url.searchParams.get('to') ?? '/account');
	if (locals.user) redirect(302, to);

	// The Telegram callback has no room for our own query: its params are hashed.
	cookies.set(RETURN_COOKIE, to, { path: '/', maxAge: 60 * 15, httpOnly: true, sameSite: 'lax' });

	const env = platform?.env;
	const botUsername = env?.PUBLIC_TELEGRAM_LOGIN_BOT_USERNAME ?? null;
	return {
		botUsername,
		isConfigured: Boolean(botUsername && env?.TELEGRAM_LOGIN_BOT_TOKEN && env?.AUTH_SECRET),
		error: url.searchParams.get('error')
	};
};
