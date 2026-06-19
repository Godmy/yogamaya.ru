import type { D1Database } from '@cloudflare/workers-types';
import type { Lead } from '$lib/types';

export async function createLead(db: D1Database, lead: Lead): Promise<number> {
	const result = await db
		.prepare(`
			INSERT INTO leads
				(name, phone, telegram, email, child_age, learning_goal, message, consent,
				 selected_teacher_id, selected_landing_slug, ab_variant,
				 utm_source, utm_medium, utm_campaign)
			VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
		`)
		.bind(
			lead.name,
			lead.phone ?? null,
			lead.telegram ?? null,
			lead.email ?? null,
			lead.child_age ?? null,
			lead.learning_goal ?? null,
			lead.message ?? null,
			lead.consent ? 1 : 0,
			lead.selected_teacher_id ?? null,
			lead.selected_landing_slug ?? null,
			lead.ab_variant ?? null,
			lead.utm_source ?? null,
			lead.utm_medium ?? null,
			lead.utm_campaign ?? null
		)
		.run();
	return result.meta.last_row_id as number;
}
