# gestioo-site

Site vitrine public de MyERPPlus, hébergé sur GitHub Pages. Source des textes : `publicity.md` du dépôt `myerpplus` (lecture seule, ne jamais le modifier). `.last-sync` contient le SHA du dernier `publicity.md` pris en compte.

## Conventions

- React + Vite + TypeScript, CSS simple dans `src/styles/` (pas de Tailwind, pas de CSS modules).
- Aucun texte en dur dans le JSX : tout passe par `react-i18next` et `src/locales/{fr,de,en}.json` (les trois fichiers à jour dans le même changement ; DE/EN = traductions naturelles).
- Ne rien inventer (tarif, témoignage, nombre de clients, hébergement) et ne pas promettre ce que `publicity.md` classe « Non disponible aujourd'hui ». Placeholders visibles : `[TARIFS À DÉFINIR]`, `[EMAIL DE CONTACT]` (`src/site.ts`).
- Chaque fonctionnalité ajoutée/modifiée dans la fiche = une entrée datée dans « Nouveautés » (`news.items`, 3 langues).
- **Pré-rendu statique (SSG)** : `npm run build` = build client + build SSR + `scripts/prerender.mjs`, qui écrit `dist/{fr,de,en}/index.html` (HTML complet, `hydrateRoot` côté navigateur), la racine `/` (redirection), `404.html`, `sitemap.xml`, `robots.txt`. Pas d'accès à `window`/`document`/`localStorage` pendant le rendu ; la langue vient du chemin, jamais du navigateur ; le thème sombre passe par `prefers-color-scheme` en CSS.
- Chemin de base : `SITE_BASE` (défaut `/`) pour Vite, `SITE_URL` (défaut `https://regisboesch.github.io/gestioo-site`) pour les URL absolues (canonical, hreflang, sitemap). Aucune URL absolue en dur : médias et liens passent par `import.meta.env.BASE_URL`. Tester le build avec `SITE_BASE=/` et `SITE_BASE=/gestioo-site/`.
- Médias dans `public/media/` (décrits par `manifest.json`), produits par une autre routine.
- **Aucun secret** dans le code ni dans le build : tout ce qui est injecté est public. Pas de formulaire ; contact par lien `mailto:`.
- Déploiement : `.github/workflows/pages.yml` (build sur PR et `main`, déploiement sur `main`). Ne jamais pousser directement sur `main` ; branches `feature/site-vitrine-<AAAAMMJJ>` + PR.
