import { ArrowLeft, ArrowUpRight, FileText, Mail, Send } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { profile } from '../data/portfolio';

export function ContactPage() {
  return (
    <>
      <Navigation contactPage />
      <main className="contact-page" id="contenu" tabIndex={-1}>
        <div className="wrap">
          <a className="text-link contact-back" href="./"><ArrowLeft aria-hidden="true" /> Retour à l’accueil</a>
          <h1 className="display">Me contacter<span>.</span></h1>
          <div className="contact-page-grid">
            <section aria-labelledby="contact-details-title">
              <h2 id="contact-details-title">Mes coordonnées</h2>
              <p className="contact-intro">Je recherche une alternance à partir de janvier 2027 en développement web et gestion de projet digital.</p>
              <ul className="contact-details">
                <li><a href={`mailto:${profile.email}`}><Mail aria-hidden="true" /><span>{profile.email}</span></a></li>
                <li><a href={profile.github}><img src="/assets/github.svg" alt="" width="20" height="20" /><span>GitHub</span><ArrowUpRight aria-hidden="true" /></a></li>
                <li><a href={profile.linkedin}><img src="/assets/linkedin.svg" alt="" width="20" height="20" /><span>LinkedIn</span><ArrowUpRight aria-hidden="true" /></a></li>
                <li><a href={profile.cv} target="_blank" rel="noopener"><FileText aria-hidden="true" /><span>Mon CV</span><ArrowUpRight aria-hidden="true" /></a></li>
              </ul>
            </section>
            <section className="contact-form-panel" aria-labelledby="contact-form-title">
              <h2 id="contact-form-title">Envoyer un message</h2>
              <p className="contact-intro">Tous les champs sont obligatoires.</p>
              <form action={profile.contactForm} method="post">
                <div className="contact-field">
                  <label htmlFor="contact-name">Votre nom</label>
                  <input id="contact-name" name="name" autoComplete="name" maxLength={120} required />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Votre adresse e-mail</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-message">Votre message</label>
                  <textarea id="contact-message" name="message" rows={6} maxLength={10000} required />
                </div>
                <button className="button button-accent" type="submit">Envoyer le message <Send aria-hidden="true" /></button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
