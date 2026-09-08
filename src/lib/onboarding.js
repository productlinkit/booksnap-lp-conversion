/**
 * Content for the sign-up flow at `/start`.
 *
 * The three personalisation screens are rebuilt from the BookSnap app's own
 * onboarding — same headings, same options, same order — so a reader who
 * arrives from this landing page meets the flow they would have met in the
 * app. The email step in the middle is the one addition.
 *
 * ⚠️ PLAN CONTENT IS THE APP'S, NOT THIS PAGE'S. The benefit lines and prices
 * below are transcribed from the app's plan screen, and they do not agree with
 * what this landing page sells. See the note above `PLANS`.
 */

/** The chips on "What do You Love to Read?". */
export const CATEGORIES = [
  { id: 'self-improvement', label: 'Self-Improvement', icon: 'self_improvement' },
  { id: 'fiction', label: 'Fiction', icon: 'rocket_launch' },
  { id: 'psychology', label: 'Psychology', icon: 'psychology' },
  { id: 'biography', label: 'Biography', icon: 'history_edu' },
  { id: 'romance', label: 'Romance', icon: 'favorite' },
  { id: 'philosophical', label: 'Philosophical', icon: 'cloud' },
  { id: 'sci-fi', label: 'Sci-Fi', icon: 'satellite_alt' },
  { id: 'fantasy', label: 'Fantasy/Myth', icon: 'auto_awesome' },
  { id: 'crime', label: 'Crime/Thriller', icon: 'local_police' },
  { id: 'business', label: 'Business Development', icon: 'work' },
]

/** The rows on "Set Your Reading Vibe". */
export const VIBES = [
  'Explore fresh book ideas',
  'Collect meaningful insights',
  'Watch quick book recaps',
  'Track your favorite reads',
  'Stay motivated to read every day',
  'Explore stories from around the world',
  'Learn something new',
]

/**
 * The three plans, transcribed from the app's own plan screen — taglines and
 * feature lines word for word, including "All Premium feature" in the
 * singular, which is how the app writes it.
 *
 * ⚠️ PRICES AND SAVINGS ARE NOT FULLY CONFIRMED.
 *
 *   - The monthly prices ($0 / $2.99 / $5.99) and every feature line are
 *     transcribed from BookSnap's own plan screens.
 *   - The **yearly** figures are derived at the 20% the design states, because
 *     no confirmed yearly price exists. The catalogue API disagrees with all of
 *     it: it reports Premium Monthly at $6.10 (and $0.61 in its `en` row),
 *     Premium Yearly at $26.23, Pro Yearly at $51.85 — which works out at 27%
 *     and 28% off, not 20%. Replace `price.yearly` and `yearlyTotal` with the
 *     finance-confirmed numbers; nothing else needs editing.
 *   - Settled: it is **500+ book summaries**. A pricing mockup said "50+";
 *     the app's own plan screen says 500+, twice, which also agrees with
 *     `FACTS.summaries` on this page.
 *
 * ⚠️ AND NOTE WHAT PREMIUM ACTUALLY BUYS. Its card reads "Experience with
 * ASK.AI — 10 chats", the same allowance the free plan has. "Full experience
 * with ASK.AI" is a **Pro** line. This page's headline promise, unlimited Ask
 * AI, is therefore a Pro feature. Left as the app states it rather than
 * quietly reconciled.
 */
export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Start exploring BookSnap for free.',
    price: { monthly: '$0', yearly: '$0' },
    yearlyTotal: '$0',
    currency: 'USD',
    tone: 'mint',
    features: ['Limited preview of book summaries', 'Upgrade anytime to unlock full access'],
    trial: null,
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Learn faster with Premium Plan.',
    price: { monthly: '$2.99', yearly: '$2.39' },
    yearlyTotal: '$28.70',
    currency: 'USD',
    tone: 'gold',
    badge: 'Best deal',
    cta: 'Subscribe Now',
    features: [
      'Experience with ASK.AI 10 chats monthly',
      '500+ book summaries',
      'Full access to all text and audiobook',
      'Get AI recommendations',
    ],
    trial: {
      days: 3,
      badge: '3 Days Free Trial',
      price: '$0',
      strike: '$2.99 USD',
      then: 'Then $2.99 / month',
      // The app's own line on its Payment Method screen.
      blurb: 'Unlock the full story library and start crafting your own magical tales',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Understand deeper with Pro Plan.',
    price: { monthly: '$5.99', yearly: '$4.79' },
    yearlyTotal: '$57.50',
    currency: 'USD',
    tone: 'dark',
    cta: 'Upgrade to Pro',
    features: [
      'All Premium feature',
      'Full experience with ASK.AI',
      'Smarter AI personalization',
      'Early access to newest summary',
    ],
    trial: null,
  },
]

/** The saving the yearly toggle advertises. See the warning above. */
export const YEARLY_SAVE_PCT = 20
