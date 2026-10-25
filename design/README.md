# Design du site Gestioo

Ce dossier contient la maquette validée du site, conçue dans Claude Design. Elle **fait foi pour l'apparence** du site : couleurs, typographie, icônes, structure des sections et composants. Les textes, eux, viennent de `publicity.md`, la fiche produit de l'application.

- Maquette source (canvas Claude Design) : https://claude.ai/artifact/S7RtCTYFtS6LcjKvyohP2q
- Export de référence : `maquette/*.dc.html`. Ces fichiers ne sont pas destinés à être servis : ils servent de spécification visuelle.
  - `Main.dc.html` : page d'accueil complète (desktop, fluide).
  - `Mobile.dc.html` : la même page à 390 px de large.
  - `Icon.dc.html` et `Icones.dc.html` : le jeu d'icônes et son usage.
  - `Galerie.dc.html` : la section interactive « Gestioo en images ». Ses images pointent vers des fichiers du canvas (`/_blob/…`), qui ne sont pas utilisables tels quels sur le site. Sur le site, les médias viennent du manifeste (voir « Données de la galerie »).

Ce dossier n'est modifié que lorsqu'une nouvelle maquette est validée dans Claude Design. Il n'est jamais modifié par les routines automatiques.

## Nom du produit

Le produit s'appelle **Gestioo**. « MyERPPlus » est seulement le nom interne du dépôt de l'application : il ne doit apparaître nulle part dans le texte visible du site, ni dans les métadonnées (`<title>`, meta description, Open Graph).

## Couleurs (thème clair)

| Jeton | Valeur | Usage |
|---|---|---|
| `--ink` | `#0E1B2C` | texte principal, bande sombre de l'assistant IA, boutons secondaires |
| `--muted` | `#4A5568` | texte secondaire |
| `--line` | `#DDE3EA` | bordures des cartes et séparateurs |
| `--bg` | `#FFFFFF` | fond |
| `--bg-alt` | `#F4F6F9` | fond des sections alternées (accueil, points forts, galerie, équipe, nouveautés) |
| `--accent` | `#C8102E` | rouge suisse : boutons principaux, icônes, bandeau de contact |
| `--accent-tint` | `rgba(200, 16, 46, 0.10)` | fond des pastilles d'icônes |
| `--on-dark-muted` | `#C5CEDB` | texte secondaire sur la bande sombre |
| `--on-dark-accent` | `#FFB3BD` | icônes et sur-titre sur la bande sombre |
| `--note-bg` / `--note-text` | `#FFF6DB` / `#4A3500` | encadré « Bon à savoir » |
| `--icon-off` | `#8A94A6` | icône « Avant » des cartes profils |

### Thème sombre

Le thème sombre suit `prefers-color-scheme: dark` :

| Jeton | Valeur |
|---|---|
| `--bg` | `#0B1220` |
| `--bg-alt` | `#111A2E` |
| Cartes | `#162038` |
| `--ink` (texte) | `#E8EDF6` |
| `--muted` | `#B3BFD4` |
| `--line` | `#2C3A58` |
| `--accent` des boutons | `#C8102E`, texte blanc |
| Accent en texte ou icône | `#FF8A99` |

Le contraste doit rester AA partout.

## Typographie

