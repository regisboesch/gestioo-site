// Orchestrateur : node run.mjs [--only a,b] [--langs fr,de,en] [--themes light,dark] [--devices desktop,mobile] [--no-video]
// Écrit dans public/media/ en n'écrasant une capture existante que si > 0,5 % des pixels diffèrent.
import { mkdirSync, readFileSync, writeFileSync, existsSync, copyFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { chromium } from 'playwright';
import { launch, newSession, LANGS, THEMES, DEVICES } from './lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const MEDIA = resolve(here, '../public/media');
const TMP = process.env.MEDIA_TMP || join(here, '.tmp');
const THRESHOLD = 0.005;
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1].split(',') : d; };
const only = arg('only', null);
const langs = arg('langs', LANGS), themes = arg('themes', THEMES), devices = arg('devices', Object.keys(DEVICES));
const withVideo = !process.argv.includes('--no-video');

const files = readdirSync(join(here, 'scenarios')).filter((f) => f.endsWith('.mjs')).sort();
const journeys = [];
for (const f of files) { const j = (await import(pathToFileURL(join(here, 'scenarios', f)))).default; if (!only || only.includes(j.id)) journeys.push(j); }

function diffRatio(a, b) {
  const A = PNG.sync.read(a), B = PNG.sync.read(b);
  if (A.width !== B.width || A.height !== B.height) return 1;
  return pixelmatch(A.data, B.data, null, A.width, A.height, { threshold: 0.1 }) / (A.width * A.height);
}

const report = {};
rmSync(TMP, { recursive: true, force: true });
const browser = await launch();
for (const j of journeys) {
  const rep = report[j.id] = { id: j.id, failed: null, files: [], changed: false, mypErpPlus: [] };
  try {
    for (const lang of langs) for (const theme of themes) for (const device of devices) {
      const { ctx, page } = await newSession(browser, { lang, theme, device, user: j.user });
      try {
        for (const s of j.steps) {
          await s.run(page, lang);
          await page.waitForLoadState('networkidle');
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(200);
          if ((await page.locator('body').innerText()).match(/myerpplus/i)) rep.mypErpPlus.push(`${j.id}/${s.name} (${lang}, ${theme}, ${device})`);
          const rel = `${lang}/${j.id}/${s.name}-${theme}-${device}.png`;
          const buf = await page.screenshot();
          const dest = join(MEDIA, rel);
          let state = 'new';
          if (existsSync(dest)) state = diffRatio(readFileSync(dest), buf) < THRESHOLD ? 'kept' : 'replaced';
          if (state !== 'kept') { mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, buf); if (process.env.OXIPNG) execFileSync(process.env.OXIPNG, ['-o', '4', '--strip', 'safe', '-q', dest]); rep.changed = true; }
          rep.files.push({ file: rel, step: s.name, lang, theme, device, format: 'png', state });
        }
      } finally { await ctx.close(); }
    }
  } catch (e) { rep.failed = String(e.stack || e).split('\n').slice(0, 4).join(' | '); console.error(j.id, 'ÉCHEC', rep.failed); }
}
await browser.close();

// Vidéos : une par parcours, FR / thème clair, uniquement si au moins une capture a changé (ou si elle n'existe pas encore).
if (withVideo) {
  const slow = await chromium.launch({ slowMo: 300, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  for (const j of journeys) {
    const rep = report[j.id];
    const dev = j.videoDevice || 'desktop';
    const out = join(MEDIA, 'fr', j.id);
    if (rep.failed || !j.video || (!rep.changed && existsSync(join(out, `${j.id}.mp4`)))) continue;
    const dir = join(TMP, 'video', j.id);
    try {
      const { ctx, page } = await newSession(slow, { lang: 'fr', theme: 'light', device: dev, user: j.user, video: dir });
      await page.addInitScript(() => {
        window.addEventListener('DOMContentLoaded', () => {
          const c = document.createElement('div');
          c.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;width:18px;height:18px;border-radius:50%;background:rgba(122,47,224,.55);border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.3);transform:translate(-50%,-50%);left:-50px;top:-50px';
          document.body.appendChild(c);
          document.addEventListener('mousemove', (e) => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }, true);
        });
      });
      await j.video(page, 'fr');
      const vid = page.video();
      await ctx.close();
      const webm = await vid.path();
      mkdirSync(out, { recursive: true });
      const base = join(out, j.id);
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '30', '-preset', 'slow', '-movflags', '+faststart', `${base}.mp4`]);
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-an', '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', `${base}.webm`]);
      for (const f of [`${base}.mp4`, `${base}.webm`]) if (statSync(f).size > 5 * 1024 * 1024) throw new Error(`${f} > 5 Mo`);
      for (const fmt of ['mp4', 'webm']) rep.files.push({ file: `fr/${j.id}/${j.id}.${fmt}`, step: 'video', lang: 'fr', theme: 'light', device: dev, format: fmt, state: 'new' });
    } catch (e) { rep.videoFailed = String(e.message || e); console.error(j.id, 'vidéo ÉCHEC', rep.videoFailed); }
  }
  await slow.close();
}
writeFileSync(join(here, '.last-run.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify(Object.values(report).map((r) => ({ id: r.id, failed: r.failed, changed: r.changed, files: r.files.length, myp: r.mypErpPlus.length })), null, 1));
