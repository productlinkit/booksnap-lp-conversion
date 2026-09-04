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
│   ├── Hero.jsx            usage counter → headline → CTA → cover marquee
│   ├── LibraryPreview.jsx  the locked ⇄ unlocked phone pair in the hero
│   ├── Comparison.jsx      Free vs Premium (table ≥ md, stacked cards below)
│   ├── Pricing.jsx         monthly vs annual, annual recommended
│   ├── AskAI.jsx           Ask AI deep dive + the real Ask AI screen
│   ├── Testimonial.jsx     reviews + trust strip
│   ├── FinalCTA.jsx        closing momentum push
│   ├── Footer.jsx
│   └── primitives.jsx      Icon, CtaButton, SectionLabel, SectionHead, Stars,
│                           Phone (device frame), Blob, Flower
├── lib/
│   ├── config.js           ⚠️ pricing, usage counters, CTA labels, URLs
│   ├── content.js          comparison rows, benefits, reviews, trust items
│   ├── covers.js           real catalogue covers, used by the hero marquee
│   └── hooks.js            useReveal, useScrolled, useInView, media queries
├── styles/index.css        design tokens + shared motion/type classes
├── App.jsx
└── main.jsx
```

Static art lives in `public/`:

```
public/
├── app/                    production booksnap.ai screen captures — the page's
│   ├── screen-reading.png  mockups are the real app, not drawings of it.
│   ├── screen-book.png     All four are 415×900, so they pair without
│   ├── screen-askai.png    distortion. screen-askai already shows the
│   └── screen-audio.png    in-product question counter.
├── flower-1.png            the site's cut-paper ornaments, re-cut to RGBA:
└── flower-2.png            the originals ship an opaque ground that would
                            render as a pale rectangle on the dark panels.
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

The motion and surface vocabulary in `index.css` is mirrored from the same
build, with the site's own durations and easings:

| Class | What it is |
| --- | --- |
| `.animate-float-1…5` | the five-phase organic drift on phones, chips, ornaments |
| `.glass-card` | the frosted stat chip (opacity raised to 0.86 — these sit over photographic screenshots, not flat colour) |
| `.shell` | the `28px → 48px` rounded panel every section sits inside |
| `.phone` | device bezel + notch around a screen capture; `.phone-locked` drains it and drops the scrim |
| `.marquee` | the seamless cover strip (two halves, `-50%`, paused on hover) |
| `.cta-sheen` | one slow pass of light, reserved for the primary CTA |
| `.fade-up` + `.stagger-*` | the scroll reveal |

Everything above is switched off under `prefers-reduced-motion`.

⚠️ `.phone` sets `position: relative` from plain (unlayered) CSS, which outranks
Tailwind's `absolute` utility. To place a `<Phone>` absolutely — as the final
CTA does — wrap it in a positioned `<div>` rather than passing `absolute` to it.

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
4. **Reviews are the six already published on booksnap.ai**, unedited. None of
   them has been rewritten to mention Premium. `PRICING_QUOTE_INDEX` picks the
   one quoted beside the price; the reviews board drops it so no quote appears
   twice.
5. **The mockups are real product captures**, pulled from the booksnap.ai
   build. They are the only images on the page that are not the reader's own
   catalogue covers, which are loaded live from the API.
6. The page is `noindex` — it is an in-app / retargeting destination and should
   not compete with booksnap.ai in search.

## Responsive

Verified by rendering at 1440 / 1280 / 768 / 390 / 320 px: `documentElement.scrollWidth`
equals the viewport at 320px, so there is no horizontal scroll anywhere. The
comparison table becomes stacked per-feature cards below `md`; the recommended
annual plan is ordered first on phones while staying on the right at desktop;
the floating chips, background glyphs and the final CTA's phones are all
`sm`/`md`-and-up only, because at phone width they would cover the copy.

Note when checking this yourself: headless Chrome clamps its viewport to a
minimum of 500px, so `--window-size=390` silently renders at 500 and crops.
Render the page inside a fixed-width `<iframe>` to measure narrow layouts, and
serve the harness from the same origin or `contentDocument` is blocked.
