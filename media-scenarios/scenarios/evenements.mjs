import { go, tr } from '../lib.mjs';

const TOURNOI = 'Tournoi de basket inter-clubs'; // événement des données d'exemple (seeder)

export default {
  id: 'evenements',
  user: 'admin',
  deps: ['frontend/src/pages/EvenementsPage.tsx', 'frontend/src/pages/EvenementDetailPage.tsx', 'frontend/src/components/EvenementImage.tsx', 'frontend/src/components/EvenementGallery.tsx', 'frontend/src/components/EvenementTeamChips.tsx', 'frontend/src/api/evenements.ts', 'frontend/src/lib/evenements.ts', 'frontend/src/styles/evenements.css', 'frontend/src/pages/EvenementRefundPoliciesPage.tsx', 'frontend/src/components/RefundPolicySummary.tsx'],
  title: { fr: 'Agenda des événements', de: 'Veranstaltungskalender', en: 'Events calendar' },
  steps: [
    {
      name: 'agenda',
      caption: { fr: 'L’agenda des événements du club', de: 'Der Veranstaltungskalender des Vereins', en: 'The club’s events calendar' },
      alt: { fr: 'Gestioo : agenda des événements avec date, lieu, prix et nombre d’inscrits', de: 'Gestioo: Veranstaltungskalender mit Datum, Ort, Preis und Anzahl Anmeldungen', en: 'Gestioo: events calendar with date, place, price and number of registrations' },
      async run(page, L) {
        await go(page, '/evenements');
        await page.getByText(TOURNOI).first().waitFor();
      },
    },
    {
      name: 'evenement',
      caption: { fr: 'Un événement et la liste de ses participants', de: 'Eine Veranstaltung und ihre Teilnehmerliste', en: 'An event and its participant list' },
      alt: { fr: 'Gestioo : fiche d’un événement avec ses inscrits, y compris des participants externes', de: 'Gestioo: Veranstaltung mit Anmeldungen, auch externen Teilnehmern', en: 'Gestioo: event page with registrations, including external participants' },
      async run(page, L) {
        await go(page, '/evenements');
        await page.getByText(TOURNOI).first().click();
        await page.getByText(tr(L, 'evenements:evenementDetailPage.when'), { exact: true }).first().waitFor();
      },
    },
    {
      name: 'conditions-annulation',
      caption: { fr: 'Les conditions d’annulation et de remboursement des événements', de: 'Die Stornierungs- und Rückerstattungsbedingungen der Veranstaltungen', en: 'Event cancellation and refund conditions' },
      alt: { fr: 'Gestioo : conditions d’annulation réutilisables avec paliers de remboursement', de: 'Gestioo: wiederverwendbare Stornierungsbedingungen mit Rückerstattungsstufen', en: 'Gestioo: reusable cancellation conditions with refund tiers' },
      async run(page, L) {
        await go(page, '/evenements/conditions-annulation');
        await page.getByRole('heading').first().waitFor();
      },
    },
  ],
  async video(page, L) {
    await go(page, '/evenements');
    await page.getByText(TOURNOI).first().hover();
    await page.waitForTimeout(600);
    await page.getByText(TOURNOI).first().click();
    await page.getByText(tr(L, 'evenements:evenementDetailPage.when'), { exact: true }).first().waitFor();
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(800);
  },
};
