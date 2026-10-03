#!/usr/bin/env python3
"""Render only explicitly reviewed public content; never scan the parent archive."""
import argparse
import hashlib
import html
import json
import re
from pathlib import Path
from string import Template

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site'
ALLOWED_FILES = {
    'index.html', '404.html', '.nojekyll', 'robots.txt', 'sitemap.xml',
    'assets/favicon.svg', 'assets/css/main.css', 'assets/js/main.js',
    'assets/images/profile.jpg',
    'assets/images/hsing-chien-2025.jpg', 'assets/images/badminton-2025.jpg',
    'files/Wuqian_Tang_CV.pdf',
}

def esc(value):
    return html.escape(str(value), quote=True)

def icon(name):
    shapes = {
        'location': '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
        'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
        'document': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
        'scholar': '<path d="m2 8 10-5 10 5-10 5Z"/><path d="M6 10v6c4 3 8 3 12 0v-6M22 8v7"/>',
        'github': '<path d="M9 19c-4 1-4-2-6-2M15 22v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4a5 5 0 0 0-.1-3.2s-1.3-.4-4.2 1.6a14.5 14.5 0 0 0-7.5 0C4.6.4 3.3.8 3.3.8A5 5 0 0 0 3.2 4a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.5 6.6 6.8 7A3.5 3.5 0 0 0 7.5 18v4"/>',
        'book': '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1ZM12 5v15"/>',
        'linkedin': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M11 17v-7M11 13c0-4 6-4 6 0v4"/><circle cx="7" cy="7" r=".6"/>',
        'badminton': '<ellipse cx="9" cy="8" rx="5" ry="6" transform="rotate(-35 9 8)"/><path d="m12 13 7 8M6 4l6 8M4 8l7-4M7 13l7-5"/>',
        'swim': '<path d="M2 19c2-2 4 2 6 0s4 2 6 0 4 2 8 0M2 15c2-2 4 2 6 0s4 2 6 0 4 2 8 0M5 11l5-5 6 4 3 3M10 6l-4-3"/><circle cx="18" cy="6" r="2"/>',
        'tabletennis': '<path d="M15 16 6 7M6 7a7 7 0 1 1 9 9l-4 5-4-4 4-4"/><circle cx="20" cy="20" r="2"/>',
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + shapes[name] + '</svg>'

def authors(text):
    return esc(text).replace('Wuqian Tang*', '<strong>Wuqian Tang*</strong>').replace('Wuqian Tang,', '<strong>Wuqian Tang</strong>,')

def publication(p):
    links = ''.join(f'<a href="{esc(link["url"])}" aria-label="{esc(link["label"])} for {esc(p["title"])}">{esc(link["label"])}</a>' for link in p['links'])
    status = f'<span class="publication-status">{esc(p["status"])}</span>' if p.get('status') else ''
    return f'''<article class="publication" id="paper-{esc(p['id'])}">
      <div class="publication-meta"><span class="venue-badge">{esc(p['acronym'])} {p['year']}</span><span class="publication-label">[{esc(p['label'])}]</span>{status}</div>
      <h3>{esc(p['title'])}</h3><p class="publication-authors">{authors(p['authors'])}</p>
      <p class="publication-venue">{esc(p['venue'])} · {esc(p['details'])}</p>
      {('<div class="paper-links">' + links + '</div>') if links else ''}</article>'''

def award(a):
    detail = '<p class="award-detail">' + esc(a['detail']) + '</p>' if a.get('detail') else ''
    return f'<li id="award-{esc(a["id"])}"><span class="award-date">{esc(a["date"])}</span><div><p class="award-title">{esc(a["title"])}</p>{detail}{award_links(a)}</div></li>'

MEDIA_GROUPS = [
    ('photo', 'photos', 'Photo', 'Photos'),
    ('certificate', 'certificates', 'Certificate', 'Certificates'),
    ('trophy', 'trophies', 'Trophy', 'Trophies'),
    ('plaque', 'plaques', 'Plaque', 'Plaques'),
    ('medal', 'medals', 'Medal', 'Medals'),
]

def award_links(a, local_gallery=False):
    links = []
    for kind, group, singular, plural in MEDIA_GROUPS:
        count = sum(item['kind'] == kind for item in a['media'])
        if count:
            href = f'#{group}' if local_gallery else f'awards/{a["id"]}.html#{group}'
            label = singular if count == 1 else plural
            links.append(f'<a href="{esc(href)}" aria-label="{esc(label + " for " + a["title"])}">[{label}]</a>')
    for link in a.get('links', []):
        links.append(f'<a href="{esc(link["url"])}" aria-label="{esc(link.get("description", link["label"]) + " for " + a["title"])}">[{esc(link["label"])}]</a>')
    return '<div class="award-links">' + ''.join(links) + '</div>'

def gallery(a, profile):
    sections = ''
    for kind, group, singular, plural in MEDIA_GROUPS:
        items = [item for item in a['media'] if item['kind'] == kind]
        if not items:
            continue
        cards = ''
        for i, item in enumerate(items, 1):
            preview = '../' + item.get('preview', item['url'])
            original = '../' + item['url']
            caption = item['caption']
            open_label = 'Open PDF' if item['url'].endswith('.pdf') else 'Open original'
            cards += f'''<figure class="gallery-card"><a class="gallery-image-link" href="{esc(preview)}" data-photo="{esc(caption)}" data-gallery="{group}" aria-label="View {esc(caption)} {i} for {esc(a['title'])}"><img src="{esc(preview)}" alt="{esc(caption + ' for ' + a['title'])}" loading="lazy" decoding="async" width="{item['width']}" height="{item['height']}"></a><figcaption><span>{esc(caption)}</span><a href="{esc(original)}">{open_label}</a></figcaption></figure>'''
        sections += f'<section class="gallery-section" id="{group}" aria-labelledby="{group}-title"><h2 id="{group}-title">{plural}<span class="gallery-count">{len(items)}</span></h2><div class="award-gallery-grid">{cards}</div></section>'
    values = dict(NAME=esc(profile['name']), TITLE=esc(a['title']), DATE=esc(a['date']), DETAIL=esc(a['detail']),
        CANONICAL=esc(profile['site_url'] + '/awards/' + a['id'] + '.html'),
        HOME=esc('../#award-' + a['id']), LINKS=award_links(a, local_gallery=True), SECTIONS=sections)
    return Template((ROOT / 'content/award-gallery.html').read_text()).substitute(values)

def timeline(item):
    detail = '<p class="timeline-detail">' + esc(item['detail']) + '</p>' if item.get('detail') else ''
    return f'<article class="timeline-item"><div class="timeline-top"><h4>{esc(item["title"])}</h4><span class="timeline-date">{esc(item["date"])}</span></div><p class="timeline-institution">{esc(item["institution"])}</p>{detail}</article>'

def render():
    p = json.loads((ROOT / 'content/profile.json').read_text())
    if p['chinese_name'] != '唐梧遷':
        raise ValueError('Unexpected Chinese name')
    papers = p['publications']
    if len({paper['id'] for paper in papers}) != len(papers):
        raise ValueError('Duplicate publication identifiers')
    for paper in papers:
        dois = [link for link in paper['links'] if link['label'] == 'DOI']
        if paper['status'] != 'To appear' and len(dois) != 1:
            raise ValueError(f'Published paper requires one verified DOI: {paper["id"]}')
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
        other_html += ''.join(publication(paper) for paper in others if paper['year'] == year)
    profile_links = ''.join(f'<a href="{esc(link["url"])}">{icon(link["icon"])}<span>{esc(link["label"])}</span></a>' for link in p['profiles'])
    news = ''
    for n in p['news']:
        link = n.get('link')
        suffix = f' <a href="{esc(link["url"])}">{esc(link["label"])}</a>' if link else ''
        news += f'<li><time datetime="{esc(n["datetime"])}">{esc(n["date"])}</time><p>{esc(n["text"])}{suffix}</p></li>'
    research = ''.join(f'<article class="research-item"><span class="research-number" aria-hidden="true">{i:02d}</span><div><h3>{esc(r["title"])}</h3><p>{esc(r["description"])}</p><a href="#paper-{esc(r["paper"])}">{esc(r["work"])}</a></div></article>' for i, r in enumerate(p['research'], 1))
    structured = json.dumps({'@context':'https://schema.org','@type':'Person','name':p['name'],'alternateName':p['chinese_name'],'url':p['site_url'],'jobTitle':p['role'],'affiliation':{'@type':'CollegeOrUniversity','name':p['university']},'sameAs':[link['url'] for link in p['profiles']]}, ensure_ascii=False).replace('<', '\\u003c')
    values = {key.upper(): esc(p[key]) for key in ['name','chinese_name','role','department','university','location','email','updated','site_url']}
    values.update(STRUCTURED_DATA=structured, LOCATION_ICON=icon('location'), MAIL_ICON=icon('mail'), DOCUMENT_ICON=icon('document'), PROFILE_LINKS=profile_links, NEWS=news, RESEARCH=research,
        SELECTED_PUBLICATIONS=''.join(publication(paper) for paper in selected), OTHER_PUBLICATIONS=other_html, MORE_PUBLICATIONS_COUNT=str(len(others)),
        AWARDS=''.join(award(a) for a in p['awards']), EARLIER_AWARDS=''.join(award(a) for a in p['earlier_awards']),
        EDUCATION=''.join(timeline(item) for item in p['education']), EXPERIENCE=''.join(timeline(item) for item in p['experience']),
        COURSES=''.join(f'<li><div><p class="course-name">{esc(c["title"])}</p><p class="course-instructors"><span class="course-department">{esc(c["department"])}</span> · {esc(c["instructors"])}</p></div><p class="course-terms">{esc(c["terms"])}</p></li>' for c in p['courses']),
        BADMINTON_LINKS=award_links(p['personal_awards'][0]),
        BADMINTON_ICON=icon('badminton'), SWIM_ICON=icon('swim'), TABLE_TENNIS_ICON=icon('tabletennis'))
    index = Template((ROOT / 'content/homepage.html').read_text()).substitute(values)
    missing = re.findall(r'\$\{\w+\}', index)
    if missing:
        raise ValueError(f'Unrendered content: {missing}')
    not_found = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Wuqian Tang</title><link rel="icon" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/css/main.css"></head><body><main style="max-width:600px;margin:15vh auto;padding:24px"><p class="eyebrow">404</p><h1 style="margin:16px 0">Page not found</h1><p>The page may have moved. You can find my research, publications, and contact details on my homepage.</p><p style="margin-top:24px"><a href="/">Return to homepage</a></p></main></body></html>\n'
    sitemap = f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{esc(p["site_url"])}/</loc><lastmod>{esc(p["updated"])}</lastmod></url></urlset>\n'
    pages = {'index.html':index, '404.html':not_found, '.nojekyll':'', 'robots.txt':f'User-agent: *\nAllow: /\nSitemap: {p["site_url"]}/sitemap.xml\n', 'sitemap.xml':sitemap}
    for a in p['awards'] + p['earlier_awards'] + p['personal_awards']:
        pages[f'awards/{a["id"]}.html'] = gallery(a, p)
    return pages

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
