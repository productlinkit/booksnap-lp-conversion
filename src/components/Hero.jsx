import { CTA, USAGE, RATING, FACTS, PRICING, TRIAL } from '../lib/config'
import { LIBRARY } from '../lib/covers'
import { useCountUp } from '../lib/hooks'
import { Blob, CtaButton, Icon, Stars } from './primitives'
import LibraryPreview from './LibraryPreview'

/**
 * The marquee needs each half to be at least as wide as its container, or the
 * loop shifts to a point where there is nothing left to fill the viewport and
 * the strip appears to end. Nine covers run ~804px against a 1440px container;
 * six sets give each half ~2.4k, which covers any desktop this page will meet.
 * Same nine URLs, so the extra tiles cost one cache hit each.
 */
const MARQUEE = Array.from({ length: 6 }, () => LIBRARY).flat()

/**
 * The drifting icons booksnap.ai scatters behind its hero. Decorative only.
 *
 * All of them sit outside the copy column's footprint. A fourth used to float
 * at `left-[14%] bottom-[12%]`; the three-line headline pushed the CTA down
 * into it, so it is gone rather than nudged — the left column is text-heavy
 * enough that anything drifting behind it will collide again at some width.
 */
const DRIFT = [
  { name: 'auto_stories', className: 'left-[6%] top-[14%] animate-float-1 text-[42px] md:text-[64px]', opacity: 0.22 },
  { name: 'bolt', className: 'right-[8%] top-[10%] animate-float-3 text-[34px] md:text-[52px]', opacity: 0.24 },
  { name: 'headphones', className: 'right-[4%] bottom-[18%] animate-float-2 text-[32px] md:text-[48px]', opacity: 0.18 },
]

/**
 * The proof line. Both figures count up when the row is reached — a number
 * that lands is read; a number that is simply there is skimmed past.
 * `FACTS.summaries` is a string like "500+", so the suffix is kept aside and
 * only the digits are animated.
 */
function ProofRow() {
  const summaries = parseInt(FACTS.summaries, 10)
  const suffix = FACTS.summaries.replace(/[0-9]/g, '')
  const [scoreRef, score] = useCountUp(RATING.score, { decimals: 1 })
  const [booksRef, books] = useCountUp(summaries)

  return (
    <div
      className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-6 text-[13px]"
      style={{ borderColor: 'rgba(0,54,37,0.10)', color: 'var(--color-on-surface-variant)' }}
    >
      <span ref={scoreRef} className="flex items-center gap-2">
        <Stars />
        <span>
          <strong className="tabular-nums" style={{ color: 'var(--color-primary)' }}>
            {score}
          </strong>{' '}
          from {RATING.count} readers
        </span>
      </span>
      <span ref={booksRef} className="flex items-center gap-1.5">
        <Icon name="menu_book" className="text-[16px]" style={{ color: 'var(--color-primary-container)' }} />
        <strong className="tabular-nums" style={{ color: 'var(--color-primary)' }}>
          {books}
          {suffix}
        </strong>{' '}
        summaries
      </span>
    </div>
  )
}

/**
 * What the upgrade costs, stated in the hero.
 *
 * With the trial on it reads as a price that drops to nothing today; with it
 * off it falls back to the annual saving, which holds for every reader. Both
 * numbers come from `config.js` — see the warning above `TRIAL` before leaving
 * the trial framing on for an audience that may already have used it.
 */
