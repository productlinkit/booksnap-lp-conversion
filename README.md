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

## Pages

Two static entries, not a client router — the checkout survives being
deep-linked or refreshed on any host, and costs no routing dependency:

| Entry | Route | What it is |
| --- | --- | --- |
| `index.html` → `src/main.jsx` | `/` | the landing page |
| `start.html` → `src/start.jsx` | `/start` | the sign-up flow |
| `checkout.html` → `src/checkout.jsx` | `/checkout` | the Payment Method screen (**takes no payment**) |

The click path is `/` → `/start` → `/checkout` → `apps.booksnap.ai/home`, or
`/start` → the app directly via "Continue Without Plan".

The two background shapes are the app's own overlay PNGs, copied to
`public/auth/` from the files its sign-in screen loads, and they slide in from
either side on the same 0.8s ease-out the app uses. The input shape matches too
— label inside the box above the value — as does the grey `#828486` disabled
button. Chip height is measured from the app's capture (54px on a 750px-wide 2×
screenshot, so ~27 CSS px), not estimated.

`/checkout` is the app's Payment Method screen, measured off its capture rather
than eyeballed: page `#e3e7e8`, fields 58px tall with 18px between them and a
1.5px `#1e5341` border, 26px page padding, and the total as a white sheet
pinned to the bottom. It has no background overlays — that screen is flat grey
— so it does not use `FlowShell`.

The two sign-up screens are dressed by `src/components/flow.jsx` — the phone-width
panel, the two washes, the two-line heading with its last word in green, the
pill buttons — so the checkout is the last screen of the same flow rather than
a page in the landing page's clothes.

`/start` rebuilds the app's own onboarding — categories, reading vibe, plan —
with an email step added in the middle, so a reader arriving from this page
meets the flow they would have met in the app. Colours are sampled from the
app's screens rather than guessed: `#379777` for the accented word, `#276b54`
for the buttons, `#f4f9f7` and `#fdf6d5` for the two washes. The washes live
inside the 430px column, not the page — sized against full desktop width they
swallow the screen — which also gives the flow a phone-shaped panel on desktop.

Nothing in the flow is submitted anywhere. The email field accepts typing
because a flow you cannot fill in is not a flow, but the value stays in
component state; there is no backend to send it to.

`vercel.json` sets `cleanUrls`, so `/checkout` resolves without the extension.

⚠️ **The checkout takes no payment.** It looks finished, but every field is
`readOnly` — they render as the app's empty state and accept nothing — nothing
is bound to state, and the page makes no network call of any kind. The button hands off to `apps.booksnap.ai/home`, and
real payment happens in the app behind a signed-in session.

**Leave the fields inert until there is a real integration.** A checkout that
accepts typing gets given real card numbers by real people, and this project
has no backend, no Stripe key and no session to hold them safely; inert fields
mean no card data can be entered at all, so none can leak. Making it charge
needs Stripe Elements, the publishable key and an authenticated
`/stripe/subscribe` call — separate work. Until then `UPGRADE_URL` can point
back at `PLANS_URL` to send readers straight to the app's own checkout.

## Structure

```
src/
├── components/
│   ├── Navbar.jsx          floating pill nav, progress hairline, Go Premium
│   ├── Hero.jsx            usage counter → headline → CTA → cover marquee
│   ├── LibraryPreview.jsx  the blocked ⇄ running phone pair in the hero
│   ├── Checkout.jsx        the checkout preview (no payment is taken)
│   ├── Start.jsx           the four-step sign-up flow
│   ├── flow.jsx            shell shared by Start and Checkout
│   ├── Comparison.jsx      Free vs Premium (table ≥ md, stacked cards below)
│   ├── Pricing.jsx         monthly vs annual, annual recommended
│   ├── AskAI.jsx           Ask AI deep dive
│   ├── AskAiChat.jsx       the Ask AI mock, played rather than photographed —
│   │                       `variant="free"` ends at the limit banner,
│   │                       `variant="premium"` answers again instead
│   ├── Testimonial.jsx     reviews + trust strip
│   ├── FinalCTA.jsx        closing momentum push (deliberately bare)
│   ├── Footer.jsx
│   └── primitives.jsx      Icon, CtaButton, SectionLabel, SectionHead, Stars,
│                           Phone (device frame), Blob, Flower
├── lib/
│   ├── config.js           ⚠️ pricing, usage counters, CTA labels, URLs
│   ├── content.js          comparison rows, benefits, reviews, trust items
│   ├── covers.js           catalogue covers (local copies + source URLs)
│   ├── onboarding.js       ⚠️ flow content + the app's real plan copy
│   └── hooks.js            useReveal, useScrolled, useInView, media queries
├── styles/index.css        design tokens + shared motion/type classes
├── App.jsx
├── main.jsx                entry for index.html
├── start.jsx               entry for start.html
└── checkout.jsx            entry for checkout.html
```

