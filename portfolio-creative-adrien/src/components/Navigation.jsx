import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { profile } from '../data/portfolio';

const links = [
  ['Mon parcours', '#parcours'], ['Projets', '#projets'], ['Compétences', '#competences'],
];

function ThemeToggle() {
  const [day, setDay] = useState(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.colorMode = day ? 'day' : 'night';
    const pageColor = getComputedStyle(root).getPropertyValue('--page-bg').trim();
    document.querySelector('meta[name="theme-color"]').content = pageColor;
  }, [day]);

  return (
    <button type="button" className="icon-button theme-toggle"
      aria-label="Mode sombre" aria-pressed={!day}
      title={day ? 'Passer en mode sombre' : 'Passer en mode jour'}
      onClick={() => setDay(current => !current)}>
      {day ? <Moon size={19} aria-hidden="true" /> : <Sun size={19} aria-hidden="true" />}
    </button>
  );
}

export function Navigation({ contactPage = false }) {
  const menu = useRef(null);
  const [open, setOpen] = useState(false);
  const sectionLinks = links.map(([label, hash]) => [label, contactPage ? `./${hash}` : hash]);
  const contactLink = './contact.html';

  return (
    <header className="header">
      <a className="skip" href="#contenu">Aller au contenu</a>
      <div className="wrap header-row">
        <div className="header-brand">
          <a className="mark" href={contactPage ? './' : '#haut'}
            aria-label={contactPage ? 'Adrien Calvayrac, retour à l’accueil' : 'Retour en haut de l’accueil'}
            title={contactPage ? 'Retour à l’accueil' : 'Retour en haut'}>AC<span>.</span></a>
          <p className="availability header-availability">{profile.availability}</p>
        </div>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {sectionLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-contact" href={contactLink} aria-current={contactPage ? 'page' : undefined}>Contact <ArrowUpRight size={16} aria-hidden="true" /></a>
          <ThemeToggle />
          <button className="icon-button menu-toggle" aria-label="Ouvrir le menu" aria-expanded={open}
            aria-controls="menu" onClick={() => { menu.current.showModal(); setOpen(true); }}>
            <Menu aria-hidden="true" />
          </button>
        </div>
      </div>
      <dialog className="menu" id="menu" ref={menu} aria-label="Navigation mobile" onClose={() => setOpen(false)}>
        <div className="dialog-top">
          <span className="mark" aria-hidden="true">AC<span>.</span></span>
          <button className="icon-button" aria-label="Fermer le menu" onClick={() => menu.current.close()}><X aria-hidden="true" /></button>
        </div>
        <nav aria-label="Menu mobile">
          {[...sectionLinks, ['Contact', contactLink]].map(([label, href]) => (
            <a key={href} href={href} aria-current={contactPage && href === contactLink ? 'page' : undefined}
              onClick={() => menu.current.close()}>{label}<ArrowUpRight aria-hidden="true" /></a>
          ))}
        </nav>
      </dialog>
    </header>
  );
}
