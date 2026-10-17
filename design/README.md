# Design du site Gestioo

Ce dossier contient la maquette validée du site, conçue dans Claude Design. Elle **fait foi pour l'apparence** du site : couleurs, typographie, icônes, structure des sections et composants. Les textes, eux, viennent de `publicity.md`, la fiche produit de l'application.

- Maquette source (canvas Claude Design) : https://claude.ai/artifact/S7RtCTYFtS6LcjKvyohP2q
- Export de référence : `maquette/*.dc.html`. Ces fichiers ne sont pas destinés à être servis : ils servent de spécification visuelle.
  - `Main.dc.html` : page d'accueil complète (desktop, fluide).
  - `Mobile.dc.html` : la même page à 390 px de large.
  - `Icon.dc.html` et `Icones.dc.html` : le jeu d'icônes et son usage.

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
| `--bg-alt` | `#F4F6F9` | fond des sections alternées (accueil, points forts, nouveautés) |
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
  - h1 : `clamp(38px, 5.2vw, 64px)`, hauteur de ligne 1.05.
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
| users | `Users` | Parent / membre, module Membres et familles |
| dashboard | `LayoutDashboard` | Président, tableau de bord |
| swiss | `SquarePlus` | Pensé pour la Suisse, sur-titre de l'accueil |
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
| tag | `Tag` | tarifs |
| arrowRight | `ArrowRight` | bouton principal |

**Règle** : chaque nouvel élément de liste, carte ou section reçoit une icône du même style, choisie dans Lucide.

## Structure et composants

La page suit cet ordre. Les fonds alternent blanc et `--bg-alt`, et le contenu est centré dans un conteneur de 1180 px maximum, avec une marge latérale de `clamp(16px, 4vw, 40px)`.

1. **En-tête**
   - logo : pastille accent avec un « G », puis « Gestioo » en Bricolage 800 ;
   - navigation par ancres ;
   - sélecteur de langue FR / DE / EN en pilule, la langue courante sur fond `--ink` ;
   - bouton « Nous contacter » avec icône `Mail`.
2. **Accueil** (fond `--bg-alt`), sur deux colonnes qui passent l'une sous l'autre sur mobile :
   - à gauche :
     - le sur-titre en pilule teintée, avec l'icône `SquarePlus` ;
     - le h1 et le paragraphe d'introduction ;
     - deux boutons : le principal en accent avec `ArrowRight`, le secondaire avec contour `--ink` et `Compass` ;
     - quatre pastilles blanches, chacune avec son icône.
   - à droite : un **aperçu illustratif** de l'application, sans aucun chiffre et légendé comme tel, qui sera remplacé par une vraie capture dès que `public/media/manifest.json` en fournit une.
3. **Profils** : grille de cartes à bordure (`repeat(auto-fit, minmax(320px, 1fr))`). Chaque carte contient :
   - une pastille teintée de 48 px avec l'icône du rôle, suivie du titre ;
   - la ligne « Avant », avec `CircleX` gris et du texte secondaire ;
   - la ligne « Avec Gestioo », avec `CircleCheck` en accent.
4. **Points forts** (fond `--bg-alt`) : cartes blanches sans bordure, chacune avec une pastille ronde de 48 px. La première pastille, « Pensé pour la Suisse », est pleine (fond accent, icône blanche) ; les autres sont teintées.
5. **Modules** : cartes à bordure, chacune avec une pastille de 44 px et le titre, puis une liste dont chaque élément commence par une coche `Check` en accent. Elles sont suivies de l'encadré **« Bon à savoir »**, sur fond `--note-bg` avec l'icône `Info`, présenté en deux colonnes sur desktop.
6. **Assistant IA** : bande `--ink`.
   - À gauche :
     - le sur-titre « Propulsé par Mistral AI » avec `Sparkles` ;
     - quatre points, chacun avec une pastille translucide (`rgba(255,255,255,.08)`) ;
     - la phrase de sécurité, avec `ShieldCheck`.
   - À droite : un **exemple illustratif d'échange**, légendé comme tel. On y voit une bulle utilisateur avec `Mic`, puis la réponse de l'assistant avec une carte récapitulative et les boutons « Confirmer » et « Annuler ».
7. **Confiance et sécurité** : grille avec, pour chaque point, une pastille de 48 px à contour `--ink` contenant l'icône, puis le titre et le texte.
8. **Nouveautés** (fond `--bg-alt`) : une carte par entrée, avec à gauche une pastille ronde accent et `Sparkles` au-dessus de la date (`<time>`), et à droite le titre et le texte.
9. **Contact** : grand bandeau arrondi (24 px) en accent, avec :
   - le titre, le texte et la pilule « Tarifs » avec `Tag` ;
   - à droite, un bouton blanc avec `Mail`.
10. **Pied de page** : le texte, puis « FR · DE · EN » avec `Globe`.

## Règles

- **Rayons** :
  - cartes : 16 px ;
  - boutons : 10 à 14 px ;
  - pastilles d'icône : 12 px pour les carrées, 50 % pour les rondes.
- Zones cliquables d'au moins 44 px de haut.
- Aucune ombre sauf sur l'aperçu de l'application (`0 24px 60px rgba(14,27,44,.12)`).
- Aucun chiffre inventé dans les illustrations : barres et blocs neutres uniquement. Les illustrations sont toujours légendées comme illustratives.
- Pas de dégradés, pas d'emoji, pas de cartes à bordure gauche colorée.
- La mise en page s'adapte par `flex-wrap` et des grilles `auto-fit`, sans défilement horizontal à 390 px.
