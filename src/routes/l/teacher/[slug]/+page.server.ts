import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTeacherBySlug } from '$lib/server/db/teachers';
import { getActiveClasses } from '$lib/server/db/classes';

export const load: PageServerLoad = async ({ platform, locals, params }) => {
	const db = platform?.env?.DB;
	if (!db) throw error(503, 'Database unavailable');

	const teacher = await getTeacherBySlug(db, params.slug);
	if (!teacher) throw error(404, 'Преподаватель не найден');

	const classes = await getActiveClasses(db);

	return {
		teacher,
		classes,
		abVariant: locals.abVariant
	};
};
