import { useTranslation } from 'react-i18next';
import { LANGS, type Lang } from './i18n';
import { langHref, PLACEHOLDER_EMAIL } from './site';
import MediaSlot from './components/MediaSlot';
import AppPreview from './components/AppPreview';
import ChatExample from './components/ChatExample';
import Icon, { type IconName } from './components/Icon';
import Gallery from './components/Gallery';
import { getParcours } from './media';

interface Pair { role: string; before: string; after: string }
interface Card { title: string; text: string }
interface ModuleGroup { title: string; items: string[] }
interface TeamCard { big?: string; title: string; text: string }
interface NewsItem { date: string; dateLabel: string; title: string; text: string }

const NAV = [['profiles', 'profils'], ['strengths', 'forces'], ['modules', 'modules'], ['gallery', 'galerie'], ['assistant', 'assistant'], ['trust', 'confiance'], ['pricing', 'tarif'], ['news', 'nouveautes']] as const;

// Icônes par position, dans l'ordre des listes des fichiers de langue (cf. design/README.md).
const HERO_CHIPS: IconName[] = ['swiss', 'tag', 'globe', 'smartphone', 'qr', 'moon'];
const PROFILE_ICONS: IconName[] = ['wallet', 'clipboard', 'timer', 'users', 'dashboard'];
const STRENGTH_ICONS: IconName[] = ['swiss', 'book', 'heart', 'wifiOff', 'mic', 'shield', 'smartphone', 'palette', 'sheet', 'megaphone', 'calendarDays', 'users', 'tag', 'users'];
const MODULE_ICONS: IconName[] = ['users', 'clipboard', 'calendar', 'idCard', 'receipt', 'landmark', 'briefcase', 'megaphone', 'calendarDays', 'chart', 'sliders'];
const ASSISTANT_ICONS: IconName[] = ['mic', 'search', 'plusCircle', 'compass'];
// Parcours de la galerie liés aux cartes de modules (par position).
const MODULE_PARCOURS: Record<number, string> = { 0: 'famille', 2: 'planning', 4: 'facture-qr', 5: 'tresorerie', 7: 'emails-groupes', 9: 'dashboard' };
const TEAM_ICONS: IconName[] = ['swiss', 'swiss', 'monitor'];
const TRUST_ICONS: IconName[] = ['userCheck', 'lock', 'book', 'history', 'sparkles', 'checkCircle'];

