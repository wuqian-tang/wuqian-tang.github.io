(() => {
  'use strict';
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.menu-toggle');
  const smallScreen = window.matchMedia('(max-width: 999px)');

  const profile = document.querySelector('.profile');
  const header = document.querySelector('.site-header');
  let scrollAnchor = Math.max(0, window.scrollY);
  const showHeader = () => {
    header?.classList.remove('is-hidden');
    scrollAnchor = Math.max(0, window.scrollY);
  };
  if (header) {
    let scrollFramePending = false;
    const updateHeader = () => {
      scrollFramePending = false;
      const currentY = Math.max(0, window.scrollY);
      if (!smallScreen.matches || nav?.classList.contains('is-open') || currentY <= header.offsetHeight + 24) {
        showHeader();
        return;
      }
      // Accumulate small movements before changing direction to avoid flicker.
      if (Math.abs(currentY - scrollAnchor) < 12) return;
      header.classList.toggle('is-hidden', currentY > scrollAnchor);
      scrollAnchor = currentY;
    };
    window.addEventListener('scroll', () => {
      if (scrollFramePending) return;
      scrollFramePending = true;
      window.requestAnimationFrame(updateHeader);
    }, { passive: true });
    smallScreen.addEventListener('change', showHeader);
    header.addEventListener('focusin', showHeader);
  }
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
      toggle.setAttribute('aria-label', 'Open navigation menu');
      showHeader();
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
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      showHeader();
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
      const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
      const updateCurrentSection = entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(link => {
            if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      };
      let observer;
      const observeSections = () => {
        observer?.disconnect();
        // Percentage root margins use viewport width; use height-based pixels
        // and include the anchor offset so landscape navigation can activate.
        const anchorOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) +
          parseFloat(getComputedStyle(sections[0]).scrollMarginTop);
        const bandEnd = Math.min(window.innerHeight, Math.max(window.innerHeight * .4, anchorOffset + 24));
        observer = new IntersectionObserver(updateCurrentSection, {
          rootMargin: `-${Math.round(window.innerHeight * .15)}px 0px -${Math.round(window.innerHeight - bandEnd)}px 0px`
        });
        sections.forEach(section => observer.observe(section));
      };
      observeSections();
      window.addEventListener('resize', observeSections);
    }
  }

  document.querySelectorAll('details').forEach(details => {
    details.addEventListener('toggle', () => {
      const summary = details.querySelector('summary');
      summary.setAttribute('aria-expanded', String(details.open));
    });
  });

  // Keep separators between items on the same line, never at a line edge.
  // Reset from the unbroken layout on each pass so resizing is reversible.
  const inlineRows = [...document.querySelectorAll('[data-inline-flow]')];
  const fitInlineRows = () => inlineRows.forEach(row => {
    if (!row.getClientRects().length) return;
    row.dataset.flowReady = '';
    const groups = [...row.children].filter(child => child.classList.contains('inline-flow-group'));
    groups.forEach(group => {
      const separator = group.querySelector('.inline-flow-separator');
      if (separator) separator.hidden = false;
      const lineBreak = group.previousElementSibling;
      if (lineBreak?.classList.contains('inline-flow-break')) lineBreak.hidden = true;
    });
    groups.forEach((group, index) => {
      const separator = group.querySelector('.inline-flow-separator');
      if (!index || !separator) return;
      const previousRects = groups[index - 1].getClientRects();
      const previous = previousRects[previousRects.length - 1];
      const lead = group.querySelector('.inline-flow-lead').getBoundingClientRect();
      if (previous && lead.top >= previous.bottom - 1) {
        separator.hidden = true;
        // Preserve this break even when removing the separator makes the item
        // narrow enough to fit above. This prevents repeated reflow/flicker.
        group.previousElementSibling.hidden = false;
      }
    });
  });
  let inlineFramePending = false;
  const scheduleInlineLayout = () => {
    if (inlineFramePending) return;
    inlineFramePending = true;
    window.requestAnimationFrame(() => {
      inlineFramePending = false;
      fitInlineRows();
    });
  };
  if (inlineRows.length) {
    fitInlineRows();
    window.addEventListener('resize', scheduleInlineLayout);
    document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', scheduleInlineLayout));
    document.fonts?.ready.then(scheduleInlineLayout);
    document.fonts?.addEventListener('loadingdone', scheduleInlineLayout);
    if ('ResizeObserver' in window) {
      const metrics = new WeakMap();
      const inlineObserver = new ResizeObserver(entries => {
        let changed = false;
        entries.forEach(entry => {
          const style = getComputedStyle(entry.target);
          const signature = [entry.contentRect.width, style.font, style.letterSpacing].join('|');
          if (metrics.get(entry.target) === signature) return;
          metrics.set(entry.target, signature);
          changed = true;
        });
        if (changed) scheduleInlineLayout();
      });
      // Observe block containers; ignore height changes made by our own breaks.
      new Set(inlineRows.map(row => row.matches('p') ? row : row.parentElement))
        .forEach(container => inlineObserver.observe(container));
    }
  }

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

  const citationDialog = document.querySelector('.citation-dialog');
  const citationStatus = document.getElementById('citation-status');
  const citationCode = document.getElementById('citation-code');
  const citationHelp = document.getElementById('citation-help');
  const citationCopy = citationDialog?.querySelector('.citation-copy');
  const citationTimers = new WeakMap();
  let citationAttempt = 0;
  let activeCitation;
  const resetCitationButton = button => {
    clearTimeout(citationTimers.get(button));
    button.classList.remove('is-copied');
    button.querySelector('span').textContent = button.dataset.defaultLabel;
    button.querySelector('svg').innerHTML = '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>';
  };
  const markCopied = button => {
    clearTimeout(citationTimers.get(button));
    button.classList.add('is-copied');
    button.querySelector('span').textContent = 'Copied';
    button.querySelector('svg').innerHTML = '<path d="m5 12 4 4L19 6"/>';
    citationTimers.set(button, setTimeout(() => resetCitationButton(button), 2000));
  };
  const showCitation = entry => {
    if (!citationDialog || typeof citationDialog.showModal !== 'function') {
      entry.fallback.hidden = false;
      entry.fallback.open = true;
      entry.fallback.querySelector('pre').focus();
      return;
    }
    activeCitation = entry;
    resetCitationButton(citationCopy);
    citationCode.value = entry.code;
    citationDialog.querySelector('.citation-paper-title').textContent = entry.title;
    citationDialog.querySelector('.citation-dialog-status').textContent = '';
    citationHelp.textContent = 'Select the citation below to copy it, or try Copy again.';
    document.body.classList.add('citation-open');
    if (!citationDialog.open) citationDialog.showModal();
    citationCode.focus({preventScroll: true});
    citationCode.select();
  };
  const copyCitation = async (entry, button) => {
    const attempt = ++citationAttempt;
    button.disabled = true;
    citationStatus.textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(entry.code);
      if (attempt !== citationAttempt) return;
      markCopied(button);
      citationStatus.textContent = `BibTeX citation copied for ${entry.title}.`;
      if (citationDialog?.open) citationDialog.querySelector('.citation-dialog-status').textContent = 'Citation copied.';
    } catch {
      if (attempt !== citationAttempt) return;
      if (citationDialog?.open && button === citationCopy) {
        citationDialog.querySelector('.citation-dialog-status').textContent = 'Please copy the selected text manually.';
        citationCode.focus({preventScroll: true});
        citationCode.select();
      } else {
        showCitation(entry);
      }
    } finally {
      button.disabled = false;
    }
  };
  document.querySelectorAll('.citation-fallback').forEach(fallback => {
    const summary = fallback.querySelector('summary');
    const title = fallback.closest('.publication').querySelector('h3').textContent;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'bibtex-button';
    button.dataset.citation = fallback.dataset.citation;
    button.dataset.defaultLabel = 'BibTeX';
    button.setAttribute('aria-label', `Copy BibTeX citation for ${title}`);
    button.innerHTML = summary.innerHTML;
    const entry = {code: fallback.querySelector('code').textContent, title, button, fallback};
    button.addEventListener('click', () => copyCitation(entry, button));
    fallback.before(button);
    fallback.hidden = true;
  });
  if (citationDialog && citationCopy) {
    citationCopy.dataset.defaultLabel = 'Copy';
    citationCopy.addEventListener('click', () => {
      if (activeCitation) copyCitation(activeCitation, citationCopy);
    });
    citationDialog.querySelector('.dialog-close').addEventListener('click', () => citationDialog.close());
    citationDialog.addEventListener('close', () => {
      ++citationAttempt;
      resetCitationButton(citationCopy);
      document.body.classList.remove('citation-open');
      activeCitation?.button.focus({preventScroll: true});
      activeCitation = undefined;
    });
    citationDialog.addEventListener('click', event => {
      if (event.target !== citationDialog) return;
      const bounds = citationDialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) citationDialog.close();
    });
  }

  const dialog = document.querySelector('.photo-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const registry = JSON.parse(document.getElementById('media-data')?.textContent || '{}');
    let image = dialog.querySelector('.dialog-image');
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
    let loadingTimer;
    let preloadTimer;
    const previewCache = new Map();
    const loadPreview = src => {
      if (!/\.webp(?:[?#]|$)/i.test(src)) return Promise.reject(new Error('A WebP preview is required.'));
      if (previewCache.has(src)) {
        const ready = previewCache.get(src);
        previewCache.delete(src);
        previewCache.set(src, ready);
        return ready;
      }
      const preview = new Image();
      preview.decoding = 'async';
      preview.src = src;
      const ready = preview.decode().then(() => preview);
      previewCache.set(src, ready);
      ready.catch(() => {
        if (previewCache.get(src) === ready) previewCache.delete(src);
      });
      // Keep decoded images bounded as visitors browse different galleries.
      while (previewCache.size > 6) previewCache.delete(previewCache.keys().next().value);
      return ready;
    };
    const stopLoading = () => {
      clearTimeout(loadingTimer);
      stage.setAttribute('aria-busy', 'false');
      message.hidden = true;
      message.classList.remove('is-loading');
    };
    const preloadNeighbors = request => {
      clearTimeout(preloadTimer);
      if (currentPhotos.length < 2) return;
      preloadTimer = setTimeout(() => {
        if (!dialog.open || request !== requestId) return;
        const count = currentPhotos.length;
        const neighbors = new Set([(currentIndex + count - 1) % count, (currentIndex + 1) % count]);
        neighbors.forEach(index => loadPreview(currentPhotos[index].src).catch(() => {}));
      }, 160);
    };
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
      clearTimeout(preloadTimer);
      stopLoading();
      currentIndex = (index + currentPhotos.length) % currentPhotos.length;
      const item = currentPhotos[currentIndex];
      if (!displayedItem) {
        caption.textContent = item.caption;
        original.href = item.original;
        counter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
      }
      stage.setAttribute('aria-busy', 'true');
      loadingTimer = setTimeout(() => {
        if (request !== requestId || !dialog.open) return;
        message.textContent = 'Loading preview…';
        message.classList.add('is-loading');
        message.hidden = false;
      }, 180);
      let preview;
      try { preview = await loadPreview(item.src); } catch {
        if (request !== requestId || !dialog.open) return;
        stopLoading();
        image.style.opacity = '0';
        displayedItem = undefined;
        caption.textContent = item.caption;
        counter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
        original.href = item.original;
        message.textContent = 'Unable to load the preview. Please use View Original.';
        message.hidden = false;
        return;
      }
      if (request !== requestId || !dialog.open) return;
      stopLoading();
      if (direction && displayedItem) {
        await animatePhoto([
          {opacity: 1, translate: '0 0'},
          {opacity: 0, translate: `${-direction * 16}px 0`}
        ], 100);
      }
      if (request !== requestId || !dialog.open) return;
      // Insert the already decoded preview; the visible image never loads an original.
      preview.className = 'dialog-image';
      preview.style.opacity = '0';
      if (preview !== image) image.replaceWith(preview);
      image = preview;
      displayedItem = item;
      image.alt = item.alt || item.caption;
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
      if (request === requestId && dialog.open) preloadNeighbors(request);
    };
    document.querySelectorAll('[data-media], [data-photo]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const items = link.dataset.media ? registry[link.dataset.media] : [{
          src: link.href, original: link.dataset.original, caption: link.dataset.photo,
          alt: link.querySelector('img')?.alt || link.dataset.photo,
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
      if (dialog.open) return;
      ++requestId;
      photoAnimation?.cancel();
      clearTimeout(preloadTimer);
      stopLoading();
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
