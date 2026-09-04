# BookSnap LP 2 — Free → Premium

A conversion landing page for **warm traffic only**: signed-in BookSnap users on
the free plan who have already snapped books, already used Ask AI, and are at or
near their monthly limit. The whole page argues one thing — *don't let a limit
stop the run you're already on*.

Built with React 19 + Vite 8 + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint     # oxlint
```

## Structure

```
src/
├── components/
│   ├── Navbar.jsx          fixed nav, "Free plan" chip, Go Premium CTA
│   ├── Hero.jsx            usage counter → headline → CTA → reassurance
│   ├── LibraryPreview.jsx  the locked ⇄ unlocked hero visual
│   ├── Comparison.jsx      Free vs Premium (table ≥ md, stacked cards below)
│   ├── Pricing.jsx         monthly vs annual, annual recommended
│   ├── AskAI.jsx           Ask AI deep dive + in-product conversation mock
│   ├── Testimonial.jsx     reviews + trust strip
│   ├── FinalCTA.jsx        closing momentum push
│   ├── Footer.jsx
│   └── primitives.jsx      Icon, CtaButton, SectionLabel, SectionHead, Stars
├── lib/
│   ├── config.js           ⚠️ pricing, usage counters, CTA labels, URLs
│   ├── content.js          comparison rows, benefits, chat script, reviews
│   ├── covers.js           real catalogue covers used by the hero visual
│   └── hooks.js            useReveal, useScrolled, useInView, media queries
├── styles/index.css        design tokens + shared motion/type classes
├── App.jsx
└── main.jsx
```

## Design system

Tokens in `src/styles/index.css` are mirrored from the live booksnap.ai build
(verified against its production stylesheet), so this page reads as one more
screen of the product rather than a campaign microsite:

| Token | Value | Used for |
| --- | --- | --- |
| `--color-primary` | `#003625` | headlines, dark sections |
| `--color-primary-container` | `#1a4d3a` | icons, secondary ink |
| `--color-secondary-container` | `#a4f4bf` | accents, AI avatar, trust icons |
| `--color-primary-fixed` | `#b9eed4` | section labels |
| `--color-tertiary-fixed` | `#ffe08f` | the primary CTA pill, focus ring |
| `--color-surface` / `-lowest` | `#fcf8fb` / `#ffffff` | page and card grounds |

Type is Plus Jakarta Sans (display) over Inter (body), both loaded from Google
Fonts in `index.html`, with Material Symbols Outlined for icons — the same three
faces the production site ships. No icon library is added as a dependency.

## Things worth knowing before launch

1. **Pricing is unconfirmed.** `src/lib/config.js` documents exactly where each
   number comes from and why the catalogue API's own figures contradict each
   other. Replace `PRICE_TABLE`; nothing else needs editing. `CURRENCY` switches
   the page between the USD and IDR tables.
2. **The usage counters should be hydrated per user.** `USAGE` in `config.js` is
   the fallback for a visitor we can't identify — the momentum framing only
   works if "3 of 3" is the reader's own number.
3. **Every CTA carries `data-cta="<section>"`**, so GA4 can attribute the
   upgrade to the section that earned it from one delegated listener.
4. **Reviews are the ones already published on booksnap.ai**, unedited. None of
   them has been rewritten to mention Premium.
5. The page is `noindex` — it is an in-app / retargeting destination and should
   not compete with booksnap.ai in search.

## Responsive

Verified at 1440 / 1280 / 1024 / 768 / 430 / 390 / 375 / 320 px: no horizontal
overflow, no clipped labels, no overlap, no console errors. The comparison table
becomes stacked per-feature cards below `md`, and the recommended annual plan is
ordered first on phones while staying on the right at desktop.
