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

Date ranges in awards and galleries break immediately after the en dash. Education and work dates stay on one line: right-aligned on desktop and tablet, left-aligned above the entry on phones (600px and below). The Ph.D. date reads Sep 2023 – Expected Jul 2027, and the detail line contains only the advisors. The work subsection is titled Work Experience. Teaching lists the instructors before the department or college, and teaching awards refer to the course semester. Recent News contains only 2026 entries, with bracketed resources and a Latest Updates note. Its teaching resources are filtered to Spring 2026.

On phone layouts (600px and below), Hsinchu, Taiwan appears on the line below the email address. Their icons and text are left-aligned with each other.

The homepage section is Research Interests; the navigation label remains Research. The physical design direction is Physical Design Automation. Hobbies displays a 4:3 upper-body crop with top-aligned text; its viewer trims only the top curtain area. The redundant photo link is omitted, while [Medal] appears at the end of the award sentence. Crops and corrected preview orientation are implemented in presentation code and preserve the original asset bytes.

The original bytes of 86 selected award files are preserved. At the owner’s request, the 2022 ICCAD certificate PDF has corrected page orientation; its embedded scan is unchanged, and its preview was regenerated. `content/public-assets.json` lists their exact public paths and SHA-256 hashes, together with certificate previews and five locally hosted paper PDFs. The build checks the manifest and refuses any additional files. Acceptance letters, student awards/disciplinary records, identity documents, transcripts, and application materials are excluded. News and announcement links belong to the corresponding award in `content/profile.json`; use a direct results/announcement URL rather than an institution's general homepage.

Every paper except those marked **To appear** has a verified DOI. Store downloaded official or author-provided paper PDFs in `site/files/papers/` and use local PDF links; the build rejects external paper PDF links. Assigned DOIs for TAPCO and HyPAS are printed in the final PDFs, but their resolvers were not yet active on October 3, 2026. The progress file records the next checks.

Each of the 21 publications ends its resource row with a BibTeX copy button, after every existing link (including Journal). It uses the same blue outline and a small copy icon. A successful copy shows a checkmark and Copied for two seconds without shifting the button. If clipboard access fails, a dialog selects the citation for manual copying and offers Copy again, close, and Escape. Phone targets are at least 44px high. Without JavaScript, the same BibTeX control expands the citation inline.

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

The profile uses the original photograph from `images/profile.jpg`. Activity photos are explicitly selected from the private personal archive; their original files are preserved. The publicly viewable CV includes the oracle-bone paper and omits the personal telephone number. It does not contain identity documents, transcripts, recommendations, or application forms. Its editable source is `content/Wuqian_Tang_Public_CV.tex`; compile it with LuaLaTeX and copy the resulting PDF to `site/files/Wuqian_Tang_CV.pdf`.

For the oracle-bone paper, the website uses the formally published English title and marks the article **In Chinese**. The original title, `甲骨卜辭定年月差演算法`, is retained in the content record. Citation information was checked against the [National Central Library](https://tpl.ncl.edu.tw/NclService/JournalContentDetail?SysId=A2026000044&directQuery=true) and the [journal's issue announcement](https://tadh.org.tw/2025/09/14/jdadh_v15/).

The LinkedIn link is [linkedin.com/in/wqtang](https://www.linkedin.com/in/wqtang/); education and competition records match the CV. The Google Scholar link was retained from the previous homepage configuration.

## Validation

Browser checks cover 1440 × 1000, 1024 × 768, 820 × 1180, 768 × 1024, 390 × 844, 320 × 568, and 844 × 390. They check horizontal overflow, navigation, expandable publications, the photo viewer, image loading, and JavaScript errors. Additional checks cover 200% text size, operation without JavaScript, local links, and accessibility scans on desktop and phone.

Results are saved in `preview/validation.json`, `preview/gallery-validation.json`, `preview/accessibility.json`, `preview/revision-validation.json`, `preview/followup-validation.json`, `preview/viewer-motion-validation.json`, and `preview/layout-refinement-validation.json`. Award galleries additionally cover PDF previews, keyboard photo navigation, return links to collapsed awards, and use without JavaScript. Follow-up checks include the seal mark, portrait corners, link groups and order, native certificate orientation, single-line timeline dates, inline medal link, and phone contact alignment. The latest layout checks cover left-aligned phone dates, right-aligned desktop/tablet dates, the 600px breakpoint, and the half-length upper-right portrait accent. Viewport emulation checks layout and interactions; it does not replace testing on physical devices.

`preview/bibtex-validation.json` covers actual clipboard contents for all 21 citations, button order and feedback, keyboard operation, five screen sizes, clipboard denial/unavailability, dialog retry and focus return, the no-JavaScript disclosure, and desktop/phone accessibility scans. BibTeX 0.99d with the standard plain style processed all 21 entries without errors; the issue-only oracle-bone journal produces a number-without-volume warning, preserving its actual bibliographic fields.

The header and browser icon use 唐 from the owner-selected 经典繁方篆 typeface, rendered from its original outline as an SVG. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the source and font metadata. The icon has a solid softer-blue background (#4E7DC3), a white glyph, and no inner frame. Full font files and local comparison previews are excluded from the public repository and deployment. The portrait’s upper-right corner accent is half the size of the lower-left accent (29px versus 58px), with the same color and line weight. The oracle-bone paper’s controls are ordered DOI, PDF, Journal, BibTeX.

## GitHub Pages

The website address is `https://wuqian-tang.github.io/`. This repository is public and GitHub Pages uses GitHub Actions to deploy the reviewed site.

The workflow in `.github/workflows/pages.yml` renders and audits the public directory, then uploads **only `site/`**. A pull request builds the public artifact but does not deploy it. Production deployment runs from `master`, after GitHub Pages is configured to use **GitHub Actions**.

Keep `wuqian-profile` and all personal source archives private. No private archive is read by the deployment workflow. Only this website repository is public.
