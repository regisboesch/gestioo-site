import { useTranslation } from 'react-i18next';
import { LANGS, type Lang } from './i18n';
import { langHref, PLACEHOLDER_EMAIL, PLACEHOLDER_PRICING } from './site';
import MediaSlot from './components/MediaSlot';

interface Pair { role: string; before: string; after: string }
interface Card { title: string; text: string }
interface ModuleGroup { title: string; items: string[] }
interface NewsItem { date: string; title: string; text: string }

const NAV = ['profiles', 'strengths', 'modules', 'assistant', 'trust', 'news', 'contact'] as const;

export default function App({ lang }: { lang: Lang }) {
  const { t } = useTranslation();
  const list = <T,>(key: string) => t(key, { returnObjects: true }) as T[];

  return (
    <>
      <a className="skip" href="#main">{t('a11y.skip')}</a>
      <header className="header">
        <div className="container header-in">
          <a className="brand" href={langHref(lang)} aria-label={t('a11y.home')}>MyERPPlus</a>
          <nav aria-label={t('a11y.nav')} className="nav">
            {NAV.map((id) => <a key={id} href={`#${id}`}>{t(`nav.${id}`)}</a>)}
          </nav>
          <nav aria-label={t('a11y.langs')} className="langs">
            {LANGS.map((l) => (
              <a key={l} href={langHref(l)} hrefLang={l} lang={l}
                 aria-current={l === lang ? 'true' : undefined}>{l.toUpperCase()}</a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="container hero-in">
            <div>
              <p className="eyebrow">{t('hero.eyebrow')}</p>
              <h1>{t('hero.title')}</h1>
              <p className="lead">{t('hero.lead')}</p>
              <p className="cta-row">
                <a className="btn" href="#contact">{t('hero.cta')}</a>
                <a className="btn btn-ghost" href="#modules">{t('hero.ctaSecondary')}</a>
              </p>
              <ul className="chips">
                {list<string>('hero.chips').map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <MediaSlot id="hero" lang={lang} />
          </div>
        </section>

        <section id="profiles" className="section">
          <div className="container">
            <h2>{t('profiles.title')}</h2>
            <p className="intro">{t('profiles.intro')}</p>
            <div className="grid grid-2">
              {list<Pair>('profiles.items').map((p) => (
                <article className="card" key={p.role}>
                  <h3>{p.role}</h3>
                  <p><strong>{t('profiles.before')}</strong> {p.before}</p>
                  <p><strong>{t('profiles.after')}</strong> {p.after}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="strengths" className="section alt">
          <div className="container">
            <h2>{t('strengths.title')}</h2>
            <div className="grid grid-3">
              {list<Card>('strengths.items').map((s) => (
                <article className="card" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="modules" className="section">
          <div className="container">
            <h2>{t('modules.title')}</h2>
            <p className="intro">{t('modules.intro')}</p>
            <div className="grid grid-3">
              {list<ModuleGroup>('modules.groups').map((g) => (
                <article className="card" key={g.title}>
                  <h3>{g.title}</h3>
                  <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className="note">
              <h3>{t('modules.notYetTitle')}</h3>
              <ul>{list<string>('modules.notYet').map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="assistant" className="section alt">
          <div className="container split">
            <div>
              <h2>{t('assistant.title')}</h2>
              <p className="intro">{t('assistant.lead')}</p>
              <ul>{list<string>('assistant.points').map((p) => <li key={p}>{p}</li>)}</ul>
              <p className="callout">{t('assistant.safety')}</p>
            </div>
            <MediaSlot id="assistant" lang={lang} />
          </div>
        </section>

        <section id="trust" className="section">
          <div className="container">
            <h2>{t('trust.title')}</h2>
            <div className="grid grid-2">
              {list<Card>('trust.items').map((s) => (
                <article className="card" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="news" className="section alt">
          <div className="container">
            <h2>{t('news.title')}</h2>
            <ol className="news">
              {list<NewsItem>('news.items').map((n) => (
                <li key={n.date + n.title}>
                  <time dateTime={n.date}>{n.date}</time>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact">
            <h2>{t('contact.title')}</h2>
            <p className="intro">{t('contact.text')}</p>
            <p>
              <a className="btn" href={`mailto:${encodeURIComponent(PLACEHOLDER_EMAIL)}`}>
                {t('contact.mail')} {PLACEHOLDER_EMAIL}
              </a>
            </p>
            <p>{t('contact.pricing')} <strong>{PLACEHOLDER_PRICING}</strong></p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>{t('footer.text')}</p>
        </div>
      </footer>
    </>
  );
}
