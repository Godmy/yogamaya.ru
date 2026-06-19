import type { PageServerLoad } from './$types';
import { getActiveClasses } from '$lib/server/db/classes';
import { getActiveTeachers } from '$lib/server/db/teachers';

export const load: PageServerLoad = async ({ platform, locals }) => {
	const db = platform?.env?.DB;
	const [classes, teachers] = db
		? await Promise.all([getActiveClasses(db), getActiveTeachers(db)])
		: [[], []];

	return { classes, teachers, abVariant: locals.abVariant };
};
