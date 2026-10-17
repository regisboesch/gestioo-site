import { launch, newSession, go } from './lib.mjs';
const [,, user, device, ...paths] = process.argv;
const b = await launch();
const { page } = await newSession(b, { lang: 'fr', theme: 'light', device, user });
let i = 0;
for (const p of paths) { await go(page, p); await page.screenshot({ path: `/tmp/claude-0/-home-user/bdfa7ad0-f42a-54dc-b13c-732faac5feab/scratchpad/probe-${user}-${device}-${i++}.png` }); console.log(p, '->', page.url()); }
await b.close();
