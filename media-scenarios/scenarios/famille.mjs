import { go, tr } from '../lib.mjs';

const t = (L, k) => tr(L, `dashboard:memberDashboardPage.${k}`);

export default {
  id: 'famille',
  user: 'famille',
  deps: ['frontend/src/pages/MemberDashboardPage.tsx', 'frontend/src/components/JoinSeasonDialog.tsx', 'frontend/src/components/AnnoncesWidget.tsx', 'frontend/src/api/membres.ts'],
  title: { fr: 'Espace « Ma famille » et inscription', de: 'Bereich « Meine Familie » und Anmeldung', en: '“My family” space and registration' },
  steps: [
    {
      name: 'ma-famille',
      caption: { fr: 'L’espace « Ma famille » : membres, équipes et cotisations', de: 'Der Bereich « Meine Familie »: Mitglieder, Teams und Beiträge', en: 'The “My family” space: members, teams and fees' },
      alt: { fr: 'Gestioo : espace Ma famille avec les membres du foyer et leurs cotisations', de: 'Gestioo: Bereich Meine Familie mit Mitgliedern und Beiträgen', en: 'Gestioo: My family space with household members and fees' },
      async run(page, L) {
        await go(page, '/');
        await page.getByRole('heading', { name: t(L, 'title') }).waitFor();
      },
    },
    // L'assistant d'inscription (JoinSeasonDialog) n'est pas filmé : le seeder inscrit déjà tous les membres, le bouton n'apparaît donc pas.
  ],
  async video(page, L) {
    await this.steps[0].run(page, L);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1000);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1000);
  },
};
