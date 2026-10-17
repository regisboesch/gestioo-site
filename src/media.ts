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
