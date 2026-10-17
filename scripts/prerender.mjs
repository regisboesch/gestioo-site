// Pré-rendu statique : produit dist/{fr,de,en}/index.html complets, la racine, 404.html,
// sitemap.xml et robots.txt. Appelé après `vite build` et `vite build --ssr`.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const SITE_URL = (process.env.SITE_URL || 'https://regisboesch.github.io/gestioo-site').replace(/\/+$/, '');
const BASE = process.env.SITE_BASE || '/';
const dist = path.resolve('dist');
const { render, getMeta, LANGS } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const url = (lang) => `${SITE_URL}/${lang}/`;
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

function headTags(lang) {
  const m = getMeta(lang);
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}" />`).join('\n    ');
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url(lang)}" />`,
    alternates,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Gestioo" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url(lang)}" />`,
    `<meta property="og:locale" content="${m.ogLocale}" />`,
    ...LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${getMeta(l).ogLocale}" />`),
    `<meta name="twitter:card" content="summary" />`,
  ].join('\n    ');
}

for (const lang of LANGS) {
  const html = template
    .replace('<html lang="fr">', `<html lang="${lang}">`)
    .replace('<!--head-tags-->', headTags(lang))
    .replace('<!--app-html-->', render(lang));
  await mkdir(path.join(dist, lang), { recursive: true });
  await writeFile(path.join(dist, lang, 'index.html'), html);
}

const langLinks = LANGS.map((l) => `<li><a href="${BASE}${l}/" hreflang="${l}" lang="${l}">${getMeta(l).title}</a></li>`).join('\n');
const simplePage = (lang, title, body, extraHead = '') => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light dark" />
<title>${esc(title)}</title>
${extraHead}
<link rel="icon" type="image/svg+xml" href="${BASE}favicon.svg" />
<style>
body{font-family:system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem;line-height:1.6;background:#fff;color:#0e1b2c}
a{color:#c8102e}
@media (prefers-color-scheme:dark){body{background:#0b1220;color:#e8edf6}a{color:#ff8a99}}
</style>
</head>
<body>
${body}
</body>
</html>
`;

// Racine : redirection vers la langue du navigateur (FR par défaut) + liens visibles pour les robots.
const redirect = `<script>
(function () {
  var l = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  var langs = ${JSON.stringify(LANGS)};
  location.replace('${BASE}' + (langs.indexOf(l) > -1 ? l : 'fr') + '/');
})();
</script>`;
await writeFile(
  path.join(dist, 'index.html'),
  simplePage('fr', 'Gestioo', `<h1>Gestioo</h1>\n<ul>\n${langLinks}\n</ul>`,
    `<link rel="canonical" href="${SITE_URL}/" />\n${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}" />`).join('\n')}\n<link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />\n<noscript><meta http-equiv="refresh" content="0;url=${BASE}fr/" /></noscript>\n${redirect}`),
);

await writeFile(
  path.join(dist, '404.html'),
  simplePage('fr', 'Gestioo – 404', `<h1>404</h1>\n<p>Page introuvable · Seite nicht gefunden · Page not found</p>\n<ul>\n${langLinks}\n</ul>`, '<meta name="robots" content="noindex" />'),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((lang) => `  <url>
    <loc>${url(lang)}</loc>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l)}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
  </url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log('Pré-rendu terminé :', LANGS.join(', '));
