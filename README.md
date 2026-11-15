# tolie.space

Christianto Lie’s little town: a walk-around portfolio drawn on a canvas. No build step, no dependencies.

```
public/                 the whole site, deploy this folder as-is
  index.html            markup + meta tags (SEO, share preview)
  css/style.css         all styles
  js/content.js         THE WORDS: profile, links, projects, skills, career, dialog text, Indonesian
  js/core.js            language switch (EN / ID) and optional analytics
  js/plain.js           plain view (tolie.space/#plain), built from content.js
  js/game.js            the town: world, rendering, input, discoveries, contact form
  assets/               avatar, favicon, share image (og.jpg)
```

## Editing

Almost every change is in `public/js/content.js`:

- `C` — name, role, links. Set `C.cv` to a PDF path to show “Download CV” links.
- `CAREER` — work history. While it is empty, the site points to LinkedIn instead.
- `PROJECTS`, `SKILLS` — shown on the office desks, the whiteboard and the plain view.
- `DL` — what each object in the town says.
- `PLACE_INFO` — the one-line description of each place in the town guide (map board, **M** key).
- `ID` — the Indonesian version. `ID.dl` mirrors `DL`; `ID.str` translates every other piece of
  text, keyed by its English wording. Anything missing falls back to English.

## Plain view links

- `tolie.space/#plain` opens the plain view. `#experience`, `#projects`, `#writing`, `#skills`,
  `#education` and `#interests` open it at that section.
- “Save as PDF” in the plain view (or printing the site from anywhere) gives a two-page résumé.

## Latest blog posts

The writing desk and the plain view show the three newest posts from `C.feed`
(`blog.tolie.space/feed.xml`). The browser only allows that if the blog says so, so add two
lines to the blog block in `/etc/caddy/Caddyfile`, then `systemctl reload caddy`:

```
blog.tolie.space {
    encode zstd gzip
    @feed path /feed.xml
    header @feed Access-Control-Allow-Origin https://tolie.space
    reverse_proxy 127.0.0.1:8788
}
```

Until then (or if the blog is down) the posts are simply not shown.

## Run locally

```bash
python3 -m http.server 8000 --directory public
```

Then open http://localhost:8000 (or http://localhost:8000/#plain for the plain view).

## Deploy

```bash
git push                                             # from the laptop
cd /var/www/tolie.space/tolie-space && git pull      # on the droplet
```

When CSS or JS changed, bump the `?v=` number on the `<link>` and `<script>` tags in
`index.html` first, so returning visitors don’t keep the old cached files.

## Visitor stats (optional)

The site can report to a self-hosted [Umami](https://umami.is): page views plus the events
`start`, `enter` (building), `open` (object), `goal`, `quest-done`, `found-all`, `plain`, `lang`
and `contact-sent`. Nothing is loaded until it is configured.

1. Run Umami on the droplet (its docs have a ready Docker Compose file with PostgreSQL) on a
   local port, for example `127.0.0.1:8790`.
2. Add a DNS record for `stats.tolie.space` and a Caddy block:
   ```
   stats.tolie.space {
       reverse_proxy 127.0.0.1:8790
   }
   ```
3. In Umami, add the website `tolie.space` and copy its website ID.
4. Fill in `ANALYTICS` in `content.js`:
   ```js
   const ANALYTICS={src:'https://stats.tolie.space/script.js',websiteId:'<the id>'};
   ```
