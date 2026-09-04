import { CTA, USAGE, RATING, FACTS } from '../lib/config'
import { LIBRARY } from '../lib/covers'
import { Blob, CtaButton, Icon, Stars } from './primitives'
import LibraryPreview from './LibraryPreview'

/** The drifting icons booksnap.ai scatters behind its hero. Decorative only. */
const DRIFT = [
  { name: 'auto_stories', className: 'left-[6%] top-[14%] animate-float-1 text-[42px] md:text-[64px]', opacity: 0.22 },
  { name: 'bolt', className: 'right-[8%] top-[10%] animate-float-3 text-[34px] md:text-[52px]', opacity: 0.24 },
  { name: 'forum', className: 'left-[14%] bottom-[12%] animate-float-4 text-[30px] md:text-[46px]', opacity: 0.18 },
  { name: 'headphones', className: 'right-[4%] bottom-[18%] animate-float-2 text-[32px] md:text-[48px]', opacity: 0.18 },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-10 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
      {/* One soft wash behind the fold, plus the site's drifting glyphs. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[680px]">
        <Blob className="left-[8%] top-[-60px] h-72 w-72" color="var(--color-secondary-container)" opacity={0.5} />
        <Blob className="right-[6%] top-[40px] h-80 w-80" color="var(--color-tertiary-fixed)" opacity={0.42} />
        <Blob className="left-[38%] top-[280px] h-64 w-64" color="var(--color-primary-fixed)" opacity={0.35} />
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
        <div className="fade-up flex flex-col items-start">
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
              <span>You&rsquo;ve Outgrown</span>
            </span>
            <span className="rl">
              <span>the Free Plan.</span>
            </span>
          </h1>

          <p className="rsp-hero-p mt-5 max-w-xl" style={{ color: 'var(--color-on-surface-variant)' }}>
            Keep the momentum going. Premium gives you unlimited Book Snaps, unlimited Ask AI
            questions, offline downloads and early access to every new release.
          </p>

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

          <p
            className="mt-4 flex items-center gap-1.5 text-[13px]"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            <Icon name="check_circle" className="text-[16px]" style={{ color: 'var(--color-primary-container)' }} />
            {CTA.reassurance}
          </p>

          {RATING && (
            <div
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-6 text-[13px]"
              style={{ borderColor: 'rgba(0,54,37,0.10)', color: 'var(--color-on-surface-variant)' }}
            >
              <span className="flex items-center gap-2">
                <Stars />
                <span>
                  <strong style={{ color: 'var(--color-primary)' }}>{RATING.score}</strong> from{' '}
                  {RATING.count} readers
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="menu_book" className="text-[16px]" style={{ color: 'var(--color-primary-container)' }} />
                <strong style={{ color: 'var(--color-primary)' }}>{FACTS.summaries}</strong> summaries
              </span>
            </div>
          )}
        </div>

        <div className="fade-up stagger-2 w-full">
          <LibraryPreview />
        </div>
      </div>

      {/* The catalogue sliding past, as the thing the limit is holding shut.
          Covers are the real ones from the BookSnap API. */}
      <div className="fade-up stagger-3 relative mt-14 lg:mt-20">
        <p
          className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          {FACTS.summaries} snaps · {FACTS.categories} categories · waiting behind your limit
        </p>
        <div className="marquee">
          <div className="marquee-track" aria-hidden="true">
            {[...LIBRARY, ...LIBRARY].map((book, i) => (
              <img
                key={`${book.title}-${i}`}
                src={book.cover}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-[104px] w-auto shrink-0 rounded-xl object-cover sm:h-[132px]"
                style={{ boxShadow: '0 8px 24px rgba(0,54,37,0.12)' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
