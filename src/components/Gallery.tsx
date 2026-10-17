import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Lang } from '../i18n';
import { getParcours, getShots, getVideo, type Device } from '../media';
import { mediaSrc } from '../site';
import Icon, { type IconName } from './Icon';

const PARCOURS_ICONS: Record<string, IconName> = {
  dashboard: 'dashboard', famille: 'users', 'facture-qr': 'qr', planning: 'calendar',
  'presences-mobile': 'userCheck', rapports: 'sheet', 'emails-groupes': 'megaphone', tresorerie: 'landmark',
};
export const iconFor = (id: string): IconName => PARCOURS_ICONS[id] ?? 'play';

// Section « Gestioo en images » : tout vient de public/media/manifest.json (aucun parcours codé en dur).
export default function Gallery({ lang }: { lang: Lang }) {
  const { t } = useTranslation();
  const parcours = getParcours();
  const [tab, setTab] = useState(parcours[0]?.id ?? '');
  const [device, setDevice] = useState<Device>('desktop');
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [dark, setDark] = useState(false);
  const section = useRef<HTMLElement>(null);

  // Ancrage #galerie-<id> : ouvre l'onglet correspondant (uniquement côté navigateur, après l'hydratation).
  useEffect(() => {
    const open = () => {
      const m = /^#galerie-(.+)$/.exec(window.location.hash);
      const id = m && parcours.find((p) => p.id === decodeURIComponent(m[1]))?.id;
      if (!id) return;
      setTab(id); setStep(0); setPlaying(false);
      section.current?.scrollIntoView();
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const current = parcours.find((p) => p.id === tab);
  if (!current) return null;

  const title = current.title[lang] ?? current.title.fr ?? current.id;
  const shots = getShots(current, lang, device);
  const shot = shots[Math.min(step, Math.max(shots.length - 1, 0))];
  const videos = getVideo(current, lang, device, dark);
  const hasVideo = videos.length > 0;
  const sentence = t(`gallery.${current.id}`, { defaultValue: shot?.caption ?? '' });
  const frameCls = device === 'desktop' ? 'g-browser' : 'g-phone';

  const pick = (id: string) => { setTab(id); setStep(0); setPlaying(false); };
  const setDev = (d: Device) => { setDevice(d); setStep(0); setPlaying(false); };
  const play = () => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    setPlaying(true);
  };

  return (
    <section id="galerie" className="section alt" ref={section}>
      <div className="wrap">
        <p className="eyebrow"><Icon name="play" size={14} />{t('gallery.eyebrow')}</p>
        <h2>{t('gallery.title')}</h2>
        <p className="intro">{t('gallery.intro')}</p>

        <div className="g-bar">
          <div className="g-tabs">
            {parcours.map((p) => (
              <button type="button" key={p.id} className="g-tab" aria-pressed={p.id === tab} onClick={() => pick(p.id)}>
                <Icon name={iconFor(p.id)} />{t(`galleryTabs.${p.id}`, { defaultValue: p.title[lang] ?? p.title.fr ?? p.id })}
              </button>
            ))}
          </div>
          <div className="g-device" role="group" aria-label={t('gallery.device')}>
            <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDev('desktop')}><Icon name="monitor" />{t('gallery.desktop')}</button>
            <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDev('mobile')}><Icon name="smartphone" />{t('gallery.mobile')}</button>
          </div>
        </div>

        <div className="g-main">
          <div className="g-stage">
            <figure className={frameCls}>
              {device === 'desktop' && <div className="g-dots" aria-hidden="true"><span /><span /><span /></div>}
              <div className="g-screen">
                {playing && hasVideo ? (
                  <video className="g-media" controls autoPlay muted playsInline preload="none"
                         poster={shot ? mediaSrc(shot.light) : undefined}>
                    {videos.map((v) => <source key={v.file} src={mediaSrc(v.file)} type={`video/${v.format}`} />)}
                  </video>
                ) : shot ? (
                  <>
                    <picture>
                      {shot.dark && <source media="(prefers-color-scheme: dark)" srcSet={mediaSrc(shot.dark)} />}
                      <img className="g-media" src={mediaSrc(shot.light)} alt={shot.alt} loading="lazy" />
                    </picture>
                    {hasVideo && (
                      <button type="button" className="g-play" aria-label={t('gallery.play')} onClick={play}>
                        <Icon name="play" size={device === 'desktop' ? 30 : 26} />
                      </button>
                    )}
                  </>
                ) : null}
              </div>
            </figure>
            {!playing && shots.length > 1 && (
              <div className="g-steps">
                <button type="button" aria-label={t('gallery.prev')} disabled={step === 0} onClick={() => setStep(step - 1)}><Icon name="chevronLeft" size={20} /></button>
                <span aria-live="polite">{shot.caption ? `${shot.caption} · ` : ''}{step + 1} / {shots.length}</span>
                <button type="button" aria-label={t('gallery.next')} disabled={step >= shots.length - 1} onClick={() => setStep(step + 1)}><Icon name="chevronRight" size={20} /></button>
              </div>
            )}
          </div>
          <div className="g-text">
            <span className="pill sq48"><Icon name={iconFor(current.id)} size={24} /></span>
            <h3>{title}</h3>
            {sentence && <p className="g-sentence">{sentence}</p>}
            <p className="g-note"><span className="g-note-ico"><Icon name="info" /></span>{t('gallery.note')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
