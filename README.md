# Wuqian Tang's academic homepage

A responsive academic homepage for Wuqian Tang (唐梧遷), with research interests, 21 publications, academic and teaching awards, education, experience, and personal interests.

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

Regenerate the static pages:

```sh
python3 scripts/build.py
```

Verify generated content and the public-file allowlist:

```sh
python3 scripts/build.py --check
node --check site/assets/js/main.js
```

The profile uses the original photograph from `images/profile.jpg`. Activity photos are explicitly selected from the private personal archive; their original files are preserved. The downloadable CV includes the oracle-bone paper and omits the personal telephone number. It does not contain identity documents, transcripts, recommendations, or application forms. Its editable source is `content/Wuqian_Tang_Public_CV.tex`; compile it with LuaLaTeX and copy the resulting PDF to `site/files/Wuqian_Tang_CV.pdf`.

For the oracle-bone paper, the website uses the formally published English title and marks the article **In Chinese**. The original title, `甲骨卜辭定年月差演算法`, is retained in the content record. Citation information was checked against the [National Central Library](https://tpl.ncl.edu.tw/NclService/JournalContentDetail?SysId=A2026000044&directQuery=true) and the [journal's issue announcement](https://tadh.org.tw/2025/09/14/jdadh_v15/).

The LinkedIn link is [linkedin.com/in/wqtang](https://www.linkedin.com/in/wqtang/); education and competition records match the CV. The Google Scholar link was retained from the previous homepage configuration.

## Validation

Browser checks cover 1440 × 1000, 1024 × 768, 820 × 1180, 768 × 1024, 390 × 844, 320 × 568, and 844 × 390. They check horizontal overflow, navigation, expandable publications, the photo viewer, image loading, and JavaScript errors. Additional checks cover 200% text size, operation without JavaScript, local links, and accessibility scans on desktop and phone.

Results are saved in `preview/validation.json` and `preview/accessibility.json`. Viewport emulation checks layout and interactions; it does not replace testing on physical devices.

## GitHub Pages

The target address is `https://wuqian-tang.github.io/`. The repository is currently private and publishing is pending preview approval.

The workflow in `.github/workflows/pages.yml` renders and audits the public directory, then uploads **only `site/`**. A pull request builds the public artifact but does not deploy it. Production deployment runs from `master`, after GitHub Pages is configured to use **GitHub Actions**.

Keep `wuqian-profile` and all personal source archives private. No private archive is read by the deployment workflow. GitHub Pages from a private repository requires an eligible GitHub plan; otherwise only the website repository needs to be made public when publication is approved. Confirm the repository settings before changing visibility.
