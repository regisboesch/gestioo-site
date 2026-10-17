import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { createI18n, LANGS, resources, type Lang } from './i18n';

export { LANGS };

export function render(lang: Lang): string {
  return renderToString(
    <I18nextProvider i18n={createI18n(lang)}>
      <App lang={lang} />
    </I18nextProvider>,
  );
}

export interface PageMeta {
  title: string;
  description: string;
  ogLocale: string;
  ogImageAlt: string;
}

export function getMeta(lang: Lang): PageMeta {
  return resources[lang].translation.meta;
}
