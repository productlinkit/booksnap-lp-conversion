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
 * ⚠️ TWO CONFLICTS WITH THE LANDING PAGE, BOTH TRANSCRIBED FROM THE APP.
 *
 * 1. Price. The app's plan screen sells Premium at $2.99/month and Pro at
 *    $5.99/month. `PRICE_TABLE` in config.js says $6.10/month for Premium,
 *    taken from the catalogue API. They cannot both be right.
 *
 * 2. Ask AI. The app's Premium card reads "Experience with ASK.AI 10 chats
 *    monthly" — the same allowance the landing page calls the free-plan limit.
 *    "Full experience with ASK.AI" is a **Pro** line. The landing page's
 *    headline promise, unlimited Ask AI, is therefore a Pro feature, not a
 *    Premium one.
 *
 * Left exactly as the app states it rather than quietly reconciled: a reader
 * who upgrades on this page's promise and lands on the app's Premium plan
 * would find the counter still running.
 */
export const PLANS = [
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Learn faster with Premium Plan.',
    price: '$0',
    currency: 'USD',
    strike: '$2.99 USD',
    then: 'Then $2.99 / month',
    badge: '3 Days Free Trial',
    // The app's own line on its Payment Method screen.
    blurb: 'Unlock the full story library and start crafting your own magical tales',
    benefits: [
      'Experience with ASK.AI 10 chats monthly',
      '500+ book summaries',
      'Full access to all text and audiobook',
      'Get AI recommendations',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Understand deeper with Pro Plan.',
    price: '$5.99',
    currency: 'USD',
    strike: null,
    then: null,
    badge: null,
    blurb: 'Understand deeper with Pro — the full Ask AI experience and smarter personalisation.',
    benefits: [
      'All Premium feature',
      'Full experience with ASK.AI',
      'Smarter AI personalization',
      'Early access to newest summary',
    ],
  },
]
