import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = ({ url }) => {
	if (url.hostname === 'hispamama.yogamaya.ru') {
		return '/l/hispamama';
	}
};
