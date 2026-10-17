# gestioo-site

Site vitrine public de **Gestioo**, hébergé sur GitHub Pages. Source des textes : `publicity.md` du dépôt `myerpplus` (lecture seule, ne jamais le modifier). `.last-sync` contient le SHA du dernier `publicity.md` pris en compte, `.last-design-sync` celui du dernier état de `design/` appliqué.

## Nom du produit

Le produit s'appelle **Gestioo**. « MyERPPlus » est seulement le nom interne du dépôt de l'application (encore utilisé dans `publicity.md`) : il ne doit apparaître nulle part dans le site ni dans `dist/` (`grep -ri myerpplus dist` doit être vide).

## Design

`design/` (README + maquette Claude Design) **fait foi pour l'apparence** : jetons de couleur, polices, icônes (correspondance maquette → `lucide-react` dans `src/components/Icon.tsx`), structure des sections. Ne jamais le modifier ici : il n'est mis à jour qu'après validation humaine dans Claude Design. Polices auto-hébergées via `@fontsource` (jamais Google Fonts). Les icônes par carte sont des tableaux indexés par position dans `src/App.tsx` : tout nouvel élément de liste reçoit une icône Lucide.

## Conventions

- React + Vite + TypeScript, CSS simple dans `src/styles/` (pas de Tailwind, pas de CSS modules).
- Aucun texte en dur dans le JSX : tout passe par `react-i18next` et `src/locales/{fr,de,en}.json` (les trois fichiers à jour dans le même changement ; DE/EN = traductions naturelles).
- Ne rien inventer (tarif, témoignage, nombre de clients, hébergement) et ne pas promettre ce que `publicity.md` classe « Non disponible aujourd'hui ». Placeholders visibles : `[TARIFS À DÉFINIR]`, `[EMAIL DE CONTACT]` (`src/site.ts`).
- Chaque fonctionnalité ajoutée/modifiée dans la fiche = une entrée datée dans « Nouveautés » (`news.items`, 3 langues).
- **Pré-rendu statique (SSG)** : `npm run build` = build client + build SSR + `scripts/prerender.mjs`, qui écrit `dist/{fr,de,en}/index.html` (HTML complet, `hydrateRoot` côté navigateur), la racine `/` (redirection), `404.html`, `sitemap.xml`, `robots.txt`. Pas d'accès à `window`/`document`/`localStorage` pendant le rendu ; la langue vient du chemin, jamais du navigateur ; le thème sombre passe par `prefers-color-scheme` en CSS.
- Chemin de base : `SITE_BASE` (défaut `/`) pour Vite, `SITE_URL` (défaut `https://regisboesch.github.io/gestioo-site`) pour les URL absolues (canonical, hreflang, sitemap). Aucune URL absolue en dur : médias et liens passent par `import.meta.env.BASE_URL`. Tester le build avec `SITE_BASE=/` et `SITE_BASE=/gestioo-site/`.
- **Galerie « Gestioo en images »** (`src/components/Gallery.tsx`) : parcours, onglets, vidéos et captures viennent uniquement de `parcours[]` dans `public/media/manifest.json` (allégé au build par `vite.config.ts`) ; phrases `gallery.<id>` et libellés `galleryTabs.<id>` dans les 3 langues ; liens « Voir en images » (`#galerie-<id>`) des modules seulement si le parcours existe ; thème des vidéos choisi au clic, jamais pendant le pré-rendu.
- Médias dans `public/media/` (décrits par `manifest.json` : `{ "items": [{ "slot": "hero"|"assistant", "lang": "fr", "file": "x.png", "alt": "…" }] }`, lu au build par `vite.config.ts`), produits par une autre routine. Sans capture adaptée à la langue, le site affiche l'illustration HTML/CSS de la maquette (`AppPreview`, `ChatExample`), sans chiffre et légendée comme illustrative.
- **Aucun secret** dans le code ni dans le build : tout ce qui est injecté est public. Pas de formulaire ; contact par lien `mailto:`.
- Déploiement : `.github/workflows/pages.yml` (build sur PR et `main`, déploiement sur `main`). Ne jamais pousser directement sur `main` ; branches `feature/site-vitrine-<AAAAMMJJ>` + PR.
