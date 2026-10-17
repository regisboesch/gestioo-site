import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { go, tr, apiGet, APP } from '../lib.mjs';

// Première facture à payer dont le PDF contient bien le bulletin QR-facture suisse (page repérée avec pdftotext).
async function pickInvoice(page) {
  const list = await apiGet(page.context(), '/api/invoices');
  for (const i of list.filter((x) => x.remaining_cents > 0 && x.status !== 'brouillon')) {
    const res = await page.context().request.get(`${APP}/api/invoices/${i.id}/pdf`);
    if (!res.ok()) continue;
    const dir = mkdtempSync(join(tmpdir(), 'gestioo-pdf-'));
    writeFileSync(join(dir, 'f.pdf'), await res.body());
    const pages = Number(/Pages:\s+(\d+)/.exec(execFileSync('pdfinfo', [join(dir, 'f.pdf')]).toString())?.[1] ?? 1);
    for (let n = 1; n <= pages; n++) {
      const txt = execFileSync('pdftotext', ['-f', String(n), '-l', String(n), join(dir, 'f.pdf'), '-']).toString();
      if (/Zahlteil|Section paiement|Payment part|Empfangsschein|Récépissé/i.test(txt)) return { ...i, pdfDir: dir, qrPage: n };
    }
  }
  return list[0];
}

export default {
  id: 'facture-qr',
  user: 'admin',
  deps: ['frontend/src/pages/InvoiceDetailPage.tsx', 'frontend/src/pages/InvoicesPage.tsx', 'frontend/src/api/invoices.ts', 'backend-php/src/Support/InvoicePdf*.php'],
  title: { fr: 'Facture avec QR-facture suisse', de: 'Rechnung mit Schweizer QR-Rechnung', en: 'Invoice with Swiss QR-bill' },
  steps: [
    {
      name: 'facture',
      caption: { fr: 'Le détail d’une facture : lignes, paiements, remise', de: 'Die Rechnungsdetails: Positionen, Zahlungen, Rabatt', en: 'Invoice details: lines, payments, discount' },
      alt: { fr: 'Gestioo : détail d’une facture avec son statut et ses paiements', de: 'Gestioo: Rechnungsdetails mit Status und Zahlungen', en: 'Gestioo: invoice details with status and payments' },
      async run(page, L) {
        const inv = await pickInvoice(page);
        await go(page, `/factures/${inv.id}`);
        await page.getByRole('heading', { name: inv.invoice_number }).waitFor();
      },
    },
    {
      name: 'qr-facture-pdf',
      caption: { fr: 'L’aperçu du PDF avec la QR-facture suisse', de: 'Die PDF-Vorschau mit der Schweizer QR-Rechnung', en: 'The PDF preview with the Swiss QR-bill' },
      alt: { fr: 'Gestioo : facture PDF avec bulletin de versement QR-facture suisse', de: 'Gestioo: PDF-Rechnung mit Schweizer QR-Zahlteil', en: 'Gestioo: PDF invoice with Swiss QR-bill payment slip' },
      async run(page, L) {
        const inv = await pickInvoice(page);
        if (!inv.pdfDir) throw new Error('aucune facture du seeder ne contient de QR-facture');
        const dir = inv.pdfDir;
        const h = page.viewportSize().height;
        // Rendu de la page portant la QR-facture à la hauteur de la fenêtre : aperçu fidèle du PDF émis par l'application.
        execFileSync('pdftoppm', ['-png', '-r', '110', '-f', String(inv.qrPage), '-l', String(inv.qrPage), '-singlefile', join(dir, 'f.pdf'), join(dir, 'p')]);
        const png = readFileSync(join(dir, 'p.png')).toString('base64');
        const dark = await page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'dark');
        await page.setContent(`<!doctype html><meta charset="utf-8"><body style="margin:0;height:${h}px;display:flex;justify-content:center;align-items:center;background:${dark ? '#14141a' : '#f4f4f7'};overflow:hidden"><img style="max-width:100%;max-height:${h}px;box-shadow:0 2px 16px rgba(0,0,0,.25)" src="data:image/png;base64,${png}"></body>`);
      },
    },
  ],
  async video(page, L) {
    const inv = await pickInvoice(page);
    await go(page, `/factures/${inv.id}`);
    await page.waitForTimeout(1000);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(1000);
    const dl = page.waitForEvent('download');
    await page.getByRole('button', { name: tr(L, 'invoices:invoicesPage.actions.downloadPdf'), exact: true }).click();
    await dl;
    await page.waitForTimeout(800);
  },
};
