// Honey Badgers — interaction layer.
// Scroll, reveal, modal, responsive and the MGO selector. Product content comes
// from the shared content module so copy lives in one place.

import { site } from '../data/site.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const nav = document.getElementById('hb-nav');
const drawer = document.getElementById('hb-drawer');
const modal = document.getElementById('hb-modal');
const modalCard = document.getElementById('hb-modal-card');
const sceneImg = document.getElementById('hb-scene-img');
const scrollHint = document.getElementById('hb-scroll-hint');
const meter = document.getElementById('hb-meter');
const featImg = document.getElementById('hb-feat-img');
const featBadge = document.getElementById('hb-feat-badge');
const featBadgeNum = document.getElementById('hb-feat-badge-num');
const featBadgeTag = document.getElementById('hb-feat-badge-tag');
const featNum = document.getElementById('hb-feat-num');
const featName = document.getElementById('hb-feat-name');
const featDesc = document.getElementById('hb-feat-desc');
const rail = document.getElementById('hb-rail');
const atmos = document.getElementById('hb-atmos');

// ---- preset tweaks (baked from the Pure Dark / Radiant / Bold defaults) ----
const motionMul = 1; // Bold
function applyTweaks() {
  if (atmos) {
    atmos.style.background = 'transparent';
    atmos.style.opacity = '0';
  }
  $$('[data-glow]').forEach((el) => {
    el.style.opacity = '1'; // Radiant
  });
}
applyTweaks();

// ---- nav drawer ----
let navOpen = false;
function setNav(open) {
  navOpen = open;
  if (drawer) drawer.style.transform = open ? 'translateX(0)' : 'translateX(105%)';
}
const burger = $('.hb-burger');
if (burger) burger.addEventListener('click', () => setNav(!navOpen));
$$('[data-close-nav]').forEach((a) => a.addEventListener('click', () => setNav(false)));

// ---- enquiry modal ----
const enquireProductSel = document.getElementById('hb-enquire-product');
const enquireNameInput = document.getElementById('hb-enquire-name');
const enquireEmailInput = document.getElementById('hb-enquire-email');
const enquireRoleSel = document.getElementById('hb-enquire-role');
const enquireMessageTA = document.getElementById('hb-enquire-message');
const modalSendLink = document.getElementById('hb-modal-send');

function setEnquire(open, product) {
  if (!modal || !modalCard) return;
  if (open) {
    if (product && enquireProductSel) {
      const opts = Array.from(enquireProductSel.options);
      const match = opts.find((o) => o.text === product);
      if (match) enquireProductSel.value = match.value;
    }
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modalCard.style.transform = 'none';
    modalCard.style.opacity = '1';
    setNav(false);
  } else {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    modalCard.style.transform = 'translateY(26px) scale(.97)';
    modalCard.style.opacity = '0';
  }
}
$$('[data-enquire]').forEach((el) =>
  el.addEventListener('click', (e) => {
    e.preventDefault();
    setEnquire(true, el.getAttribute('data-enquire-product') || 'General enquiry');
  })
);

// ---- send enquiry: build mailto on click ----
if (modalSendLink) {
  modalSendLink.addEventListener('click', () => {
    const name = enquireNameInput ? enquireNameInput.value.trim() : '';
    const email = enquireEmailInput ? enquireEmailInput.value.trim() : '';
    const product = enquireProductSel ? enquireProductSel.value : '';
    const role = enquireRoleSel ? enquireRoleSel.value : '';
    const message = enquireMessageTA ? enquireMessageTA.value.trim() : '';
    const subject = 'Enquiry: ' + product;
    const body = [
      'Name: ' + (name || '(not provided)'),
      'Email: ' + (email || '(not provided)'),
      'Role: ' + role,
      'Product: ' + product,
      '',
      message,
    ].join('\n');
    const base = modalSendLink.href.split('?')[0];
    modalSendLink.href = base + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}
$$('[data-close-enquire]').forEach((el) =>
  el.addEventListener('click', () => setEnquire(false))
);
if (modalCard) modalCard.addEventListener('click', (e) => e.stopPropagation());
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setEnquire(false);
});

// ---- sticky-scene product ----
// The hero jar's scroll-scrub (scale + lift) is owned by motion.js (GSAP
// ScrollTrigger) for a smoother, Apple-grade feel. `scenes` stays defined as a
// no-op hook so the scroll loop below is unchanged.
const scenes = [];

// ---- scroll: nav state + parallax + scene + scroll hint ----
function onScroll() {
  if (nav) {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(8,6,3,.85)';
      nav.style.backdropFilter = 'blur(14px)';
      nav.style.webkitBackdropFilter = 'blur(14px)';
      nav.style.borderBottomColor = 'rgba(216,172,78,.16)';
    } else {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.webkitBackdropFilter = 'none';
      nav.style.borderBottomColor = 'transparent';
    }
  }
  $$('[data-parallax]').forEach((el) => {
    const r = el.getBoundingClientRect();
    const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
    const off = (r.top + r.height / 2 - window.innerHeight / 2) * speed * -0.15 * motionMul;
    el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
  });
  scenes.forEach((s) => s());
  if (scrollHint) scrollHint.style.opacity = window.scrollY > 120 ? '0' : '1';
}
let ticking = false;
const onScrollRAF = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    onScroll();
    ticking = false;
  });
};
window.addEventListener('scroll', onScrollRAF, { passive: true });
window.addEventListener('resize', onScrollRAF, { passive: true });
onScroll();

