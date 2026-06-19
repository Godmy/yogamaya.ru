export interface Teacher {
	id: number;
	slug: string;
	name: string;
	photo_url: string | null;
	bio: string | null;
	speciality: string | null;
	languages: string;
	is_active: number;
	sort_order: number;
	created_at: string;
}

export interface Class {
	id: number;
	slug: string;
	title: string;
	description: string | null;
	format: 'group' | 'individual' | 'kids' | 'online' | 'offline';
	age_group: 'adults' | 'kids' | 'mixed' | null;
	duration_min: number | null;
	price_rub: number | null;
	is_active: number;
	sort_order: number;
	created_at: string;
}

export interface LandingPage {
	id: number;
	slug: string;
	title: string;
	subtitle: string | null;
	audience: string | null;
	hero_text: string | null;
	pain_points: string | null;   // JSON string → string[]
	offer: string | null;
	teacher_ids: string | null;   // JSON string → number[]
	cta_text: string;
	cta_url: string;
	ab_variant?: string;          // resolved variant for this request
	is_public: number;
	is_active: number;
	created_at: string;
	updated_at: string;
}

export interface LandingVariant {
	id: number;
	landing_id: number;
	ab_variant: string;
	title: string | null;
	subtitle: string | null;
	hero_text: string | null;
	cta_text: string | null;
	weight: number;
	is_active: number;
	created_at: string;
}

export interface Lead {
	id?: number;
	name: string;
	phone?: string;
	telegram?: string;
	email?: string;
	child_age?: string;
	learning_goal?: string;
	message?: string;
	consent: boolean;
	selected_teacher_id?: number;
	selected_landing_slug?: string;
	ab_variant?: string;
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
}

export type EventType =
	| 'page_view'
	| 'cta_click'
	| 'teacher_card_click'
	| 'lead_form_start'
	| 'lead_form_submit'
	| 'whatsapp_click'
	| 'telegram_click'
	| 'phone_click'
	| 'video_play';

export interface AnalyticsEvent {
	event_type: EventType;
	landing_slug?: string;
	ab_variant?: string;
	audience?: string;
	button_id?: string;
	teacher_id?: string;
	path?: string;
	referrer?: string;
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
	user_agent?: string;
	ip_hash?: string;
}

export type AbVariant = 'A' | 'B' | 'C';

export interface SiteConfig {
	site_name: string;
	site_url: string;
	whatsapp: string;
	telegram: string;
	phone: string;
}
