# ICCD 2026 Materials Implementation Plan

> Execute the owner-approved scope inline using superpowers:executing-plans and verification-before-completion.

**Goal:** Archive and publish the C19 paper, slides and A0 poster; use USA for Arculus affiliation.
**Spec:** User approved the three-file proposal and explicitly resolved the affiliation discrepancy in favor of USA.
**Architecture:** Store maintained copies under private Publications/{Papers,Slides,Posters}; preserve the superseded camera-ready separately. Publish the owner-designated Final.pdf and original slides/poster in the corresponding public files folders. Keep C19 in More, with PDF / Slides / Poster / BibTeX.
**Tech Stack:** PyMuPDF, Python static-site build, existing HTML/CSS/JS and GitHub Pages.

## Constraints
- Preserve current Final.pdf, slides and poster bytes; privately retain the superseded camera-ready source.
- User steering: ICCD2026_Paper195_Final.pdf is authoritative. It already prints USA; publish it without edits or re-export.
- Keep publication metadata, To appear status, citation, CVs and other page content intact; update the maintenance date.
- No PDF download buttons; links open new tabs. Poster is a reviewed local PDF, consistent with Slides.
- Root input files are removed only after both repositories are pushed and online assets match local hashes.
- Unrelated user changes in Organization_Plan.md and multilingual notes remain untouched.

## Steps
- [x] Record input hashes, site baseline and protected files; verify titles/authors/page counts.
- [x] Confirm missing Poster validation with a scoped negative render check.
- [x] Archive the current Final PDF, slides and poster byte-for-byte; privately retain the earlier camera-ready; verify the final PDF already prints USA.
- [x] Add C19 PDF/Slides/Poster resources, manifest provenance and local-Poster validation; render/audit the site.
- [x] Verify positive/negative Poster paths and new-tab links, mobile/desktop layouts, PDF files and preserved existing assets; obtain one final read-only review.
- [x] Commit/push private and public changes, verify Pages success and live file hashes, then remove the four root inputs and record completion.

Completed: private 4570531 and public 01f6d26 pushed; Pages run 43797542221 succeeded. Live homepage, sitemap and all three PDFs match local bytes. Final PDF exactly matches the owner-designated source. Four root duplicate inputs were removed only after committed private copies and live hashes were verified.
