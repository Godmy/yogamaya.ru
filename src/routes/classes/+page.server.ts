import type { PageServerLoad } from './$types';
import { getActiveClasses } from '$lib/server/db/classes';

export const load: PageServerLoad = async ({ platform, locals }) => {
	const db = platform?.env?.DB;
	const classes = db ? await getActiveClasses(db) : [];
	return { classes, abVariant: locals.abVariant };
};
