import { StrictMode, useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/latin-800.css';
import { Navigation } from './components/Navigation';
import { Hero, Story } from './sections/Opening';
import { Work } from './sections/Work';
import { Skills, Contact } from './sections/Closing';
import { ContactPage } from './sections/ContactPage';
import { usePortfolioMotion } from './animations/usePortfolioMotion';
import './styles/site.css';

function App() {
  const root = useRef(null);
  usePortfolioMotion(root);

  useLayoutEffect(() => {
    const hash = window.location.hash;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled && window.location.hash === hash) {
        target.scrollIntoView({ behavior: 'instant' });
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <div id="haut" ref={root}>
      <Navigation />
      <main id="contenu" tabIndex={-1}>
        <Hero />
        <Story />
        <Work />
        <Skills />
      </main>
      <Contact />
    </div>
  );
}

const mount = document.getElementById('root');
createRoot(mount).render(
  <StrictMode>{mount.dataset.page === 'contact' ? <ContactPage /> : <App />}</StrictMode>
);