- **Titres** : Bricolage Grotesque, graisses 600 et 800, interlettrage négatif (-0.02 à -0.03 em).
  - h1 : `clamp(38px, 5.2vw, 64px)`, hauteur de ligne 1.05. La fin du slogan (« d'un seul geste ») est en couleur accent.
  - h2 : `clamp(30px, 3.6vw, 44px)`, hauteur de ligne 1.1.
  - h3 : 19 à 22 px, graisse 600.
- **Texte** : Figtree, graisses 400 à 700, 17 px de base, hauteur de ligne 1.6. Le texte des cartes est à 15 px.
- **Chargement des polices** : elles sont **auto-hébergées**, via `@fontsource-variable/bricolage-grotesque` et `@fontsource/figtree`, et non chargées depuis Google Fonts. Ainsi, aucune adresse IP de visiteur n'est transmise à un tiers (nLPD / RGPD).

## Icônes

- **Bibliothèque** : `lucide-react`. Trait de 2 px, coins arrondis, couleur `currentColor`, et `aria-hidden="true"`, car les icônes sont décoratives.
- **Tailles** :
  - 16 px dans les puces et les boutons ;
  - 22 à 24 px dans les pastilles de 44 à 48 px.
- **Correspondance** entre la maquette et Lucide. Si un nom a changé, utiliser l'équivalent de la version installée.

| Maquette | Lucide | Usage |
|---|---|---|
| wallet | `Wallet` | Trésorier |
| clipboard | `ClipboardCheck` | Secrétaire / comité, inscriptions, « À traiter » |
| timer | `Timer` | Entraîneur / staff |
| users | `Users` | Parent / membre, module Membres et familles, point fort « Créé par des gens du terrain » |
| dashboard | `LayoutDashboard` | Président, tableau de bord |
| swiss | `SquarePlus` | Pensé et élaboré en Suisse, sur-titre et pastille « Élaboré en Suisse » de l'accueil, carte « Élaboré en Suisse » de l'équipe |
| book | `BookOpen` | Comptabilité intégrée, comptabilité inaltérable |
| heart | `Heart` | Les familles au cœur |
| wifiOff | `WifiOff` | Fonctionne hors ligne |
| mic | `Mic` | Assistant vocal |
| shield | `ShieldCheck` | Droits par rôle, sécurité de l'assistant |
| smartphone | `Smartphone` | Installable sur smartphone |
| palette | `Palette` | Aux couleurs du club |
| sheet | `Sheet` | Rapports sur mesure |
| calendar | `Calendar` | Planning et présences |
| idCard | `IdCard` | Licences fédérales |
| receipt | `Receipt` | Cotisations et facturation |
| landmark | `Landmark` | Comptabilité suisse, trésorerie |
| briefcase | `Briefcase` | Notes de frais et fournisseurs |
| megaphone | `Megaphone` | Communication |
| chart | `ChartColumn` | Tableau de bord et rapports |
| sliders | `SlidersVertical` | Paramètres et accès |
| userCheck | `UserCheck` | Accès par rôle |
| lock | `Lock` | Comptes protégés |
| history | `History` | Traçabilité |
| sparkles | `Sparkles` | IA, nouveautés |
| checkCircle | `CircleCheck` | « Avec Gestioo », qualité logicielle |
| xCircle | `CircleX` | « Avant » |
| check | `Check` | puces des listes de modules, bouton Confirmer |
| info | `Info` | Bon à savoir |
| search | `Search` | recherche (assistant) |
| plusCircle | `CirclePlus` | création (assistant) |
| compass | `Compass` | navigation, bouton « Découvrir les fonctionnalités » |
| globe | `Globe` | langues |
| qr | `QrCode` | QR-facture suisse |
| moon | `Moon` | thème clair et sombre |
| mail | `Mail` | contact |
| tag | `Tag` | tarif : pastille de l'accueil, point fort « Un prix simple », sur-titre de la section Tarif, pilule du contact |
| arrowRight | `ArrowRight` | bouton principal |
| play | `Play` | lecture de vidéo, liens « Voir en images », sur-titre de la galerie |
| monitor | `Monitor` | bascule « Ordinateur » de la galerie, carte « Développé par un ingénieur en informatique » de l'équipe |

**Règle** : chaque nouvel élément de liste, carte ou section reçoit une icône du même style, choisie dans Lucide.

## Structure et composants

La page suit cet ordre. Les fonds alternent blanc et `--bg-alt`, et le contenu est centré dans un conteneur de 1180 px maximum, avec une marge latérale de `clamp(16px, 4vw, 40px)`.

1. **En-tête**
   - logo : pastille accent avec un « G », puis « Gestioo » en Bricolage 800 ;
   - navigation par ancres, avec un lien « En images » vers `#galerie`, placé juste après « Fonctionnalités », et un lien « Tarif » vers `#tarif`, placé juste avant « Nouveautés » ;
   - sélecteur de langue FR / DE / EN en pilule, la langue courante sur fond `--ink` ;
   - bouton « Nous contacter » avec icône `Mail`.
2. **Accueil** (fond `--bg-alt`), sur deux colonnes qui passent l'une sous l'autre sur mobile :
   - à gauche :
     - le sur-titre en pilule teintée, avec l'icône `SquarePlus` ;
     - le h1 (le slogan, dont la fin est en accent) et le paragraphe d'introduction ;
     - deux boutons : le principal en accent avec `ArrowRight`, le secondaire avec contour `--ink` et `Compass` ;
     - six pastilles blanches, chacune avec son icône, dans cet ordre : « Élaboré en Suisse » (`SquarePlus`), le tarif annuel (`Tag`), puis les langues (`Globe`), le smartphone (`Smartphone`), la QR-facture (`QrCode`) et le thème clair et sombre (`Moon`).
   - à droite : un **aperçu illustratif** de l'application, sans aucun chiffre et légendé comme tel, qui sera remplacé par une vraie capture dès que `public/media/manifest.json` en fournit une.
3. **Profils** : grille de cartes à bordure (`repeat(auto-fit, minmax(320px, 1fr))`). Chaque carte contient :
   - une pastille teintée de 48 px avec l'icône du rôle, suivie du titre ;
   - la ligne « Avant », avec `CircleX` gris et du texte secondaire ;
   - la ligne « Avec Gestioo », avec `CircleCheck` en accent.
4. **Points forts** (fond `--bg-alt`) : cartes blanches sans bordure, chacune avec une pastille ronde de 48 px. La première pastille, « Pensé et élaboré en Suisse », est pleine (fond accent, icône blanche) ; les autres sont teintées. Les deux dernières cartes sont « Un prix simple, tout compris » (`Tag`) et « Créé par des gens du terrain » (`Users`).
5. **Modules** : cartes à bordure, chacune avec une pastille de 44 px et le titre, puis une liste dont chaque élément commence par une coche `Check` en accent. Elles sont suivies de l'encadré **« Bon à savoir »**, sur fond `--note-bg` avec l'icône `Info`, présenté en deux colonnes sur desktop.
   - **Lien « Voir en images »** sous la liste des cartes qui ont un parcours dans la galerie : texte accent, graisse 600, icône `Play` de 14 px, hauteur d'au moins 44 px. Le lien ouvre la galerie sur l'onglet du parcours (`#galerie-<id>`). Correspondances :
     - Membres et familles → `famille` ;
     - Planning et présences → `planning` ;
     - Cotisations et facturation → `facture-qr` ;
     - Comptabilité suisse → `tresorerie` ;
     - Communication → `emails-groupes` ;
     - Tableau de bord et rapports → `dashboard`.

     Le lien n'apparaît que si le parcours existe dans le manifeste.
5 bis. **Gestioo en images** (`id="galerie"`, fond `--bg-alt`), section interactive placée entre les modules et l'assistant IA (maquette : `Galerie.dc.html`).
   - **En-tête** : un sur-titre en pilule teintée avec l'icône `Play` (« Vidéos et captures de l'application »), le h2 « Gestioo en images » et une phrase d'introduction qui précise que les écrans montrent des données de démonstration.
   - **Onglets**, un par parcours du manifeste, dans l'ordre du manifeste.
     - Ce sont de vrais `<button>` avec `aria-pressed`, en pilule, d'au moins 44 px de haut, avec l'icône du parcours et un libellé court.
     - L'onglet actif est sur fond `--ink` avec un texte blanc ; les autres sont blancs avec une bordure `--line`.
     - Les onglets passent à la ligne quand la place manque.
     - Un ancrage `#galerie-<id>` ouvre directement l'onglet correspondant.
   - **Bascule « Ordinateur » / « Mobile »** : deux boutons dans une pilule blanche, avec les icônes `Monitor` et `Smartphone`. Le bouton actif est sur fond `--ink`.
   - **Zone de lecture**, à gauche (elle passe au-dessus du texte sur mobile).
     - **Ordinateur** : un cadre de navigateur (barre avec trois points, bordure `--line`, rayon de 18 px, l'ombre de l'aperçu), avec la vidéo au format 16:10.
     - **Mobile** : un cadre de téléphone (fond `--ink`, rayon de 40 px, 300 px de large au maximum), avec la vidéo au format 390:844.
     - Avant la lecture, on affiche l'image d'aperçu du parcours et un bouton rond en accent de 64 à 76 px, avec l'icône `Play`, libellé « Lire la vidéo ».
     - Au clic, on lit la vidéo : `<video controls muted playsinline preload="none" poster="…">` avec une source MP4, puis une source WebM.
     - Si un parcours n'a pas de vidéo, on affiche ses captures, avec des flèches ou des vignettes s'il y a plusieurs étapes.
   - **Texte**, à droite :
     - une pastille teintée de 48 px avec l'icône du parcours ;
     - le titre du parcours (h3, 24 px) ;
     - une phrase sur le bénéfice pour le club, tirée de la fiche produit ;
     - la mention « Vidéo sans son et captures de l'application réelle, avec des données de démonstration », avec l'icône `Info`.
   - **Icônes des parcours** :

     | Parcours | Icône |
     |---|---|
     | `dashboard` | `LayoutDashboard` |
     | `famille` | `Users` |
     | `facture-qr` | `QrCode` |
     | `planning` | `Calendar` |
     | `presences-mobile` | `UserCheck` |
     | `rapports` | `Sheet` |
     | `emails-groupes` | `Megaphone` |
     | `tresorerie` | `Landmark` |

     Un parcours inconnu reçoit l'icône `Play`.
