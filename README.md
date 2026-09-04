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
│   ├── LibraryPreview.jsx  the blocked ⇄ running phone pair in the hero
│   ├── Comparison.jsx      Free vs Premium (table ≥ md, stacked cards below)
│   ├── Pricing.jsx         monthly vs annual, annual recommended
│   ├── AskAI.jsx           Ask AI deep dive + the real Ask AI screen
│   ├── Testimonial.jsx     reviews + trust strip
│   ├── FinalCTA.jsx        closing momentum push (deliberately bare)
│   ├── Footer.jsx
│   └── primitives.jsx      Icon, CtaButton, SectionLabel, SectionHead, Stars,
│                           Phone (device frame), Blob, Flower
├── lib/
│   ├── config.js           ⚠️ pricing, usage counters, CTA labels, URLs
│   ├── content.js          comparison rows, benefits, reviews, trust items
│   ├── covers.js           catalogue covers (local copies + source URLs)
│   └── hooks.js            useReveal, useScrolled, useInView, media queries
├── styles/index.css        design tokens + shared motion/type classes
├── App.jsx
└── main.jsx
```

Static art lives in `public/`:

```
public/
├── app/                    production BookSnap captures, both 739×1600 — the
│   ├── screen-limit.png    same Ask AI screen in its two states. screen-limit
│   └── screen-chat.png     is blocked: counter red at 10/10, "Free limit
│                           reached", composer dead. screen-chat is running:
│                           suggestions offered, send button live. The hero
│                           shows them side by side (limit drained and
│                           padlocked); Ask AI shows screen-limit in colour.
├── covers/                 nine catalogue covers, 420px-tall JPEGs, 152KB for
│                           the set. The API serves them at print resolution —
│                           7.1MB for the nine, against a 104px tile — so they
│                           are no longer loaded live. `source` in covers.js
│                           keeps each original URL for refreshing.
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

Type is Plus Jakarta Sans throughout — headings separate themselves by weight
(800) and size, not by family — with Material Symbols Outlined for icons. Both
load from Google Fonts in `index.html`; no icon library is added as a
dependency. Inter was loaded alongside it and used for body copy; it is gone,
which also removes a webfont request. (Worth knowing: the production
booksnap.ai bundle imports Inter too and never applies it — `font-family:Inter`
appears nowhere in its compiled CSS.)

The motion and surface vocabulary in `index.css` is mirrored from the same
build, with the site's own durations and easings:

| Class | What it is |
| --- | --- |
| `.animate-float-1…5` | the five-phase organic drift on phones, chips, ornaments |
| `.glass-card` | the frosted stat chip (opacity raised to 0.86 — these sit over photographic screenshots, not flat colour) |
| `.shell` | the `28px → 48px` rounded panel every section sits inside |
| `.phone` | device bezel + notch around a screen capture; `.phone-locked` drains it and drops the scrim |
| `.marquee` | the seamless cover strip (two halves, `-50% - gap/2`, paused on hover). Each half must be **wider than the container** or the loop runs out of covers and the strip appears to end — nine covers were 804px against a 1440px container, hence six sets |
| `.converge` | per-item arrival from its own direction, via `--cx` / `--cy` |
| `.cta-sheen` | one slow pass of light, reserved for the primary CTA |
| `.fade-up` / `.fade-left` / `.fade-right` / `.fade-scale` / `.fade-row` + `.stagger-*` | the scroll reveals — two-column sections arrive from their own edges, table rows cascade |
| `.hover-rise`, `.cover-hover` | pointer response on review cards and catalogue covers |
| `.nav-progress` | the reading-progress hairline inside the nav pill |

Scroll-linked motion lives in `lib/hooks.js`:

- `useParallax()` — one rAF-throttled scroll loop for the whole page. Layers
  opt in with `data-parallax="<factor>"`; positive trails the scroll, negative
  leads it. Skipped below `md` and under reduced motion.
- `useScrollProgress()` — drives the nav hairline.
- `useCountUp()` — the proof figures ramp in when their row is reached.

Everything above is switched off under `prefers-reduced-motion`.

⚠️ Reveal and parallax must never share an element: both write `transform`, and
the scroll loop would overwrite the reveal's own offset. Wrap one inside the
other, as the hero marquee and the two mockup columns do.

The `.fade-*` hidden states are scoped to `.js-reveal`, a class `main.jsx` adds
only when `IntersectionObserver` exists. A browser without it renders the page
fully visible instead of leaving everything below the fold blank.

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
5. **The mockups are real product captures.** They are the only images on the
   page that are not catalogue covers, which load live from the API.
   ⚠️ Do not source new screens from the booksnap.ai bundle: `hero-right` and
   `how-04` there are only 236×512, and scaling them up adds no detail — an
   earlier version of this page shipped exactly that soft, upscaled mockup.
   Take captures from the app at device resolution instead — both files in use
   came in at 1500×3248 and are cut to 739×1600, which covers a 3× display at
   the ~210px the hero renders them.

   ⚠️ `screen-chat.png` carries "2/10 questions used" in its header. It sits
   under the hero's Premium label, beside a meter reading "Unlimited". At
   ~210px the line is a few pixels tall and unreadable, but it is a real
   contradiction: replace it with a capture from an account where the counter
   is absent as soon as one exists.
6. The page is `noindex` — it is an in-app / retargeting destination and should
   not compete with booksnap.ai in search.

## Responsive

Verified by rendering at 1440 / 1280 / 768 / 390 / 320 px: `documentElement.scrollWidth`
equals the viewport at 320px, so there is no horizontal scroll anywhere. The
comparison table becomes stacked per-feature cards below `md`; the recommended
annual plan is ordered first on phones while staying on the right at desktop;
the floating chips, background glyphs and the final CTA's phones are all
`sm`/`md`-and-up only, because at phone width they would cover the copy.

Two things to know before you try to verify this with headless Chrome:

1. It clamps its viewport to a minimum of 500px, so `--window-size=390`
   silently renders at 500 and crops. Render the page inside a fixed-width
   `<iframe>` to measure narrow layouts, and serve the harness from the same
   origin or `contentDocument` is blocked.
2. Under `--virtual-time-budget` it does not run the rendering loop at all. A
   control page with nothing but a scroll listener, an IntersectionObserver and
   a `requestAnimationFrame` loop reports `scrollEvents=0 ioHits=0 rafTicks=1`
   after a programmatic scroll. **Scroll-triggered behaviour — the reveals, the
   parallax, the progress hairline, the count-ups — cannot be verified there.**
   Only the mount-time state can. Check the motion in a real browser.
