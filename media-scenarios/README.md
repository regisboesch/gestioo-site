# Scénarios médias Gestioo

Projet Node autonome (hors build du site) qui pilote l'application avec Playwright et produit `public/media/`.

1. Lancer l'application depuis le dépôt `myerpplus`, sans Docker : `composer install`, `bin/migrate.php`, `bin/seed.php` sur une base SQLite temporaire (`DATABASE_URL`, `UPLOADS_DIR` hors dépôts, `php -d variables_order=EGPCS`), `php -S`, puis Vite (`VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA`, secret de test `1x0000000000000000000000000000000AA`).
2. `npm install && OXIPNG=/chemin/oxipng node run.mjs [--only id,id] [--langs fr] [--themes light] [--devices mobile] [--no-video]`
3. `node build-manifest.mjs` met à jour `public/media/manifest.json`.

Une capture existante n'est réécrite que si plus de 0,5 % des pixels diffèrent. La date est figée au jour du seeder (`SEED_DATE=AAAA-MM-JJ` pour la forcer). Chaque scénario déclare ses `deps` (fichiers du frontend dont il dépend).