function PriceLine() {
  const { monthly, annual, trialPrice } = PRICING

  return (
    <div className="mt-7 flex flex-col items-start gap-2">
      <span
        className="inline-flex flex-wrap items-baseline gap-x-2.5 gap-y-1 rounded-2xl px-4 py-2.5"
        style={{ backgroundColor: 'var(--color-secondary-container)' }}
      >
        <span
          className="text-[15px] line-through"
          style={{ color: 'var(--color-primary-container)', opacity: 0.75 }}
        >
          {TRIAL.show ? monthly.amount : annual.strike}
        </span>
        <span className="text-[26px] font-extrabold leading-none sm:text-[30px]" style={{ color: 'var(--color-primary)' }}>
          {TRIAL.show ? trialPrice : annual.amount}
        </span>
        <span className="text-[14px] font-semibold" style={{ color: 'var(--color-primary-container)' }}>
          {TRIAL.show ? `for your first ${TRIAL.days} days` : `${annual.period} · save ${annual.savePct}%`}
        </span>
      </span>

      <span className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--color-on-surface-variant)' }}>
        <Icon name="check_circle" className="text-[16px]" style={{ color: 'var(--color-primary-container)' }} />
        {TRIAL.show
          ? `Then ${monthly.amount}${monthly.period}. ${CTA.reassurance}`
          : `${annual.perMonth}. ${CTA.reassurance}`}
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-10 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
      {/* One soft wash behind the fold, plus the site's drifting glyphs. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[680px]">
        <Blob className="left-[8%] top-[-60px] h-72 w-72" color="var(--color-secondary-container)" opacity={0.5} data-parallax="0.10" />
        <Blob className="right-[6%] top-[40px] h-80 w-80" color="var(--color-tertiary-fixed)" opacity={0.42} data-parallax="0.17" />
        <Blob className="left-[38%] top-[280px] h-64 w-64" color="var(--color-primary-fixed)" opacity={0.35} data-parallax="0.06" />
        {DRIFT.map((d) => (
          <Icon
            key={d.name}
            name={d.name}
            className={`absolute hidden md:block ${d.className}`}
            style={{ color: 'var(--color-primary-container)', opacity: d.opacity }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-8 md:px-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14 xl:gap-20">
        <div className="fade-left flex flex-col items-start">
          {/* The reader's own counter, stated before anything is sold. */}
          <p
            className="cta-sheen inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-bold sm:text-[13px]"
            style={{ backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-tertiary-container)' }}
          >
            <Icon name="bolt" className="shrink-0 text-[17px]" />
            <span>
              You&rsquo;ve snapped {USAGE.snapsUsed} of {USAGE.snapsTotal} free books {USAGE.periodLabel}
            </span>
          </p>

          <h1 className="rsp-hero-h1 mt-5 font-extrabold" style={{ color: 'var(--color-primary)' }}>
            <span className="rl">
              <span>Unlimited Books.</span>
            </span>
            <span className="rl">
              <span>Unlimited Ask AI.</span>
            </span>
            <span className="rl">
              <span>One Upgrade.</span>
            </span>
          </h1>

          {/* The headline now says "unlimited books" and "unlimited Ask AI"
              itself, so the subheadline carries what it does not: the rest of
              what the upgrade opens. */}
          <p className="rsp-hero-p mt-5 max-w-xl" style={{ color: 'var(--color-on-surface-variant)' }}>
            One upgrade lifts every cap on your account — and adds offline downloads, HD ad-free
            audio, and early access to every new release.
          </p>

          {/* The price, before the button rather than three sections below it.
              A reader at their limit is deciding whether this is worth paying
              for; making them scroll to find out is a needless step. */}
          <PriceLine />

          {/* `flex-wrap` + `whitespace-nowrap`: on a ~450px column (1024px
              viewport) the second button drops to its own line rather than
              breaking either label across two lines mid-phrase. */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CtaButton location="hero" size="lg" className="cta-sheen w-full whitespace-nowrap sm:w-auto">
              <Icon name="lock_open" className="text-[19px]" />
              {CTA.hero}
            </CtaButton>
            <CtaButton
              href="#compare"
              variant="outline"
              size="lg"
              location="hero-compare"
              className="w-full whitespace-nowrap sm:w-auto"
            >
              See what&rsquo;s locked
            </CtaButton>
          </div>

          {RATING && <ProofRow />}
        </div>

        <div className="fade-right stagger-2 w-full">
          {/* An inner wrapper for the parallax transform: putting it on the
              reveal element itself would fight the reveal's own transform. */}
          <div data-parallax="-0.045">
            <LibraryPreview />
          </div>
        </div>
      </div>

      {/* The catalogue sliding past, as the thing the limit is holding shut.
          Covers are the real ones from the BookSnap API. */}
      {/* Reveal and parallax must not share an element — both write `transform`,
          and the scroll loop would overwrite the reveal's rise. */}
      <div className="fade-up stagger-3 relative mt-14 lg:mt-20">
        <div data-parallax="-0.03">
          <p
            className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {FACTS.summaries} snaps · {FACTS.categories} categories · waiting behind your limit
          </p>
          <div className="marquee">
            <div className="marquee-track" aria-hidden="true">
              {MARQUEE.map((book, i) => (
                <img
                  key={`${book.title}-${i}`}
                  src={book.cover}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="cover-hover h-[104px] w-auto shrink-0 rounded-xl object-cover sm:h-[132px]"
                  style={{ boxShadow: '0 8px 24px rgba(0,54,37,0.12)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
