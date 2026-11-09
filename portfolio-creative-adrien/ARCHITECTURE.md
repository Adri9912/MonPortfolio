# Architecture de Portfolio Creative Adrien

## Lancer en local

Avec Node.js 22.12 ou ultérieur, installer les dépendances avec `npm ci`, puis lancer `npm run dev -- --host 127.0.0.1`. Vite affiche l’adresse locale et choisit un autre port si le premier est pris. `npm run build` produit `dist/`. Pour vérifier cette version compilée, lancer `npm run preview -- --host 127.0.0.1`.

## Direction artistique

Le site s’ouvre comme un générique. Le portrait en monochrome est cadré derrière le nom. Le graphite, le papier chaud et le bleu-vert glacier relient le portrait, les chapitres du parcours et le contact. Le montage alterne le parcours clair, trois scènes de projet sur fond sombre et une conclusion bleu-vert. Les trois scènes utilisent des captures réelles, chacune avec une composition liée au projet.

Le récit emprunte le principe des séquences photographiques de [Lando Norris](https://landonorris.com/), la logique d’index d’[Obys](https://obys.agency/), la séparation entre visuel et informations de [Siena Film](https://siena.film/) et le rôle donné au lettrage par [Mat Voyce](https://matvoyce.tv/). Les informations personnelles viennent du brief et du [portfolio existant](https://adri9912.github.io/my-portfolio/index.html).

## Arborescence

```text
index.html                          Entrée du document et métadonnées
vite.config.js                      Configuration du build React
public/
  assets/                           Portrait, captures WebP et police Manrope
  favicon.svg                       Monogramme
src/
  main.jsx                          Monte et assemble la page
  components/
    Navigation.jsx                  Ancres, lien d’évitement et menu mobile
    ProjectMedia.jsx                Images responsives et listes de technologies
  sections/
    Opening.jsx                     Générique et récit en quatre chapitres
    Work.jsx                        Projets phares, galerie et fiches projet
    Closing.jsx                     Compétences et contact
  animations/
    usePortfolioMotion.js           Entrées, découpes, profondeur et chapitre actif
  data/
    portfolio.js                    Profil, parcours, projets et compétences
  styles/
    site.css                        Couleurs, compositions et responsive
```

## Technologies et responsabilités

| Technologie | Rôle dans ce projet |
| --- | --- |
| React | Assemble la page, transforme les données en éléments et suit l’état du menu. |
| Vite | Sert les fichiers pendant le développement et compile la version de production. |
| GSAP et ScrollTrigger | Construisent la séquence du générique et déclenchent ou lient des animations au défilement. |
| CSS | Gère la grille, les dimensions fluides, les styles de focus et les interactions simples. |
| Lucide React | Fournit les icônes de navigation et d’action. |
| Fontsource | Distribue Barlow Condensed en fichiers locaux. |

Le défilement repose sur le navigateur. Sur grand écran, ScrollTrigger fixe temporairement l’index du parcours pendant la lecture. Le contenu conserve son ordre naturel sur téléphone et avec la préférence de mouvement réduit. Le menu et les fiches utilisent `dialog` pour gérer le focus et Échap.

## Origine des visuels

Le portrait et les autres captures de bureau viennent des fichiers du portfolio MonPortfolio. L’aperçu de Ligue 1 Live est une capture de sa [démo publique](https://ligue1-live.alwaysdata.net/). La capture d’Evolift sur téléphone provient de son [application publique](https://adri9912.github.io/evolift/) et est présentée dans un cadre CSS. La couverture typographique de The Last Stand est une composition du site. Une capture du jeu pourra remplacer sa couverture.
