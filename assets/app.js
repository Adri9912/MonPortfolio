const root = document.getElementById('adrien-dennis');
const menu = document.getElementById('dn-menu');
const menuButton = root.querySelector('.dn-menu-button');
const menuSheet = menu.querySelector('.dn-menu-sheet');
const closeButton = menu.querySelector('.dn-close');
function alignMenuToggle() {
  if (!menu.open) return;
  const trigger = menuButton.getBoundingClientRect();
  const panel = menu.getBoundingClientRect();
  const header = menuButton.closest('header').getBoundingClientRect();
  menu.style.setProperty('--dn-menu-top', Math.max(0, header.bottom) + 'px');
  closeButton.style.left = (trigger.left - panel.left) + 'px';
  closeButton.style.top = (trigger.top - panel.top) + 'px';
  closeButton.style.width = trigger.width + 'px';
  closeButton.style.height = trigger.height + 'px';
}
addEventListener('resize', alignMenuToggle);
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
  if (!menu.open) return;
  const style = getComputedStyle(menuSheet);
  const start = {
    transform: style.transform,
    opacity: style.opacity
  };
  stopMenuMotion();
  if (!animate || reducedMotion.matches) { menu.close(); return; }
  menu.dataset.closing = 'true';
  menuMotion = menuSheet.animate([
    start,
    { transform: 'translateY(-100%)', opacity: 1 }
  ], { duration: 320, easing: menuEase });
  menuMotion.finished.then(() => menu.close(), () => {});
}
menuButton.addEventListener('click', event => {
  stopMenuMotion();
  menu.dataset.animated = String(!reducedMotion.matches && event.detail > 0);
  delete menu.dataset.closing;
  cancelAnimationFrame(frame);
  if (!menu.open) menu.showModal();
  alignMenuToggle();
  menuButton.setAttribute('aria-expanded', 'true');
  if (!reducedMotion.matches && event.detail > 0) {
    menuMotion = menuSheet.animate([
      { transform: 'translateY(-100%)' },
      { transform: 'translateY(0)' }
    ], { duration: 480, easing: menuEase });
  }
});
closeButton.addEventListener('click', event => closeMenu(event.detail > 0));
menu.addEventListener('close', () => {
  stopMenuMotion();
  delete menu.dataset.closing;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.focus({ preventScroll: true });
});
menu.addEventListener('click', event => {
  if (event.target === menu) closeMenu(true);
});
root.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  if (menu.open) menu.close();
}));
let frame;
root.addEventListener('pointermove', event => {
  if (menu.open || event.pointerType === 'touch' || reducedMotion.matches) return;
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
  if (menu.open) return;
  root.style.setProperty('--dn-pointer-visible', '0');
  cancelAnimationFrame(frame);
  root.style.setProperty('--dn-name-x', '0px');
  root.style.setProperty('--dn-photo-x', '0px');
});

// Reading position is independent from animation preferences.
const mobileProjects = matchMedia('(max-width: 760px)');
const projects = [...root.querySelectorAll('.dn-case')];
const projectIndex = root.querySelector('.dn-project-index');
const indexMarker = root.querySelector('.dn-index-marker');
const indexToggle = root.querySelector('.dn-index-toggle');
let projectFrame;
function closeProjectIndex() {
  projectIndex.classList.remove('is-expanded');
  indexToggle.setAttribute('aria-expanded', 'false');
}
function updateProjectFocus() {
  projectFrame = null;
  const compact = mobileProjects.matches && indexMarker.getBoundingClientRect().top <= 8;
  if (!projectIndex.classList.contains('is-compact')) {
    projectIndex.style.setProperty('--dn-index-extra', Math.max(0, projectIndex.offsetHeight - 70) + 'px');
  }
  if (!compact) closeProjectIndex();
  projectIndex.classList.toggle('is-compact', compact);
  const readingLine = Math.max(innerHeight * .4, projectIndex.getBoundingClientRect().bottom + 30);
  let active = projects[0];
  for (const project of projects) {
    if (project.getBoundingClientRect().top <= readingLine) active = project;
  }
  for (const project of projects) {
    project.classList.toggle('is-reading', project === active && !reducedMotion.matches);
  }
  projectIndex.querySelector('.dn-index-current').textContent = active.querySelector('h2').textContent;
  projectIndex.querySelectorAll('a').forEach(link => {
    if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function scheduleProjectFocus() {
  if (!projectFrame) projectFrame = requestAnimationFrame(updateProjectFocus);
}
if (projects.length) {
  indexToggle.addEventListener('click', () => {
    const expanded = indexToggle.getAttribute('aria-expanded') !== 'true';
    projectIndex.classList.toggle('is-expanded', expanded);
    indexToggle.setAttribute('aria-expanded', String(expanded));
  });
  projectIndex.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeProjectIndex(); indexToggle.focus(); }
  });
  projectIndex.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    if (projectIndex.classList.contains('is-compact')) {
      closeProjectIndex();
      document.getElementById(link.hash.slice(1)).focus({ preventScroll: true });
    }
  }));
  addEventListener('scroll', scheduleProjectFocus, { passive: true });
  addEventListener('resize', scheduleProjectFocus);
  mobileProjects.addEventListener('change', scheduleProjectFocus);
  reducedMotion.addEventListener('change', scheduleProjectFocus);
  addEventListener('pageshow', scheduleProjectFocus);
  scheduleProjectFocus();
}
