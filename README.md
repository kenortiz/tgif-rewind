# 📺 TGIF Rewind

> *"It's Friday night — vibes only."*

A retro time-machine for ABC's TGIF Friday-night lineup (1989–2000). Pick any Friday in the era, see the 8:00–10:00 PM block exactly as it aired, watch theme songs, and play period-accurate commercials between shows.

**🔴 Live:** [tgif-rewind.netlify.app](https://tgif-rewind.netlify.app)

---

## ✨ Features

- **Tonight on TGIF** — Today's date mapped to a real historical Friday from the TGIF era, with a full 4-slot lineup.
- **Time Machine** — Calendar picker restricted to Fridays between 1989-09-22 and 2000-09-08.
- **Season Browser** — Browse all 11 TGIF seasons and jump to any Friday.
- **Episode Dialog** — Synopsis, original air date, embedded YouTube theme song, and a one-click "find this episode on YouTube" search link.
- **Commercial Breaks** — Toggle period-accurate 80s/90s YouTube commercials between slot cards.
- **Retro Design System** — CRT scanlines, Bungee/VT323 fonts, Memphis-design AI-generated show posters, neon magenta + electric yellow on deep navy.

## 🛠 Tech Stack

- **React 18** + **Vite 5** + **TypeScript 5**
- **Tailwind CSS v3** with semantic HSL design tokens
- **shadcn/ui** + **Radix UI** primitives
- **React Router** for routing
- **Framer Motion** for the retro logo flicker
- **Supabase** (Postgres + Deno edge functions) for episode lookups and TMDB show info
- Curated seed data for lineups, themes, and commercials

## 🗂 Project Structure

```
src/
├── data/
│   ├── shows.ts         # Show metadata + theme YouTube IDs
│   ├── episodes.ts      # Curated milestone episodes
│   ├── seasons.ts       # Per-season default lineups (1989–1999)
│   ├── schedule.ts      # Friday → lineup resolution logic
│   ├── commercials.ts   # Period-tagged commercial pool
│   └── posters.ts       # AI-generated retro poster imports
├── components/
│   ├── AppShell.tsx     # Header + bottom nav
│   ├── TgifLogo.tsx     # CRT-flicker animated logo
│   ├── LineupView.tsx   # 4-slot Friday lineup
│   ├── SlotCard.tsx     # Single show timeslot card
│   ├── EpisodeDialog.tsx
│   └── CommercialBreak.tsx
└── pages/
    ├── Index.tsx        # Tonight on TGIF
    ├── FridayPage.tsx   # /friday/:date
    ├── Picker.tsx       # Time machine calendar
    ├── Seasons.tsx      # Season grid
    ├── SeasonDetail.tsx
    └── Settings.tsx     # Commercial toggle, etc.
```

## 🚀 Getting Started

```sh
npm install
cp .env.example .env   # then fill in your Supabase project values
npm run dev
```

Then open http://localhost:8080.

The `.env` values are the Supabase project URL and anon (publishable) key — both are safe for client-side use; data access is governed by Row Level Security.

### Available scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest test suite |

## 🎨 Design System

All colors are HSL semantic tokens defined in `src/index.css` and mapped in `tailwind.config.ts`:

- `--tgif-navy`, `--tgif-navy-deep` — backgrounds
- `--tgif-magenta` — primary neon accent
- `--tgif-yellow` — secondary accent
- `--tgif-cyan` — tertiary accent
- `--tgif-cream` — foreground text

Never hardcode colors in components — always use the tokens.

## 📝 Adding Content

- **New show?** Add an entry to `src/data/shows.ts` with a verified YouTube theme ID, then add a poster to `src/assets/posters/` and register it in `src/data/posters.ts`.
- **New Friday lineup?** Add a curated entry to `src/data/schedule.ts` (otherwise it falls back to the season's default lineup from `seasons.ts`).
- **New commercial?** Add a `{ year, youtubeId, title }` entry to `src/data/commercials.ts`.

## 🌐 Deployment

Hosted on [Netlify](https://www.netlify.com/) at [tgif-rewind.netlify.app](https://tgif-rewind.netlify.app), auto-deploying on every push to `main`.

- Build config lives in [`netlify.toml`](./netlify.toml), including an SPA redirect so deep links like `/friday/1994-09-23` resolve to `index.html` for client-side routing.
- The three `VITE_SUPABASE_*` values from `.env.example` are set as environment variables in the Netlify site settings.
- Supabase edge functions (`get-show-info`, `get-episode-by-date`) run on Supabase, not Netlify, and are called from the client at runtime.

## ⚠️ Out of Scope

- Real episode video playback (rights). YouTube embeds are limited to theme songs and commercials.
- User accounts, favorites, watch history — possible future additions.

## 🙏 Credits

Originally prototyped with [Lovable](https://lovable.dev); now developed independently. Show metadata via [TMDB](https://www.themoviedb.org/).
