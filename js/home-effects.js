/**
 * Inverted cursor follower (mix-blend-mode: difference).
 * Active on home, AI Enthusiast, and UI/UX pages. Skips coarse pointers only.
 */
(function () {
  function initCursorInvert() {
  var body = document.body;
  if (!body) return;
  var pageOk =
    body.classList.contains('page-home') ||
    body.classList.contains('page-ai') ||
    body.classList.contains('page-uiux');
  if (!pageOk) return;
  /* Do not disable on prefers-reduced-motion: the follower is not vestibular motion. */
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var cursorEl = document.getElementById('cursorInvertFollower');
  if (!cursorEl) return;

  document.documentElement.classList.add('cursor-invert-fx');

  var mx = window.innerWidth * 0.5;
  var my = window.innerHeight * 0.5;
  var cx = mx;
  var cy = my;
  var rafId = null;
  var targetScale = 1;
  var currentScale = 1;
  var HOVER_SCALE = 1.5;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function tick() {
    cx = lerp(cx, mx, 0.14);
    cy = lerp(cy, my, 0.14);
    currentScale = lerp(currentScale, targetScale, 0.2);
    cursorEl.style.transform =
      'translate3d(' + cx + 'px,' + cy + 'px,0) translate(-50%,-50%) scale(' + currentScale + ')';
    rafId = requestAnimationFrame(tick);
  }

  document.addEventListener(
    'mousemove',
    function (e) {
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true }
  );

  document
    .querySelectorAll(
      [
        '.skill-card',
        '.work-preview-cell',
        '.tool-card',
        '.cert-card',
        '.subcard',
        '.workflow-wrap',
        '.case-study-card',
        '.detail-card',
        '.ux-visual-card',
        '.ux-copy-card',
        '.outcome-section',
        '.fxsesh-tech-group',
        '.website-block',
      ].join(',')
    )
    .forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        targetScale = HOVER_SCALE;
      });
      el.addEventListener('mouseleave', function () {
        targetScale = 1;
      });
    });

  rafId = requestAnimationFrame(tick);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!document.hidden && !rafId) {
      rafId = requestAnimationFrame(tick);
    }
  });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursorInvert);
  } else {
    initCursorInvert();
  }
})();
