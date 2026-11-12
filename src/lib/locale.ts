import { YOGA_LOCALE_NAME } from '$stylist/yoga/const/record/yoga-locale-name';
import type { YogaLocale } from '$stylist/yoga/type/alias/yoga-locale';

/** Cookie of the interface language chosen in the menu. */
export const LOCALE_COOKIE = 'lang';

/** Known interface language or `ru`. */
export const parseLocale = (value: string | null | undefined): YogaLocale =>
	value && Object.hasOwn(YOGA_LOCALE_NAME, value) ? (value as YogaLocale) : 'ru';

/** Same-origin path or `/`: `//host` and `/\host` would leave the site. */
export const safeReturnPath = (value: unknown): string =>
	typeof value === 'string' && /^\/(?![/\\])/.test(value) ? value : '/';
