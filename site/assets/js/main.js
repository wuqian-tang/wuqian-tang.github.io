(() => {
  'use strict';
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.menu-toggle');
  const smallScreen = window.matchMedia('(max-width: 999px)');

  const profile = document.querySelector('.profile');
  const header = document.querySelector('.site-header');
  if (profile && header && 'ResizeObserver' in window) {
    const syncProfile = () => profile.classList.toggle('is-tall', profile.scrollHeight + header.offsetHeight + 40 > window.innerHeight);
    const resizeObserver = new ResizeObserver(syncProfile);
    resizeObserver.observe(profile);
    resizeObserver.observe(header);
    window.addEventListener('resize', syncProfile);
    syncProfile();
  }

  if (nav && toggle) {
    document.documentElement.classList.add('js');
    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const syncMenu = () => {
      toggle.hidden = !smallScreen.matches;
      if (!smallScreen.matches) closeMenu();
    };
    syncMenu();
    smallScreen.addEventListener('change', syncMenu);
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link || !smallScreen.matches) return;
      closeMenu();
      const heading = document.querySelector(link.hash + ' h2');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
    if ('IntersectionObserver' in window) {
      const links = [...nav.querySelectorAll('a')];
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(link => {
            if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-15% 0px -60% 0px' });
      links.forEach(link => {
        const section = document.querySelector(link.hash);
        if (section) observer.observe(section);
      });
    }
  }

  document.querySelectorAll('details').forEach(details => {
    details.addEventListener('toggle', () => {
      const summary = details.querySelector('summary');
      summary.setAttribute('aria-expanded', String(details.open));
    });
  });

  const dialog = document.querySelector('.photo-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('.dialog-image');
    const caption = document.getElementById('photo-caption');
    document.querySelectorAll('[data-photo]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        image.src = link.href;
        image.alt = link.querySelector('img').alt;
        caption.textContent = link.dataset.photo;
        dialog.showModal();
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  }

  // Research links reveal a paper when it is in the collapsed bibliography.
  const revealPaper = hash => {
    if (!hash.startsWith('#paper-')) return;
    const paper = document.getElementById(hash.slice(1));
    if (!paper) return;
    const details = paper.closest('details');
    if (details) details.open = true;
  };
  revealPaper(location.hash);
  window.addEventListener('hashchange', () => revealPaper(location.hash));
})();
