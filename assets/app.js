const root = document.getElementById('adrien-dennis');
const menu = document.getElementById('dn-menu');
const menuButton = root.querySelector('.dn-menu-button');
const themeButton = root.querySelector('.dn-theme');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', theme === 'nuit' ? 'Passer en mode jour' : 'Passer en mode nuit');
  document.documentElement.style.background = theme === 'nuit' ? '#102c35' : '#eeeae1';
}
let theme = 'nuit';
try { theme = localStorage.getItem('adrien-theme') === 'jour' ? 'jour' : 'nuit'; } catch {}
setTheme(theme);
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'nuit' ? 'jour' : 'nuit';
  setTheme(next);
  try { localStorage.setItem('adrien-theme', next); } catch {}
});
menuButton.addEventListener('click', () => {
  menu.showModal();
  menuButton.setAttribute('aria-expanded', 'true');
});
root.querySelector('.dn-close').addEventListener('click', () => menu.close());
menu.addEventListener('close', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.focus();
});
menu.addEventListener('click', event => { if (event.target === menu && event.clientX < menu.getBoundingClientRect().left) menu.close(); });
root.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  if (menu.open) menu.close();
}));
let frame;
root.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch' || reducedMotion.matches) return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    root.style.setProperty('--dn-name-x', (event.clientX / innerWidth - .5) * 18 + 'px');
    root.style.setProperty('--dn-photo-x', -(event.clientX / innerWidth - .5) * 10 + 'px');
  });
});
root.addEventListener('pointerleave', () => {
  cancelAnimationFrame(frame);
  root.style.setProperty('--dn-name-x', '0px');
  root.style.setProperty('--dn-photo-x', '0px');
});

// One frame per scroll update; the gradients themselves remain static.
let scrollFrame;
function updateScrollLights() {
  if (reducedMotion.matches) return;
  const distance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const progress = Math.min(1, Math.max(0, scrollY / distance));
  root.style.setProperty('--dn-halo-offset', scrollY + 'px');
  root.style.setProperty('--dn-halo-mint', progress * 38 + 'vw');
  root.style.setProperty('--dn-halo-peach', -progress * 38 + 'vw');
}
function scheduleScrollLights() {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(updateScrollLights);
}
addEventListener('scroll', scheduleScrollLights, { passive: true });
addEventListener('resize', scheduleScrollLights);
reducedMotion.addEventListener('change', scheduleScrollLights);
updateScrollLights();
