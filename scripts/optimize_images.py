#!/usr/bin/env python3
"""Create WebP previews from reviewed public images; retain every original byte.

Requires Pillow with WebP support. Run when public photo assets change, then
run scripts/build.py. The deployment uses committed previews and needs no Pillow.
"""
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageOps, features

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site'
RESAMPLE = getattr(Image, 'Resampling', Image).LANCZOS


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    if not features.check('webp'):
        raise RuntimeError('Pillow requires WebP encoding support')
    profile = json.loads((ROOT / 'content/profile.json').read_text())
    manifest = json.loads((ROOT / 'content/public-assets.json').read_text())
    reviewed = {entry['path']: entry for entry in manifest}
    media = [item for award in profile['awards'] + profile['earlier_awards'] + profile['personal_awards'] for item in award['media']]
    records = []
    for item in media:
        source = item.get('preview_source', item.get('preview', item['url']))
        if source not in reviewed or digest(SITE / source) != reviewed[source]['sha256']:
            raise ValueError(f'Preview input must be a reviewed, unchanged public image: {source}')
        if Path(source).suffix.lower() != '.jpg':
            raise ValueError(f'Expected JPEG image or existing PDF preview: {source}')
        target = str(Path(item['url']).with_suffix('')) + '-preview.webp'
        limit = 1400 if 'badminton-2025/' in target else 1800 if item['kind'] == 'certificate' else 1600
        quality = 90 if item['kind'] == 'certificate' else 86
        with Image.open(SITE / source) as image:
            # Bake EXIF orientation into the preview pixels; originals remain untouched.
            image = ImageOps.exif_transpose(image).convert('RGB')
            image.thumbnail((limit, limit), RESAMPLE)
            image.save(SITE / target, 'WEBP', quality=quality, method=6)
            width, height = image.size
        item.update(preview_source=source, preview=target, width=width, height=height)
        record = dict(path=target, source=source, source_sha256=digest(SITE / source),
                      source_bytes=(SITE / source).stat().st_size, bytes=(SITE / target).stat().st_size,
                      width=width, height=height, max_edge=limit, quality=quality)
        records.append(record)
        entry = dict(path=target, sha256=digest(SITE / target), derived_from=source,
                     source_sha256=record['source_sha256'], width=width, height=height,
                     encoding=f'WebP quality {quality}, method 6, EXIF-transposed, max edge {limit}px')
        if target in reviewed:
            reviewed[target].update(entry)
        else:
            manifest.append(entry)
            reviewed[target] = entry
    by_url = {item['url']: item for item in media}
    homepage = {
        'hsinchu': ('assets/awards/hsinchu-youth-2026/2026-hsinchu-outstanding-youth-photo-2.jpg', 'assets/awards/hsinchu-youth-2026/2026-hsinchu-outstanding-youth-photo-2.jpg'),
        'hsing_chien': ('assets/images/2025-hsing-chien-photo-1.jpg', 'assets/awards/hsing-chien-2025/2025-hsing-chien-photo-1.jpg'),
        'badminton': ('assets/images/2025-badminton-photo-1.jpg', 'assets/awards/badminton-2025/2025-badminton-photo-1.jpg'),
    }
    profile['homepage_images'] = {}
    for name, (original, alias) in homepage.items():
        if digest(SITE / original) != digest(SITE / alias):
            raise ValueError(f'Homepage image is not the reviewed gallery original: {original}')
        item = by_url[alias]
        profile['homepage_images'][name] = dict(original=original, preview=item['preview'], width=item['width'], height=item['height'])
    report = dict(before_preview_bytes=sum(r['source_bytes'] for r in records),
                  after_preview_bytes=sum(r['bytes'] for r in records), image_count=len(records), images=records)
    (ROOT / 'content/profile.json').write_text(json.dumps(profile, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'content/public-assets.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'content/image-previews.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(f"Prepared {len(records)} previews: {report['before_preview_bytes']:,} → {report['after_preview_bytes']:,} bytes. Originals unchanged.")
    for r in records:
        if 'assets/awards/badminton-2025/' in r['path'] and '-photo-' in r['path']:
            print(f"Badminton: {r['source_bytes']:,} → {r['bytes']:,} bytes; {r['width']}×{r['height']}")


if __name__ == '__main__':
    main()
