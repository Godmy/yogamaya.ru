import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createLead } from '$lib/server/db/leads';
import type { Lead } from '$lib/types';

function sanitize(v: unknown): string | undefined {
	if (typeof v !== 'string') return undefined;
	return v.trim().slice(0, 500) || undefined;
}

export const POST: RequestHandler = async ({ request, platform }) => {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		throw error(400, 'Invalid JSON');
	}

	const name = sanitize(body.name);
	if (!name) throw error(400, 'name is required');

	const consent = Boolean(body.consent);
	if (!consent) throw error(400, 'consent is required');

	const lead: Lead = {
		name,
		phone: sanitize(body.phone),
		telegram: sanitize(body.telegram),
		email: sanitize(body.email),
		child_age: sanitize(body.child_age),
		learning_goal: sanitize(body.learning_goal),
		message: sanitize(body.message),
		consent,
		selected_teacher_id: typeof body.selected_teacher_id === 'number' ? body.selected_teacher_id : undefined,
		selected_landing_slug: sanitize(body.selected_landing_slug),
		ab_variant: sanitize(body.ab_variant),
		utm_source: sanitize(body.utm_source),
		utm_medium: sanitize(body.utm_medium),
		utm_campaign: sanitize(body.utm_campaign)
	};

	const db = platform?.env?.DB;
	if (!db) throw error(503, 'Database unavailable');

	const leadId = await createLead(db, lead);

	// TODO: trigger Telegram notification via bot
	// platform?.context?.waitUntil(notifyAdmin(platform.env, lead, leadId));

	return json({ ok: true, id: leadId }, { status: 201 });
};
