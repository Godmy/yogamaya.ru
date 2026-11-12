import { redirect, type RequestHandler } from '@sveltejs/kit';
import { clearSessionCookie, revokeSession } from '$lib/server/auth';

/** Sign-out of the menu and the cabinet: a POST form, so a link cannot sign anyone out. */
export const POST: RequestHandler = async ({ cookies, locals, platform }) => {
	await revokeSession(locals.user, { KV: platform?.env?.KV });
	clearSessionCookie(cookies);
	redirect(303, '/');
};
