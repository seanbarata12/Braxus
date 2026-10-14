// Braxus Plumbing — shared script for every page.
(function () {
  // ---- Menu: sidebar on computers, slide-out menu on phones/tablets ----
  var root = document.documentElement;
  var nav = document.getElementById('site-nav');
  var openBtn = document.querySelector('.menu-btn');
  var closeBtn = document.querySelector('.sb-close');
  var backdrop = document.querySelector('.nav-backdrop');
  var mobile = window.matchMedia('(max-width: 1023px)');

  function setOpen(open, returnFocus) {
    root.classList.toggle('nav-open', open);
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      var current = nav.querySelector('[aria-current="page"]') || nav.querySelector('a');
      setTimeout(function () { if (current) current.focus(); }, 60);
    } else if (returnFocus && openBtn) {
      openBtn.focus();
    }
  }
  if (nav && openBtn) {
    openBtn.addEventListener('click', function () { setOpen(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false, true); });
    if (backdrop) backdrop.addEventListener('click', function () { setOpen(false, true); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) setOpen(false, true);
    });
    // Tapping a link closes the menu (matters for links to a spot on the same page)
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && mobile.matches) setOpen(false);
    });
    // Leaving phone size with the menu open: reset it
    var reset = function () { if (!mobile.matches) setOpen(false); };
    if (mobile.addEventListener) mobile.addEventListener('change', reset); else if (mobile.addListener) mobile.addListener(reset);
  }

  // ---- Services: open the service named in the link (e.g. /services#svc-drain) ----
  function openFromHash() {
    var id = location.hash.slice(1);
    if (!/^svc-/.test(id)) return;
    var d = document.getElementById(id);
    if (d && d.tagName === 'DETAILS') {
      d.open = true;
      d.scrollIntoView({ block: 'start' });
    }
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
