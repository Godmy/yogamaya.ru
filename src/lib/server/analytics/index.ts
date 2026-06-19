import type { AnalyticsEngineDataset } from '@cloudflare/workers-types';
import type { AnalyticsEvent } from '$lib/types';

/** Hash IP with SHA-256, return first 16 hex chars. */
export async function hashIp(ip: string): Promise<string> {
	const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
	return Array.from(new Uint8Array(buf))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('')
		.slice(0, 16);
}

/**
 * Write event to Workers Analytics Engine (if binding available).
 * Blobs[0] = event_type, Blobs[1] = landing_slug, Blobs[2] = ab_variant, Blobs[3] = audience
 */
export function writeAnalyticsEngineEvent(
	dataset: AnalyticsEngineDataset | undefined,
	event: AnalyticsEvent
): void {
	if (!dataset) return;
	dataset.writeDataPoint({
		blobs: [
			event.event_type,
			event.landing_slug ?? '',
			event.ab_variant ?? '',
			event.audience ?? '',
			event.button_id ?? '',
			event.teacher_id ?? '',
			event.utm_source ?? '',
			event.utm_campaign ?? ''
		],
		doubles: [],
		indexes: [event.landing_slug ?? 'none']
	});
}
