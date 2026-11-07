const root = document.getElementById('adrien-dennis');
const menu = document.getElementById('dn-menu');
const menuButton = root.querySelector('.dn-menu-button');
const themeButton = root.querySelector('.dn-theme');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', theme === 'nuit' ? 'Passer en mode jour' : 'Passer en mode nuit');
  document.documentElement.style.background = theme === 'nuit' ? '#102c35' : '#e2d9c8';
}
let theme = 'nuit';
try { theme = localStorage.getItem('adrien-theme') === 'jour' ? 'jour' : 'nuit'; } catch {}
setTheme(theme);
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'nuit' ? 'jour' : 'nuit';
  setTheme(next);
  try { localStorage.setItem('adrien-theme', next); } catch {}
});
let menuMotion;
const menuEase = 'cubic-bezier(.32,.72,0,1)';
function stopMenuMotion() {
  if (menuMotion) menuMotion.cancel();
  menuMotion = null;
}
function closeMenu(animate = false) {
  stopMenuMotion();
  if (!menu.open) return;
  if (!animate || reducedMotion.matches) { menu.close(); return; }
  menuMotion = menu.animate([
    { clipPath: 'inset(0 0 0 0)', opacity: 1 },
    { clipPath: 'inset(0 0 100% 0)', opacity: 0 }
  ], { duration: 160, easing: menuEase });
  menuMotion.finished.then(() => menu.close(), () => {});
}
menuButton.addEventListener('click', event => {
  stopMenuMotion();
  if (!menu.open) menu.showModal();
  menuButton.setAttribute('aria-expanded', 'true');
  if (!reducedMotion.matches && event.detail > 0) {
    menuMotion = menu.animate([
      { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(-12px)', opacity: .7 },
      { clipPath: 'inset(0 0 0 0)', transform: 'translateY(0)', opacity: 1 }
    ], { duration: 280, easing: menuEase });
  }
});
root.querySelector('.dn-close').addEventListener('click', event => closeMenu(event.detail > 0));
menu.addEventListener('close', () => {
  stopMenuMotion();
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.focus();
});
menu.addEventListener('click', event => {
  if (event.target === menu && event.clientX < menu.getBoundingClientRect().left) closeMenu(true);
});
root.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  if (menu.open) menu.close();
}));
let frame;
root.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch' || reducedMotion.matches) return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    root.style.setProperty('--dn-pointer-x', event.clientX + 'px');
    root.style.setProperty('--dn-pointer-y', (event.clientY + scrollY) + 'px');
    root.style.setProperty('--dn-pointer-visible', '1');
    root.style.setProperty('--dn-name-x', (event.clientX / innerWidth - .5) * 18 + 'px');
    root.style.setProperty('--dn-photo-x', -(event.clientX / innerWidth - .5) * 10 + 'px');
  });
});
root.addEventListener('pointerleave', () => {
  root.style.setProperty('--dn-pointer-visible', '0');
  cancelAnimationFrame(frame);
  root.style.setProperty('--dn-name-x', '0px');
  root.style.setProperty('--dn-photo-x', '0px');
});

// One project follows the reading position on narrow screens; nothing is hidden.
const mobileProjects = matchMedia('(max-width: 760px)');
const projects = [...root.querySelectorAll('.dn-case')];
let projectFrame;
let activeProject = null;
function updateProjectFocus() {
  projectFrame = null;
  let next = null;
  let nearest = Infinity;
  if (mobileProjects.matches && !reducedMotion.matches) {
    const readingLine = innerHeight * .45;
    for (const project of projects) {
      const rect = project.getBoundingClientRect();
      if (rect.bottom < innerHeight * .2 || rect.top > innerHeight * .8) continue;
      const distance = Math.max(rect.top - readingLine, readingLine - rect.bottom, 0);
      if (distance < nearest) { nearest = distance; next = project; }
    }
  }
  if (next === activeProject) return;
  if (activeProject) activeProject.classList.remove('is-reading');
  activeProject = next;
  if (activeProject) activeProject.classList.add('is-reading');
}
function scheduleProjectFocus() {
  if (!projectFrame) projectFrame = requestAnimationFrame(updateProjectFocus);
}
if (projects.length) {
  addEventListener('scroll', scheduleProjectFocus, { passive: true });
  addEventListener('resize', scheduleProjectFocus);
  mobileProjects.addEventListener('change', scheduleProjectFocus);
  reducedMotion.addEventListener('change', scheduleProjectFocus);
  addEventListener('pageshow', scheduleProjectFocus);
  scheduleProjectFocus();
}
