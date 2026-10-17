import { useTranslation } from 'react-i18next';
import Icon, { type IconName } from './Icon';

const MENU: IconName[] = ['dashboard', 'users', 'calendar', 'receipt', 'landmark', 'chart'];
const BARS = [35, 55, 45, 70, 60, 90];
const TODO: IconName[] = ['receipt', 'clipboard'];

// Aperçu illustratif de l'application : blocs neutres, aucun chiffre.
export default function AppPreview() {
  const { t } = useTranslation();
  const list = (k: string) => t(k, { returnObjects: true }) as string[];
  const menu = list('appPreview.menu');
  const kpis = list('appPreview.kpis');
  const todo = list('appPreview.todoItems');
  const widths = [60, 70, 50];
  return (
    <figure className="illus">
      <div className="app" aria-hidden="true">
        <div className="app-bar"><span /><span /><span /></div>
        <div className="app-body">
          <div className="app-menu">
            {menu.map((m, i) => (
              <span key={m} className={i === 0 ? 'on' : undefined}><Icon name={MENU[i]} size={16} />{m}</span>
            ))}
          </div>
          <div className="app-main">
            <div className="app-title">{t('appPreview.title')}</div>
            <div className="kpis">
              {kpis.map((k, i) => (
                <div key={k}>{k}<i style={{ width: `${widths[i]}%` }} /></div>
              ))}
            </div>
            <div className="bars">
              {BARS.map((h, i) => <span key={h + '-' + i} className={i === BARS.length - 1 ? 'hi' : undefined} style={{ height: `${h}%` }} />)}
            </div>
            <div className="todo">
              <b>{t('appPreview.todo')}</b>
              {todo.map((x, i) => <span key={x}><Icon name={TODO[i]} size={14} />{x}</span>)}
            </div>
          </div>
        </div>
      </div>
      <figcaption>{t('appPreview.caption')}</figcaption>
    </figure>
  );
}
