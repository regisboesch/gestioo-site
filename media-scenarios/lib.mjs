// Aide commune aux scénarios : session connectée, langue/thème/appareil, date figée, captures déterministes.
import { chromium } from 'playwright';

export const APP = process.env.APP_URL || 'http://localhost:5173';
export const LANGS = ['fr', 'de', 'en'];
export const THEMES = ['light', 'dark'];
export const DEVICES = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
};
// La date de référence est celle du jour où le seeder a été lancé (les données d'exemple sont relatives à "aujourd'hui").
const day = process.env.SEED_DATE || new Date().toISOString().slice(0, 10);
export const FIXED_NOW = new Date(`${day}T10:00:00+02:00`);

export const USERS = {
  admin: { email: 'admin@example.com', password: 'ChangeMe123!' },
  famille: { email: 'jean.dupont@seed.local', password: 'test' },
  staff: { email: 'marie.martin@seed.local', password: 'test' },
};

const NO_ANIM = '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}';

export async function launch() {
  return chromium.launch({ ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--font-render-hinting=none', '--disable-lcd-text'] });
}

// Contexte Playwright déterministe + connexion par l'API (le jeton Turnstile de test est accepté tel quel).
export async function newSession(browser, { lang, theme, device, user = 'admin', video }) {
  const ctx = await browser.newContext({
    ...DEVICES[device],
    locale: lang === 'fr' ? 'fr-CH' : lang === 'de' ? 'de-CH' : 'en-GB',
    timezoneId: 'Europe/Zurich',
    reducedMotion: 'reduce',
    colorScheme: theme,
    ...(video ? { recordVideo: { dir: video, size: DEVICES[device].viewport } } : {}),
  });
  await ctx.addInitScript(([l, t]) => {
    localStorage.setItem('locale', l);
    localStorage.setItem('theme', t);
  }, [lang, theme]);
  const page = await ctx.newPage();
  await page.clock.setFixedTime(FIXED_NOW);
  await page.addStyleTag({ content: NO_ANIM }).catch(() => {});
  await page.addInitScript((css) => {
    const add = () => { const s = document.createElement('style'); s.textContent = css; document.documentElement.appendChild(s); };
    if (document.documentElement) add(); else document.addEventListener('DOMContentLoaded', add);
  }, NO_ANIM);
  const res = await ctx.request.post(`${APP}/api/auth/login`, {
    data: { email: USERS[user].email, password: USERS[user].password, turnstile_token: 'XXXX.DUMMY.TOKEN.XXXX' },
  });
  if (!res.ok()) throw new Error(`login ${user}: ${res.status()}`);
  return { ctx, page };
}

export async function settle(page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
}

export async function go(page, path) {
  await page.goto(APP + path);
  await settle(page);
  // Sur mobile, un gestionnaire replie le menu latéral (qui occupe sinon tout l'écran) : geste réel de l'application.
  if (page.viewportSize().width < 600) {
    const lang = await page.evaluate(() => document.documentElement.lang);
    const toggle = page.getByTitle(tr(lang, 'common:appLayout.collapseMenu'), { exact: true });
    if (await toggle.count()) { await toggle.click(); await page.waitForTimeout(200); }
  }
}

// Libellés de l'application (mêmes fichiers de traduction que l'UI) : sélecteurs indépendants de la langue.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const APP_DIR = process.env.MYERPPLUS_DIR || '/home/user/myerpplus';
const cache = {};
export function tr(lang, ref, vars = {}) {
  const [ns, key] = ref.split(':');
  const file = join(APP_DIR, 'frontend/src/locales', lang, `${ns}.json`);
  cache[file] ??= JSON.parse(readFileSync(file, 'utf8'));
  let v = key.split('.').reduce((o, k) => o?.[k], cache[file]);
  if (typeof v !== 'string') throw new Error(`clé absente : ${lang} ${ref}`);
  for (const [k, x] of Object.entries(vars)) v = v.replaceAll(`{{${k}}}`, String(x));
  return v;
}

export async function apiGet(ctx, path) {
  const r = await ctx.request.get(`${APP}${path}`);
  if (!r.ok()) throw new Error(`GET ${path}: ${r.status()}`);
  return r.json();
}

export const btn = (page, name) => page.getByRole('button', { name, exact: true });
