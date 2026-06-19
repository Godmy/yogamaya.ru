import type { D1Database } from '@cloudflare/workers-types';
import type { AnalyticsEvent } from '$lib/types';

export async function insertEvent(db: D1Database, event: AnalyticsEvent): Promise<void> {
	await db
		.prepare(`
			INSERT INTO events
				(event_type, landing_slug, ab_variant, audience, button_id, teacher_id,
				 path, referrer, utm_source, utm_medium, utm_campaign, user_agent, ip_hash)
			VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
		`)
		.bind(
			event.event_type,
			event.landing_slug ?? null,
			event.ab_variant ?? null,
			event.audience ?? null,
			event.button_id ?? null,
			event.teacher_id ?? null,
			event.path ?? null,
			event.referrer ?? null,
			event.utm_source ?? null,
			event.utm_medium ?? null,
			event.utm_campaign ?? null,
			event.user_agent ?? null,
			event.ip_hash ?? null
		)
		.run();
}
