import { LANGS, type Lang } from './i18n';

// Chemin de base de l'hébergement (jamais d'URL absolue en dur).
export const BASE = import.meta.env.BASE_URL;

export function langHref(lang: Lang): string {
  return `${BASE}${lang}/`;
}

export function mediaSrc(file: string): string {
  return `${BASE}media/${file}`;
}

export { LANGS };

// Placeholders volontairement visibles tant que l'information n'est pas fournie.
export const PLACEHOLDER_EMAIL = '[EMAIL DE CONTACT]';
export const PLACEHOLDER_PRICING = '[TARIFS À DÉFINIR]';
