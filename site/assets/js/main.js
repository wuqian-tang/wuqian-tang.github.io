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

  // Display adjustments preserve original files and apply after browser EXIF orientation.
  const fitImage = (image, stage, rotation, cropTop, availableHeight) => {
    const turn = Math.abs(rotation) % 180 === 90;
    const width = turn ? image.naturalHeight : image.naturalWidth;
    const height = turn ? image.naturalWidth : image.naturalHeight;
    const cut = height * cropTop;
    const scale = Math.min(stage.clientWidth / width, availableHeight / (height - cut));
    image.style.width = `${image.naturalWidth * scale}px`;
    image.style.height = `${image.naturalHeight * scale}px`;
    image.style.left = `${stage.clientWidth / 2}px`;
    image.style.top = `${(height / 2 - cut) * scale + (availableHeight - (height - cut) * scale) / 2}px`;
    image.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    return (height - cut) * scale;
  };
  const adjustedImages = [...document.querySelectorAll('.gallery-image-link img')].filter(image => Number(image.dataset.displayRotation) || Number(image.dataset.displayCrop));
  const fitGalleryImages = () => adjustedImages.forEach(image => {
    if (!image.complete || !image.naturalWidth) return;
    image.classList.add('adjusted-image');
    fitImage(image, image.parentElement, Number(image.dataset.displayRotation), Number(image.dataset.displayCrop), image.parentElement.clientHeight);
  });
  adjustedImages.forEach(image => image.addEventListener('load', fitGalleryImages));
  window.addEventListener('resize', fitGalleryImages);
  fitGalleryImages();

  const dialog = document.querySelector('.photo-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const registry = JSON.parse(document.getElementById('media-data')?.textContent || '{}');
    const image = dialog.querySelector('.dialog-image');
    const stage = dialog.querySelector('.dialog-stage');
    const caption = document.getElementById('photo-caption');
    const original = dialog.querySelector('.dialog-original');
    const navigation = dialog.querySelector('.dialog-navigation');
    const counter = dialog.querySelector('.dialog-counter');
    const message = dialog.querySelector('.dialog-message');
    let currentPhotos = [];
    let currentIndex = 0;
    let opener;
    const fitDialogImage = () => {
      if (!dialog.open || !image.complete || !image.naturalWidth) return;
      const style = getComputedStyle(dialog);
      const available = Math.max(60, window.innerHeight * .94 -
        parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) -
        dialog.querySelector('.dialog-toolbar').offsetHeight -
        dialog.querySelector('.dialog-footer').offsetHeight - 28);
      const item = currentPhotos[currentIndex];
      const turn = Math.abs(item.rotation || 0) % 180 === 90;
      const width = turn ? image.naturalHeight : image.naturalWidth;
      const height = (turn ? image.naturalWidth : image.naturalHeight) * (1 - (item.cropTop || 0));
      stage.style.height = `${Math.min(available, stage.clientWidth * height / width)}px`;
      fitImage(image, stage, item.rotation || 0, item.cropTop || 0, stage.clientHeight);
      image.style.opacity = '1';
    };
    const showPhoto = index => {
      currentIndex = (index + currentPhotos.length) % currentPhotos.length;
      const item = currentPhotos[currentIndex];
      image.style.opacity = '0';
      message.hidden = true;
      image.src = item.src;
      image.alt = item.caption;
      caption.textContent = item.caption;
      original.href = item.original;
      counter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
      requestAnimationFrame(fitDialogImage);
    };
    image.addEventListener('load', fitDialogImage);
    image.addEventListener('error', () => {
      message.textContent = 'Unable to load the preview. Please use View Original.';
      message.hidden = false;
    });
    document.querySelectorAll('[data-media], [data-photo]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const items = link.dataset.media ? registry[link.dataset.media] : [{
          src: link.href, original: link.href, caption: link.dataset.photo,
          rotation: Number(link.dataset.rotation || 0), cropTop: Number(link.dataset.cropTop || 0)
        }];
        if (!items?.length) return;
        event.preventDefault();
        opener = link;
        currentPhotos = items;
        navigation.hidden = items.length < 2;
        counter.hidden = items.length < 2;
        dialog.classList.toggle('has-gallery', items.length > 1);
        document.body.classList.add('viewer-open');
        dialog.showModal();
        showPhoto(Number(link.dataset.mediaIndex || 0));
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      document.body.classList.remove('viewer-open');
      opener?.focus({ preventScroll: true });
    });
    navigation.querySelector('.dialog-previous').addEventListener('click', () => showPhoto(currentIndex - 1));
    navigation.querySelector('.dialog-next').addEventListener('click', () => showPhoto(currentIndex + 1));
    dialog.addEventListener('keydown', event => {
      if (currentPhotos.length < 2) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showPhoto(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let touchStart;
    stage.addEventListener('touchstart', event => {
      touchStart = event.touches.length === 1 ? {x:event.touches[0].clientX, y:event.touches[0].clientY} : null;
    }, {passive:true});
    stage.addEventListener('touchend', event => {
      if (!touchStart || currentPhotos.length < 2) return;
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showPhoto(currentIndex + (dx < 0 ? 1 : -1));
      touchStart = null;
    }, {passive:true});
    window.addEventListener('resize', fitDialogImage);
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  }

  // Direct links reveal entries inside collapsed publications or earlier awards.
  const revealPaper = hash => {
    if (!hash.startsWith('#paper-') && !hash.startsWith('#award-')) return;
    const paper = document.getElementById(hash.slice(1));
    if (!paper) return;
    const details = paper.closest('details');
    if (details && !details.open) {
      details.open = true;
      requestAnimationFrame(() => paper.scrollIntoView({ block: 'start' }));
    }
  };
  revealPaper(location.hash);
  window.addEventListener('hashchange', () => revealPaper(location.hash));
})();
