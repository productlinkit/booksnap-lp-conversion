import { USAGE } from './config'

export const NAV_LINKS = [
  { label: "What's locked", href: '#compare' },
  { label: 'Plans', href: '#pricing' },
  { label: 'Ask AI', href: '#ask-ai' },
  { label: 'Reviews', href: '#reviews' },
]

/**
 * Free vs Premium.
 *
 * `free` / `premium` are short enough to survive a 375px phone column without
 * wrapping to three lines; `note` carries the detail the row can't hold.
 * Feature claims are the ones the Premium plan already makes in the
 * catalogue API — nothing here is invented.
 */
export const COMPARISON = [
  {
    icon: 'auto_stories',
    feature: 'Book Snaps',
    free: `${USAGE.snapsTotal} per month`,
    premium: 'Unlimited',
    freeHas: 'partial',
    note: 'Every summary in the library, as often as you want it.',
  },
  {
    icon: 'forum',
    feature: 'Ask AI questions',
    free: `${USAGE.askTotal} per month`,
    premium: 'Unlimited',
    freeHas: 'partial',
    note: 'Keep asking until the idea actually lands.',
  },
  {
    icon: 'download_for_offline',
    feature: 'Offline downloads',
    free: 'No',
    premium: 'Yes',
    freeHas: false,
    note: 'Snaps and audio on the plane, the metro, the treadmill.',
  },
  {
    icon: 'new_releases',
    feature: 'Early access to new releases',
    free: 'No',
    premium: 'Yes',
    freeHas: false,
    note: 'New snaps land in your library first.',
  },
  {
    icon: 'library_books',
    feature: 'Library access',
    free: 'Free titles only',
    premium: 'The full catalogue',
    freeHas: 'partial',
    note: 'Including every Premium-only title.',
  },
  {
    icon: 'graphic_eq',
    feature: 'HD audio recaps',
    free: 'Standard',
    premium: 'HD, ad-free',
    freeHas: 'partial',
    note: 'Studio-quality narration with nothing interrupting it.',
  },
  {
    icon: 'devices',
    feature: 'Multi-device sync',
    free: 'No',
    premium: 'Yes',
    freeHas: false,
    note: 'Start on your phone, finish on the web.',
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
