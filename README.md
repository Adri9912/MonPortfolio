# Portfolio V2 — Adrien Calvayrac

Prototype responsive basé sur la dernière maquette validée.

## Démarrer

Depuis ce dossier :

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Ouvrir http://127.0.0.1:4173 . Aucun build ni installation.

## Structure

- `index.html` : accueil
- `projets.html` : les trois projets
- `parcours.html` : parcours et technologies
- `contact.html` : contact, liens sociaux et documents
- `assets/style.css` : styles partagés et responsive
- `assets/app.js` : thème mémorisé, menu et mouvements légers
- `assets/images/` et `documents/` : ressources locales

HTML, CSS, JavaScript natif. Les polices Outfit et Manrope sont chargées via Google Fonts, avec des polices système en secours. Icônes de navigation en SVG intégrées ; icônes sociales reprises du portfolio original (licence dans assets/images).

Formulaire de contact natif connecté au même endpoint Formspree que le portfolio initial, avec validation du navigateur (nom, e-mail, message). Le traitement et la confirmation après envoi sont assurés par Formspree. Le lien e-mail direct reste disponible.

Vérifier les liens et documents locaux : `python3 check.py`.
