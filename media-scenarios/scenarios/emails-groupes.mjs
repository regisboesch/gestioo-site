import { go, tr, btn } from '../lib.mjs';

const TEXT = {
  fr: { name: 'Rappel de début de saison', subject: 'Bienvenue pour la nouvelle saison', body: 'Bonjour {{prenom}}, la nouvelle saison démarre bientôt. À très vite !' },
  de: { name: 'Erinnerung zum Saisonstart', subject: 'Willkommen zur neuen Saison', body: 'Guten Tag, die neue Saison beginnt bald. Bis bald!' },
  en: { name: 'Season start reminder', subject: 'Welcome to the new season', body: 'Hello, the new season starts soon. See you there!' },
};
const t = (L, k) => tr(L, `massEmails:wizard.${k}`);

export default {
  id: 'emails-groupes',
  user: 'admin',
  deps: ['frontend/src/pages/MassEmailCampaignWizardPage.tsx', 'frontend/src/pages/MassEmailCampaignsHistoryPage.tsx', 'frontend/src/api/massEmails.ts'],
  title: { fr: 'Emails groupés en 3 étapes', de: 'Sammel-E-Mails in 3 Schritten', en: 'Group emails in 3 steps' },
  steps: [
    {
      name: '1-destinataires',
      caption: { fr: 'Étape 1 : choisir les destinataires', de: 'Schritt 1: Empfänger wählen', en: 'Step 1: choose the recipients' },
      alt: { fr: 'Gestioo : assistant d’emails groupés, étape Destinataires', de: 'Gestioo: Sammel-E-Mail-Assistent, Schritt Empfänger', en: 'Gestioo: group email wizard, Recipients step' },
      async run(page, L) {
        await go(page, '/emails-groupes/nouveau');
        await page.getByText(t(L, 'audienceStepTitle'), { exact: true }).waitFor();
        await page.getByText(t(L, 'audienceCountLoading'), { exact: true }).waitFor({ state: 'hidden' });
        await page.waitForTimeout(500);
      },
    },
    {
      name: '2-message',
      caption: { fr: 'Étape 2 : rédiger le message', de: 'Schritt 2: Nachricht verfassen', en: 'Step 2: write the message' },
      alt: { fr: 'Gestioo : assistant d’emails groupés, étape Message', de: 'Gestioo: Sammel-E-Mail-Assistent, Schritt Nachricht', en: 'Gestioo: group email wizard, Message step' },
      async run(page, L) {
        await btn(page, t(L, 'continueBtn')).click();
        await page.getByText(t(L, 'contentStepTitle'), { exact: true }).waitFor();
        await page.getByLabel(t(L, 'fields.campaignName')).first().fill(TEXT[L].name);
        await page.getByLabel(t(L, 'fields.subject')).first().fill(TEXT[L].subject);
        const body = page.locator('.html-editor-content [contenteditable]').first();
        await body.click();
        await body.fill(TEXT[L].body);
      },
    },
    {
      name: '3-recapitulatif',
      caption: { fr: 'Étape 3 : vérifier et envoyer', de: 'Schritt 3: Prüfen und senden', en: 'Step 3: review and send' },
      alt: { fr: 'Gestioo : assistant d’emails groupés, récapitulatif avant l’envoi', de: 'Gestioo: Sammel-E-Mail-Assistent, Zusammenfassung vor dem Versand', en: 'Gestioo: group email wizard, summary before sending' },
      async run(page, L) {
        await btn(page, t(L, 'continueBtn')).click();
        await page.getByText(t(L, 'recap.contentTitle'), { exact: true }).waitFor();
      },
    },
  ],
  async video(page, L) {
    for (const s of this.steps) { await s.run(page, L); await page.waitForTimeout(900); }
  },
};
