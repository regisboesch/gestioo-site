import { go, tr } from '../lib.mjs';

export default {
  id: 'dashboard',
  user: 'admin',
  // Page(s) du frontend visitée(s) et composants spécifiques (chemins relatifs à myerpplus, hors fichiers globaux).
  deps: ['frontend/src/pages/DashboardPage.tsx', 'frontend/src/components/AnnoncesWidget.tsx', 'frontend/src/api/dashboard.ts', 'frontend/src/lib/planning.ts'],
  title: { fr: 'Tableau de bord gestionnaire', de: 'Dashboard für Verantwortliche', en: 'Manager dashboard' },
  steps: [{
    name: 'tableau-de-bord',
    caption: { fr: 'Le tableau de bord du gestionnaire', de: 'Das Dashboard der Verantwortlichen', en: 'The manager dashboard' },
    alt: { fr: 'Gestioo : tableau de bord avec indicateurs, annonces, factures à traiter et événements à venir', de: 'Gestioo: Dashboard mit Kennzahlen, Mitteilungen, offenen Rechnungen und anstehenden Terminen', en: 'Gestioo: dashboard with key figures, announcements, invoices to process and upcoming events' },
    async run(page, L) {
      await go(page, '/');
      await page.getByText(tr(L, 'dashboard:dashboardPage.kpis.cotisationsCollected'), { exact: true }).first().waitFor();
    },
  }],
  // Parcours filmé : le tableau de bord puis un survol des indicateurs.
  async video(page, L) {
    await go(page, '/');
    await page.getByText(tr(L, 'dashboard:dashboardPage.kpis.cotisationsCollected'), { exact: true }).first().hover();
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(800);
  },
};
