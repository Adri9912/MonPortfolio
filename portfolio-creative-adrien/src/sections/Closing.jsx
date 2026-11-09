import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profile, skills } from '../data/portfolio';

export function Skills() {
  return (
    <section className="skills" id="competences" aria-labelledby="competences-title">
      <div className="wrap skill-grid">
        <h2 className="display" id="competences-title">Compétences<span>.</span></h2>
        <div>
          {skills.map(({ label, items }) => (
            <div className="skill-row" key={label}>
              <h3>{label}</h3>
              <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 className="mask" id="contact-title"><span data-scroll-title>On en parle<span>?</span></span></h2>
        <div className="contact-actions">
          <p>Un projet web, une alternance ou une conversation sur ce que nous pourrions construire ensemble.</p>
          <a className="button" href="./contact.html">Me contacter <span className="mail-icon"><ArrowUpRight aria-hidden="true" /></span></a>
        </div>
        <div className="contact-footer">
          <a className="text-link social-link" href={profile.github}><img src="/assets/github.svg" width="20" height="20" alt="" /> GitHub</a>
          <a className="text-link social-link" href={profile.linkedin}><img src="/assets/linkedin.svg" width="20" height="20" alt="" /> LinkedIn</a>
          <a className="text-link top-link" href="#haut">Retour en haut <ArrowUp aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
