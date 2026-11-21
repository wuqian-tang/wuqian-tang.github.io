# Navigation Landing Implementation Plan

> Execute the owner-approved proposal inline with superpowers:executing-plans, test-driven-development and verification-before-completion.

**Goal:** Make homepage navigation land consistently below the real collapsed header on mobile and desktop.
**Spec:** The owner approved the six-point navigation proposal on 2026-11-21 after reviewing current-site measurements and temporary previews.
**Architecture:** Use one root scroll offset derived from actual closed header geometry plus one rem. Keep native fragments and smooth scrolling. Protect header visibility during manual fragment navigation; synchronize existing reading-line/highlight logic and preserve natural scroll limits.
**Tech Stack:** Existing static HTML/CSS/JavaScript, Python renderer, Playwright Chromium and GitHub Pages.

## Global Constraints
- Retain manual priority for every section until real page scrolling resumes; sidebar/dialog scrolling must not cancel it.
- Keep mobile menu, header scroll direction behavior, desktop fixed sidebar, More expansion, reduced motion and native browser history.
- Measure actual geometry; do not special-case resolutions or add filler below Hobbies.
- Use the same offset for section, paper and award fragments; preserve the About tagline.
- Keep all content, CVs, PDF/image bytes, public manifest and unrelated untracked files unchanged.
- Owner authorization includes implementation and deployment; proceed without another review prompt.

## Review Focus
- Header size synchronization must happen before the browser's native fragment scroll after menu collapse.
- Repeated fragment clicks and near-bottom destinations without movement must retain their selected section.
- History restoration must not be replaced by forced scrolling; direct More fragments must still reveal their records.
- Resize/font changes must not feed back into the fixed sidebar's position or lock the mobile header.
- Modified/new-tab links and dialog/side-panel interactions must retain their existing behavior.

## Task 1: Correct landing, preserve navigation behavior, and deploy

**Files:** site/assets/css/main.css; site/assets/js/main.js; content/homepage.html; content/award-gallery.html; scripts/build.py; scripts/check_navigation.cjs; README.md; WEBSITE_STATUS.md; generated HTML; preview/navigation-landing-*.
**Interfaces:** Produces one root scroll offset consumed by native scrolling and existing reading-line calculation; header visibility protection follows manual section selection.

- [x] Write browser checks for section landing, mobile header visibility, deep fragments and navigation priority; run against the baseline and record the expected failures.
- [x] Remove additive section/heading offsets; measure the actual collapsed header before native scrolling; retain header visibility until manual navigation releases to real user scrolling.
- [x] Check all eight destinations, mobile/desktop/tablet sizes including 2560x1440, actual touch scrolling, More links, repeated links, history, resizing/font size, reduced motion, no-JS fallback and gallery regression.
- [x] Update shared CSS/JS cache versions and maintenance documentation; render and verify the exact public-file allowlist and unchanged protected assets.
- [x] Obtain one read-only whole-change review, address material findings with reproducing checks, and run final verification.
- [ ] Commit, fast-forward the main checkout, push master, verify Pages success and the live files and navigation, then record deployment.
