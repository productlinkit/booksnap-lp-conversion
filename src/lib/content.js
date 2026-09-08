export const NAV_LINKS = [
  { label: "What's locked", href: '#compare' },
  { label: 'Plans', href: '#pricing' },
  { label: 'Ask AI', href: '#ask-ai' },
  { label: 'Reviews', href: '#reviews' },
]

/**
 * The plan comparison.
 *
 * ⚠️ SOURCED, NOT WRITTEN. Every value is transcribed from BookSnap's own plan
 * cards — the same three that `PLANS` in `onboarding.js` carries — so the table
 * and the pricing section can never say different things. Do not add a row
 * without a source.
 *
 * What the cards actually say, and why this table looks the way it does:
 *
 *   - Free is a **preview**, not a monthly quota. Its card reads "Limited
 *     preview of book summaries" and "Upgrade anytime". Nothing anywhere
 *     supports "3 snaps per month", which `USAGE` in `config.js` invents and
 *     the hero still repeats.
 *   - Ask AI is on the free plan, counted, not absent. Read from the app's own
 *     Ask AI screen rather than inferred: it takes `limits.tier`,
 *     `limits.max_questions` and `limits.can_ask` from the API, and the branch
 *     that renders the star and the word "Unlimited" is literally
 *     `"pro" === tier`. Every other tier — free and Premium alike — renders
 *     `${used}/${max_questions} questions used`. The count is per book, and a
 *     separate "Book limit reached" state caps how many books can be asked
 *     about at all. The capture of a free account reads 10/10, and Premium's
 *     card says 10 chats, so Premium does not lift that cap; Pro does. Hence
 *     three columns.
 *   - The catalogue API describes the same plans differently again
 *     ("Unlimited access to ALL books", "Ad-free", "Basic bookmarks (max 10)").
 *     The cards are what a reader is actually shown, so the cards win here.
 *
 * ⚠️ A "No" in the free column means the line is not on that plan's card, which
 * is not the same as verified absence — an earlier version of this table said
 * Ask AI was "Not included" on free purely because the card does not list it,
 * and the app disagreed. Check the app before turning an omission into a No.
 */
export const COMPARISON = [
  {
    icon: 'auto_stories',
    feature: 'Book summaries',
    free: 'Limited preview',
    premium: '50+ summaries',
    pro: '50+ summaries',
    freeHas: 'partial',
    note: 'Free opens a preview of each snap; the paid plans open the whole thing.',
  },
  {
    icon: 'forum',
    feature: 'Ask AI',
    free: '10 questions per book',
    premium: '10 chats',
    pro: 'Unlimited',
    freeHas: 'partial',
    premiumHas: 'partial',
    note: 'The count is per book. Only the Pro tier shows "Unlimited" in the app.',
  },
  {
    icon: 'headphones',
    feature: 'Text and audiobook',
    free: 'Preview only',
    premium: 'Full access',
    pro: 'Full access',
    freeHas: 'partial',
    note: 'Read it or listen to it, whichever suits the moment.',
  },
  {
    icon: 'auto_awesome',
    feature: 'AI recommendations',
    free: 'No',
    premium: 'Yes',
    pro: 'Smarter personalisation',
    freeHas: false,
    note: 'Pro tunes them to how you actually read.',
  },
  {
    icon: 'new_releases',
    feature: 'Early access to new summaries',
    free: 'No',
    premium: 'No',
    pro: 'Yes',
    freeHas: false,
    premiumHas: false,
    note: 'New snaps land in a Pro library first.',
  },
  {
    icon: 'payments',
    feature: 'Price',
    free: '$0',
    premium: '$2.99 / month',
    pro: '$5.99 / month',
    freeHas: 'partial',
    note: 'Or 20% less a month on the yearly plan.',
  },
]

/** Why unlimited Ask AI is the upgrade, not a bigger book allowance. */
export const ASK_AI_BENEFITS = [
  {
    icon: 'psychology_alt',
    title: 'Ask follow-ups until it clicks',
    desc: 'No question budget to ration. Push on the part you did not get, three times if you need to.',
  },
  {
    icon: 'lightbulb',
    title: 'Pull the idea into your own work',
    desc: '"How would this apply to a team of four?" turns a summary into something you can use on Monday.',
  },
  {
    icon: 'compare_arrows',
    title: 'Connect books to each other',
    desc: 'Ask how Atomic Habits and Deep Work disagree, and get an answer grounded in both snaps.',
  },
]

/**
 * All six reviews as published on booksnap.ai, unedited. None has been
 * rewritten to mention Premium: putting words about a paid plan into a named
 * reader's mouth is not something a landing page gets to do.
 *
 * `tilt` mirrors the slight rotation the site gives each review card, so the
 * block reads as a pinned board rather than a grid of boxes.
 */
export const TESTIMONIALS = [
  {
    initials: 'SJ',
    name: 'Sarah Jenkins',
    role: 'Product Manager',
    quote:
      'BookSnap has completely changed how I consume information. I read 3 books a week now during my commute.',
    tint: 'var(--color-secondary-container)',
    tilt: '-1.5deg',
  },
  {
    initials: 'ER',
    name: 'Elena Rodriguez',
    role: 'Marketing Director',
    quote:
      'The Ask AI feature is a game-changer. Whenever I need to recall a specific framework from a book, I just ask.',
    tint: 'var(--color-primary-fixed)',
    tilt: '1.5deg',
  },
  {
    initials: 'DC',
    name: 'David Chen',
    role: 'Entrepreneur',
    quote:
      "The audio quality is phenomenal. It doesn't sound like a robot reading text. Highly recommend for busy professionals.",
    tint: 'var(--color-tertiary-fixed)',
    tilt: '2deg',
  },
  {
    initials: 'SA',
    name: 'Sophia Al-Kindi',
    role: 'Graduate Student',
    quote:
      "It's like having a personal tutor for every non-fiction book I own. The AI insights are incredibly sharp.",
    tint: 'var(--color-secondary-container)',
    tilt: '-2deg',
  },
  {
    initials: 'MT',
    name: 'Marcus Thorne',
    role: 'Tech Lead',
    quote:
      'The StoryFlow summaries are a masterpiece of information density. I can stay updated on my industry in minutes.',
    tint: 'var(--color-primary-fixed)',
    tilt: '1deg',
  },
  {
    initials: 'JL',
    name: 'Jordan Lee',
    role: 'Creative Director',
    quote:
      "The UI is a breath of fresh air. It's rare to find an app that is both this powerful and this beautiful.",
    tint: 'var(--color-tertiary-fixed)',
    tilt: '-1deg',
  },
]

/** The one quoted beside the price. Excluded from the reviews board below it. */
export const PRICING_QUOTE_INDEX = 1

export const TRUST = [
  { icon: 'lock', label: 'Secure payment', sub: 'Processed by Stripe' },
  { icon: 'event_repeat', label: 'Cancel anytime', sub: 'No lock-in, no fees' },
  { icon: 'shield', label: 'Privacy protected', sub: 'Your reading stays yours' },
  { icon: 'devices', label: 'Works everywhere', sub: 'Phone, tablet and web' },
]
