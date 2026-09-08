export const NAV_LINKS = [
  { label: 'The limits', href: '#compare' },
  { label: 'Plans', href: '#pricing' },
  { label: 'Ask AI', href: '#ask-ai' },
  { label: 'Reviews', href: '#reviews' },
]

/**
 * The plan comparison.
 *
 * ⚠️ SUPPLIED BY THE PRODUCT OWNER. This table is transcribed from the
 * breakdown they gave, and it is the authority — above the plan cards, above
 * the catalogue API, and above anything inferred from either. It settled two
 * things I had wrong in opposite directions:
 *
 *   - Free's Ask AI limit is **one book**, not ten questions per book. That
 *     matches the "Book limit reached" state in the app's Ask AI screen, which
 *     I had seen and misread as a second cap on top of the question counter.
 *   - Audiobook, AI recommendations and early access genuinely are **absent**
 *     on Free. An earlier version of this table called them "limited" after
 *     over-correcting from the opposite mistake of calling Ask AI absent.
 *
 * The lesson, since it cost two passes: a marketing card omitting a line
 * proves nothing either way. Ask, or read the product's own code. Do not infer.
 */
export const COMPARISON = [
  {
    icon: 'auto_stories',
    feature: 'Book summary',
    free: 'Preview only',
    premium: 'Full, 500+ titles',
    pro: 'Full, 500+ titles',
    freeHas: 'partial',
    note: 'Free opens the first part of a snap; the paid plans open all 500+ in full.',
  },
  {
    icon: 'forum',
    feature: 'Ask AI',
    free: 'One book only',
    premium: '10 chats a month, every book',
    pro: 'Unlimited, every book',
    freeHas: 'partial',
    premiumHas: 'partial',
    note: 'Free can question a single book. Only Pro drops the count.',
  },
  {
    icon: 'headphones',
    feature: 'Audiobook',
    free: 'Not included',
    premium: 'Full access',
    pro: 'Full access',
    freeHas: false,
    note: 'Every snap narrated, for the commute and the treadmill.',
  },
  {
    icon: 'auto_awesome',
    feature: 'AI recommendations',
    free: 'Not included',
    premium: 'Included',
    pro: 'Smarter, personalised',
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
