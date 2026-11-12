// See https://svelte.dev/docs/kit/types#app.d.ts

import type { D1Database, KVNamespace, R2Bucket, AnalyticsEngineDataset } from '@cloudflare/workers-types';
import type { SessionClaims } from '$lib/server/auth';
import type { YogaLocale } from '$stylist/yoga/type/alias/yoga-locale';

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
				PUBLIC_TELEGRAM_LOGIN_BOT_USERNAME?: string;
				TELEGRAM_BOT_TOKEN?: string;
				TELEGRAM_LOGIN_BOT_TOKEN?: string;
				AUTH_SECRET?: string;
				ADMIN_TELEGRAM_IDS?: string;
				ADMIN_TELEGRAM_USERNAMES?: string;
				TEACHER_TELEGRAM_IDS?: string;
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
			/** Signed-in user from the session cookie; `null` for guests. */
			user: SessionClaims | null;
			/** Interface language from the `lang` cookie; `ru` by default. */
			locale: YogaLocale;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
