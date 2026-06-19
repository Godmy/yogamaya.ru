import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	// data.siteConfig comes from +layout.server.ts automatically
	return {};
};
