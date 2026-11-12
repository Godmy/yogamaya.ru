import { redirect, type RequestHandler } from '@sveltejs/kit';
import {
	issueSession,
	RETURN_COOKIE,
	roleForTelegramUser,
	setSessionCookie,
	verifyTelegramLogin
} from '$lib/server/auth';
import { safeReturnPath } from '$lib/locale';

export const GET: RequestHandler = async ({ cookies, platform, url }) => {
	const env = platform?.env;
	if (!env) redirect(302, '/auth/login?error=server_not_configured');

	let telegramUser;
	try {
		telegramUser = await verifyTelegramLogin(url.searchParams, env);
	} catch (err) {
		console.error('telegram login failed', err);
		redirect(302, '/auth/login?error=telegram_login_failed');
	}

	const token = await issueSession(telegramUser, roleForTelegramUser(telegramUser, env), env);
	setSessionCookie(cookies, token);

	const to = safeReturnPath(cookies.get(RETURN_COOKIE) ?? '/account');
	cookies.delete(RETURN_COOKIE, { path: '/' });
	redirect(302, to);
};
