import type { PageServerLoad } from './$types';

const VARIANTS = {
	A: {
		hero_title: 'Испанские недельки',
		hero_subtitle: 'Учи язык вместе с ребёнком!',
		hero_desc: 'Курс позволяет родителям преподавать испанский язык своим детям на основе готовых уроков — даже при нулевом уровне знания языка.',
		cta_primary: 'Связаться в WhatsApp',
		price_badge: null
	},
	B: {
		hero_title: 'Испанский с мамой — курс для занятий дома',
		hero_subtitle: 'Без репетиторов, без расписания, с результатом',
		hero_desc: '27 готовых конспектов — и вы уже преподаватель для своего ребёнка. Всё продумано: песни, игры, карточки, озвучка.',
		cta_primary: 'Узнать подробности',
		price_badge: 'Скидки до 40%'
	}
} as const;

export const load: PageServerLoad = ({ url, cookies, locals }) => {
	const requested = url.searchParams.get('v')?.toUpperCase() as keyof typeof VARIANTS | null;
	const cookie = cookies.get('ab_variant')?.toUpperCase() as keyof typeof VARIANTS | null;
	const variant: keyof typeof VARIANTS =
		(requested && VARIANTS[requested] ? requested : null) ??
		(cookie && VARIANTS[cookie] ? cookie : null) ??
		(Math.random() < 0.5 ? 'A' : 'B');

	if (variant !== cookie) {
		cookies.set('ab_variant', variant, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
			httpOnly: false,
			sameSite: 'lax'
		});
	}

	return {
		variant,
		copy: VARIANTS[variant],
		utmParams: locals.utmParams
	};
};
