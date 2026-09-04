/**
 * Campaign + commercial configuration for LP 2 (Free → Premium conversion).
 *
 * Audience: WARM traffic only — signed-in BookSnap users on the free plan who
 * have already snapped books and used Ask AI, and are at or near their monthly
 * limit. Every number and label on the page comes from this file so the growth
 * team can retune the offer without touching a component.
 */

export const APP_URL = 'https://apps.booksnap.ai/'

/**
 * Every CTA on the page goes here: the checkout page shipped alongside this one
 * (`checkout.html`), not straight into the app.
 *
 * ⚠️ That checkout takes no payment. It is a preview of the flow — the card
 * fields are inert and nothing is submitted anywhere. Its button hands the
 * reader to the app, which is where the real Stripe checkout lives
 * (`/profile/subscription/plans` → `/profile/subscription/payment`). Before
 * this page goes in front of real traffic, either wire that checkout up
 * properly or point `UPGRADE_URL` back at `PLANS_URL` below.
 */
export const UPGRADE_URL = '/checkout'

/** The app's own plan picker, where real payment actually happens. */
export const PLANS_URL = `${APP_URL}profile/subscription/plans`

/** Where the checkout hands off — the app's home screen, per its router. */
export const HOME_URL = `${APP_URL}home`

/**
 * The free-tier usage state this page is written against.
 *
 * On the live site these should be hydrated from the signed-in user's actual
 * counters (`window.__BOOKSNAP_USAGE__`, a query string, or an API call) —
 * the momentum framing only works if the numbers are the reader's own. The
 * values below are the fallback for a visitor we can't identify.
 */
export const USAGE = {
  snapsUsed: 3,
  snapsTotal: 3,
  askUsed: 10,
  askTotal: 10,
  periodLabel: 'this month',
}

/**
 * ⚠️ PRICING — CONFIRM BEFORE LAUNCH.
 *
 * Source: https://be.booksnap.ai/api/v1/subscriptions/plans (plans
 * "Premium Monthly" / "Premium Yearly"). That endpoint currently carries
 * test values in some locale rows ($0.50, $0.61, Rp 10.000), and its USD
 * yearly figure ($26.23) contradicts the same plan's own
 * "Save 17% compared to monthly" feature line.
 *
 * What is used here:
 *   USD  — monthly $6.10 (the plan's top-level `price`), annual derived at the
 *          brand's stated 17% saving.
 *   IDR  — annual Rp 429.999 (the plan's top-level `price`), monthly derived
 *          at the same 17% saving.
 * Replace with the finance-confirmed numbers; nothing else needs editing.
 */
export const CURRENCY = 'USD' // 'USD' | 'IDR'

const PRICE_TABLE = {
  USD: {
    trialPrice: '$0',
    monthly: { amount: '$6.10', period: '/month' },
    annual: {
      amount: '$60.99',
      period: '/year',
      perMonth: '$5.08/month, billed annually',
      savePct: 17,
      strike: '$73.20',
    },
    paperback: 'Less than the price of one paperback. Unlimited books all month.',
  },
  IDR: {
    trialPrice: 'Rp 0',
    monthly: { amount: 'Rp 42.999', period: '/bulan' },
    annual: {
      amount: 'Rp 429.999',
      period: '/tahun',
      perMonth: 'Rp 35.833/month, billed annually',
      savePct: 17,
      strike: 'Rp 515.988',
    },
    paperback: 'Less than the price of one paperback. Unlimited books all month.',
  },
}

export const PRICING = PRICE_TABLE[CURRENCY]

/**
 * ⚠️ THE FREE TRIAL — CHECK THE AUDIENCE BEFORE LEAVING THIS ON.
 *
 * The app really does offer this: its onboarding Trial screen reads "Try all
 * features free for 3 days" behind a "Start Free Trial" button, and
 * /stripe/subscribe takes a `trial_days` parameter.
 *
 * But the app gates it on `has_used_trial`, and this page is written for
 * signed-in free-plan users who have already spent a month's snaps and Ask AI
 * questions. A large share of them will have taken the trial during onboarding
 * already, and for those readers a hero promising "$0 today" breaks at
 * checkout — the worst possible place.
 *
 * Set `show: false` to fall back to the annual saving, which is true for
 * everyone, or hydrate `show` per user from the same `has_used_trial` flag the
 * app uses.
 */
export const TRIAL = {
  show: true,
  days: 3,
}

/** Verified brand facts, as published on booksnap.ai. */
export const FACTS = {
  summaries: '500+',
  categories: '20+',
  audioLength: '3–5 min',
}

/**
 * ⚠️ PLACEHOLDER — replace with the real store rating before launch.
 * Set to null to hide the rating badge entirely.
 */
export const RATING = { score: 4.8, count: '2,400', placeholder: true }

/** CTA labels. One primary verb across the page: unlock. */
export const CTA = {
  nav: 'Go Premium',
  hero: 'Unlock Unlimited Snaps',
  pricing: 'Unlock Unlimited Snaps',
  final: 'Unlock Unlimited Snaps',
  reassurance: 'Cancel anytime. No lock-in.',
}
