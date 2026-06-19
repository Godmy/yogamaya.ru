import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	getLandingBySlug,
	getVariantsForLanding,
	resolveVariant,
	applyVariant
} from '$lib/server/db/landings';
import { getTeachersByIds } from '$lib/server/db/teachers';

export const load: PageServerLoad = async ({ platform, locals, params, url, cookies }) => {
	const db = platform?.env?.DB;
	if (!db) throw error(503, 'Database unavailable');

	const landing = await getLandingBySlug(db, params.slug);
	if (!landing || !landing.is_active) throw error(404, 'Лендинг не найден');

	const variants = await getVariantsForLanding(db, landing.id);

	const requestedVariant = url.searchParams.get('v');
	const cookieVariant = cookies.get('ab_variant') ?? null;
	const chosenVariant = resolveVariant(variants, requestedVariant, cookieVariant ?? locals.abVariant);

	// Persist chosen variant
	if (chosenVariant !== cookieVariant) {
		cookies.set('ab_variant', chosenVariant, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
			httpOnly: false,
			sameSite: 'lax'
		});
	}

	const activeVariant = variants.find((v) => v.ab_variant === chosenVariant);
	const resolvedLanding = activeVariant ? applyVariant(landing, activeVariant) : { ...landing, ab_variant: chosenVariant };

	const teacherIds: number[] = landing.teacher_ids ? JSON.parse(landing.teacher_ids) : [];
	const teachers = teacherIds.length ? await getTeachersByIds(db, teacherIds) : [];

	const painPoints: string[] = landing.pain_points ? JSON.parse(landing.pain_points) : [];

	return {
		landing: resolvedLanding,
		teachers,
		painPoints,
		abVariant: chosenVariant,
		utmParams: locals.utmParams
	};
};
