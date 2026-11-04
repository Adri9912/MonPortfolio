"""Check the static prototype's local resources and navigation targets."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parent

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.targets, self.links = set(), []
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.targets, f"Duplicate id: {attrs['id']}"
            self.targets.add(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])

pages = {p: Page(p.read_text()) for p in ROOT.glob('*.html')}
for path, page in pages.items():
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        assert target.is_relative_to(ROOT), f'Outside project: {link}'
        assert target.is_file(), f'Missing resource in {path.name}: {link}'
        if url.fragment:
            assert target in pages and url.fragment in pages[target].targets, f'Missing anchor: {link}'
    assert 'dn-menu' in page.targets
    assert 'contenu' in page.targets
print(f'OK: {len(pages)} pages, all local links, anchors and assets exist.')
