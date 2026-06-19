import type { D1Database } from '@cloudflare/workers-types';
import type { Class } from '$lib/types';

export async function getActiveClasses(db: D1Database): Promise<Class[]> {
	const { results } = await db
		.prepare('SELECT * FROM classes WHERE is_active = 1 ORDER BY sort_order ASC')
		.all<Class>();
	return results;
}

export async function getClassBySlug(db: D1Database, slug: string): Promise<Class | null> {
	return db
		.prepare('SELECT * FROM classes WHERE slug = ? AND is_active = 1')
		.bind(slug)
		.first<Class>();
}
