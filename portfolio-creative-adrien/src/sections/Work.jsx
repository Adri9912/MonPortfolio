import { useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { ProjectMedia, Technologies } from '../components/ProjectMedia';
import { gallery, projects } from '../data/portfolio';

function FeatureVisual({ project }) {
  const action = project.url ? 'Voir le projet' : 'Voir le code';

  return (
    <a className="feature-visual" href={project.url || project.source} target="_blank" rel="noopener" aria-label={`${action} · ${project.name}`} data-image-reveal>
      <div className="project-screen" data-image-depth>
        <ProjectMedia project={project} sizes="(min-width: 1024px) 65vw, 90vw" />
      </div>
      {project.mobileImage && (
        <div className="device" data-device-depth>
          <img src={project.mobileImage} alt={`Capture mobile de ${project.name}`} loading="lazy" decoding="async" />
        </div>
      )}
    </a>
  );
}

function FeaturedProject({ project }) {
  return (
    <article className="feature" id={project.id} data-theme={project.theme}>
      <header className="feature-heading">
        <h3 className="mask"><span data-scroll-title>{project.name}</span></h3>
        <span className="meta feature-type">{project.type}</span>
      </header>
      <FeatureVisual project={project} />
      <div className="feature-copy">
        <div>
          <p className="feature-lead">{project.description}</p>
          <Technologies items={project.tech} />
          <div className="link-row">
            <a className="button button-accent project-cta" href={project.url || project.source} target="_blank" rel="noopener">
              {project.url ? 'Voir le projet' : 'Voir sur GitHub'} <ArrowUpRight aria-hidden="true" />
            </a>
            {project.url && <a className="text-link" href={project.source} target="_blank" rel="noopener">Voir le code <ArrowUpRight aria-hidden="true" /></a>}
          </div>
        </div>
        <dl className="feature-facts">
          <div><dt>Mon rôle</dt><dd>{project.role}</dd></div>
          <div><dt>Réalisé</dt><dd>{project.shipped}</dd></div>
          {project.refresh && <div><dt>Actualisation</dt><dd>{project.refresh}</dd></div>}
        </dl>
      </div>
    </article>
  );
}

function GalleryEntry({ project }) {
  const dialog = useRef(null);
  const titleId = `fiche-${project.id}`;

  return (
    <>
      <button className="gallery-entry" aria-haspopup="dialog" onClick={() => dialog.current.showModal()}>
        <span className="gallery-image">
          {project.image ? <ProjectMedia project={project} sizes="(min-width: 681px) 45vw, 92vw" /> :
            <span className="game-poster" aria-hidden="true"><span>{project.name}</span><small>RPG · Java</small></span>}
        </span>
        <span className="gallery-caption">
          <span><strong>{project.name}</strong><small>{project.type}</small></span>
          <ArrowUpRight aria-hidden="true" />
        </span>
      </button>
      <dialog className="project-dialog" ref={dialog} aria-labelledby={titleId}>
        <div className="dialog-top">
          <h3 id={titleId}>{project.name}</h3>
          <button className="icon-button" aria-label="Fermer la fiche" onClick={() => dialog.current.close()}><X aria-hidden="true" /></button>
        </div>
        <p className="meta">{project.type}</p>
        <p>{project.description}</p>
        <Technologies items={project.tech} />
        {project.role && <p>{project.role}</p>}
        {project.url && <a className="button" href={project.url} target="_blank" rel="noopener">Voir le projet <ArrowUpRight aria-hidden="true" /></a>}
      </dialog>
    </>
  );
}

export function Work() {
  return (
    <>
      <section className="work" id="projets" aria-labelledby="projets-title">
        <div className="page-contours" aria-hidden="true" />
        <div className="wrap">
          <h2 className="display mask" id="projets-title"><span data-scroll-title>Projets choisis<span>.</span></span></h2>
          <nav className="project-index" aria-label="Accès direct aux projets">
            {projects.map(project => <a key={project.id} href={`#${project.id}`}>{project.name}</a>)}
          </nav>
          <div className="feature-list">
            {projects.map(project => <FeaturedProject key={project.id} project={project} />)}
          </div>
        </div>
      </section>
      <section className="gallery" aria-labelledby="galerie-title">
        <div className="page-contours" aria-hidden="true" />
        <div className="wrap">
          <h2 className="display" id="galerie-title">Autres projets<span>.</span></h2>
          <div className="gallery-grid">
            {gallery.map(project => <GalleryEntry key={project.id} project={project} />)}
          </div>
        </div>
      </section>
    </>
  );
}
