# Full-only CV Order Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement the confirmed tasks inline.

**Goal:** Reorder both maintained full CVs and retire current two-page variants.
**Architecture:** Retain separate public/private full sources and their existing metadata/contact boundaries. Reorder sections, compile with LuaLaTeX, and synchronize current-use copies and archives.
**Tech Stack:** LuaLaTeX, PyMuPDF, Python, existing static-site build.
**Spec:** User-approved order in this conversation: Education → Work Experience → Teaching Experience → Technical Skills → Selected Awards and Honors → Publications. Maintain only Full; freeze the last 2Page source/PDF with its exact companion source in CV/Archive/2026-11-11_2Page, remove active two-page files and distribution entries, and delete Job_Search as additionally instructed.

## Constraints and review focus
- Preserve all 19 award descriptions, all paper metadata and C/J/P groups, contacts, font sizes and existing section spacing.
- Keep the entire short Work Experience section on one page; keep section headings with first content and award entries indivisible.
- Public full remains 24 papers; private full remains 23, retaining their different journal coverage and contacts.
- Archive current two-page PDF/wrapper/companion source byte-for-byte; remove active two-page source/PDF/build artifacts. Delete the entire Job_Search folder as explicitly requested; send no messages.
- Preserve Original and historical application archives, user changes in Organization_Plan.md and the multilingual draft.

## Task 1: Full source, order and PDF layout
- [x] Capture baseline text and assert current order differs from the approved order.
- [x] Resolve retired short-mode conditionals to the existing full branch in both sources; reorder sections and protect Work Experience from page breaks.
- [x] Compile each full CV twice, check warnings, compare normalized per-section text and render all pages for review.

## Task 2: Retirement, synchronization and publication
- [x] Remove current 2Page files/references, retain historical records as history, and update current instructions.
- [x] Synchronize private application Full mirror/LaTeX ZIP and public three identical CV aliases/legacy preview ZIP; refresh asset hashes and sizes.
- [x] Run build --check, check only three deployed CV files changed, verify all current references and protected hashes.
- [x] Obtain one whole-change review, resolve material findings, commit/push both repositories, verify Pages and live PDF bytes, record completion.

## Execution notes

- Later user steering supersedes initial retirement wording: freeze the existing two-page edition in the private archive; delete Job_Search instead of updating its draft links.
- Existing maintained branches are explicitly used for the authorized CV update and deployment. Stage only scoped files; preserve unrelated user changes.
- Work Experience is fully on page 1; fonts and per-section text are preserved, both full PDFs remain four pages.
- Frozen short-version sources independently produce two pages matching the archived PDF text and rendered pixels.
- The legacy Website_Preview.zip retains its historical 13-entry structure; only its existing public CV entry changes. This is not a newly rebuilt complete site bundle.

- Completed: private f5fcbd1, public 28afe9c; Pages run 43045289828 succeeded. Live homepage and all three CV aliases match local bytes; CV order and first-page work section verified.
