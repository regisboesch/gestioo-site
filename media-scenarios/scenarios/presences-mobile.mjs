import { go, tr, apiGet } from '../lib.mjs';

// Marie Martin (compte d'exemple) est entraîneuse via son enfant : on bascule sur le rôle Staff comme le ferait un coach.
async function open(page, L) {
  await go(page, '/');
  await page.locator('.app-role-switcher-trigger').click();
  await page.getByText(`Noah Martin — ${tr(L, 'common:roleLabels.staff')}`, { exact: true }).click();
  await page.waitForTimeout(500);
  const teams = await apiGet(page.context(), '/api/teams');
  const team = teams.find((x) => x.title.startsWith('Volley')) ?? teams[0];
  await go(page, `/presences/saisie?season=${team.season_id}&team=${team.id}`);
  await page.getByRole('button', { name: tr(L, 'presences:present'), exact: true }).first().waitFor();
}

export default {
  id: 'presences-mobile',
  user: 'staff',
  deps: ['frontend/src/pages/AttendancePage.tsx', 'frontend/src/pages/PresencesListPage.tsx', 'frontend/src/api/presences.ts', 'frontend/src/offline/**'],
  title: { fr: 'Prise de présence sur mobile', de: 'Anwesenheitskontrolle auf dem Handy', en: 'Taking attendance on mobile' },
  videoDevice: 'mobile',
  steps: [{
    name: 'prise-de-presence',
    caption: { fr: 'La prise de présence au bord du terrain, sur mobile', de: 'Die Anwesenheitskontrolle am Spielfeldrand, auf dem Handy', en: 'Taking attendance on the sidelines, on a phone' },
    alt: { fr: 'Gestioo : prise de présence d’une équipe sur mobile, avec les boutons Présent et Absent', de: 'Gestioo: Anwesenheitskontrolle eines Teams auf dem Handy mit Anwesend- und Abwesend-Schaltflächen', en: 'Gestioo: a team’s attendance sheet on mobile with Present and Absent buttons' },
    async run(page, L) { await open(page, L); },
  }],
  async video(page, L) {
    await open(page, L);
    await page.waitForTimeout(800);
    await page.getByRole('button', { name: tr(L, 'presences:present'), exact: true }).first().click();
    await page.waitForTimeout(800);
    await page.getByRole('button', { name: tr(L, 'presences:absent'), exact: true }).nth(1).click();
    await page.waitForTimeout(1000);
  },
};
