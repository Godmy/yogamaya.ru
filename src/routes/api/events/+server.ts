import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { insertEvent } from '$lib/server/db/events';
import { hashIp, writeAnalyticsEngineEvent } from '$lib/server/analytics';
import type { EventType } from '$lib/types';

const VALID_EVENTS = new Set<EventType>([
	'page_view',
	'cta_click',
	'teacher_card_click',
	'lead_form_start',
	'lead_form_submit',
	'whatsapp_click',
	'telegram_click',
	'phone_click',
	'video_play'
]);

export const POST: RequestHandler = async ({ request, platform }) => {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		throw error(400, 'Invalid JSON');
	}

	const event_type = body.event_type as string;
	if (!VALID_EVENTS.has(event_type as EventType)) {
		throw error(400, `Unknown event_type: ${event_type}`);
	}

	const ip = request.headers.get('CF-Connecting-IP') ??
		request.headers.get('X-Forwarded-For')?.split(',')[0].trim() ?? '';
	const ip_hash = ip ? await hashIp(ip) : undefined;

	const event = {
		event_type: event_type as EventType,
		landing_slug: (body.landing_slug as string) ?? undefined,
		ab_variant: (body.ab_variant as string) ?? undefined,
		audience: (body.audience as string) ?? undefined,
		button_id: (body.button_id as string) ?? undefined,
		teacher_id: (body.teacher_id as string) ?? undefined,
		path: (body.path as string) ?? undefined,
		referrer: (body.referrer as string) ?? undefined,
		utm_source: (body.utm_source as string) ?? undefined,
		utm_medium: (body.utm_medium as string) ?? undefined,
		utm_campaign: (body.utm_campaign as string) ?? undefined,
		user_agent: request.headers.get('User-Agent') ?? undefined,
		ip_hash
	};

	const db = platform?.env?.DB;
	if (db) {
		// Non-blocking write — don't fail the response if analytics is slow
		platform?.context?.waitUntil(insertEvent(db, event));
	}

	writeAnalyticsEngineEvent(platform?.env?.ANALYTICS, event);

	return json({ ok: true }, { status: 202 });
};
