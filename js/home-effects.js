/**
 * Home page only: inverted cursor follower.
 * Skips touch devices and prefers-reduced-motion.
 */
(function () {
  if (!document.body.classList.contains('page-home')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var cursorEl = document.getElementById('cursorInvertFollower');
  if (!cursorEl) return;

  document.documentElement.classList.add('home-cursor-fx');

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

  document.querySelectorAll('.skill-card, .work-preview-cell').forEach(function (el) {
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
})();