6. **Assistant IA** : bande `--ink`.
   - À gauche :
     - le sur-titre « Propulsé par Mistral AI » avec `Sparkles` ;
     - quatre points, chacun avec une pastille translucide (`rgba(255,255,255,.08)`) ;
     - la phrase de sécurité, avec `ShieldCheck`.
   - À droite : un **exemple illustratif d'échange**, légendé comme tel. On y voit une bulle utilisateur avec `Mic`, puis la réponse de l'assistant avec une carte récapitulative et les boutons « Confirmer » et « Annuler ».
7. **Confiance et sécurité** : grille avec, pour chaque point, une pastille de 48 px à contour `--ink` contenant l'icône, puis le titre et le texte.
7 bis. **Équipe** (`id="equipe"`, fond `--bg-alt`) : le h2 « Créé par des gens du terrain », une phrase d'introduction en texte secondaire, puis une grille de trois cartes blanches sans bordure (`repeat(auto-fit, minmax(min(100%, 300px), 1fr))`, rayon de 16 px, marge intérieure de 28 px). Chaque carte contient un visuel de 56 px de haut, puis un h3 de 22 px et le texte à 15 px :
   - « Élaboré en Suisse » : pastille carrée teintée de 56 px (rayon de 14 px) avec `SquarePlus` à 28 px ;
   - « 20 ans d'expérience associative » : à la place de la pastille, le chiffre « 20 ans » en Bricolage 800 à 56 px, en accent, suivi du h3 « d'expérience associative » ;
   - « Développé par un ingénieur en informatique » : pastille carrée teintée de 56 px avec `Monitor` à 28 px.
