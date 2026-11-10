export const profile = {
  firstName: 'Adrien',
  lastName: 'Calvayrac',
  location: 'Lyon, France',
  availability: 'Recherche une alternance à partir de janvier 2027',
  email: 'adri.calvay@gmail.com',
  cv: './documents/CV_Adrien_Calvayrac.pdf',
  contactForm: 'https://formspree.io/f/maeewdjg',
  github: 'https://github.com/Adri9912',
  linkedin: 'https://www.linkedin.com/in/adrien-calvayrac-97168914a/',
};

export const chapters = [
  { title: 'Management', heading: 'Faire avancer une équipe.', text: 'Mon Master en Management de Projet et mon expérience en management m’ont appris à organiser le travail, à coordonner une équipe et à garder le cap sur un objectif commun.' },
  { title: 'Reconversion', heading: 'Changer de cap.', text: 'J’ai choisi de me reconvertir dans l’informatique. J’avais envie de passer de la coordination à la construction, et de comprendre comment une idée devient une application.' },
  { title: 'Développement', heading: 'Apprendre en construisant.', text: 'Depuis septembre 2026, je suis en Pré-MSc à Epitech Lyon. Je développe des projets web pour mettre en pratique ce que j’apprends, de l’interface au backend.' },
  { title: 'Création', heading: 'Relier les deux métiers.', text: 'Ce que je veux développer aujourd’hui, ce sont des applications pensées pour leurs utilisateurs et des projets que l’on sait organiser, expliquer et faire avancer en équipe.' },
];

export const projects = [
  {
    id: 'ligue-1-live', name: 'Ligue 1 Live', type: 'Projet personnel',
    description: 'Les matchs, résultats et classements de Ligue 1 au même endroit.',
    image: 'ligue1-live-apercu', mobileImage: './assets/ligue1-live-mobile.webp', tech: ['Vue 3', 'Laravel', 'Tailwind CSS', 'Highlightly'],
    role: 'J’ai conçu l’interface Vue, relié Laravel à l’API Highlightly et mis en place le cache et le rafraîchissement automatique.',
    shipped: 'Calendrier, scores, classement, filtre par club et actualités. Les comptes, les favoris et les rappels dépendent de la configuration.',
    refresh: 'Les données sont rafraîchies automatiquement, plus souvent pendant les matchs. Si l’API est indisponible, les scores cessent de s’actualiser jusqu’au retour des données.',
    url: 'https://ligue1-live.alwaysdata.net/', source: 'https://github.com/Adri9912/Ligue1-live',
  },
  {
    id: 'evolift', name: 'Evolift', type: 'Projet personnel · V1',
    description: 'Un carnet de musculation pour suivre ses séances et sa progression.',
    image: 'evolift-v1-apercu', mobileImage: './assets/evolift-mobile.webp', tech: ['React', 'Vite', 'Tailwind CSS', 'PWA'],
    role: 'J’ai développé la première version, des programmes au suivi des séances.',
    shipped: 'Programmes, historique, graphiques de progression, sauvegarde locale et export.',
    url: 'https://adri9912.github.io/evolift/', source: 'https://github.com/Adri9912/evolift',
  },
  {
    id: 'job-board', theme: 'board', name: 'Job Board', type: 'Epitech · En binôme',
    description: 'Une plateforme de recrutement, de la publication d’une offre à la candidature.',
    image: 'job-board-offres', tech: ['Laravel', 'PHP', 'MySQL', 'HTML/CSS/JS'],
    role: 'En binôme, j’ai créé des routes avec Laravel pour relier le frontend au backend et participé aux tests.',
    shipped: 'Consultation et gestion des offres, candidatures et administration avec des accès par rôle.',
    source: 'https://github.com/Adri9912/Job-Board',
  },
];

export const gallery = [
  {
    id: 'the-last-stand', name: 'The Last Stand', type: 'Projet en cours de réalisation',
    description: 'Un RPG 2D fantasy en Java, développé en équipe. Le jeu est conçu autour de combats au tour par tour entre personnages et ennemis, chacun avec ses compétences.',
    tech: ['Java', 'Programmation orientée objet', 'UML', 'Design patterns'],
  },
  {
    id: 'portfolio-personnel', name: 'Portfolio personnel', type: 'Site personnel',
    description: 'Le site que j’ai conçu pour présenter mes projets, mon parcours et ma recherche d’alternance.',
    image: 'portfolio-v2-apercu', tech: ['HTML', 'CSS', 'JavaScript'],
    role: 'Conception, développement des pages et adaptation mobile.',
    url: 'https://adri9912.github.io/MonPortfolio/ancien/',
  },
];

export const skills = [
  { label: 'Développement', items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'React', 'Java', 'SQL'] },
  { label: 'Outils', items: ['Git', 'GitHub', 'VS Code', 'Maven', 'UML'] },
  { label: 'Gestion de projet', items: ['Planification', 'Organisation', 'Coordination', 'Communication', 'Travail en équipe'] },
];
