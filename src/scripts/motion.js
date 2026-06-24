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
  }
); // end gsap.matchMedia desktop

// Pointer-reactive micro-interactions removed for a restrained, high-end feel. Motion is scroll-driven only.

// ── SCROLL-SCRUBBED VIDEO (Apple technique) ───────────────────────────────────
//
// Each video is revealed only after 'loadedmetadata' fires. If the file is
// missing or fails to load the element stays display:none — zero layout shift,
// zero console errors.
//
// ▸ HERO background honey-flow video
//   Drop file at: /public/assets/video/hero.mp4 (and hero.webm)
//   It scrubs via currentTime as the hero section scrolls.
//
// ▸ TRANSITION video between #range and #fury
//   Drop file at: /public/assets/video/transition.mp4 (and transition.webm)
//   Placed in a pinned container; currentTime scrubs as you scroll into #fury.

function initVideoScrub(videoEl, { trigger, start, end, scrub = 1, onReady } = {}) {
  if (!videoEl) return;

  // Keep hidden until metadata loads.
  videoEl.style.display = 'none';
  videoEl.muted = true;
  videoEl.playsInline = true;
  videoEl.preload = 'metadata';

  let st = null;
  let activated = false;

  const activate = () => {
    if (activated) return;         // run once only
    if (!videoEl.duration) return; // safety
    activated = true;
    if (onReady) onReady(videoEl);
    // Subtle ambient loop (no scroll-scrubbing). Visibility + playback are
    // controlled by the preview backdrop toggle (see below).
    videoEl.loop = true;
    videoEl._hbReady = true;
    if (window.__hbApplyBg) window.__hbApplyBg();
    ScrollTrigger.refresh();
  };

  videoEl.addEventListener('loadedmetadata', activate);
  // If metadata already loaded (cached / fast local serve) the event may have
  // fired before this listener attached — activate immediately in that case.
  if (videoEl.readyState >= 1) activate();
  videoEl.addEventListener('error', () => {
    // File missing or corrupt: keep display:none silently.
    videoEl.style.display = 'none';
  }, { once: true });

  return () => { if (st) st.kill(); };
}

// Hero video.
const heroVideo = document.getElementById('hb-hero-video');
if (heroVideo) {
  initVideoScrub(heroVideo, {
    trigger: '.hb-scene',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,
  });
}

// Transition video removed: the mid-page band was intrusive and its scrub was
// the source of the patchy feel. Its markup is gone from index.astro and the
// transition.mp4 file is no longer shipped.

// ── Recalculate trigger positions once fonts/images settle ───────────────────
window.addEventListener('load', () => ScrollTrigger.refresh());

// ── Preview backdrop toggle: show/hide the hero honey video (persisted) ───────
const heroVid = document.getElementById('hb-hero-video');
const bgToggle = document.getElementById('hb-bg-toggle');
const bgLabel = document.getElementById('hb-bg-toggle-label');
const bgDot = document.getElementById('hb-bg-toggle-dot');
// Default the honey backdrop OFF on mobile (save data/battery); desktop on.
// An explicit toggle choice (localStorage) always wins.
const _bgDefault = window.innerWidth <= 900 ? 'off' : 'on';
let bgVideoOn = (localStorage.getItem('hb-bg-video') || _bgDefault) !== 'off';
function applyBg() {
  if (heroVid && heroVid._hbReady) {
    if (bgVideoOn && !reduce) {
      heroVid.style.display = '';
      const p = heroVid.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      heroVid.pause();
      heroVid.style.display = 'none';
    }
  }
  if (bgLabel) bgLabel.textContent = 'BACKDROP: ' + (bgVideoOn ? 'ON' : 'OFF');
  if (bgDot) {
    bgDot.style.background = bgVideoOn ? '#f3cd6b' : '#5a5142';
    bgDot.style.boxShadow = bgVideoOn ? '0 0 8px #f3cd6b' : 'none';
  }
}
window.__hbApplyBg = applyBg;
if (bgToggle) {
  bgToggle.addEventListener('click', () => {
    bgVideoOn = !bgVideoOn;
    localStorage.setItem('hb-bg-video', bgVideoOn ? 'on' : 'off');
    applyBg();
  });
}
applyBg();
