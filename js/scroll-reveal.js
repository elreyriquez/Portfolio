/**
 * IntersectionObserver-driven scroll reveals for elements with .scroll-reveal.
 * Skips nodes inside a closed .detail-panel (display:none) until the panel opens.
 */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function inClosedDetailPanel(el) {
    var panel = el.closest('.detail-panel');
    return !!(panel && !panel.classList.contains('is-visible'));
  }

  function inHiddenTabPanel(el) {
    var tab = el.closest('.tab-content-panel');
    return !!(tab && !tab.classList.contains('is-visible'));
  }

  function shouldSkip(el) {
    return inClosedDetailPanel(el) || inHiddenTabPanel(el);
  }

  function markRevealed(el) {
    el.classList.add('is-revealed');
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        markRevealed(el);
        observer.unobserve(el);
      });
    },
    { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
  );

  function observeIfNeeded(el) {
    if (!el.classList.contains('scroll-reveal') || el.classList.contains('is-revealed')) return;
    if (reduced) {
      markRevealed(el);
      return;
    }
    if (shouldSkip(el)) return;
    observer.observe(el);
  }

  function scan() {
    document.querySelectorAll('.scroll-reveal').forEach(observeIfNeeded);
  }

  function onPanelToggle() {
    requestAnimationFrame(function () {
      requestAnimationFrame(scan);
    });
  }

  document.querySelectorAll('.detail-panel').forEach(function (panel) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class') onPanelToggle();
      });
    }).observe(panel, { attributes: true, attributeFilter: ['class'] });
  });

  /* FX Sesh UI/UX tabs use display:none on inactive panel */
  document.querySelectorAll('.tab-content-panel').forEach(function (tab) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class') onPanelToggle();
      });
    }).observe(tab, { attributes: true, attributeFilter: ['class'] });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }
})();
