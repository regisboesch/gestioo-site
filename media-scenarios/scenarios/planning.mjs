import { go, tr, btn } from '../lib.mjs';

export default {
  id: 'planning',
  user: 'admin',
  deps: ['frontend/src/pages/PlanningPage.tsx', 'frontend/src/components/PlanningLayout.tsx', 'frontend/src/lib/planning.ts', 'frontend/src/api/teamSchedules.ts', 'frontend/src/api/vacations.ts'],
  title: { fr: 'Planning de la semaine', de: 'Wochenplanung', en: 'Weekly schedule' },
  steps: [{
    name: 'planning-semaine',
    caption: { fr: 'Le planning de la semaine, par équipe et par salle', de: 'Der Wochenplan, nach Team und Raum', en: 'The weekly schedule, by team and room' },
    alt: { fr: 'Gestioo : planning de la semaine avec les entraînements de chaque équipe', de: 'Gestioo: Wochenplan mit den Trainings jedes Teams', en: 'Gestioo: weekly schedule with each team’s training sessions' },
    async run(page, L) {
      await go(page, '/planning/calendrier');
      await btn(page, tr(L, 'planning:planningPage.viewWeek')).click();
      await btn(page, tr(L, 'planning:planningPage.todayButton')).click();
      await page.getByText(/\d{2}:\d{2}/).first().waitFor();
    },
  }],
  async video(page, L) {
    await go(page, '/planning/calendrier');
    await btn(page, tr(L, 'planning:planningPage.viewWeek')).click();
    await btn(page, tr(L, 'planning:planningPage.todayButton')).click();
    await page.waitForTimeout(800);
    await btn(page, tr(L, 'planning:planningPage.viewDay')).click();
    await page.waitForTimeout(800);
    await btn(page, tr(L, 'planning:planningPage.viewMonth')).click();
    await page.waitForTimeout(800);
  },
};
