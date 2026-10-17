import { launch, newSession } from './lib.mjs';
const [,, user, path] = process.argv;
const b = await launch(); const { ctx } = await newSession(b, { lang: 'fr', theme: 'light', device: 'desktop', user });
const r = await ctx.request.get('http://localhost:5173' + path); console.log(r.status(), (await r.text()).slice(0, 1500)); await b.close();
