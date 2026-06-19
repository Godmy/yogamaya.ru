# Yoga Maya — yogamaya.ru

Маркетинговая платформа для клуба испанского языка **«Испанский с мамой»**.

## Стек

| Слой | Технология |
|------|-----------|
| Framework | SvelteKit 2 + TypeScript |
| Adapter | `@sveltejs/adapter-cloudflare` |
| Хостинг | Cloudflare Pages / Workers |
| База данных | Cloudflare D1 (`yogamaya-db`) |
| Хранилище файлов | Cloudflare R2 (`yogamaya-media`) |
| Настройки / флаги | Cloudflare KV (`yogamaya-kv`) |
| Аналитика | Workers Analytics Engine (`yogamaya_events`) + D1 events table |

## Быстрый старт

```bash
yarn install
yarn dev
```

> **Важно:** при локальной разработке D1/KV/R2 эмулируются через `wrangler dev`.

```bash
# Локальная разработка с Wrangler (Workers-совместимая среда)
yarn wrangler pages dev --compatibility-date=2025-01-01
```

## Cloudflare Bindings

Перед деплоем:

1. Создайте D1 базу данных:
   ```bash
   yarn wrangler d1 create yogamaya-db
   ```
   Скопируйте `database_id` в `wrangler.toml`.

2. Создайте KV namespace:
   ```bash
   yarn wrangler kv namespace create yogamaya-kv
   yarn wrangler kv namespace create yogamaya-kv --preview
   ```
   Скопируйте `id` и `preview_id` в `wrangler.toml`.

3. Создайте R2 bucket:
   ```bash
   yarn wrangler r2 bucket create yogamaya-media
   ```

4. Примените миграции:
   ```bash
   yarn db:migrate:local   # локально
   yarn db:migrate:remote  # продакшн
   yarn db:seed:local      # тестовые данные
   ```

5. Установите секреты:
   ```bash
   yarn wrangler secret put TELEGRAM_BOT_TOKEN
   ```

## Структура

```
src/
├── app.d.ts                  — типы Cloudflare bindings
├── hooks.server.ts           — A/B variant + UTM из cookie/query
├── lib/
│   ├── server/
│   │   ├── db/               — D1 query helpers
│   │   ├── analytics/        — hashing + Analytics Engine
│   │   └── kv.ts             — feature flags и настройки
│   ├── components/           — Svelte компоненты
│   └── types/                — общие TypeScript типы
└── routes/
    ├── /                     — главная страница
    ├── /spanish              — описание клуба
    ├── /teachers             — список преподавателей
    ├── /classes              — форматы занятий
    ├── /apply                — форма записи
    ├── /contacts             — контакты и политика
    ├── /l/[slug]             — скрытые лендинги (noindex)
    ├── /l/teacher/[slug]     — лендинг преподавателя (noindex)
    └── /api/
        ├── /events           — POST аналитики
        └── /leads            — POST заявок
```

## Публичные страницы

| URL | Описание |
|-----|---------|
| `/` | Главная — обзор Yoga Maya и клуба |
| `/spanish` | Клуб испанского языка |
| `/teachers` | Преподаватели |
| `/classes` | Форматы занятий |
| `/apply` | Форма записи на пробное занятие |
| `/contacts` | Контакты и политика конфиденциальности |

## Скрытые лендинги (noindex, вне меню)

| URL | Аудитория |
|-----|----------|
| `/l/spanish-for-moms` | Мамы с детьми |
| `/l/spanish-for-kids` | Дети 5–12 лет |
| `/l/spanish-beginner` | Начинающие взрослые |
| `/l/spanish-speaking-club` | Разговорный клуб |
| `/l/spanish-trial-lesson` | Пробный урок |
| `/l/teacher/:slug` | Лендинг конкретного преподавателя |

## A/B тестирование

- Вариант выбирается из `?v=A|B|C` → cookie `ab_variant` → случайно (по весам в `landing_variants`)
- Cookie живёт 30 дней, доступна клиентскому JS
- Все события аналитики содержат `ab_variant`
- Управление весами: таблица `landing_variants` в D1

## API

### `POST /api/events`

```json
{
  "event_type": "cta_click",
  "button_id": "home-hero-cta",
  "landing_slug": "spanish-for-moms",
  "ab_variant": "B",
  "path": "/l/spanish-for-moms",
  "referrer": "https://instagram.com"
}
```

Поддерживаемые `event_type`: `page_view`, `cta_click`, `teacher_card_click`,
`lead_form_start`, `lead_form_submit`, `whatsapp_click`, `telegram_click`,
`phone_click`, `video_play`.

### `POST /api/leads`

```json
{
  "name": "Мария",
  "phone": "+79161234567",
  "telegram": "@maria",
  "consent": true,
  "selected_landing_slug": "spanish-for-moms",
  "ab_variant": "A"
}
```

## Деплой

```bash
yarn build
yarn cf:deploy
```

## Дальнейшее развитие

- [ ] Telegram-бот (`bot_users`, `notifications` таблицы готовы)
- [ ] Панель администратора (управление лендингами, заявками)
- [ ] Видео-уроки через R2
- [ ] Email-уведомления через Cloudflare Email Workers
- [ ] Расширенная аналитика через Workers Analytics Engine
