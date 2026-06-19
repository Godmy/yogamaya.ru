import type { KVNamespace } from '@cloudflare/workers-types';

export async function getFlag(kv: KVNamespace, key: string, defaultValue = false): Promise<boolean> {
	const val = await kv.get(`flag:${key}`);
	if (val === null) return defaultValue;
	return val === 'true' || val === '1';
}

export async function getSetting<T = string>(
	kv: KVNamespace,
	key: string,
	defaultValue?: T
): Promise<T | undefined> {
	const val = await kv.get(`setting:${key}`, 'json');
	return (val as T) ?? defaultValue;
}

export async function setSetting<T>(kv: KVNamespace, key: string, value: T): Promise<void> {
	await kv.put(`setting:${key}`, JSON.stringify(value));
}

export async function getAbWeights(
	kv: KVNamespace,
	landingSlug: string
): Promise<Record<string, number> | null> {
	return kv.get(`ab:${landingSlug}`, 'json');
}
