import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ platform, locals }) => {
	return {
		siteConfig: {
			site_name: platform?.env?.PUBLIC_SITE_NAME ?? 'Yoga Maya',
			site_url: platform?.env?.PUBLIC_SITE_URL ?? 'https://yogamaya.ru',
			whatsapp: platform?.env?.PUBLIC_WHATSAPP ?? '',
			telegram: platform?.env?.PUBLIC_TELEGRAM ?? '',
			phone: platform?.env?.PUBLIC_PHONE ?? ''
		},
		abVariant: locals.abVariant,
		utmParams: locals.utmParams
	};
};
