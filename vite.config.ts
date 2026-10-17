import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le site est servi sous /gestioo-site/ (GitHub Pages) ou à la racine d'un domaine personnalisé.
export default defineConfig({
  base: process.env.SITE_BASE || '/',
  plugins: [react()],
});
