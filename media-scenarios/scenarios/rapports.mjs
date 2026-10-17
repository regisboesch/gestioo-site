import { go, tr, btn } from '../lib.mjs';

async function openFirstTemplate(page) {
  await go(page, '/rapports');
  await page.locator('.data-table-row-clickable').first().click();
  await page.waitForURL(/\/rapports\/.+/);
  await page.getByText(/\d+ (lignes|Zeilen|rows|ligne|Zeile|row)/).first().waitFor();
}

export default {
  id: 'rapports',
  user: 'admin',
  deps: ['frontend/src/pages/ReportsPage.tsx', 'frontend/src/pages/ReportBuilderPage.tsx', 'frontend/src/components/Report*.tsx', 'frontend/src/api/reports.ts'],
  title: { fr: 'Générateur de rapports et export', de: 'Berichtsgenerator und Export', en: 'Report builder and export' },
  steps: [
    {
      name: 'liste-modeles',
      caption: { fr: 'Vos modèles de rapports, privés ou partagés', de: 'Ihre Berichtsvorlagen, privat oder geteilt', en: 'Your report templates, private or shared' },
      alt: { fr: 'Gestioo : liste des modèles de rapports', de: 'Gestioo: Liste der Berichtsvorlagen', en: 'Gestioo: list of report templates' },
      async run(page, L) {
        await go(page, '/rapports');
        await page.locator('.data-table-row-clickable').first().waitFor();
      },
    },
    {
      name: 'generateur',
      caption: { fr: 'Le générateur : colonnes, filtres, aperçu et export CSV, Excel ou PDF', de: 'Der Generator: Spalten, Filter, Vorschau und Export als CSV, Excel oder PDF', en: 'The builder: columns, filters, preview and CSV, Excel or PDF export' },
      alt: { fr: 'Gestioo : générateur de rapports avec aperçu des données et boutons d’export', de: 'Gestioo: Berichtsgenerator mit Datenvorschau und Export-Schaltflächen', en: 'Gestioo: report builder with data preview and export buttons' },
      async run(page, L) { await openFirstTemplate(page); },
    },
  ],
  async video(page, L) {
    await openFirstTemplate(page);
    await page.waitForTimeout(800);
    const dl = page.waitForEvent('download');
    await page.getByRole('button', { name: /CSV/ }).click();
    await dl;
    await page.waitForTimeout(1000);
  },
};
