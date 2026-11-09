import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioMotion(root) {
  useLayoutEffect(() => {
    const select = gsap.utils.selector(root);
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const replay = { start: 'top bottom', end: 'bottom top', toggleActions: 'restart reset restart reset' };
      const [hero] = select('.hero');
      const [firstName, lastName] = select('[data-opening-line]');
      const opening = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { ...replay, trigger: hero },
      });

      opening
        .from(select('[data-opening-image]'), {
          clipPath: 'inset(0 0 100% 0)', duration: 0.88,
        }, 0)
        .from(firstName, { yPercent: 105, duration: 0.68 }, 0.06)
        .from(lastName, { yPercent: 105, duration: 0.73 }, 0.19)
        .from(select('[data-opening-support]'), {
          y: 12, opacity: 0, duration: 0.45,
        }, 0.36);

      for (const title of select('[data-scroll-title]')) {
        gsap.from(title, {
          yPercent: 90, duration: 0.62, ease: 'power3.out',
          scrollTrigger: { ...replay, trigger: title.parentElement },
        });
      }

      for (const visual of select('[data-image-reveal]')) {
        gsap.from(visual, {
          clipPath: 'inset(9% 0 9% 0)', opacity: 0.66, duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { ...replay, trigger: visual },
        });
      }
    });

    media.add('(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
      const [header] = select('.header');
      const [story] = select('[data-story]');
      const [pin] = select('[data-story-pin]');
      const steps = select('[data-story-step]');
      const chapters = select('[data-chapter]');
      const [portrait] = select('[data-hero-depth]');

      ScrollTrigger.create({
        trigger: pin, start: () => `top ${header.offsetHeight + 16}px`, endTrigger: story, end: 'bottom 72%',
        pin, pinSpacing: false,
      });

      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter, start: 'top center', end: 'bottom center',
          onToggle: ({ isActive }) => steps[index].classList.toggle('is-current', isActive),
        });
      });

      gsap.to(portrait, {
        y: 20, scale: 1.1, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      for (const layer of select('[data-image-depth], [data-device-depth]')) {
        gsap.fromTo(layer, { y: 18 }, {
          y: -18, ease: 'none',
          scrollTrigger: { trigger: layer.closest('[data-image-reveal]'), start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }

      return () => steps.forEach(step => step.classList.remove('is-current'));
    });

    media.add('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const [stage] = select('.hero-stage');
      const [name] = select('.hero h1');
      const [camera] = select('[data-hero-camera]');
      const moveName = gsap.quickTo(name, 'x', { duration: 0.35, ease: 'power3.out' });
      const movePortrait = gsap.quickTo(camera, 'x', { duration: 0.5, ease: 'power3.out' });

      function followPointer(event) {
        if (event.pointerType !== 'mouse') return;
        const { left, width } = stage.getBoundingClientRect();
        const position = (event.clientX - left) / width - 0.5;
        moveName(position * -10);
        movePortrait(position * 18);
      }

      function resetPosition() {
        moveName(0);
        movePortrait(0);
      }

      stage.addEventListener('pointermove', followPointer);
      stage.addEventListener('pointerleave', resetPosition);
      return () => {
        stage.removeEventListener('pointermove', followPointer);
        stage.removeEventListener('pointerleave', resetPosition);
      };
    });

    return () => media.revert();
  }, [root]);
}
