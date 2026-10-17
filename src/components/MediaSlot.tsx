import { useTranslation } from 'react-i18next';
import type { Lang } from '../i18n';
import { findMedia } from '../media';
import { mediaSrc } from '../site';

// Capture réelle si public/media/manifest.json en fournit une pour ce slot et cette langue ;
// sinon `fallback` (illustration HTML/CSS de la maquette).
export default function MediaSlot({ slot, lang, fallback }: { slot: 'hero' | 'assistant'; lang: Lang; fallback: React.ReactNode }) {
  const { t } = useTranslation();
  const media = findMedia(slot, lang);
  if (!media) return <>{fallback}</>;
  return (
    <figure className="shot">
      <img src={mediaSrc(media.file)} alt={media.alt || t(`media.${slot}`)} loading="lazy" />
    </figure>
  );
}
