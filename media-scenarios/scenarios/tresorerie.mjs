import { go, tr, apiGet } from '../lib.mjs';

async function open(page, L) {
  const periods = await apiGet(page.context(), '/api/accounting-periods');
  await go(page, `/tresorerie/periodes/${periods[0].id}`);
  await heading(page, L, 'bilanTitle').waitFor();
}
const heading = (page, L, key) => page.getByText(tr(L, `accountingPeriods:accountingPeriodDetailPage.${key}`), { exact: true }).first();

export default {
  id: 'tresorerie',
  user: 'admin',
  deps: ['frontend/src/pages/AccountingPeriodDetailPage.tsx', 'frontend/src/pages/AccountingPeriodsPage.tsx', 'frontend/src/components/TresorerieLayout.tsx', 'frontend/src/api/accountingPeriods.ts'],
  title: { fr: 'Trésorerie : bilan et compte de résultat', de: 'Finanzen: Bilanz und Erfolgsrechnung', en: 'Finance: balance sheet and income statement' },
  steps: [
    {
      name: 'bilan',
      caption: { fr: 'Le bilan de l’exercice, en direct', de: 'Die Bilanz des Geschäftsjahres, live', en: 'The balance sheet of the financial year, live' },
      alt: { fr: 'Gestioo : bilan comptable avec actif et passif', de: 'Gestioo: Bilanz mit Aktiven und Passiven', en: 'Gestioo: balance sheet with assets and liabilities' },
      async run(page, L) {
        await open(page, L);
        await heading(page, L, 'bilanTitle').scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollBy(0, -16));
      },
    },
    {
      name: 'compte-de-resultat',
      caption: { fr: 'Le compte de résultat : produits, charges et résultat net', de: 'Die Erfolgsrechnung: Erträge, Aufwände und Jahresergebnis', en: 'The income statement: revenue, expenses and net result' },
      alt: { fr: 'Gestioo : compte de résultat avec produits, charges et résultat net', de: 'Gestioo: Erfolgsrechnung mit Erträgen, Aufwänden und Ergebnis', en: 'Gestioo: income statement with revenue, expenses and net result' },
      async run(page, L) {
        await heading(page, L, 'resultatTitle').scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollBy(0, -16));
      },
    },
  ],
  async video(page, L) {
    await open(page, L);
    await page.waitForTimeout(800);
    await heading(page, L, 'resultatTitle').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
  },
};