// ---- reveal-on-scroll cascade ----
$$('[data-reveal]').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(42px) scale(.985)';
  el.style.transition =
    'opacity .9s cubic-bezier(.16,1,.3,1), transform 1.05s cubic-bezier(.16,1,.3,1)';
  el.style.willChange = 'opacity, transform';
});
function showEl(el) {
  let delay = 0;
  const sibs = el.parentElement
    ? Array.from(el.parentElement.children).filter(
        (c) => c.hasAttribute && c.hasAttribute('data-reveal')
      )
    : [];
  const idx = sibs.indexOf(el);
  if (idx > 0) delay = Math.min(idx * 90, 360);
  el.style.transitionDelay = delay + 'ms';
  el.style.opacity = '1';
  el.style.transform = 'none';
}
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        showEl(e.target);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
$$('[data-reveal]').forEach((el) => io.observe(el));
// Fallbacks: reveal anything already in view, and on scroll, in case IO
// doesn't fire in some embedded/scaled contexts.
const revealInView = () => {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  $$('[data-reveal]').forEach((el) => {
    if (parseFloat(getComputedStyle(el).opacity) >= 1) return;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) {
      showEl(el);
      io.unobserve(el);
    }
  });
};
requestAnimationFrame(revealInView);
window.addEventListener('scroll', revealInView, { passive: true });
document.addEventListener('scroll', revealInView, { passive: true, capture: true });
// Safety net: never leave content hidden.
setTimeout(() => $$('[data-reveal]').forEach(showEl), 1600);

// ---- interactive MGO product selector ----
const products = site.range.products;
let selIdx = 3;
const rangeEnquireBtn = document.querySelector('#range a[data-enquire]');
const swap = (el, txt) => {
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = txt;
    el.style.opacity = '1';
  }, 170);
};
function select(idx, setMeter) {
  const p = products[idx];
  if (!p) return;
  selIdx = idx;
  if (rangeEnquireBtn) rangeEnquireBtn.setAttribute('data-enquire-product', 'MGO ' + p.num + ' jar');
  if (featImg) {
    featImg.style.opacity = '0';
    featImg.style.transform = 'scale(.95)';
    setTimeout(() => {
      featImg.src = p.img;
      featImg.style.opacity = '1';
      featImg.style.transform = 'none';
    }, 170);
  }
  swap(featNum, p.num);
  swap(featName, p.name);
  swap(featDesc, p.desc);
  swap(featBadgeNum, p.num);
  swap(featBadgeTag, p.tag);
  if (featBadge) featBadge.style.opacity = p.peak ? '1' : '0';
  if (setMeter && meter) meter.style.right = 100 - p.level + '%';
  if (rail)
    $$('.hb-pick', rail).forEach((b, i) => {
      const on = i === idx;
      b.style.borderColor = on ? '#f3cd6b' : 'transparent';
      b.style.boxShadow = on ? '0 14px 30px -12px rgba(243,205,107,.55)' : 'none';
      b.style.transform = on ? 'translateY(-4px)' : 'none';
    });
}
if (rail)
  $$('.hb-pick', rail).forEach((b) =>
    b.addEventListener('click', () =>
      select(parseInt(b.getAttribute('data-idx'), 10), true)
    )
  );
select(3, false);
if (meter) {
  const mio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          meter.style.right = 100 - products[selIdx].level + '%';
          mio.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  mio.observe(meter);
}

// ---- responsive: collapse layout under 900px ----
const mq = window.matchMedia('(max-width:900px)');
function applyMq() {
  const dn = document.querySelector('.hb-desktop-nav');
  const bg = document.querySelector('.hb-burger');
  if (dn) dn.style.display = mq.matches ? 'none' : 'flex';
  if (bg) bg.style.display = mq.matches ? 'block' : 'none';
  document
    .querySelectorAll('.hb-fury-grid,.hb-trade-grid,.hb-selector,.hb-scene-grid')
    .forEach((g) => {
      if (g.dataset.cols == null)
        g.dataset.cols = g.style.gridTemplateColumns || getComputedStyle(g).gridTemplateColumns;
      g.style.gridTemplateColumns = mq.matches ? '1fr' : g.dataset.cols;
    });
  document.querySelectorAll('.hb-sticky-jar').forEach((j) => {
    j.style.position = mq.matches ? 'static' : 'sticky';
    j.style.height = mq.matches ? '70vh' : '100vh';
  });
  document.querySelectorAll('.hb-panel').forEach((p) => {
    p.style.minHeight = mq.matches ? 'auto' : '';
  });
  document.querySelectorAll('.hb-trust').forEach((g) => {
    g.style.gridTemplateColumns = mq.matches ? '1fr 1fr' : 'repeat(5,1fr)';
  });
  document.querySelectorAll('.hb-trace').forEach((g) => {
    g.style.gridTemplateColumns = mq.matches ? '1fr 1fr 1fr' : 'repeat(5,1fr)';
  });
  document.querySelectorAll('.hb-certs').forEach((g) => {
    g.style.gridTemplateColumns = mq.matches ? '1fr 1fr' : 'repeat(4,1fr)';
  });
  document.querySelectorAll('.hb-compare').forEach((g) => {
    g.style.gridTemplateColumns = mq.matches ? '1fr' : '1fr 1fr';
  });
}
mq.addEventListener('change', applyMq);
applyMq();

// ---- certification badges: swap the text emblem for a real logo if one exists ----
// Drop official logos at /assets/certs/<mark>.png (mgo/haccp/rmp/nz). If a file
// is missing the styled text emblem stays — no broken image, no console error.
$$('.hb-cert-logo').forEach((img) => {
  const mark = img.parentElement ? img.parentElement.querySelector('.hb-cert-mark') : null;
  const fail = () => {
    img.style.display = 'none';
    if (mark) mark.style.display = 'flex';
  };
  // Real badge shows by default; fall back to the text emblem if it fails to load.
  // Handle the case where the error already fired before this script ran.
  if (img.complete && img.naturalWidth === 0) fail();
  else img.addEventListener('error', fail);
});