7 ter. **Tarif** (`id="tarif"`, fond blanc), sur deux colonnes qui passent l'une sous l'autre sur mobile :
   - à gauche : le sur-titre « Tarif » en pilule teintée avec `Tag`, le h2 « Un prix simple et clair », puis une phrase à 19 px en texte secondaire ;
   - à droite, la **carte de prix** : bordure de 2 px en accent, rayon de 24 px, marge intérieure de `clamp(24px, 4vw, 40px)`, ombre `0 24px 60px rgba(14,27,44,.08)`. Elle contient :
     - le libellé « Gestioo, tout compris » (15 px, graisse 600, texte secondaire) ;
     - le prix sur une ligne : « 800 » en Bricolage 800 à 72 px, « CHF » en Bricolage 600 à 28 px, « par an » à 17 px en texte secondaire ;
     - trois puces avec une coche `Check` en accent (tous les modules, toutes les mises à jour, pas de prix cachés) ;
     - le bouton principal « Nous contacter » en accent, pleine largeur, avec `ArrowRight`.
8. **Nouveautés** (fond `--bg-alt`) : une carte par entrée, avec à gauche une pastille ronde accent et `Sparkles` au-dessus de la date (`<time>`), et à droite le titre et le texte.
9. **Contact** : grand bandeau arrondi (24 px) en accent, avec :
   - le titre, le texte et la pilule du tarif (« Tarif : 800 CHF par an, tout compris ») avec `Tag` ;
   - à droite, un bouton blanc avec `Mail`.
