/* mjalif.com homepage behaviour — ported from the Claude Design component.
   Everything else on the page is static HTML. */
(function () {
  'use strict';

  /* ---- theme ---- */
  var root = document.documentElement;
  var themeButtons = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-m')].filter(Boolean);

  function paintTheme() {
    var dark = root.dataset.theme !== 'light';
    themeButtons.forEach(function (b) {
      b.textContent = dark ? 'Light' : 'Dark';
      b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }
  themeButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('mjalif-theme', root.dataset.theme); } catch (e) {}
      paintTheme();
    });
  });
  paintTheme();

  /* ---- mobile nav ---- */
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    var setNav = function (open) {
      mobileNav.hidden = !open;
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? 'Close' : 'Menu';
    };
    navToggle.addEventListener('click', function () { setNav(mobileNav.hidden); });
    mobileNav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  }

  /* ---- publications: by theme (the static markup) or by year ---- */
  var groupsEl = document.getElementById('pub-groups');
  var byTheme = document.getElementById('by-theme');
  var byYear = document.getElementById('by-year');
  if (groupsEl && byTheme && byYear) {
    var themeHTML = groupsEl.innerHTML;
    var rows = Array.prototype.slice.call(groupsEl.querySelectorAll('li.pub'));
    var years = rows.map(function (li) { return li.dataset.year; })
      .filter(function (y, i, a) { return a.indexOf(y) === i; })
      .sort().reverse();
    var yearHTML = years.map(function (y) {
      var items = rows.filter(function (li) { return li.dataset.year === y; })
        .sort(function (a, b) { return b.dataset.cites - a.dataset.cites; });
      return '<div class="group"><div class="group-head"><h3>' + y + '</h3>' +
        '<span class="count">' + items.length + '</span><span class="rule-line"></span></div><ol>' +
        items.map(function (li) { return li.outerHTML; }).join('') + '</ol></div>';
    }).join('');

    var show = function (mode) {
      groupsEl.innerHTML = mode === 'year' ? yearHTML : themeHTML;
      byTheme.setAttribute('aria-pressed', String(mode !== 'year'));
      byYear.setAttribute('aria-pressed', String(mode === 'year'));
    };
    byTheme.addEventListener('click', function () { show('theme'); });
    byYear.addEventListener('click', function () { show('year'); });
  }

  /* ---- contact form ---- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('cf-status');
    var submit = form.querySelector('.submit');

    var validate = function (fd) {
      var errors = {};
      if (!String(fd.get('name') || '').trim()) errors.name = 'Please add your name.';
      var email = String(fd.get('email') || '').trim();
      if (!email) errors.email = 'Please add an email address.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'That email address does not look complete.';
      if (String(fd.get('message') || '').trim().length < 10) errors.message = 'A sentence or two, so I know what this is about.';
      return errors;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var errors = validate(fd);
      ['name', 'email', 'message'].forEach(function (f) {
        document.getElementById('cf-' + f + '-err').textContent = errors[f] || '';
      });
      var bad = Object.keys(errors);
      if (bad.length) {
        status.textContent = 'The form has ' + bad.length + ' field(s) to fix.';
        var first = document.getElementById('cf-' + bad[0]);
        if (first) first.focus();
        return;
      }
      submit.textContent = 'Sending…';
      status.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad response');
          form.reset();
          status.textContent = 'Thank you — the message is through. I usually reply within a couple of days.';
        })
        .catch(function () {
          status.textContent = 'That did not send. Email mujadded.alif@gmail.com directly and it will reach me.';
        })
        .then(function () { submit.textContent = 'Send message'; });
    });
  }

  /* ---- PWA service worker ---- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function (err) {
        console.warn('Service worker registration failed:', err);
      });
    });
  }
})();
