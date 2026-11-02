# FoodTech Insight — editorial website

Single-page editorial site for **FoodTech Insight**, the official E-magazine of the
Sabaragamuwa University Food Science and Technology Association (SUFSTA).

Built with React 19 + Vite. No UI libraries; styling is hand-written CSS using the
project's green editorial palette and Playfair Display / Manrope typography.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # preview the build
```

## Content

All content is sourced from the Volume 1, Issue 2 (August 2026) PDF and lives in `src/data/`:

- `articles.js` — the 26 articles (titles, authors, affiliations, PDF page numbers, descriptions drawn from each article's opening text).
- `team.js` — chief editor, editorial board, editorial assistants and reviewers (page 2 of the magazine).
- `magazine.js` — edition metadata, contact details and the editor's note quote.

Images in `public/images/` are extracted from the magazine PDF. The downloadable PDF is
`public/FoodTech-Insight-Vol1-Issue2.pdf`; "Read Article" links open it at the article's page.
