# Guide d’apprentissage

Ce guide accompagne le code du portfolio. Lis-le avec le serveur local lancé pour voir immédiatement l’effet de tes modifications.

## 1 — Architecture du projet

React assemble l’interface à partir de fonctions qui décrivent ce qui doit s’afficher. Vite lance un serveur de développement et met la page à jour quand tu enregistres un fichier. Il prépare également les fichiers finaux avec `npm run build`.

Commence par `index.html`, qui contient le point de montage `root`. `src/main.jsx` y affiche `App`, puis assemble la navigation et les sections. `src/data/portfolio.js` alimente les composants avec le contenu. `ARCHITECTURE.md` donne le détail des dossiers et les commandes de lancement.

## 2 — Composants React

Un composant est une fonction dont le résultat est du JSX, une syntaxe qui ressemble au HTML. Un composant commence par une majuscule. Il reçoit des données appelées *props*. Dans `Work.jsx`, la liste des projets fournit le projet et sa position à chaque `FeaturedProject`.

```jsx
{projects.map((project, index) => (
  // key permet à React d’identifier cette réalisation dans la liste.
  <FeaturedProject key={project.id} project={project} index={index} />
))}
```

`FeaturedProject` réutilise ensuite `ProjectMedia` pour afficher la capture et `Technologies` pour lister les outils. `Navigation` conserve avec `useState` l’état ouvert ou fermé qui alimente `aria-expanded`. Sa référence `useRef` donne accès à la boîte de dialogue native.

## 3 — CSS et Tailwind

Le projet utilise CSS directement. Ouvre `src/styles/site.css`. Au début, `:root` centralise la palette et les dimensions. Les blocs de styles suivants correspondent aux sections. En bas, les règles `@media` adaptent les grilles et le menu à la taille de l’écran.

```css
:root {
  --accent: #56d8c5; /* Bouton principal, point du nom et fond du contact */
  --display: 'Barlow Condensed', Impact, sans-serif; /* Titres */
}
```

La police Manrope sert aux textes de lecture. Barlow Condensed est importée dans `main.jsx`. Pour modifier la composition, repère une classe dans le JSX, par exemple `hero-stage`, puis cherche-la dans la feuille de styles.

## 4 — GSAP et ScrollTrigger

GSAP fait varier des propriétés dans le temps. `gsap.from()` décrit leur état de départ. Le navigateur connaît leur état d’arrivée grâce au CSS. Une `timeline` permet de placer plusieurs animations les unes par rapport aux autres.

Dans `src/animations/usePortfolioMotion.js`, le prénom sort du masque à partir de 0,06 seconde. Le masque est un conteneur CSS qui coupe ce qui dépasse.

```js
opening.from(firstName, {
  yPercent: 105,          // Départ juste sous la zone visible
  duration: 0.68,         // Durée en secondes
  clearProps: 'transform' // Nettoie la transformation à la fin
}, 0.06);                 // Position dans la timeline
```

ScrollTrigger relie une animation à une position de défilement. Pour un titre, `start: 'top 94%'` signifie que son conteneur déclenche le mouvement lorsque son bord haut arrive à 94 % de la hauteur de l’écran. `once: true` évite de relancer l’entrée à chaque passage. Avec `scrub: true`, la progression de l’animation suit celle du défilement. `pin` garde temporairement l’index des chapitres à l’écran.

Pour ralentir l’entrée du prénom, change `duration` de `0.68` à `0.9`. Pour décaler son départ, modifie le dernier nombre. `gsap.matchMedia()` adapte les effets à la largeur et à la préférence de mouvement. Le nettoyage `media.revert()` retire les animations et leurs déclencheurs lorsque React démonte le composant.

## 5 — Bibliothèques complémentaires

Lucide React fournit les icônes sous forme de composants. Par exemple, `ArrowUpRight` matérialise une ouverture. Quand un texte explique déjà l’action, `aria-hidden="true"` évite que l’icône soit annoncée séparément. Fontsource fournit la police Barlow Condensed avec les dépendances locales. Le navigateur gère le défilement, les ancres et les boîtes de dialogue.

## 6 — Mettre à jour mes projets

Ajoute une entrée à `gallery` dans `src/data/portfolio.js`. Utilise un identifiant unique et renseigne les champs `name`, `type`, `description`, `tech` et `role`. Ajoute `url` si tu disposes d’un lien vérifié. Pour un visuel, ajoute trois fichiers WebP de 360, 720 et 1440 pixels de large dans `public/assets`, puis indique leur nom commun dans `image`.

```js
{
  id: 'mon-projet',
  name: 'Mon projet',
  type: 'Projet personnel',
  description: 'Décris le besoin auquel le projet répond.',
  image: 'mon-projet', // Charge mon-projet-360.webp, -720.webp ou -1440.webp.
  tech: ['JavaScript'],
  role: 'Décris ta contribution réelle.',
}
```

La liste `projects` pilote les trois projets phares. `shipped` décrit les fonctions réalisées. Pour Ligue 1 Live, `refresh` explique l’actualisation des scores. `mobileImage` ajoute le visuel de téléphone au thème Evolift.

## 7 — Présenter le projet à un recruteur

Tu peux t’appuyer sur cette trame et l’adapter à ce que tu as réellement fait.

- « Le portfolio est une page React qui lit ses projets et mon parcours dans un fichier de données. Vite la sert en développement et la compile pour le navigateur. »
- « React permet de réutiliser la présentation des projets. GSAP orchestre le générique et ScrollTrigger relie certaines animations à la lecture. »
- « Le défi du prototype était de rendre le défilement expressif tout en conservant une lecture claire. L’index reste visible pendant les chapitres sur grand écran et le récit reprend une disposition verticale sur mobile. »
- « Le menu et les fiches utilisent des dialogues natifs. On peut les ouvrir au clavier, les fermer avec Échap et retrouver le bouton d’origine. Le site tient compte de la préférence de mouvement réduit. »
- « Codex a produit ce prototype à partir de mon brief. Voici le composant, la donnée et le style que j’ai étudiés, ainsi que les modifications que je peux expliquer. »

## 8 — Cinq exercices pratiques

1. **Changer une couleur.** Modifie `--accent` dans `site.css`. Vérifie la lisibilité du bouton principal, du point du nom et du texte de contact.
2. **Modifier une animation.** Passe `duration: 0.68` à `duration: 0.9` pour le prénom. Recharge et compare avec le nom de famille.
3. **Créer une action.** Dans `Opening.jsx`, ajoute un lien `<a className="button" href="#contact">Me contacter</a>` après le bouton des projets. Teste-le au clavier.
4. **Ajouter une fiche.** Utilise l’exemple du chapitre 6 pour un projet réel. Vérifie que sa fiche affiche les technologies et que le focus revient après Échap.
5. **Déplacer un déclencheur.** Remplace `top 94%` par `top 80%` sur les titres. Observe à quel moment ils entrent. Active ensuite la préférence de mouvement réduit et vérifie que tous les titres restent visibles.
