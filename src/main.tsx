import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { createI18n, DEFAULT_LANG, isLang } from './i18n';
import { BASE } from './site';
import './styles/index.css';

// La langue est lue dans le chemin (…/fr/), pas dans le navigateur.
const segment = window.location.pathname.slice(BASE.length).split('/')[0];
const lang = isLang(segment) ? segment : DEFAULT_LANG;

hydrateRoot(
  document.getElementById('root')!,
  <I18nextProvider i18n={createI18n(lang)}>
    <App lang={lang} />
  </I18nextProvider>,
);
