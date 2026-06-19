import type { D1Database } from '@cloudflare/workers-types';
import type { Teacher } from '$lib/types';

export async function getActiveTeachers(db: D1Database): Promise<Teacher[]> {
	const { results } = await db
		.prepare('SELECT * FROM teachers WHERE is_active = 1 ORDER BY sort_order ASC')
		.all<Teacher>();
	return results;
}

export async function getTeacherBySlug(db: D1Database, slug: string): Promise<Teacher | null> {
	return db
		.prepare('SELECT * FROM teachers WHERE slug = ? AND is_active = 1')
		.bind(slug)
		.first<Teacher>();
}

export async function getTeachersByIds(db: D1Database, ids: number[]): Promise<Teacher[]> {
	if (!ids.length) return [];
	const placeholders = ids.map(() => '?').join(',');
	const { results } = await db
		.prepare(`SELECT * FROM teachers WHERE id IN (${placeholders}) AND is_active = 1 ORDER BY sort_order ASC`)
		.bind(...ids)
		.all<Teacher>();
	return results;
}
