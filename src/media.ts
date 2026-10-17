import type { Lang } from './i18n';

export interface MediaEntry { slot: string; lang?: string; file: string; alt?: string }

// Injecté au build depuis public/media/manifest.json (vide tant que le fichier n'existe pas).
declare const __MEDIA_MANIFEST__: unknown;

function entries(): MediaEntry[] {
  const m = __MEDIA_MANIFEST__ as { items?: unknown } | unknown[] | null;
  const list = Array.isArray(m) ? m : m && Array.isArray(m.items) ? m.items : [];
  return list.filter((e): e is MediaEntry => !!e && typeof (e as MediaEntry).file === 'string' && typeof (e as MediaEntry).slot === 'string');
}

// Capture adaptée au slot et à la langue (une capture sans langue vaut pour toutes).
export function findMedia(slot: string, lang: Lang): MediaEntry | undefined {
  const all = entries().filter((e) => e.slot === slot);
  return all.find((e) => e.lang === lang) ?? all.find((e) => !e.lang);
}

type Texts = Partial<Record<Lang, string>>;
export type Device = 'desktop' | 'mobile';
export type Theme = 'light' | 'dark';

export interface ParcoursFile {
  file: string; lang?: string; theme?: Theme; device?: Device; format: string; step?: string;
}
export interface Parcours {
  id: string;
  title: Texts;
  steps: Record<string, { caption?: Texts; alt?: Texts }>;
  files: ParcoursFile[];
}
export interface Shot { step: string; light: string; dark?: string; alt: string; caption: string }

// Parcours de la galerie, dans l'ordre du manifeste (aucun parcours : la section n'est pas rendue).
export function getParcours(): Parcours[] {
  const m = __MEDIA_MANIFEST__ as { parcours?: unknown } | null;
  const list = m && Array.isArray(m.parcours) ? m.parcours : [];
  return list.filter((p): p is Parcours => !!p && typeof (p as Parcours).id === 'string' && Array.isArray((p as Parcours).files) && (p as Parcours).files.length > 0);
}

// Fichiers de la langue de la page, à défaut du français.
function inLang(files: ParcoursFile[], lang: Lang): ParcoursFile[] {
  const own = files.filter((f) => f.lang === lang);
  return own.length ? own : files.filter((f) => f.lang === 'fr' || !f.lang);
}

// Captures (PNG) d'un parcours pour la langue et l'appareil, une par étape, avec leurs variantes claire et sombre.
export function getShots(p: Parcours, lang: Lang, device: Device): Shot[] {
  const png = inLang(p.files.filter((f) => f.format === 'png'), lang).filter((f) => !f.device || f.device === device);
  const steps: string[] = [];
  for (const f of png) { const s = f.step ?? f.file; if (!steps.includes(s)) steps.push(s); }
  return steps.flatMap((step) => {
    const group = png.filter((f) => (f.step ?? f.file) === step);
    const light = group.find((f) => f.theme !== 'dark') ?? group[0];
    const dark = group.find((f) => f.theme === 'dark');
    const info = p.steps[step] ?? {};
    return [{
      step, light: light.file, dark: dark?.file,
      alt: info.alt?.[lang] ?? info.alt?.fr ?? p.title[lang] ?? p.title.fr ?? p.id,
      caption: info.caption?.[lang] ?? info.caption?.fr ?? '',
    }];
  });
}

// Vidéos MP4/WebM valables pour l'appareil choisi ; `dark` ne sert qu'au clic, jamais au pré-rendu.
export function getVideo(p: Parcours, lang: Lang, device: Device, dark: boolean): ParcoursFile[] {
  const vids = inLang(p.files.filter((f) => f.format === 'mp4' || f.format === 'webm'), lang).filter((f) => !f.device || f.device === device);
  const themed = vids.filter((f) => !f.theme || f.theme === (dark ? 'dark' : 'light'));
  const pick = themed.length ? themed : vids;
  return ['mp4', 'webm'].flatMap((fmt) => pick.filter((f) => f.format === fmt).slice(0, 1));
}
