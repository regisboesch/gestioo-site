import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Captures éventuelles décrites par public/media/manifest.json (produit par une autre routine).
function readManifest(): unknown {
  const file = 'public/media/manifest.json';
  if (!existsSync(file)) return null;
  try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return null; }
}

// Le site est servi sous /gestioo-site/ (GitHub Pages) ou à la racine d'un domaine personnalisé.
export default defineConfig({
  base: process.env.SITE_BASE || '/',
  plugins: [react()],
  define: { __MEDIA_MANIFEST__: JSON.stringify(readManifest()) },
});
