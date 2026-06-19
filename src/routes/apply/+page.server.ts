import type { PageServerLoad } from './$types';
import { getActiveTeachers } from '$lib/server/db/teachers';

export const load: PageServerLoad = async ({ platform, locals, url }) => {
	const db = platform?.env?.DB;
	const teachers = db ? await getActiveTeachers(db) : [];

	const landingSlug = url.searchParams.get('landing') ?? undefined;
	const preselectedClass = url.searchParams.get('class') ?? undefined;

	return {
		teachers,
		landingSlug,
		preselectedClass,
		abVariant: locals.abVariant,
		utmParams: locals.utmParams
	};
};
