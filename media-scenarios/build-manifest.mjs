// Met à jour public/media/manifest.json à partir de .last-run.json (conserve les parcours non refaits).
// `items` reste au format lu par le site ({slot, lang, file, alt}) ; le détail par parcours est dans `parcours`.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const file = resolve(here, '../public/media/manifest.json');
const appDir = process.env.MYERPPLUS_DIR || '/home/user/myerpplus';
const head = execFileSync('git', ['-C', appDir, 'rev-parse', 'HEAD']).toString().trim();
const now = new Date().toISOString();
const run = JSON.parse(readFileSync(join(here, '.last-run.json'), 'utf8'));
const old = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : { parcours: [] };
const byId = new Map((old.parcours ?? []).map((p) => [p.id, p]));

const defs = {};
for (const f of readdirSync(join(here, 'scenarios')).filter((x) => x.endsWith('.mjs'))) { const j = (await import(pathToFileURL(join(here, 'scenarios', f)))).default; defs[j.id] = j; }

for (const r of Object.values(run)) {
  if (r.failed) continue;
  const j = defs[r.id], prev = byId.get(r.id);
  const files = r.files.map((f) => {
    const step = j.steps.find((s) => s.name === f.step);
    return {
      file: f.file, parcours: r.id, step: f.step, lang: f.lang, theme: f.theme, device: f.device, format: f.format,
      caption: step ? step.caption : j.title,
      alt: step ? Object.fromEntries(Object.entries(step.alt)) : j.title,
    };
  });
  byId.set(r.id, { id: r.id, title: j.title, deps: j.deps, updated_at: r.changed || !prev ? now : prev.updated_at, files });
}
const parcours = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
// Emplacement « hero » du site : tableau de bord, capture bureau en thème clair, une par langue.
const items = parcours.find((p) => p.id === 'dashboard')?.files
  .filter((f) => f.format === 'png' && f.theme === 'light' && f.device === 'desktop')
  .map((f) => ({ slot: 'hero', lang: f.lang, file: f.file, alt: f.alt[f.lang] })) ?? [];
writeFileSync(file, JSON.stringify({ source_commit: head, generated_at: now, items, parcours }, null, 1) + '\n');
console.log('manifest:', parcours.length, 'parcours,', items.length, 'items hero');
