import { useTranslation } from 'react-i18next';
import Icon from './Icon';

// Exemple illustratif d'échange avec l'assistant. Les boutons sont décoratifs (désactivés).
export default function ChatExample() {
  const { t } = useTranslation();
  return (
    <figure className="illus chat-fig">
      <div className="chat">
        <div className="chat-head"><Icon name="sparkles" size={18} />{t('chat.name')}</div>
        <div className="bubble user"><Icon name="mic" size={16} />{t('chat.user')}</div>
        <div className="bubble bot">
          <span>{t('chat.reply')}</span>
          <div className="recap">
            <span><strong>{t('chat.member')}</strong> {t('chat.memberVal')}</span>
            <span><strong>{t('chat.team')}</strong> {t('chat.teamVal')}</span>
            <span><strong>{t('chat.season')}</strong> {t('chat.seasonVal')}</span>
          </div>
          <div className="chat-btns">
            <button type="button" className="b-yes" disabled><Icon name="check" size={16} />{t('chat.confirm')}</button>
            <button type="button" className="b-no" disabled>{t('chat.cancel')}</button>
          </div>
        </div>
      </div>
      <figcaption>{t('chat.caption')}</figcaption>
    </figure>
  );
}
