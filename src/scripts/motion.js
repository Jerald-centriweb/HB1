// Honey Badgers — premium motion layer.
// Lenis smooth/momentum scroll + GSAP ScrollTrigger for an Apple-grade,
// scroll-driven experience. Loads on top of hb.js.
//
// VIDEO FILE LOCATIONS (drop these files and they auto-activate):
//   /public/assets/video/hero.mp4       — hero background honey-flow video
//   /public/assets/video/hero.webm      — WebM fallback
//   /public/assets/video/transition.mp4  — product-transition between #range and #fury
//   /public/assets/video/transition.webm — WebM fallback

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.innerWidth <= 900;

// ── Lenis: momentum-scroll base ──────────────────────────────────────────────
if (!reduce) {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Smooth anchor navigation (skip enquiry CTAs — those open the modal).
  document.querySelectorAll('a[href^="#"]:not([data-enquire])').forEach((a) => {
    a.addEventListener('click', (e) => {
      const sel = a.getAttribute('href');
      if (sel.length > 1) {
        const el = document.querySelector(sel);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -70 });
        }
      }
    });
  });

  // Pause momentum while enquiry modal is open.
  const modal = document.getElementById('hb-modal');
  if (modal) {
    new MutationObserver(() => {
      modal.style.pointerEvents === 'auto' ? lenis.stop() : lenis.start();
    }).observe(modal, { attributes: true, attributeFilter: ['style'] });
  }
}

