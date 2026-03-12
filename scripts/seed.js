/**
 * Copies seed files (each item: name, url) into public/seed-data.json.
 * Id and image are assigned when the app loads the seed via seedLoader.
 *
 * Usage: npm run seed
 *        node scripts/seed.js [streaks.json] [shortcuts.json]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const [streaksPath, shortcutsPath] = [
  process.argv[2] ?? join(root, 'seeds', 'streaks.seed.json'),
  process.argv[3] ?? join(root, 'seeds', 'shortcuts.seed.json'),
]

const streaks = JSON.parse(readFileSync(streaksPath, 'utf8'))
const bookmarks = JSON.parse(readFileSync(shortcutsPath, 'utf8'))

const outDir = join(root, 'public')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const outPath = join(outDir, 'seed-data.json')
writeFileSync(outPath, JSON.stringify({ streaks, bookmarks }, null, 2), 'utf8')

console.log(`Seed written to ${outPath}: ${streaks.length} streaks, ${bookmarks.length} shortcuts.`)
console.log('Start the app with VITE_LOAD_SEED=true to load this data (e.g. VITE_LOAD_SEED=true npm run dev).')
