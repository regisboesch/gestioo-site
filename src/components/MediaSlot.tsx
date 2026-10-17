import { useTranslation } from 'react-i18next';
import type { Lang } from '../i18n';

// Emplacement neutre : les médias (public/media/, décrits par manifest.json) sont produits
// par une autre routine. Tant qu'ils n'existent pas, on affiche un cadre décoratif.
export default function MediaSlot({ id, lang }: { id: string; lang: Lang }) {
  const { t } = useTranslation();
  return (
    <div className="media-slot" role="img" aria-label={t(`media.${id}`)} data-media={id} data-lang={lang}>
      <span aria-hidden="true">MyERPPlus</span>
    </div>
  );
}
