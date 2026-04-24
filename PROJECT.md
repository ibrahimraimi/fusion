# Fusion

Fusion is a discovery platform designed to help music lovers find the "story behind the music" by curating and showcasing music covers that share a narrative, vibe, or seamless transition.

## Project Overview
The goal of Fusion is to provide a premium, high-contrast visual experience where users can discover, search, and contribute covers. The platform analyzes musical features (tempo, energy, valence) via the Spotify API to provide insights into why certain covers work so well together.

## Tech Stack
- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Modern, high-performance web framework)
- **Runtime**: [Node.js 22](https://nodejs.org/) with [Bun](https://bun.sh/) (Fastest package manager and runner)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) hosted on [Neon](https://neon.tech/) (Serverless Postgres)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) (TypeScript-first ORM)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Vanilla CSS/PostCSS](https://postcss.org/)
- **Typography**: Significa (Modern sans-serif)
- **API Integration**: [Spotify Web SDK](https://developer.spotify.com/documentation/web-api)
- **Form Handling**: [SvelteKit Superforms](https://superforms.rocks/) & [Zod](https://zod.dev/)

---

## Database Schema (Drizzle)

### `songs` Table
Stores metadata and audio features for both original tracks and covers.
- `id` (text, primary key) - Spotify Track ID
- `name` (text, not null)
- `artists` (text array, not null)
- `url` (text, not null)
- `album_name` (text, not null)
- `album_year` (integer, not null)
- `album_img` (text array, not null)
- `gender` (text array, not null) - Default: `['other']`
- `acousticness`, `danceability`, `energy`, etc. (real/double precision)
- `created_at` (timestamp, default now)

### `covers` Table
Links an original song to its cover version.
- `id` (serial, primary key)
- `original_id` (text, references songs.id)
- `cover_id` (text, references songs.id)
- `slug` (text, unique, not null)
- `description` (text)
- `contributor` (text)
- `tags` (text array)
- `created_at` (timestamp, default now)

---

## Rebuild Plan

### Phase 1: Environment & Infrastructure
1.  **Initialize SvelteKit**: Create a new project using `bun create svelte@latest`.
2.  **Install Dependencies**: Add Tailwind, PostCSS, Drizzle ORM, `@neondatabase/serverless`, and `@spotify/web-api-ts-sdk`.
3.  **Neon Setup**: Create a new project on Neon and obtain the `DATABASE_URL`.
4.  **Drizzle Configuration**: Setup `drizzle.config.ts` and initialize the schema in `src/lib/db/schema.ts`.
5.  **Spotify Setup**: Register the app in the Spotify Developer Dashboard to get `CLIENT_ID` and `CLIENT_SECRET`.

### Phase 2: Design System & Global Styles
1.  **Global Styles**: Configure `app.pcss` for the pure black background (`#000000`) and high-contrast typography.
2.  **Typography**: Set up Significa font-faces and configure the mixed-case stylistic alternates in the CSS theme.
3.  **Components**: Build core UI components (Step, Steps, SongSelect, SongPreview) using the refined "premium" aesthetic.

### Phase 3: Core Functionality
1.  **Spotify Service**: Implement a server-side Spotify service to fetch track data and audio features.
2.  **Search Logic**: Create the search endpoint using Spotify's search API.
3.  **Submission Flow**:
    - Build the multi-step form using SvelteKit Superforms.
    - Implement the `default` action to validate data, fetch audio features, and insert into the Neon database via Drizzle.
4.  **Slug Generation**: Implement the `slugifyCover` helper to create SEO-friendly URLs.

### Phase 4: Discovery & Display
1.  **Home Page**: Implement the high-contrast landing page with the stylistic header and search bar.
2.  **Cover Detail Page**: Build `src/routes/cover/[slug]` to display the full "Story behind the music," comparing features of the original vs. the cover.
3.  **Random Discovery**: Implement a "Random" feature to surface interesting covers from the database.

### Phase 5: Polish & Deployment
1.  **Animations**: Add micro-interactions and transitions (fade/fly) for a smooth UX.
2.  **Social Previews**: Implement dynamic OG images using Satori.
3.  **Deployment**: Deploy to Vercel or similar, ensuring all environment variables are correctly mapped.
