#!/usr/bin/env python3
"""Render only explicitly reviewed public content; never scan the parent archive."""
import argparse
import hashlib
import html
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from string import Template

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site'
ALLOWED_FILES = {
    'index.html', '404.html', '.nojekyll', 'robots.txt', 'sitemap.xml',
    'assets/favicon.svg', 'assets/favicon-16.png', 'assets/favicon-32.png',
    'assets/brand.svg', 'assets/css/main.css', 'assets/js/main.js',
    'assets/images/profile.jpg',
    'assets/images/2025-hsing-chien-photo-1.jpg', 'assets/images/2025-badminton-photo-1.jpg',
    'files/cv.pdf',
}

def esc(value):
    return html.escape(str(value), quote=True)

def date_range(value):
    parts = re.split(r'\s*–\s*', value, maxsplit=1)
    if len(parts) == 1:
        return esc(value)
    return f'<span class="date-segment">{esc(parts[0])}–</span><br><span class="date-segment">{esc(parts[1])}</span>'

def external_tabs(page):
    # Apply consistently to static template links and generated content, even without JS.
    def update(match):
        anchor = match.group(0)
        if re.search(r'\bhref="https?://', anchor):
            anchor = re.sub(r'\s+(?:target|rel)="[^"]*"', '', anchor)
            anchor = anchor[:-1] + ' target="_blank" rel="noopener noreferrer">'
        return anchor
    return re.sub(r'<a\b[^>]*>', update, page)

def media_data(awards, prefix=''):
    registry = {}
    for a in awards:
        for kind, group, singular, plural in MEDIA_GROUPS:
            items = [item for item in a['media'] if item['kind'] == kind]
            if items:
                registry[f'{a["id"]}:{kind}'] = [dict(
                    src=prefix + item['preview'],
                    original=prefix + item['url'],
                    caption=item['caption'] + ' · ' + a['title'],
                    alt=item['alt'],
                    rotation=item.get('rotation', 0), cropTop=item.get('crop_top', 0)
                ) for item in items]
    return registry

def media_link(a, kind, count, href, key=None, index=0):
    group, singular, plural = next(row[1:] for row in MEDIA_GROUPS if row[0] == kind)
    label = singular if count == 1 else plural
    key = key or f'{a["id"]}:{kind}'
    return f'<a href="{esc(href)}" data-media="{esc(key)}" data-media-index="{index}" aria-label="{esc(label + " for " + a["title"])}">[{label}]</a>'

def announcement_link(a, link):
    return f'<a href="{esc(link["url"])}" aria-label="{esc(link.get("description", link["label"]) + " for " + a["title"])}">[{esc(link["label"])}]</a>'

