export const NAV_LINKS = [
  { label: "What's locked", href: '#compare' },
  { label: 'Plans', href: '#pricing' },
  { label: 'Ask AI', href: '#ask-ai' },
  { label: 'Reviews', href: '#reviews' },
]

/**
 * The plan comparison.
 *
 * ⚠️ SOURCED, NOT WRITTEN. Every value below is transcribed from BookSnap's
 * own data — the `features` arrays on
 * https://be.booksnap.ai/api/v1/subscriptions/plans for the Free, Premium and
 * Pro plans, and the app's plan screen for the two Ask AI lines. An earlier
 * version of this table was invented ("3 snaps per month", "10 Ask AI per
 * month" for free) and none of it holds up:
 *
 *   - The free plan is not a monthly quota. The API describes it as "Access to
 *     free books only", "Read & listen with ads", "Basic bookmarks (max 10)",
 *     "Standard audio quality" — a catalogue and quality restriction, not a
 *     counter.
 *   - Premium does not lift the Ask AI cap. The app's Premium card reads
 *     "Experience with ASK.AI 10 chats monthly"; "Full experience with ASK.AI"
 *     is a Pro line.
 *
 * Which is why there are three columns now. Do not add a row without a source.
 */
export const COMPARISON = [
  {
    icon: 'library_books',
    feature: 'Library access',
    free: 'Free titles only',
    premium: 'Every book',
    pro: 'Every book',
    freeHas: 'partial',
    note: 'Premium unlocks unlimited access to the whole catalogue.',
  },
  {
    icon: 'forum',
    feature: 'Ask AI',
    free: '10 chats per month',
    premium: '10 chats per month',
    pro: 'Full experience',
    freeHas: 'partial',
    premiumHas: 'partial',
    note: 'Only Pro removes the monthly chat cap.',
  },
  {
    icon: 'block',
    feature: 'Ads',
    free: 'Read and listen with ads',
    premium: 'Ad-free',
    pro: 'Ad-free',
    freeHas: false,
    note: 'Nothing interrupting a snap or its audio.',
  },
  {
    icon: 'download_for_offline',
    feature: 'Offline downloads',
    free: 'No',
    premium: 'Yes',
    pro: 'Yes',
    freeHas: false,
    note: 'Snaps and audio on the plane, the metro, the treadmill.',
  },
  {
    icon: 'graphic_eq',
    feature: 'Audio quality',
    free: 'Standard',
    premium: 'HD',
    pro: 'HD',
    freeHas: 'partial',
    note: 'Studio-quality narration.',
  },
  {
    icon: 'bookmark',
    feature: 'Bookmarks',
    free: '10 max',
    premium: 'Unlimited',
    pro: 'Unlimited',
    freeHas: 'partial',
    note: 'Keep every passage worth coming back to.',
  },
  {
    icon: 'new_releases',
    feature: 'Early access to new releases',
    free: 'No',
    premium: 'Yes',
    pro: 'Yes',
    freeHas: false,
    note: 'New snaps land in your library first.',
  },
  {
    icon: 'devices',
    feature: 'Multi-device sync',
    free: 'No',
    premium: 'Yes',
    pro: 'Yes',
    freeHas: false,
    note: 'Start on your phone, finish on the web.',
  },
  {
    icon: 'auto_awesome',
    feature: 'AI recommendations and reading plans',
    free: 'No',
    premium: 'No',
    pro: 'Yes',
    freeHas: false,
    premiumHas: false,
    note: 'Personalised plans, analytics and Super Premium titles.',
  },
  {
    icon: 'support_agent',
    feature: 'Customer support',
    free: 'Standard',
    premium: 'Priority',
    pro: 'VIP',
    freeHas: 'partial',
    note: 'Someone answers, and sooner.',
  },
]

/** What the Premium plan actually ships — used on the pricing cards. */
export const PREMIUM_FEATURES = [
  'Unlimited Book Snaps, every month',
  'Unlimited Ask AI follow-ups',
  'The full library, including Premium-only titles',
  'Offline downloads for snaps and audio',
  'HD audio, completely ad-free',
  'Early access to new releases',
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
