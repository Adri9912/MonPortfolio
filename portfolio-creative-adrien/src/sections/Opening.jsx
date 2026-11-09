import { ArrowDown, ArrowDownRight } from 'lucide-react';
import { chapters, profile } from '../data/portfolio';

export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="titre">
      <div className="hero-stage">
        <div className="hero-visual" data-opening-image>
          <div className="hero-camera" data-hero-camera>
            <img src="./assets/adrien-768.webp" srcSet="./assets/adrien-768.webp 768w, ./assets/adrien-1254.webp 1254w"
              sizes="(max-width: 680px) 100vw, 55vw" width="1254" height="1254" fetchPriority="high"
              alt="Portrait d’Adrien Calvayrac" data-hero-depth />
          </div>
        </div>
        <div className="hero-content">
          <h1 id="titre">
            <span className="mask"><span data-opening-line>{profile.firstName}</span></span>{' '}
            <span className="mask"><span data-opening-line>{profile.lastName}<span className="hero-period">.</span></span></span>
          </h1>
          <div className="hero-support" data-opening-support>
            <p className="hero-role">Développement Web<br />&amp; Gestion de Projet Digital</p>
            <p className="hero-description">Étudiant à Epitech Lyon, je développe des applications web et m’appuie sur mon expérience en management de projet.</p>
            <a className="button button-accent" href="#projets">Explorer mes projets <ArrowDownRight aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="hero-footer">
        <p className="availability hero-availability">{profile.availability}</p>
        <span>{profile.location}</span>
        <a href="#parcours">Défiler <ArrowDown size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="story" id="parcours" aria-labelledby="parcours-title" data-story>
      <div className="wrap story-grid">
        <div className="story-aside">
          <div data-story-pin>
            <h2 id="parcours-title" className="display">Mon<br />parcours<span>.</span></h2>
            <ol className="story-index">
              {chapters.map((chapter, index) => (
                <li key={chapter.title} data-story-step>
                  <a href={`#chapitre-${index + 1}`}>{chapter.title}</a>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <ol className="story-chapters">
          {chapters.map((chapter, index) => (
            <li key={chapter.title} className="chapter" id={`chapitre-${index + 1}`} data-chapter>
              <p className="meta chapter-name">{chapter.title}</p>
              <h3 className="mask"><span data-scroll-title>{chapter.heading}</span></h3>
              <p>{chapter.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