Static art lives in `public/`:

```
public/
├── app/
│   └── cover-thumb.png     the book cover in the Ask AI mock's header, cropped
│                           out of the app's own limit capture. The two full
│                           screenshots that used to live here are gone: the
│                           hero and the Ask AI section run the conversation
│                           live now (AskAiChat.jsx), so half a megabyte of
│                           unused PNG was shipping for nothing.
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
2. **⚠️ THE PLAN CONTENT IS SOURCED — THE HERO IS NOT.** `PLANS` in
   `onboarding.js` and `COMPARISON` in `content.js` are both transcribed from
   BookSnap's own plan cards, so the pricing section, the comparison, the
   sign-up flow and the checkout can never disagree with each other. They do
   still disagree with the hero. Free is a **preview**, not a monthly quota —
   its card reads "Limited preview of book summaries" and "Upgrade anytime".
   Nothing supports "3 snaps per month", which `USAGE` in `config.js` invents
   and the hero, the meters and the final CTA all repeat. Decide what the real
   free limit is and set `USAGE` from it, or drop the counter framing.

   Two numbers still need confirming, both flagged in `onboarding.js`: the
   **yearly** prices are derived at the advertised 20% because no confirmed
   yearly price exists (the API implies 27–28%), and the plan card says "50+
   book summaries" where an earlier capture — and `FACTS.summaries` on this
   page — says 500+.
3. **⚠️ THE APP'S PLAN SCREEN CONTRADICTS THIS PAGE, TWICE.** Both lines below
   are transcribed from the app's own plan screen into `src/lib/onboarding.js`,
   left as the app states them rather than quietly reconciled:

   - **Price.** The app sells Premium at **$2.99/month** and Pro at
     **$5.99/month**. `PRICE_TABLE` in `config.js` says $6.10/month for
     Premium, from the catalogue API. They cannot both be right.
   - **Ask AI.** The app's Premium card reads *"Experience with ASK.AI 10 chats
     monthly"* — the same allowance this page calls the **free** limit.
     *"Full experience with ASK.AI"* is a **Pro** line. So this page's headline
     promise, unlimited Ask AI, is a Pro feature, not a Premium one.

   A reader who upgrades on this page's promise and lands on Premium would find
   the counter still running. Either retarget the page at Pro or correct the
   claims before it goes in front of traffic.
4. **⚠️ The hero advertises the 3-day free trial.** The app really offers it —
   its onboarding Trial screen says "Try all features free for 3 days" and
   `/stripe/subscribe` takes `trial_days` — but the app gates it on
   `has_used_trial`, and this page is written for people who have been using
   the free plan long enough to exhaust it. Many will have already taken the
   trial, and for them "$0 today" breaks at checkout. `TRIAL.show` in
   `config.js` turns it off, falling back to the annual saving, which is true
   for everyone; better still, hydrate it per user from the same flag.
5. **CTAs point at `/start`**, the flow above. `PLANS_URL` in `config.js` still
   holds the app's own plan picker for sending readers straight there instead.
   App links are language-prefixed (`/en/home`, `/en/profile/...`): its router
   carries a `/:lang/*` catch-all and the unprefixed paths only redirect into
   it, so the prefixed form skips a hop.
6. **The usage counters should be hydrated per user.** `USAGE` in `config.js` is
   the fallback for a visitor we can't identify — the momentum framing only
   works if "3 of 3" is the reader's own number.
7. **Every CTA carries `data-cta="<section>"`**, so GA4 can attribute the
   upgrade to the section that earned it from one delegated listener.
8. **Reviews are the six already published on booksnap.ai**, unedited. None of
   them has been rewritten to mention Premium. `PRICING_QUOTE_INDEX` picks the
   one quoted beside the price; the reviews board drops it so no quote appears
   twice.
9. **The mockups are real product captures.** They are the only images on the
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
10. The page is `noindex` — it is an in-app / retargeting destination and should
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
