# Streaks

React + Vite app for managing streaks and bookmarks (shortcuts).

## Setup

```bash
npm install
```

## Running the app

**Without seed data** (empty streaks and bookmarks):

```bash
npm run dev
```

**With seed data** (10 streaks + 40 bookmarks for testing):

1. Generate the seed file:
   ```bash
   npm run seed
   ```
   This writes `public/seed-data.json` from `seeds/streaks.seed.json` and `seeds/shortcuts.seed.json`.

2. Start the app with the seed loader enabled:
   ```bash
   VITE_LOAD_SEED=true npm run dev
   ```
   On first load, the app will replace any existing streaks and bookmarks with the seed data.

If you run `npm run dev` without `VITE_LOAD_SEED=true`, the app will not load the seed file; use this when you want to keep or start with empty data.

## Other commands

- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint



# Resources

[color palet](https://paletadecolores.com.mx/paleta/090f13/171f25/752e2b/c90a02/f2eab7/)
