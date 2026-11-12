import type { Cookies } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types';
import type { YogaRole } from '$stylist/yoga/type/alias/yoga-role';

// Telegram login and a signed session cookie, as on myspanish.space. Any Telegram
// user may sign in: the school's clients become students; admins and teachers are
// listed in the environment. Revoked sessions are kept in KV until they expire.

export const SESSION_COOKIE = 'ym_session';
/** Path to return to after the Telegram callback; set by the sign-in page. */
export const RETURN_COOKIE = 'ym_return';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const TELEGRAM_AUTH_MAX_AGE_SECONDS = 60 * 60 * 24;

export interface AuthEnv {
	AUTH_SECRET?: string;
	TELEGRAM_LOGIN_BOT_TOKEN?: string;
	ADMIN_TELEGRAM_IDS?: string;
	ADMIN_TELEGRAM_USERNAMES?: string;
	TEACHER_TELEGRAM_IDS?: string;
	KV?: KVNamespace;
}

export interface TelegramLoginUser {
	id: number;
	first_name: string;
	last_name?: string;
	username?: string;
	auth_date: number;
}

export interface SessionClaims {
	sub: number;
	uname?: string;
	name: string;
	role: YogaRole;
	iat: number;
	exp: number;
	jti: string;
}

export class AuthError extends Error {
	constructor(
		public code: string,
		message: string
	) {
		super(message);
		this.name = 'AuthError';
	}
}

const encoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array): string {
	let binary = '';
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function base64UrlDecode(value: string): Uint8Array {
	const padded =
		value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - (value.length % 4)) % 4);
	return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

function toHex(bytes: ArrayBuffer): string {
	return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function constantTimeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return diff === 0;
}

async function hmacSha256Hex(message: string, secret: ArrayBuffer): Promise<string> {
	const key = await crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, false, [
		'sign'
	]);
	return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(message)));
}

async function hmacSha256Base64Url(message: string, secret: string): Promise<string> {
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	return base64UrlEncode(new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(message))));
}

function requireEnv(value: string | undefined, name: string): string {
	if (!value) throw new AuthError('missing_config', `${name} is not configured`);
	return value;
}

function listOf(raw: string | undefined): Set<string> {
	return new Set(
		(raw ?? '')
			.split(',')
			.map((item) => item.trim().replace(/^@/, '').toLowerCase())
			.filter(Boolean)
	);
}

/** Checks the Telegram Login Widget payload: hash by the bot token and freshness. */
export async function verifyTelegramLogin(
	params: URLSearchParams,
	env: AuthEnv
): Promise<TelegramLoginUser> {
	const botToken = requireEnv(env.TELEGRAM_LOGIN_BOT_TOKEN, 'TELEGRAM_LOGIN_BOT_TOKEN');
	const receivedHash = params.get('hash');
	const id = Number(params.get('id'));
	const authDate = Number(params.get('auth_date'));
	const firstName = params.get('first_name');
	if (!receivedHash || !Number.isSafeInteger(id) || !Number.isSafeInteger(authDate) || !firstName) {
		throw new AuthError('bad_payload', 'Telegram authorization payload is incomplete');
	}

	const dataCheckString = [...params.entries()]
		.filter(([key]) => key !== 'hash')
		.sort(([left], [right]) => left.localeCompare(right))
		.map(([key, value]) => `${key}=${value}`)
		.join('\n');
	const secretKey = await crypto.subtle.digest('SHA-256', encoder.encode(botToken));
	if (!constantTimeEqual(await hmacSha256Hex(dataCheckString, secretKey), receivedHash)) {
		throw new AuthError('bad_hash', 'Telegram authorization hash is invalid');
	}

	const now = Math.floor(Date.now() / 1000);
	if (authDate > now + 300 || now - authDate > TELEGRAM_AUTH_MAX_AGE_SECONDS) {
		throw new AuthError('stale_payload', 'Telegram authorization payload is stale');
	}

	return {
		id,
		first_name: firstName,
		last_name: params.get('last_name') ?? undefined,
		username: params.get('username') ?? undefined,
		auth_date: authDate
	};
}

/** Admins and teachers by Telegram id or username; every other user is a student. */
export function roleForTelegramUser(user: TelegramLoginUser, env: AuthEnv): YogaRole {
	const keys = [String(user.id), user.username?.toLowerCase()].filter(Boolean) as string[];
	const admins = new Set([...listOf(env.ADMIN_TELEGRAM_IDS), ...listOf(env.ADMIN_TELEGRAM_USERNAMES)]);
	if (keys.some((key) => admins.has(key))) return 'admin';
	if (keys.some((key) => listOf(env.TEACHER_TELEGRAM_IDS).has(key))) return 'teacher';
	return 'student';
}

export async function issueSession(user: TelegramLoginUser, role: YogaRole, env: AuthEnv): Promise<string> {
	const secret = requireEnv(env.AUTH_SECRET, 'AUTH_SECRET');
	const now = Math.floor(Date.now() / 1000);
	const claims: SessionClaims = {
		sub: user.id,
		uname: user.username,
		name: [user.first_name, user.last_name].filter(Boolean).join(' '),
		role,
		iat: now,
		exp: now + SESSION_TTL_SECONDS,
		jti: crypto.randomUUID()
	};
	const header = base64UrlEncode(encoder.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
	const body = `${header}.${base64UrlEncode(encoder.encode(JSON.stringify(claims)))}`;
	return `${body}.${await hmacSha256Base64Url(body, secret)}`;
}

export async function readSession(token: string | undefined, env: AuthEnv): Promise<SessionClaims | null> {
	if (!token) return null;
	const secret = requireEnv(env.AUTH_SECRET, 'AUTH_SECRET');
	const [header, payload, signature] = token.split('.');
	if (!header || !payload || !signature) return null;
	if (!constantTimeEqual(await hmacSha256Base64Url(`${header}.${payload}`, secret), signature)) {
		return null;
	}

	const claims = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload))) as SessionClaims;
	const now = Math.floor(Date.now() / 1000);
	if (!Number.isSafeInteger(claims.sub) || !claims.jti || !claims.role || !claims.exp || claims.exp <= now) {
		return null;
	}
	if (env.KV && (await env.KV.get(`auth:revoked:${claims.jti}`))) return null;
	return claims;
}

export async function revokeSession(claims: SessionClaims | null, env: AuthEnv): Promise<void> {
	if (!claims?.jti || !env.KV) return;
	const ttl = claims.exp - Math.floor(Date.now() / 1000);
	// KV rejects a TTL under 60 seconds.
	if (ttl > 0) await env.KV.put(`auth:revoked:${claims.jti}`, '1', { expirationTtl: Math.max(ttl, 60) });
}

export function setSessionCookie(cookies: Cookies, token: string): void {
	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: SESSION_TTL_SECONDS
	});
}

export function clearSessionCookie(cookies: Cookies): void {
	cookies.delete(SESSION_COOKIE, { path: '/' });
}