export default function App({ lang }: { lang: Lang }) {
  const { t } = useTranslation();
  const list = <T,>(key: string) => t(key, { returnObjects: true }) as T[];
  const parcoursIds = getParcours().map((p) => p.id);
  const nav = NAV.filter(([key]) => key !== 'gallery' || parcoursIds.length > 0);
  const mailto = `mailto:${PLACEHOLDER_EMAIL}`;

  return (
    <>
      <a className="skip" href="#main">{t('a11y.skip')}</a>
      <header className="header">
        <div className="wrap header-in">
          <a className="brand" href={langHref(lang)} aria-label={t('a11y.home')}>
            <span className="logo" aria-hidden="true">G</span>
            <span className="brand-name">Gestioo</span>
          </a>
          <nav aria-label={t('a11y.nav')} className="nav">
            {nav.map(([key, id]) => <a key={id} href={`#${id}`}>{t(`nav.${key}`)}</a>)}
          </nav>
          <div className="header-end">
            <nav aria-label={t('a11y.langs')} className="langs">
              {LANGS.map((l) => (
                <a key={l} href={langHref(l)} hrefLang={l} lang={l}
                   aria-current={l === lang ? 'page' : undefined}>{l.toUpperCase()}</a>
              ))}
            </nav>
            <a className="btn btn-sm" href="#contact"><Icon name="mail" size={18} />{t('header.contact')}</a>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero alt">
          <div className="wrap hero-in">
            <div className="hero-text">
              <p className="eyebrow"><Icon name="swiss" />{t('hero.eyebrow')}</p>
              <h1>{t('hero.title')}<span className="accent-text">{t('hero.titleAccent')}</span>{t('hero.titleEnd')}</h1>
              <p className="lead">{t('hero.lead')}</p>
              <div className="cta-row">
                <a className="btn btn-lg" href="#contact">{t('hero.cta')}<Icon name="arrowRight" size={18} /></a>
                <a className="btn btn-lg btn-ghost" href="#modules"><Icon name="compass" size={18} />{t('hero.ctaSecondary')}</a>
              </div>
              <ul className="chips">
                {list<string>('hero.chips').map((c, i) => <li key={c}><Icon name={HERO_CHIPS[i]} />{c}</li>)}
              </ul>
            </div>
            <MediaSlot slot="hero" lang={lang} fallback={<AppPreview />} />
          </div>
        </section>

        <section id="profils" className="section">
          <div className="wrap">
            <h2>{t('profiles.title')}</h2>
            <p className="intro">{t('profiles.intro')}</p>
            <div className="grid g-320">
              {list<Pair>('profiles.items').map((p, i) => (
                <article className="card profile" key={p.role}>
                  <div className="card-head">
                    <span className="pill sq48"><Icon name={PROFILE_ICONS[i]} size={24} /></span>
                    <h3 className="h3-lg">{p.role}</h3>
                  </div>
                  <p className="row off"><span className="ico off"><Icon name="xCircle" size={18} /></span><span><strong>{t('profiles.before')}</strong> {p.before}</span></p>
                  <p className="row"><span className="ico"><Icon name="checkCircle" size={18} /></span><span><strong>{t('profiles.after')}</strong> {p.after}</span></p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="forces" className="section alt">
          <div className="wrap">
            <h2>{t('strengths.title')}</h2>
            <div className="grid g-300">
              {list<Card>('strengths.items').map((s, i) => (
                <article className="card plain" key={s.title}>
                  <span className={`pill round48${i === 0 ? ' solid' : ''}`}><Icon name={STRENGTH_ICONS[i]} size={24} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="modules" className="section">
          <div className="wrap">
            <h2>{t('modules.title')}</h2>
            <p className="intro">{t('modules.intro')}</p>
            <div className="grid g-340">
              {list<ModuleGroup>('modules.groups').map((g, i) => (
                <article className="card" key={g.title}>
                  <div className="card-head">
                    <span className="pill sq44"><Icon name={MODULE_ICONS[i]} size={22} /></span>
                    <h3>{g.title}</h3>
                  </div>
                  <ul className="checks">
                    {g.items.map((it) => <li key={it}><span className="ico"><Icon name="check" /></span>{it}</li>)}
                  </ul>
                  {MODULE_PARCOURS[i] && parcoursIds.includes(MODULE_PARCOURS[i]) && (
                    <a className="see" href={`#galerie-${MODULE_PARCOURS[i]}`}><Icon name="play" size={14} />{t('modules.seeImages')}</a>
                  )}
                </article>
              ))}
            </div>
            <aside className="note">
              <span className="note-ico"><Icon name="info" size={22} /></span>
              <div className="note-body">
                <h3>{t('modules.notYetTitle')}</h3>
                <ul>{list<string>('modules.notYet').map((n) => <li key={n}>{n}</li>)}</ul>
              </div>
            </aside>
          </div>
        </section>

        <Gallery lang={lang} />

        <section id="assistant" className="band">
          <div className="wrap band-in">
            <div className="band-text">
              <p className="eyebrow on-dark"><Icon name="sparkles" />{t('assistant.eyebrow')}</p>
              <h2>{t('assistant.title')}</h2>
              <p className="band-lead">{t('assistant.lead')}</p>
              <ul className="points">
                {list<string>('assistant.points').map((p, i) => (
                  <li key={p}><span className="pill sq36"><Icon name={ASSISTANT_ICONS[i]} size={18} /></span><span>{p}</span></li>
                ))}
              </ul>
              <p className="safety"><span className="ico"><Icon name="shield" size={20} /></span>{t('assistant.safety')}</p>
            </div>
            <MediaSlot slot="assistant" lang={lang} fallback={<ChatExample />} />
          </div>
        </section>

        <section id="confiance" className="section">
          <div className="wrap">
            <h2>{t('trust.title')}</h2>
            <div className="grid g-300 trust">
              {list<Card>('trust.items').map((s, i) => (
                <article className="trust-item" key={s.title}>
                  <span className="pill outline48"><Icon name={TRUST_ICONS[i]} size={24} /></span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="equipe" className="section alt">
          <div className="wrap">
            <h2>{t('team.title')}</h2>
            <p className="intro">{t('team.intro')}</p>
            <div className="grid g-300">
              {list<TeamCard>('team.items').map((c, i) => (
                <article className="card plain team-card" key={c.title}>
                  {c.big
                    ? <p className="big">{c.big}</p>
                    : <span className="pill sq56"><Icon name={TEAM_ICONS[i]} size={28} /></span>}
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tarif" className="section">
          <div className="wrap pricing-in">
            <div className="pricing-text">
              <p className="eyebrow"><Icon name="tag" />{t('pricing.eyebrow')}</p>
              <h2>{t('pricing.title')}</h2>
              <p className="pricing-lead">{t('pricing.lead')}</p>
            </div>
            <div className="price-card">
              <p className="price-label">{t('pricing.label')}</p>
              <p className="price-line">
                <span className="price-amount">{t('pricing.amount')}</span>
                <span className="price-cur">{t('pricing.currency')}</span>
                <span className="price-per">{t('pricing.per')}</span>
              </p>
              <ul className="price-points">
                {list<string>('pricing.points').map((x) => <li key={x}><span className="ico"><Icon name="check" size={18} /></span>{x}</li>)}
              </ul>
              <a className="btn btn-lg btn-block" href="#contact">{t('pricing.cta')}<Icon name="arrowRight" size={18} /></a>
            </div>
          </div>
        </section>

        <section id="nouveautes" className="section alt">
          <div className="wrap">
            <h2>{t('news.title')}</h2>
            <div className="news">
              {list<NewsItem>('news.items').map((n) => (
                <article className="card plain news-item" key={n.date + n.title}>
                  <div className="news-date">
                    <span className="pill round48 solid"><Icon name="sparkles" size={22} /></span>
                    <time dateTime={n.date}>{n.dateLabel}</time>
                  </div>
                  <div className="news-body">
                    <h3>{n.title}</h3>
                    <p>{n.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="wrap">
            <div className="contact">
              <div className="contact-text">
                <h2>{t('contact.title')}</h2>
                <p className="contact-lead">{t('contact.text')}</p>
                <p className="price"><Icon name="tag" />{t('contact.pricing')}</p>
              </div>
              <a className="btn btn-white" href={mailto}><Icon name="mail" size={20} />{t('contact.mail')} {PLACEHOLDER_EMAIL}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-in">
          <span>{t('footer.text')}</span>
          <span className="foot-langs"><Icon name="globe" />FR · DE · EN</span>
        </div>
      </footer>
    </>
  );
}