def icon(name):
    shapes = {
        'location': '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
        'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
        'document': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
        'scholar': '<path d="m2 8 10-5 10 5-10 5Z"/><path d="M6 10v6c4 3 8 3 12 0v-6M22 8v7"/>',
        'github': '<path d="M9 19c-4 1-4-2-6-2M15 22v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4a5 5 0 0 0-.1-3.2s-1.3-.4-4.2 1.6a14.5 14.5 0 0 0-7.5 0C4.6.4 3.3.8 3.3.8A5 5 0 0 0 3.2 4a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.5 6.6 6.8 7A3.5 3.5 0 0 0 7.5 18v4"/>',
        'book': '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1ZM12 5v15"/>',
        'linkedin': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M11 17v-7M11 13c0-4 6-4 6 0v4"/><circle cx="7" cy="7" r=".6"/>',
        'orcid': '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="8" r=".65"/><path d="M8 11v6M12 11v6h2a3 3 0 0 0 0-6h-2Z"/>',
        'badminton': '<ellipse cx="9" cy="8" rx="5" ry="6" transform="rotate(-35 9 8)"/><path d="m12 13 7 8M6 4l6 8M4 8l7-4M7 13l7-5"/>',
        'swim': '<path d="M2 19c2-2 4 2 6 0s4 2 6 0 4 2 8 0M2 15c2-2 4 2 6 0s4 2 6 0 4 2 8 0M5 11l5-5 6 4 3 3M10 6l-4-3"/><circle cx="18" cy="6" r="2"/>',
        'tabletennis': '<path d="M15 16 6 7M6 7a7 7 0 1 1 9 9l-4 5-4-4 4-4"/><circle cx="20" cy="20" r="2"/>',
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + shapes[name] + '</svg>'

def authors(text):
    return esc(text).replace('Wuqian Tang*', '<strong>Wuqian Tang*</strong>').replace('Wuqian Tang,', '<strong>Wuqian Tang</strong>,')

def publication(p, citation):
    links = ''.join(f'<a href="{esc(link["url"])}" aria-label="{esc(link["label"])} for {esc(p["title"])}">{esc(link["label"])}</a>' for link in p['links'])
    copy_icon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>'
    # A native disclosure preserves access to citations without JavaScript.
    # The browser script enhances it to a one-click copy button in the same position.
    links += f'<details class="citation-fallback" data-citation="{esc(p["id"])}"><summary class="bibtex-button" aria-label="BibTeX citation for {esc(p["title"])}">{copy_icon}<span data-default-label="BibTeX">BibTeX</span></summary><pre tabindex="0"><code>{esc(citation["bibtex"])}</code></pre></details>'
    status = f'<span class="publication-status">{esc(p["status"])}</span>' if p.get('status') else ''
    return f'''<article class="publication" id="paper-{esc(p['id'])}">
      <div class="publication-meta"><span class="venue-badge">{esc(p['acronym'])} {p['year']}</span><span class="publication-label">[{esc(p['label'])}]</span>{status}</div>
      <h3>{esc(p['title'])}</h3><p class="publication-authors">{authors(p['authors'])}</p>
      <p class="publication-venue">{esc(p['venue'])} · {esc(p['details'])}</p>
      {('<div class="paper-links">' + links + '</div>') if links else ''}</article>'''

def award(a):
    detail = '<p class="award-detail">' + esc(a['detail']) + '</p>' if a.get('detail') else ''
    return f'<li id="award-{esc(a["id"])}"><span class="award-date">{date_range(a["date"])}</span><div><p class="award-title">{esc(a["title"])}</p>{detail}{award_links(a)}</div></li>'

MEDIA_GROUPS = [
    ('certificate', 'certificates', 'Certificate', 'Certificates'),
    ('plaque', 'plaques', 'Plaque', 'Plaques'),
    ('trophy', 'trophies', 'Trophy', 'Trophies'),
    ('medal', 'medals', 'Medal', 'Medals'),
    ('photo', 'photos', 'Photo', 'Photos'),
]

def award_links(a, local_gallery=False, kinds=None, headings=True):
    links = []
    for kind, group, singular, plural in MEDIA_GROUPS:
        count = sum(item['kind'] == kind for item in a['media'])
        if count and (kinds is None or kind in kinds):
            href = f'#{group}' if local_gallery else f'awards/{a["id"]}.html#{group}'
            links.append(media_link(a, kind, count, href))
    media = ('<span class="resource-label">Materials:</span> ' if headings and links else '') + ' '.join(links)
    news = ' '.join(announcement_link(a, link) for link in a.get('links', []))
    if news and headings:
        news = '<span class="resource-label">Announcements:</span> ' + news
    divider = ' <span class="resource-divider" aria-hidden="true">│</span> ' if media and news else ''
    return '<div class="award-links">' + media + divider + news + '</div>'

def gallery(a, profile):
    sections = ''
    for kind, group, singular, plural in MEDIA_GROUPS:
        items = [item for item in a['media'] if item['kind'] == kind]
        if not items:
            continue
        cards = ''
        for i, item in enumerate(items, 1):
            preview = '../' + item['preview']
            original = '../' + item['url']
            caption = item['caption']
            rotation = item.get('rotation', 0)
            crop = item.get('crop_top', 0)
            cards += f'''<figure class="gallery-card"><a class="gallery-image-link" href="{esc(preview)}" data-media="{esc(a['id'] + ':' + kind)}" data-media-index="{i-1}" aria-label="View {esc(caption)} {i} for {esc(a['title'])}"><img src="{esc(preview)}" alt="{esc(item['alt'])}" data-display-rotation="{rotation}" data-display-crop="{crop}" loading="lazy" decoding="async" width="{item['width']}" height="{item['height']}"></a><figcaption><span>{esc(caption)}</span><a href="{esc(original)}" target="_blank" rel="noopener noreferrer">View Original</a></figcaption></figure>'''
        sections += f'<section class="gallery-section" id="{group}" aria-labelledby="{group}-title"><h2 id="{group}-title">{plural}<span class="gallery-count">{len(items)}</span></h2><div class="award-gallery-grid">{cards}</div></section>'
    values = dict(NAME=esc(profile['name']), DEPARTMENT=esc(profile['department']), SITE_URL=esc(profile['site_url']), TITLE=esc(a['title']), DATE=date_range(a['date']), DETAIL=esc(a['detail']),
        CANONICAL=esc(profile['site_url'] + '/awards/' + a['id'] + '.html'),
        HOME=esc('../#award-' + a['id']), LINKS=award_links(a, local_gallery=True), SECTIONS=sections,
        MEDIA_DATA=json.dumps(media_data([a], '../'), ensure_ascii=False).replace('<', '\\u003c'))
    return Template((ROOT / 'content/award-gallery.html').read_text()).substitute(values)

def timeline(item):
    detail = '<p class="timeline-detail">' + esc(item['detail']) + '</p>' if item.get('detail') else ''
    date = esc(re.sub(r'\s*–\s*', ' – ', item['date']))
    return f'<article class="timeline-item"><div class="timeline-top"><h4>{esc(item["title"])}</h4><span class="timeline-date">{date}</span></div><p class="timeline-institution">{esc(item["institution"])}</p>{detail}</article>'

def image_sitemap(profile):
    namespace = 'http://www.sitemaps.org/schemas/sitemap/0.9'
    image_namespace = 'http://www.google.com/schemas/sitemap-image/1.1'
    ET.register_namespace('', namespace)
    ET.register_namespace('image', image_namespace)
    root = ET.Element(f'{{{namespace}}}urlset')
    homepage_images = ['assets/images/profile.jpg'] + [
        image['preview'] for image in profile['homepage_images'].values()]
    entries = [('', homepage_images)] + [
        (f'awards/{award["id"]}.html', [item['preview'] for item in award['media']])
        for award in profile['awards'] + profile['earlier_awards'] + profile['personal_awards']]
    for path, images in entries:
        url = ET.SubElement(root, f'{{{namespace}}}url')
        ET.SubElement(url, f'{{{namespace}}}loc').text = profile['site_url'] + '/' + path
        ET.SubElement(url, f'{{{namespace}}}lastmod').text = profile['updated']
        for image in dict.fromkeys(images):
            node = ET.SubElement(url, f'{{{image_namespace}}}image')
            ET.SubElement(node, f'{{{image_namespace}}}loc').text = profile['site_url'] + '/' + image
    ET.indent(root, space='  ')
    return ET.tostring(root, encoding='utf-8', xml_declaration=True).decode() + '\n'

def asset_redirect_script():
    # GitHub Pages has no configurable HTTP redirects. This only repairs direct
    # browser visits to old award/image URLs; legacy paper/CV PDFs remain files.
    renames = json.loads((ROOT / 'content/asset-renames.json').read_text())
    targets = {entry['from']: entry['to'] for entry in renames['files']
               if entry['compatibility'] == 'browser-redirect'}
    data = json.dumps(targets, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')
    return '<script>const movedAssets=' + data + ';let oldAsset;try{oldAsset=decodeURIComponent(location.pathname.slice(1))}catch{}const newAsset=movedAssets[oldAsset];if(typeof newAsset==="string")location.replace("/"+newAsset+location.search+location.hash);</script>'

def render():
    p = json.loads((ROOT / 'content/profile.json').read_text())
    if p['chinese_name'] != '唐梧遷':
        raise ValueError('Unexpected Chinese name')
    papers = p['publications']
    citations = json.loads((ROOT / 'content/citations.json').read_text())
    if len({paper['id'] for paper in papers}) != len(papers):
        raise ValueError('Duplicate publication identifiers')
    if set(citations) != {paper['id'] for paper in papers}:
        raise ValueError('Citations must match the publication identifiers exactly')
    citation_keys = set()
    for paper in papers:
        citation = citations[paper['id']]
        bibtex = citation['bibtex']
        match = re.match(r'^@(article|inproceedings)\{([A-Za-z0-9:_-]+),\n', bibtex)
        if not match or not bibtex.endswith('}\n') or bibtex.count('{') != bibtex.count('}'):
            raise ValueError(f'Invalid BibTeX entry: {paper["id"]}')
        if match[2] in citation_keys:
            raise ValueError('Duplicate BibTeX citation key')
        citation_keys.add(match[2])
        for field in ['author', 'title', 'year', 'journal' if paper['id'].startswith('j') else 'booktitle']:
            if not re.search(rf'^  {field} = \{{.+\}},?$', bibtex, re.MULTILINE):
                raise ValueError(f'Missing citation field {field}: {paper["id"]}')
        if not citation.get('sources') or not citation.get('verified_on'):
            raise ValueError(f'Citation requires verification provenance: {paper["id"]}')
        if paper['status'] == 'To appear' and 'note = {To appear}' not in bibtex:
            raise ValueError(f'Unpublished citation requires a To appear note: {paper["id"]}')
        dois = [link for link in paper['links'] if link['label'] == 'DOI']
        if paper['status'] != 'To appear' and len(dois) != 1:
            raise ValueError(f'Published paper requires one verified DOI: {paper["id"]}')
        citation_doi = re.search(r'^  doi = \{([^}]+)\}', bibtex, re.MULTILINE)
        expected_doi = dois[0]['url'].removeprefix('https://doi.org/') if dois else None
        if (citation_doi[1] if citation_doi else None) != expected_doi:
            raise ValueError(f'Citation DOI does not match the publication: {paper["id"]}')
        for link in paper['links']:
            if link['label'] == 'DOI' and not re.match(r'^https://doi\.org/10\.\d{4,9}/\S+$', link['url']):
                raise ValueError(f'Invalid DOI URL: {paper["id"]}')
            if link['label'] == 'PDF' and not re.fullmatch(r'files/papers/[A-Za-z0-9_-]+\.pdf', link['url']):
                raise ValueError(f'Paper PDF must be hosted in this repository: {paper["id"]}')
    selected = [paper for paper in papers if paper['selected']]
    others = [paper for paper in papers if not paper['selected']]
    selected.sort(key=lambda paper: ['c17','c15','j1','j2','c3','c1'].index(paper['id']))
    other_html = ''
    for year in sorted({paper['year'] for paper in others}, reverse=True):
        other_html += f'<h3 class="publication-year">{year}</h3>'
        other_html += ''.join(publication(paper, citations[paper['id']]) for paper in others if paper['year'] == year)
    profile_links = ''.join(f'<a href="{esc(link["url"])}">{icon(link["icon"])}<span>{esc(link["label"])}</span></a>' for link in p['profiles'])
    all_awards = p['awards'] + p['earlier_awards'] + p['personal_awards']
    for award_record in all_awards:
        for item in award_record['media']:
            if not re.fullmatch(r'assets/awards/[A-Za-z0-9_-]+/[A-Za-z0-9_-]+-preview\.webp', item.get('preview', '')):
                raise ValueError(f'Award media requires a local WebP preview: {award_record["id"]}')
            if not item.get('alt', '').strip():
                raise ValueError(f'Award media requires an accurate image description: {award_record["id"]}')
    awards_by_id = {a['id']: a for a in all_awards}
    registry = media_data(all_awards)
    news = ''
    for ni, n in enumerate(p['news']):
        if not n['datetime'].startswith('2026-'):
            raise ValueError('Recent News currently includes only 2026')
        resources = []
        for ri, resource in enumerate(n.get('resources', [])):
            a = awards_by_id[resource['award']]
            if 'kind' in resource:
                kind = resource['kind']
                items = [item for item in a['media'] if item['kind'] == kind]
                key = f'{a["id"]}:{kind}'
                if resource.get('term'):
                    key = f'news-{ni}-{ri}'
                    registry[key] = [entry for item, entry in zip(items, registry[f'{a["id"]}:{kind}']) if resource['term'] in item['caption']]
                    items = [item for item in items if resource['term'] in item['caption']]
                if not items:
                    raise ValueError('News media selection is empty')
                group = next(row[1] for row in MEDIA_GROUPS if row[0] == kind)
                resources.append(media_link(a, kind, len(items), f'awards/{a["id"]}.html#{group}', key))
            else:
                link = next(link for link in a['links'] if link['label'] == resource['announcement'])
                resources.append(announcement_link(a, link))
        suffix = ' <span class="news-resources">' + ' '.join(resources) + '</span>' if resources else ''
        news += f'<li><time datetime="{esc(n["datetime"])}">{esc(n["date"])}</time><p>{esc(n["text"])}{suffix}</p></li>'
    research = ''.join(f'<article class="research-item"><span class="research-number" aria-hidden="true">{i:02d}</span><div><h3>{esc(r["title"])}</h3><p>{esc(r["description"])}</p><a href="#paper-{esc(r["paper"])}">{esc(r["work"])}</a></div></article>' for i, r in enumerate(p['research'], 1))
    structured = json.dumps({'@context':'https://schema.org','@type':'Person','name':p['name'],'alternateName':p['chinese_name'],'url':p['site_url'],'jobTitle':p['role'],'affiliation':{'@type':'CollegeOrUniversity','name':p['university']},'sameAs':[link['url'] for link in p['profiles']]}, ensure_ascii=False).replace('<', '\\u003c')
    values = {key.upper(): esc(p[key]) for key in ['name','chinese_name','role','department','university','location','email','updated','site_url']}
    for key, image in p['homepage_images'].items():
        if not image['preview'].endswith('.webp'):
            raise ValueError(f'Homepage photograph requires a WebP preview: {key}')
        values[key.upper() + '_PREVIEW'] = esc(image['preview'])
        values[key.upper() + '_ORIGINAL'] = esc(image['original'])
        values[key.upper() + '_WIDTH'] = image['width']
        values[key.upper() + '_HEIGHT'] = image['height']
        matching = next(item for a in all_awards for item in a['media'] if item['preview'] == image['preview'])
        values[key.upper() + '_ALT'] = esc(matching['alt'])
    values.update(STRUCTURED_DATA=structured, LOCATION_ICON=icon('location'), MAIL_ICON=icon('mail'), DOCUMENT_ICON=icon('document'), PROFILE_LINKS=profile_links, NEWS=news, RESEARCH=research,
        SELECTED_PUBLICATIONS=''.join(publication(paper, citations[paper['id']]) for paper in selected), OTHER_PUBLICATIONS=other_html, MORE_PUBLICATIONS_COUNT=str(len(others)),
        AWARDS=''.join(award(a) for a in p['awards']), EARLIER_AWARDS=''.join(award(a) for a in p['earlier_awards']),
        EDUCATION=''.join(timeline(item) for item in p['education']), EXPERIENCE=''.join(timeline(item) for item in p['experience']),
        COURSES=''.join(f'<li><div><p class="course-name">{esc(c["title"])}</p><p class="course-instructors">{esc(c["instructors"])} · <span class="course-department">{esc(c["department"])}</span></p></div><p class="course-terms">{esc(c["terms"])}</p></li>' for c in p['courses']),
        BADMINTON_LINKS=media_link(p['personal_awards'][0], 'medal', 1, 'awards/badminton-2025.html#medals'),
        MEDIA_DATA=json.dumps(registry, ensure_ascii=False).replace('<', '\\u003c'),
        BADMINTON_ICON=icon('badminton'), SWIM_ICON=icon('swim'), TABLE_TENNIS_ICON=icon('tabletennis'))
    index = Template((ROOT / 'content/homepage.html').read_text()).substitute(values)
    missing = re.findall(r'\$\{\w+\}', index)
    if missing:
        raise ValueError(f'Unrendered content: {missing}')
    not_found = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Wuqian Tang</title><link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png?v=20261003-small-tang"><link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png?v=20261003-small-tang"><link rel="icon" type="image/svg+xml" sizes="any" href="/assets/favicon.svg?v=20261003-small-tang"><link rel="stylesheet" href="/assets/css/main.css"></head><body><main style="max-width:600px;margin:15vh auto;padding:24px"><p class="eyebrow">404</p><h1 style="margin:16px 0">Page not found</h1><p>The page may have moved. You can find my research, publications, and contact details on my homepage.</p><p style="margin-top:24px"><a href="/">Return to homepage</a></p></main></body></html>\n'
    not_found = not_found.replace('</head>', asset_redirect_script() + '</head>')
    sitemap = image_sitemap(p)
    pages = {'index.html':index, '404.html':not_found, '.nojekyll':'', 'robots.txt':f'User-agent: *\nAllow: /\nSitemap: {p["site_url"]}/sitemap.xml\n', 'sitemap.xml':sitemap}
    for a in p['awards'] + p['earlier_awards'] + p['personal_awards']:
        pages[f'awards/{a["id"]}.html'] = gallery(a, p)
    return {name: external_tabs(contents) if name.endswith('.html') else contents for name, contents in pages.items()}

def audit(generated_files):
    assets = json.loads((ROOT / 'content/public-assets.json').read_text())
    paths = [item['path'] for item in assets]
    if len(paths) != len(set(paths)):
        raise ValueError('Duplicate reviewed public asset paths')
    for path in paths:
        if Path(path).is_absolute() or '..' in Path(path).parts:
            raise ValueError(f'Asset must be inside the public directory: {path}')
    allowed = ALLOWED_FILES | set(generated_files) | {item['path'] for item in assets}
    actual = set()
    for path in SITE.rglob('*'):
        if path.is_symlink():
            raise ValueError(f'Symlinks cannot be published: {path}')
        if path.is_file(): actual.add(path.relative_to(SITE).as_posix())
    unexpected = actual - allowed
    missing = allowed - actual
    if unexpected or missing:
        raise ValueError(f'Public files audit failed. Unexpected: {sorted(unexpected)}; missing: {sorted(missing)}')
    for item in assets:
        if hashlib.sha256((SITE / item['path']).read_bytes()).hexdigest() != item['sha256']:
            raise ValueError(f'Reviewed asset changed: {item["path"]}')

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Check that committed pages match public content and the exact file allowlist')
    args = parser.parse_args()
    pages = render()
    for name, contents in pages.items():
        path = SITE / name
        if args.check:
            if not path.exists() or path.read_text() != contents: raise ValueError(f'Stale generated page: {name}')
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(contents)
    audit(pages)
    count = len(json.loads((ROOT / 'content/profile.json').read_text())['publications'])
    print(f'Public site verified: {count} publications; exact public-file allowlist passed.')

if __name__ == '__main__':
    main()
