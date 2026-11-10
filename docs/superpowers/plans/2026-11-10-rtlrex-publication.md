# RTLREX Publication Update Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement the approved update inline.

**Goal:** Announce RTLREX on the personal homepage and connect its public code repository to the arXiv paper.

**Architecture:** Extend the existing profile, citation and asset registries, then regenerate the static site. Update only README and citation metadata in the separate RTLREX repository.

**Tech Stack:** JSON, Python static renderer, HTML, existing JavaScript, Markdown, CFF 1.2.0.

**Spec:** User-approved proposal from November 10, 2026, reproduced below.

## Global Constraints

- Add the approved November news after the November 8 CAD Contest item; use November 7 for internal ordering.
- Add P2, RTLREX: LLM-Guided Framework for Exact High-Level RTL Recovery, as an arXiv preprint with six authors in official order, without equal-contribution stars.
- Show Selected in this order: P2, C17, C15, J2. Move C1 into More without changing its identifier or resources.
- Use resources arXiv / PDF / Code / BibTeX; host the official PDF at files/papers/2026-arxiv-rtlrex.pdf.
- Replace the DATE 2024 research reference with RTLREX · arXiv 2026. Preserve the research prose and existing UI.
- Add the arXiv paper link and preferred paper citation to RTLREX README.md and CITATION.cff.
- Preserve CVs, all existing assets, contact details, Google verification, canonical URLs and the user's local multilingual draft.
- Commit and push both repositories, deploy the homepage, and verify the live resources.

## Review Focus

- A new selected identifier must be included in the renderer's explicit ordering.
- More must include C1 and preserve deep-link access to existing papers.
- PDF and external resources must retain new-tab behavior; BibTeX must copy the complete citation.
- Mobile and desktop layouts must remain readable in both system themes.
- CFF must retain software metadata while its preferred citation identifies the preprint accurately.

## Task 1: Homepage content and official PDF

**Files:** content/profile.json, content/citations.json, content/public-assets.json, scripts/build.py, site/index.html, site/sitemap.xml, site/files/papers/2026-arxiv-rtlrex.pdf.

- [x] Add P2, approved news, research evidence and Selected changes; register the official PDF with its SHA-256 and source URL.
- [x] Regenerate with `python3 scripts/build.py`; run `python3 scripts/build.py --check`, JavaScript syntax and `git diff --check`.
- [x] Verify author order, four selected/nineteen More, local PDF identity, metadata, resource targets, and unchanged existing asset bytes.

## Task 2: Code repository links and citation

**Files:** RTLREX/README.md, RTLREX/CITATION.cff (separate repository).

- [x] Add an arXiv link near the README introduction and the paper's BibTeX in its citation section.
- [x] Add preferred-citation with the official title, six authors, arXiv identifier, year and URL; preserve software authors, version and license.
- [x] Parse the CFF and validate it against the official 1.2.0 schema; compare all citation fields with the arXiv API.

## Task 3: Review, publish and verify

**Files:** README.md, WEBSITE_STATUS.md, preview/rtlrex-publication-validation.json, preview/rtlrex-*.png.

- [x] Exercise desktop/phone, light/dark, BibTeX clipboard, More/C1 deep links and new-tab PDF/Code links; inspect screenshots.
- [x] Record results and follow-up rules, review both repository diffs, and commit only the reviewed files.
- [ ] Push both repositories, wait for Pages success, then verify live homepage, PDF, README and citation bytes.
- [ ] Fast-forward the original website checkout and preserve all preexisting local files.

## Execution Record

- Baseline: build check passes with 22 papers, 4 Selected, 18 More, 325 deployment files and 277 manifest assets.
- Execution uses a temporary website worktree and clean RTLREX clone, preserving the original checkout.
- Content-only maintenance uses the existing build audit and focused browser/schema checks; no new production feature or test suite is introduced.
- The user explicitly approved implementation and publication; no second approval is needed.

- Local verification: 10 responsive/theme cases, clipboard, new tabs, C1 deep links, native no-JavaScript disclosures, and official CFF schema validation passed.
- RTLREX README/CFF pushed at `1f167a5b57e0d6c111f31ea0dfa5d0ebe40729ce`.
