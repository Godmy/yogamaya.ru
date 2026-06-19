// See https://svelte.dev/docs/kit/types#app.d.ts

import type { D1Database, KVNamespace, R2Bucket, AnalyticsEngineDataset } from '@cloudflare/workers-types';

declare global {
	namespace App {
		interface Platform {
			env: {
				DB: D1Database;
				KV: KVNamespace;
				MEDIA: R2Bucket;
				ANALYTICS: AnalyticsEngineDataset;
				PUBLIC_SITE_NAME: string;
				PUBLIC_SITE_URL: string;
				PUBLIC_WHATSAPP: string;
				PUBLIC_TELEGRAM: string;
				PUBLIC_PHONE: string;
				TELEGRAM_BOT_TOKEN?: string;
			};
			context: {
				waitUntil(promise: Promise<unknown>): void;
			};
			caches: CacheStorage & { default: Cache };
		}

		interface Locals {
			abVariant: string;
			utmParams: {
				utm_source?: string;
				utm_medium?: string;
				utm_campaign?: string;
			};
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