10. **Pied de page** : le texte, terminé par « Élaboré en Suisse. », puis « FR · DE · EN » avec `Globe`.

## Données de la galerie (contrat avec le manifeste)

La galerie ne contient **aucune liste de parcours codée en dur**. Tout vient de `public/media/manifest.json`, produit par la routine des médias, et se résout au build (pré-rendu compris).

- **Parcours** : la liste `parcours[]`, dans l'ordre du fichier. Chaque parcours apporte :
  - `id`, qui sert d'ancre et à choisir l'icône ;
  - `title` en `fr` / `de` / `en`, qui sert de titre et de libellé d'onglet (un libellé court peut être dérivé du titre) ;
  - `files[]`.
- **Fichiers d'un parcours** : chaque entrée de `files[]` porte :
  - `file`, un chemin relatif à `public/media/`, à préfixer par `import.meta.env.BASE_URL` + `media/` ;
  - `lang`, `theme` (`light` / `dark`), `device` (`desktop` / `mobile`) ;
  - `format` (`png`, `mp4`, `webm`) et `step` ;
  - `caption` et `alt`, en trois langues.
- **Choix d'un fichier** :
  1. On garde la langue de la page. À défaut, on se rabat sur `fr`.
  2. On garde l'appareil choisi par la bascule.
  3. Pour le thème, on propose les deux variantes via `<picture>` et `prefers-color-scheme` pour les images. Pour les vidéos, on choisit au clic selon `matchMedia('(prefers-color-scheme: dark)')`. Ce choix ne se fait jamais pendant le pré-rendu.
- **Vidéos et image d'aperçu** :
  - Une vidéo peut ne pas avoir de `theme`, ni de `device` ; elle vaut alors pour tous.
  - S'il existe une vidéo MP4 ou WebM pour le parcours, elle est proposée à la lecture.
  - L'image d'aperçu (`poster`) est la première capture PNG du parcours qui correspond à la langue, à l'appareil et au thème clair.
- **Phrase de bénéfice** : elle se trouve dans les traductions du site, sous la clé `gallery.<id>`, et s'appuie sur `publicity.md`. Un parcours sans clé affiche la `caption` de sa première capture.
- **Champ `items[]`** : les emplacements simples comme `hero` continuent d'utiliser `items[]` (`slot`, `lang`, `file`, `alt`), sans changement.
- **Manifeste absent ou sans parcours** : la section et les liens « Voir en images » ne sont pas rendus.

## Règles

- **Rayons** :
  - cartes : 16 px ;
  - carte de prix et bandeau de contact : 24 px ;
  - boutons : 10 à 14 px ;
  - pastilles d'icône : 12 px pour les carrées (14 px pour celles de 56 px de l'équipe), 50 % pour les rondes.
- Zones cliquables d'au moins 44 px de haut.
- Aucune ombre sauf sur l'aperçu de l'application et les cadres de la galerie (`0 24px 60px rgba(14,27,44,.12)`), et sur la carte de prix (`0 24px 60px rgba(14,27,44,.08)`).
- Aucun chiffre inventé dans les illustrations : barres et blocs neutres uniquement. Les illustrations sont toujours légendées comme illustratives.
- Pas de dégradés, pas d'emoji, pas de cartes à bordure gauche colorée.
- La mise en page s'adapte par `flex-wrap` et des grilles `auto-fit`, sans défilement horizontal à 390 px.
