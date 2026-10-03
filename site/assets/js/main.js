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
    let displayedItem;
    let requestId = 0;
    let photoAnimation;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animatePhoto = async (frames, duration) => {
      if (reducedMotion.matches || !image.animate) return;
      photoAnimation?.cancel();
      const animation = image.animate(frames, {
        duration, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards'
      });
      photoAnimation = animation;
      try { await animation.finished; } catch { /* Superseded or closed. */ }
      if (photoAnimation === animation) {
        animation.cancel();
        photoAnimation = undefined;
      }
    };
    const fitDialogImage = () => {
      if (!dialog.open || !displayedItem || !image.complete || !image.naturalWidth) return;
      const style = getComputedStyle(dialog);
      const navigationStyle = getComputedStyle(navigation);
      const navigationHeight = !navigation.hidden && navigationStyle.position === 'static'
        ? navigation.offsetHeight + parseFloat(navigationStyle.marginTop) : 0;
      const available = Math.max(60, window.innerHeight * .94 -
        parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) -
        dialog.querySelector('.dialog-toolbar').offsetHeight -
        dialog.querySelector('.dialog-footer').offsetHeight - navigationHeight - 28);
      const item = displayedItem;
      const turn = Math.abs(item.rotation || 0) % 180 === 90;
      const width = turn ? image.naturalHeight : image.naturalWidth;
      const height = (turn ? image.naturalWidth : image.naturalHeight) * (1 - (item.cropTop || 0));
      const stageHeight = Math.min(available, stage.clientWidth * height / width);
      stage.style.height = `${stageHeight}px`;
      fitImage(image, stage, item.rotation || 0, item.cropTop || 0, stageHeight);
      image.style.opacity = '1';
    };
    const showPhoto = async (index, direction = 0) => {
      const request = ++requestId;
      photoAnimation?.cancel();
      currentIndex = (index + currentPhotos.length) % currentPhotos.length;
      const item = currentPhotos[currentIndex];
      message.hidden = true;
      const preview = new Image();
      preview.src = item.src;
      try { await preview.decode(); } catch {
        if (request !== requestId || !dialog.open) return;
        original.href = item.original;
        message.textContent = 'Unable to load the preview. Please use View Original.';
        message.hidden = false;
        return;
      }
      if (request !== requestId || !dialog.open) return;
      if (direction && displayedItem) {
        await animatePhoto([
          {opacity: 1, translate: '0 0'},
          {opacity: 0, translate: `${-direction * 16}px 0`}
        ], 100);
      }
      if (request !== requestId || !dialog.open) return;
      image.style.opacity = '0';
      image.src = item.src;
      try { await image.decode(); } catch { return; }
      if (request !== requestId || !dialog.open) return;
      displayedItem = item;
      image.alt = item.caption;
      caption.textContent = item.caption;
      original.href = item.original;
      counter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
      fitDialogImage();
      if (direction) {
        await animatePhoto([
          {opacity: 0, translate: `${direction * 16}px 0`},
          {opacity: 1, translate: '0 0'}
        ], 180);
      }
    };
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
        displayedItem = undefined;
        image.style.opacity = '0';
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
      ++requestId;
      photoAnimation?.cancel();
      displayedItem = undefined;
      document.body.classList.remove('viewer-open');
      opener?.focus({ preventScroll: true });
    });
    navigation.querySelector('.dialog-previous').addEventListener('click', () => showPhoto(currentIndex - 1, -1));
    navigation.querySelector('.dialog-next').addEventListener('click', () => showPhoto(currentIndex + 1, 1));
    dialog.addEventListener('keydown', event => {
      if (currentPhotos.length < 2) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        showPhoto(currentIndex + direction, direction);
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
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        const direction = dx < 0 ? 1 : -1;
        showPhoto(currentIndex + direction, direction);
      }
      touchStart = null;
    }, {passive:true});
    window.addEventListener('resize', fitDialogImage);
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
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
