# tolie.space

Christianto Lie’s little town: a walk-around portfolio drawn on a canvas. No build step, no dependencies.

```
public/                 the whole site, deploy this folder as-is
  index.html            markup + meta tags (SEO, share preview)
  css/style.css         all styles
  js/content.js         THE WORDS: profile, links, projects, skills, career, dialog text
  js/plain.js           plain view (tolie.space/#plain), built from content.js
  js/game.js            the town: world, rendering, input, contact form
  assets/               avatar, favicon, share image (og.png)
```

## Editing

Almost every change is in `public/js/content.js`:

- `C` — name, role, links. Set `C.cv` to a PDF path to show “Download CV” links.
- `CAREER` — work history. While it is empty, the site points to LinkedIn instead.
- `PROJECTS`, `SKILLS` — shown on the office desks, the whiteboard and the plain view.
- `DL` — what each object in the town says.

## Run locally

```bash
python3 -m http.server 8000 --directory public
```

Then open http://localhost:8000 (or http://localhost:8000/#plain for the plain view).
