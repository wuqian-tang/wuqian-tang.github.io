# Wuqian Tang's academic homepage

A responsive academic homepage for Wuqian Tang (唐梧遷), with research interests, 21 publications, academic and teaching awards, education, experience, and personal interests.

**Live website: [wuqian-tang.github.io](https://wuqian-tang.github.io/)**

Read [WEBSITE_STATUS.md](WEBSITE_STATUS.md) before continuing maintenance. It records the latest changes, formatting rules, publication status, and dated follow-up checks.

The website is in **`site/`**. It is plain HTML, CSS, and JavaScript; visitors do not need a framework runtime or third-party fonts. The older Academic Pages template remains in this repository for reference, but is excluded from the deployment artifact.

## Preview

Open `site/index.html` directly, or serve only the public directory:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory site
```

Then open `http://127.0.0.1:8765/`. When working through SSH, forward port 8765 in your editor or SSH connection.

- [Desktop screenshot](preview/desktop.png)
- [Tablet screenshot](preview/tablet.png)
- [Phone screenshot](preview/mobile.png)
- [Full desktop page](preview/desktop-full.png)
- [Full phone page](preview/mobile-full.png)

## Update content

Edit `content/profile.json` for publications, awards, links, and experience. Edit `content/homepage.html` for the page structure or introduction. Styles and interactions are in `site/assets/`.

Award rows use one compact resource line: `Materials: [Certificate] [Plaques] [Trophy] [Medal] [Photos] │ Announcements: [Official] [News] [University] [College] [Department]`. Include only available items, in that order, with correct singular/plural labels. The pale vertical divider separates the groups; narrow screens may wrap naturally. Media links open a viewer directly on the homepage, with icon-only circular arrows beside the photo on desktop and below it on phones, an icon-only close control, directional fade-and-slide transitions, arrow keys, touch swipes in either direction, Escape, and View Original. The viewer decodes the next photo before switching, keeps the current photo visible while loading, cancels superseded requests, and respects reduced-motion preferences. PDF certificates have image previews. Gallery pages remain as the fallback for visitors without JavaScript. External web links open a new tab; event/program introduction links are omitted. There are no download buttons or download attributes.

All 87 award media items use locally stored WebP previews in the gallery and viewer. The three homepage activity photos reuse those previews; the badminton original is fetched only after clicking its photo. View Original continues to open the original JPEG or PDF. Previews total 16,000,228 bytes instead of 109,521,049 bytes (85.39% less); the badminton preview is 787 × 1400 pixels and 137,866 bytes instead of 4,796,730 bytes. These measurements describe preview resources, not the deployment size: originals remain in the repository. Encoding records are in `content/image-previews.json`.

When adding or changing reviewed public photos, generate their previews before building:

```sh
python3 scripts/optimize_images.py
python3 scripts/build.py
```

The optimizer requires Pillow with WebP support, checks source files against the public manifest, applies EXIF orientation to preview pixels, and records derivative hashes. It uses a 1600px maximum edge and quality 86 for ordinary images, 1800px and quality 90 for certificate legibility, and 1400px for badminton. Original bytes are preserved. GitHub Actions uses the committed previews and does not require Pillow.

Date ranges in awards and galleries break immediately after the en dash. Education and work dates stay on one line: right-aligned on desktop and tablet, left-aligned above the entry on phones (600px and below). The Ph.D. date reads Sep 2023 – Expected Jul 2027, and the detail line contains only the advisors. The work subsection is titled Work Experience. Teaching lists the instructors before the department or college, and teaching awards refer to the course semester. Recent News contains only 2026 entries, with bracketed resources and a Latest Updates note. Its teaching resources are filtered to Spring 2026.

On phone layouts (600px and below), Hsinchu, Taiwan appears on the line below the email address. Their icons and text are left-aligned with each other.

The homepage section is Research Interests; the navigation label remains Research. The physical design direction is Physical Design Automation. Hobbies displays a 4:3 upper-body crop with top-aligned text; its viewer trims only the top curtain area. The redundant photo link is omitted, while [Medal] appears at the end of the award sentence. Crops and corrected preview orientation are implemented in presentation code and preserve the original asset bytes.

The original bytes of 86 selected award files are preserved. At the owner’s request, the 2022 ICCAD certificate PDF has corrected page orientation; its embedded scan is unchanged, and its preview was regenerated. `content/public-assets.json` lists their exact public paths and SHA-256 hashes, together with certificate previews and five locally hosted paper PDFs. The build checks the manifest and refuses any additional files. Acceptance letters, student awards/disciplinary records, identity documents, transcripts, and application materials are excluded. News and announcement links belong to the corresponding award in `content/profile.json`; use a direct results/announcement URL rather than an institution's general homepage.

Every paper except those marked **To appear** has a verified DOI. Store downloaded official or author-provided paper PDFs in `site/files/papers/` and use local PDF links; the build rejects external paper PDF links. Assigned DOIs for TAPCO and HyPAS are printed in the final PDFs, but their resolvers were not yet active on October 3, 2026. The progress file records the next checks.

Each of the 21 publications ends its resource row with a BibTeX copy button, after every existing link (including Journal). It uses the same blue outline, typography, and padding as DOI/PDF, with a 14px copy icon and a compact 0.2rem icon-to-label gap. No fixed minimum width adds extra horizontal space; the label reserves enough width for both BibTeX and Copied. A successful copy shows a checkmark and Copied for two seconds without shifting the button. If clipboard access fails, a dialog selects the citation for manual copying and offers Copy again, close, and Escape. Phone targets are at least 44px high. Without JavaScript, the same BibTeX control expands the citation inline.

Maintain citation text and verification sources in `content/citations.json` alongside publication changes. Fifteen citations use publisher-deposited Crossref metadata; three use final paper PDFs, and three To appear records use the author-reviewed publication list. Preserve full authors and their order, protect title capitalization, omit contribution markers from names, and include only verified bibliographic fields. The oracle-bone paper uses its formally published English title and author names with an In Chinese note. Pending records include a To appear note. The build checks citation coverage, unique keys, required fields, and consistency with the paper's DOI. No citation is fetched from an external service when a visitor clicks.

Regenerate the static pages:

```sh
python3 scripts/build.py
```

Verify generated content and the public-file allowlist:

```sh
python3 scripts/build.py --check
node --check site/assets/js/main.js
```

The profile uses the original photograph from `images/profile.jpg`. Activity photos are explicitly selected from the private personal archive; their original files are preserved. The publicly viewable CV includes the oracle-bone paper and, with the owner's confirmation, omits the personal telephone number. Its contact row lists wqtang@cs.nthu.edu.tw followed by mark.wqtang@gmail.com, separated by a vertical bar. It does not contain identity documents, transcripts, recommendations, or application forms. Its editable source is `content/Wuqian_Tang_Public_CV.tex`; compile it with LuaLaTeX and copy the resulting PDF to `site/files/Wuqian_Tang_CV.pdf`.

For the oracle-bone paper, the website uses the formally published English title and marks the article **In Chinese**. The original title, `甲骨卜辭定年月差演算法`, is retained in the content record. Citation information was checked against the [National Central Library](https://tpl.ncl.edu.tw/NclService/JournalContentDetail?SysId=A2026000044&directQuery=true) and the [journal's issue announcement](https://tadh.org.tw/2025/09/14/jdadh_v15/).

The LinkedIn link is [linkedin.com/in/wqtang](https://www.linkedin.com/in/wqtang/); education and competition records match the CV. The Google Scholar link was retained from the previous homepage configuration. [ORCID 0009-0008-5042-5062](https://orcid.org/0009-0008-5042-5062) was verified against the official public record, matching the name and CB-EVO/GLSVLSI DOIs; it appears in the profile links and Person JSON-LD `sameAs`.

Navigation follows About, Research, Publications, Awards, Experience, Teaching, Hobbies. The homepage and all award pages have Open Graph and Twitter large-card metadata pointing to `site/assets/images/social-preview-20261003-v3.jpg` (1200 × 630, 122,843 bytes). The approved PNG artwork remains available as `social-preview-20261003-v2.png` and its identical `social-preview.png` alias. The card has larger text and portrait, the English name Wuqian Tang, and Department of Computer Science above the university. Its research line is Electronic Design Automation · AI for EDA, on one line. The text sits 84px to the right of the portrait, the portrait starts 68px from the left edge, the upper-left Homepage label is 32px, and the footer URL/location are 30px. The browser tab and homepage share title are Wuqian Tang | Homepage; its Open Graph and Twitter description is only CS Ph.D. Candidate at National Tsing Hua University.

The editable design is `content/social-preview.html`; render it in Chromium at exactly 1200 × 630 with device scale factor 1, after images and fonts have loaded. Export that PNG as RGB JPEG with Pillow, quality 95, subsampling 0 (4:4:4), and optimize=True; keep the PNG for the lossless source/preview. The share image omits the Chinese name at the owner's request; the homepage profile still shows it. If the portrait, name, affiliation, or research line changes, regenerate both formats, use a new internal image revision filename in all sharing tags, and update the corresponding SHA-256 entries in `content/public-assets.json`. The public homepage URL stays unchanged.

The normal share URL is **https://wuqian-tang.github.io/**, without a query. It includes static Open Graph and Twitter Card metadata, an absolute HTTPS image URL, explicit image type/size/alt, og:image:secure_url, English locale and namespace, and a matching legacy image_src fallback. The image is public and does not require JavaScript, cookies, authentication, or redirects. The Open Graph and Twitter tags always use the same image. [LINE uses og:title, og:description, and og:image](https://developers.line.biz/en/faq/); [Slack uses Open Graph and Twitter Card metadata](https://docs.slack.dev/messaging/unfurling-links-in-messages/). Correct website metadata enables compatible consumers to generate cards; their settings, caching, and image crops still control the final result.

The owner confirmed Android LINE showed only text for the original URL but displayed an image with a fresh query URL, and confirmed the original URL still lacked an image after the prior deployment. Both URLs return identical HTML. This points to preview caching; the query was a diagnostic workaround, not a required permanent share URL. Website code and crawler User-Agent tests cannot purge LINE's platform cache. The historical Page Poker hostname did not resolve in this environment on 2026-10-03; no functioning public refresh tool was found, and no fixed LINE refresh interval is promised. LinkedIn offers [Post Inspector](https://www.linkedin.com/help/linkedin/answer/a6269011); Meta offers [Sharing Debugger](https://developers.facebook.com/tools/debug/). They require the owner's platform login, and refreshing them is not a LINE cache purge. Layout checks and the historical LINE result are in `preview/social-preview-validation.json`; current compatibility and raw-response checks are in `preview/social-compatibility-validation.json`.

On mobile/tablet navigation layouts (999px and below), the menu button shows only three lines, with a 46px touch target and accessible Open/Close navigation menu labels. Swiping up to read farther down hides the header; pulling down brings it back with a 260ms slide. Movements below 12px are buffered to avoid flicker. An open menu always keeps the header visible; closing it resumes automatic hiding. Keyboard focus reveals the header, reduced-motion settings remove the transition, and desktop headers stay visible. CSS and JavaScript URLs use a revision query when the behavior changes. Results are recorded in `preview/mobile-header-validation.json`.

## Validation

Browser checks cover 1440 × 1000, 1024 × 768, 820 × 1180, 768 × 1024, 390 × 844, 320 × 568, and 844 × 390. They check horizontal overflow, navigation, expandable publications, the photo viewer, image loading, and JavaScript errors. Additional checks cover 200% text size, operation without JavaScript, local links, and accessibility scans on desktop and phone.

Results are saved in `preview/validation.json`, `preview/gallery-validation.json`, `preview/accessibility.json`, `preview/revision-validation.json`, `preview/followup-validation.json`, `preview/viewer-motion-validation.json`, and `preview/layout-refinement-validation.json`. Award galleries additionally cover PDF previews, keyboard photo navigation, return links to collapsed awards, and use without JavaScript. Follow-up checks include the seal mark, portrait corners, link groups and order, native certificate orientation, single-line timeline dates, inline medal link, and phone contact alignment. The latest layout checks cover left-aligned phone dates, right-aligned desktop/tablet dates, the 600px breakpoint, and the half-length upper-right portrait accent. Viewport emulation checks layout and interactions; it does not replace testing on physical devices.

`preview/bibtex-validation.json` covers actual clipboard contents for all 21 citations, button order and feedback, keyboard operation, five screen sizes, clipboard denial/unavailability, dialog retry and focus return, the no-JavaScript disclosure, and desktop/phone accessibility scans. BibTeX 0.99d with the standard plain style processed all 21 entries without errors; the issue-only oracle-bone journal produces a number-without-volume warning, preserving its actual bibliographic fields.

`preview/bibtex-spacing-sharing-validation.json` measures matching DOI/PDF/BibTeX padding and heights on desktop and phone, the compact 3.2px icon gap and 74.77px button width, stable Copied feedback, and actual clipboard text. It also checks the new image tags and versioned stylesheet/script URLs on the homepage and all 31 award pages.

The header uses the original 唐 outline from the owner-selected 经典繁方篆 typeface in `site/assets/brand.svg`. The browser icon uses the approved small-size B variant, with its strokes and gaps optically adjusted to a 16px grid, in `favicon.svg` and explicitly sized 16px/32px PNGs. Both use a solid softer-blue background (#4E7DC3), a white glyph, and no inner frame. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for source metadata. Full font files and local font comparison previews are excluded from the public repository and deployment. The portrait’s upper-right corner accent is half the size of the lower-left accent (29px versus 58px), with the same color and line weight. The oracle-bone paper’s controls are ordered DOI, PDF, Journal, BibTeX.

`preview/performance-sharing-validation.json` records seven viewport checks, Teaching navigation, favicon sizes, ORCID and sharing metadata, image request checks, all 31 galleries and 87 decoded WebP previews, original-view links, and desktop/phone accessibility scans. Original asset hashes are checked against the previous manifest; all 116 existing manifest assets are unchanged by this optimization.

## GitHub Pages

The website address is `https://wuqian-tang.github.io/`. This repository is public and GitHub Pages uses GitHub Actions to deploy the reviewed site.

The workflow in `.github/workflows/pages.yml` renders and audits the public directory, then uploads **only `site/`**. A pull request builds the public artifact but does not deploy it. Production deployment runs from `master`, after GitHub Pages is configured to use **GitHub Actions**.

Keep `wuqian-profile` and all personal source archives private. No private archive is read by the deployment workflow. Only this website repository is public.
