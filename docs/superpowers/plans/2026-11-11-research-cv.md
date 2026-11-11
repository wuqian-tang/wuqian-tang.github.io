# Research and CV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish the approved research regrouping, TAPCO-G preprint, and synchronized grouped CVs.

**Architecture:** Edit existing JSON data and LuaLaTeX CV macros, preserve the current static renderer and site style, and rebuild committed HTML/PDF outputs. Work in separate temporary worktrees for the public homepage and private profile repositories.

**Tech Stack:** Python, JSON, static HTML/CSS/JavaScript, LuaLaTeX, PyMuPDF, Playwright, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-11-research-cv-design.md`

## Global Constraints

- User has approved execution and GitHub updates; do not repeat approval requests.
- Preserve the four current Selected papers; P3 TAPCO-G is a separate More entry.
- Public CV has two email addresses and no private telephone number; preserve existing source-specific contacts and bibliography coverage.
- Keep full author names, formal paper titles, equal-contribution markers only where verified, existing C/J/P labels, and existing CV font sizes.
- Do not stage MULTILINGUAL_NOTES.md, Organization_Plan.md, untracked user application files, or historical originals.

## Review Focus

- P3 must not inherit conference equal-contribution stars or a claimed journal acceptance.
- The three research cards must resolve to papers/awards with matching topics; collapsed-paper navigation must work.
- The short CV must remain two pages without clipped blocks or a smaller font.
- Public CV aliases must match, and private contact information must not enter public content.
- Only approved public files may ship; docs-only updates must preserve the existing deployment path filter.

### Task 1: Homepage content and preprint

**Files:** `content/profile.json`, `content/citations.json`, `content/public-assets.json`, `site/files/papers/2026-arxiv-tapco-g.pdf`, generated `site/index.html`.

**Interfaces:** Add P3 to existing publication/citation mappings; research links consume stable paper/award IDs.

- [x] Verify official arXiv v1 and existing contest topics.
- [x] Add P3, its citation/provenance and local PDF; update research cards and November news.
- [x] Run `python3 scripts/build.py` and `python3 scripts/build.py --check`.
  Expected: 24 publications and exact reviewed public-file allowlist passed.

### Task 2: Public and local CVs

**Files:** public `content/Wuqian_Tang_Public_CV.tex`, public CV PDF aliases and asset hashes; private `CV/Wuqian_Tang_CV_Full.tex`, `CV/Wuqian_Tang_CV_2Page.tex`, PDFs and `CV/LaTeX_README.txt`; current-use ignored mirrors/ZIPs.

**Interfaces:** Use P3/P2/P1 metadata from Task 1, preserving source-specific J coverage and contacts.

- [x] Add lightweight publication subheadings and a linked arXiv preprint format; order C, J, P in both sources.
- [x] Add all three preprints to full CVs and the two first-author preprints to the short CV; select representative formal papers to preserve two pages.
- [x] Compile with LuaLaTeX, inspect text and rendered pages, update aliases/manifest/current-use mirrors/ZIPs.
  Expected: all full-paper records preserved, correct group order and IDs, no clipping, short CV two pages, public aliases identical and private telephone absent from public files.

### Task 3: Review, publish, and synchronize

**Files:** status/readme progress, scoped validation report/screenshots, both Git repositories.

**Interfaces:** Verify the built HTML/PDFs from Tasks 1–2 and preserve deployment workflow behavior.

- [x] Run existing build audit, syntax/diff checks, and focused browser verification at mobile/tablet/desktop widths and both themes; verify hidden-paper navigation, BibTeX, new-tab PDFs, and no overflow.
- [x] Have one fresh reviewer inspect the complete change; resolve material findings and verify again only as needed.
- [x] Commit/push scoped changes to the public master and private main; verify deployment and live hashes.
- [x] Fast-forward original checkouts, synchronize current-use ignored outputs, confirm unrelated work unchanged, and remove task worktrees.
  Expected: both remote heads match intended commits; GitHub Pages succeeds; live homepage, P3 PDF and CV match local outputs.
