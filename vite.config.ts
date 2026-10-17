import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Captures éventuelles décrites par public/media/manifest.json (produit par une autre routine).
function readManifest(): unknown {
  const file = 'public/media/manifest.json';
  if (!existsSync(file)) return null;
  try { return slim(JSON.parse(readFileSync(file, 'utf8'))); } catch { return null; }
}

// Allège le manifeste embarqué dans le JS : légendes et textes alternatifs une seule fois par étape,
// sans les champs de production (deps, dates…).
function slim(m: any): unknown {
  if (!m || typeof m !== 'object') return null;
  const parcours = (Array.isArray(m.parcours) ? m.parcours : []).map((p: any) => {
    const steps: Record<string, { caption?: unknown; alt?: unknown }> = {};
    const files = (Array.isArray(p.files) ? p.files : []).map((f: any) => {
      if (f.step && !steps[f.step]) steps[f.step] = { caption: f.caption, alt: f.alt };
      return { file: f.file, lang: f.lang, theme: f.theme, device: f.device, format: f.format, step: f.step };
    });
    return { id: p.id, title: p.title, steps, files };
  });
  return { items: m.items, parcours };
}

// Le site est servi sous /gestioo-site/ (GitHub Pages) ou à la racine d'un domaine personnalisé.
export default defineConfig({
  base: process.env.SITE_BASE || '/',
  plugins: [react()],
  define: { __MEDIA_MANIFEST__: JSON.stringify(readManifest()) },
});
