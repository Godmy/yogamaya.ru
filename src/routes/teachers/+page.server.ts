import type { PageServerLoad } from './$types';
import { getActiveTeachers } from '$lib/server/db/teachers';

export const load: PageServerLoad = async ({ platform, locals }) => {
	const db = platform?.env?.DB;
	const teachers = db ? await getActiveTeachers(db) : [];
	return { teachers, abVariant: locals.abVariant };
};
