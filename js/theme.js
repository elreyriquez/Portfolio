(function() {
  const STORAGE_KEY = 'portfolio-theme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleLabel();
    document.querySelectorAll('.intro-bg-video').forEach(function (v) {
      v.play().catch(function () {});
    });
  }

  function updateToggleLabel() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', getTheme() === 'dark' ? 'Switch to day mode' : 'Switch to night mode');
    }
  }

  function init() {
    setTheme(getTheme());

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const next = getTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });

    const hamburger = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('nav-open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        hamburger.setAttribute('aria-label', hamburger.classList.contains('active') ? 'Close menu' : 'Open menu');
      });
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          document.body.classList.remove('nav-open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.setAttribute('aria-label', 'Open menu');
        });
      });
    }

    /* SEC quotation site: force new tab (some mobile / overlay cases ignore target="_blank" alone). */
    document.querySelectorAll('a[data-sec-quote-tab][href]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (e.defaultPrevented) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var url = a.getAttribute('href');
        if (!url) return;
        var w = window.open(url, '_blank', 'noopener,noreferrer');
        if (w) {
          e.preventDefault();
          try {
            w.opener = null;
          } catch (err) {}
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