// ── matchMedia context (desktop + motion-ok) ─────────────────────────────────
gsap.matchMedia().add(
  '(min-width: 901px) and (prefers-reduced-motion: no-preference)',
  () => {

    // ── 1. HERO JAR: scroll-scrubbed scale + lift ──────────────────────────
    const img = document.getElementById('hb-scene-img');
    const scene = document.querySelector('.hb-scene');
    if (img && scene) {
      gsap.fromTo(
        img,
        { scale: 1, y: 0 },
        {
          scale: 1.14,
          y: -34,
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        }
      );
    }

    // ── 2. HERO honeycomb pattern: deeper parallax layer ───────────────────
    // The honeycomb BG is position:absolute data-parallax="0.45" handled by
    // hb.js's rAF loop. Here we add a second, faster GSAP-driven one for the
    // radial-gradient overlay so the two layers separate in depth.
    if (scene) {
      const bgLayers = scene.querySelectorAll('[data-parallax]');
      bgLayers.forEach((layer) => {
        // GSAP owns this element's transform now — hb.js's rAF parallax skips it.
        layer.dataset.gsapParallax = '1';
        const speed = parseFloat(layer.getAttribute('data-parallax')) || 0.3;
        gsap.to(layer, {
          yPercent: speed * -18,
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }

    // ── 3. TRUST STRIP: slide-in from left with stagger ───────────────────
    const trustSection = document.querySelector('.hb-trust');
    if (trustSection) {
      const trustCells = trustSection.querySelectorAll('[data-reveal]');
      gsap.fromTo(
        trustCells,
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trustSection,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // ── 4. RANGE: jar image parallax + section entrance ───────────────────
    const rangeSection = document.getElementById('range');
    const featStage = rangeSection?.querySelector('.hb-feature-stage');
    if (featStage) {
      gsap.fromTo(
        featStage,
        { y: 40 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: rangeSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }

    // ── 5. FURY: carton entrance + parallax at a different depth ──────────
    const furySection = document.getElementById('fury');
    const furyImg = furySection?.querySelector('img[src*="fury-carton"]');
    if (furyImg && furySection) {
      // Carton floats up faster than the copy, creating depth.
      gsap.fromTo(
        furyImg,
        { y: 60, scale: 0.96 },
        {
          y: -20,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: furySection,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }

    // ── 6. COMPARISON CARDS: pinch-in stagger ─────────────────────────────
    const compareSection = document.querySelector('.hb-compare');
    if (compareSection) {
      const cards = compareSection.querySelectorAll('[data-reveal]');
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.94, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: compareSection,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // ── 7. QUALITY / CERTS: sweep-up with slower parallax ambiance ────────
    const qualitySection = document.getElementById('quality');
    if (qualitySection) {
      const ambientGlow = qualitySection.querySelector('[data-parallax]');
      if (ambientGlow) {
        ambientGlow.dataset.gsapParallax = '1';
        gsap.to(ambientGlow, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: qualitySection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }

    // ── 8. TRACEABILITY STEPPER: sequential reveal along the line ─────────
    const traceSection = document.querySelector('.hb-trace');
    if (traceSection) {
      const steps = traceSection.querySelectorAll(':scope > div');
      gsap.fromTo(
        steps,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: traceSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // ── 9. FINAL CTA: dramatic lift-in ────────────────────────────────────
    const enquireSection = document.getElementById('enquire');
    if (enquireSection) {
      const inner = enquireSection.querySelector('[data-reveal]');
      if (inner) {
        gsap.fromTo(
          inner,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: enquireSection,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }

    // ── 10. FULL-BLEED NATURE BACKGROUNDS: scroll parallax (depth) ──────────
    // Each .hb-natbg-inner is over-sized (inset:-9% 0), so drifting it never
    // reveals an edge. The image glides slower than the copy = a sense of depth
    // and forward motion as you scroll.
    document.querySelectorAll('.hb-natbg-inner').forEach((inner) => {
      const sec = inner.closest('section');
      if (!sec) return;
      gsap.fromTo(
        inner,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
  }
); // end gsap.matchMedia desktop

// ── HERO: staggered, blur-in intro on load (modern app-like entrance) ─────────
if (!reduce) {
  const heroContent = document.querySelector('.hb-hero-content');
  if (heroContent) {
    gsap.from(heroContent.children, {
      opacity: 0,
      y: 36,
      filter: 'blur(10px)',
      duration: 1.1,
      stagger: 0.13,
      ease: 'power3.out',
      delay: 0.2,
    });
  }
}

// ── SCROLL PROGRESS BAR (thin gold thread at the top) ─────────────────────────
(function () {
  const bar = document.createElement('div');
  bar.id = 'hb-progress';
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText =
    'position:fixed;top:0;left:0;height:2px;width:100%;transform-origin:0 50%;transform:scaleX(0);' +
    'z-index:400;background:linear-gradient(90deg,#c8922f,#f3cd6b);box-shadow:0 0 12px rgba(243,205,107,.55);pointer-events:none;';
  document.body.appendChild(bar);
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? window.scrollY / h : 0;
    bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, p)) + ')';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();

// ── COUNT-UP: numeric stats tick up when they scroll into view ────────────────
if (!reduce) {
  const countUp = (el) => {
    const raw = (el.textContent || '').trim();
    const m = raw.match(/^(\D*)(\d[\d,]*)(.*)$/); // "829+" -> 829, "100%" -> 100; "EVERY" -> skip
    if (!m) return;
    const pre = m[1], target = parseInt(m[2].replace(/,/g, ''), 10), suf = m[3];
    const o = { v: 0 };
    gsap.to(o, {
      v: target,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = pre + Math.round(o.v) + suf; },
    });
  };
  ScrollTrigger.batch('[data-count]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => els.forEach(countUp),
  });
}

// ── TRACEABILITY STEPPER: the connector line draws in left-to-right ───────────
if (!reduce) {
  const traceLine = document.querySelector('.hb-trace-line');
  if (traceLine) {
    gsap.fromTo(
      traceLine,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'power2.out',
        duration: 1.2,
        scrollTrigger: { trigger: '.hb-trace', start: 'top 80%', once: true },
      }
    );
  }
}

// Pointer-reactive micro-interactions removed for a restrained, high-end feel. Motion is scroll-driven only.

// ── Recalculate trigger positions once fonts/images settle ───────────────────
window.addEventListener('load', () => ScrollTrigger.refresh());

// ── AMBIENT BACKGROUND VIDEOS (hero + quality) ───────────────────────────────
// Muted autoplay loops — they just play, no on/off control. Paused under
// reduced-motion and on small screens (saves data/battery); the still poster
// carries those cases.
(function () {
  const vids = ['hb-hero-video', 'hb-quality-video']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const qualityVeil = document.getElementById('hb-quality-veil');
  function apply() {
    const on = !reduce && window.innerWidth > 900;
    vids.forEach((v) => {
      if (on) {
        v.style.display = '';
        v.muted = true;
        v.loop = true;
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        v.pause();
        v.style.display = 'none';
      }
    });
    if (qualityVeil) qualityVeil.style.display = on ? '' : 'none';
  }
  vids.forEach((v) =>
    v.addEventListener('error', () => { v.style.display = 'none'; }, { once: true })
  );
  apply();
  window.addEventListener('resize', apply);
  window.addEventListener('load', apply);
})();
